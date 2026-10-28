import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiDatabase,
  FiLayers,
  FiPlay,
  FiRotateCcw,
  FiServer,
  FiX,
} from "react-icons/fi";

const WIDTH = 800;
const HEIGHT = 360;
const ROUND_SECONDS = 30;
const PACKET_TYPES = [
  { kind: "REST", payload: "GET /api/v1", color: "#38bdf8" },
  { kind: "EVENT", payload: "KAFKA EVENT", color: "#a78bfa" },
  { kind: "CACHE", payload: "REDIS HIT", color: "#f59e0b" },
  { kind: "SQL", payload: "SQL QUERY", color: "#34d399" },
];
const GRID_COLUMNS = Array.from({ length: 17 }, (_, index) => index * 50);

function drawScene(canvas, game, isDark) {
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;

  const background = context.createLinearGradient(0, 0, WIDTH, HEIGHT);
  background.addColorStop(0, isDark ? "#081321" : "#f8fafc");
  background.addColorStop(1, isDark ? "#10243b" : "#eaf2ff");
  context.fillStyle = background;
  context.fillRect(0, 0, WIDTH, HEIGHT);

  context.lineWidth = 1;
  GRID_COLUMNS.forEach((x) => {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, HEIGHT);
    context.strokeStyle = isDark ? "rgba(148,163,184,0.07)" : "rgba(100,116,139,0.09)";
    context.stroke();
  });
  for (let y = 30; y < HEIGHT; y += 40) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(WIDTH, y);
    context.strokeStyle = isDark ? "rgba(148,163,184,0.06)" : "rgba(100,116,139,0.07)";
    context.stroke();
  }

  context.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = isDark ? "rgba(148,163,184,0.5)" : "rgba(71,85,105,0.65)";
  context.fillText("INCOMING TRAFFIC  //  ROUTE TO HEALTHY SERVICES", 20, 24);

  game.packets.forEach((packet) => {
    const x = packet.x + Math.sin(game.elapsed * 2 + packet.phase) * 3;
    const left = x - 53;
    const top = packet.y - 14;
    context.fillStyle = isDark ? "rgba(15,23,42,0.94)" : "rgba(255,255,255,0.96)";
    context.strokeStyle = `${packet.color}bb`;
    context.lineWidth = 1.5;
    context.shadowColor = `${packet.color}70`;
    context.shadowBlur = 12;
    context.beginPath();
    context.roundRect(left, top, 106, 28, 8);
    context.fill();
    context.stroke();
    context.shadowBlur = 0;
    context.fillStyle = packet.color;
    context.fillRect(left + 8, top + 8, 3, 12);
    context.fillStyle = isDark ? "#e2e8f0" : "#1e293b";
    context.font = "600 9px ui-monospace, SFMono-Regular, Menlo, monospace";
    context.textAlign = "center";
    context.fillText(packet.payload, x + 3, packet.y + 3);
    context.textAlign = "left";
  });

  const gatewayX = game.paddleX;
  const gatewayY = HEIGHT - 48;
  const gatewayGradient = context.createLinearGradient(gatewayX - 78, gatewayY - 24, gatewayX + 78, gatewayY + 22);
  gatewayGradient.addColorStop(0, isDark ? "#0e7490" : "#0891b2");
  gatewayGradient.addColorStop(1, isDark ? "#1d4ed8" : "#4f46e5");
  context.beginPath();
  context.roundRect(gatewayX - 78, gatewayY - 22, 156, 42, 10);
  context.fillStyle = gatewayGradient;
  context.shadowColor = "rgba(14,165,233,0.45)";
  context.shadowBlur = 16;
  context.fill();
  context.shadowBlur = 0;
  context.strokeStyle = isDark ? "rgba(186,230,253,0.65)" : "rgba(255,255,255,0.8)";
  context.lineWidth = 1.5;
  context.stroke();
  context.fillStyle = "#fff";
  context.font = "700 11px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.textAlign = "center";
  context.fillText("API GATEWAY", gatewayX, gatewayY - 2);
  context.font = "500 8px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = "rgba(255,255,255,0.8)";
  context.fillText("← ROUTE REQUESTS →", gatewayX, gatewayY + 10);
  context.textAlign = "left";
}

function PipelineStep({ icon: Icon, title, detail, isDark }) {
  return (
    <div className={`flex min-w-0 flex-1 items-center gap-2 rounded-xl border px-3 py-2.5 ${
      isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"
    }`}>
      <Icon className="shrink-0 text-primary-400" size={16} />
      <div className="min-w-0">
        <p className={`truncate text-[11px] font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>{title}</p>
        <p className={`truncate text-[9px] ${isDark ? "text-slate-500" : "text-slate-500"}`}>{detail}</p>
      </div>
    </div>
  );
}

export default function WaterCatchGame() {
  const [isDark, setIsDark] = useState(() =>
    typeof document === "undefined" || !document.documentElement.classList.contains("light")
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState("ready");
  const [stats, setStats] = useState({ processed: 0, timeouts: 0, cacheHits: 0, events: 0 });
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const canvasRef = useRef(null);
  const gameRef = useRef({
    packets: [],
    paddleX: WIDTH / 2,
    targetX: null,
    elapsed: 0,
    remaining: ROUND_SECONDS,
    spawnElapsed: 0,
    lastFrame: 0,
    lastUiUpdate: 0,
    stats: { processed: 0, timeouts: 0, cacheHits: 0, events: 0 },
  });
  const keysRef = useRef({ left: false, right: false });

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => setIsDark(!root.classList.contains("light")));
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    setIsDark(!root.classList.contains("light"));
    return () => observer.disconnect();
  }, []);

  const paint = useCallback(() => {
    drawScene(canvasRef.current, gameRef.current, isDark);
  }, [isDark]);

  useEffect(() => {
    if (status !== "running") {
      if (isExpanded) paint();
      return undefined;
    }

    let frameId;
    const update = (now) => {
      const game = gameRef.current;
      const delta = game.lastFrame ? Math.min((now - game.lastFrame) / 1000, 0.05) : 0;
      game.lastFrame = now;
      game.elapsed += delta;
      game.remaining = Math.max(0, game.remaining - delta);

      const direction = Number(keysRef.current.right) - Number(keysRef.current.left);
      if (game.targetX !== null) {
        game.paddleX += (game.targetX - game.paddleX) * Math.min(1, delta * 14);
      } else {
        game.paddleX += direction * 390 * delta;
      }
      game.paddleX = Math.max(82, Math.min(WIDTH - 82, game.paddleX));

      game.spawnElapsed += delta;
      if (game.spawnElapsed >= 0.62) {
        game.spawnElapsed = 0;
        const packetType = PACKET_TYPES[Math.floor(Math.random() * PACKET_TYPES.length)];
        game.packets.push({
          ...packetType,
          x: 60 + Math.random() * (WIDTH - 120),
          y: -20,
          speed: 128 + Math.random() * 92,
          phase: Math.random() * Math.PI * 2,
        });
      }

      let changedStats = false;
      for (let index = game.packets.length - 1; index >= 0; index -= 1) {
        const packet = game.packets[index];
        packet.y += packet.speed * delta;
        if (packet.y >= HEIGHT - 77 && packet.y <= HEIGHT - 27 && Math.abs(packet.x - game.paddleX) < 79) {
          game.packets.splice(index, 1);
          game.stats.processed += 1;
          if (packet.kind === "CACHE") game.stats.cacheHits += 1;
          if (packet.kind === "EVENT") game.stats.events += 1;
          changedStats = true;
        } else if (packet.y > HEIGHT + 16) {
          game.packets.splice(index, 1);
          game.stats.timeouts += 1;
          changedStats = true;
        }
      }
      if (changedStats) setStats({ ...game.stats });

      if (now - game.lastUiUpdate > 100) {
        game.lastUiUpdate = now;
        setTimeLeft(Math.ceil(game.remaining));
      }

      paint();
      if (game.remaining <= 0) {
        setTimeLeft(0);
        setStatus("finished");
        return;
      }
      frameId = window.requestAnimationFrame(update);
    };

    frameId = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(frameId);
  }, [isExpanded, paint, status]);

  const beginGame = () => {
    if (status === "paused") {
      gameRef.current.lastFrame = 0;
      setStatus("running");
      canvasRef.current?.focus();
      return;
    }

    const initialStats = { processed: 0, timeouts: 0, cacheHits: 0, events: 0 };
    gameRef.current = {
      packets: [],
      paddleX: WIDTH / 2,
      targetX: null,
      elapsed: 0,
      remaining: ROUND_SECONDS,
      spawnElapsed: 0,
      lastFrame: 0,
      lastUiUpdate: 0,
      stats: initialStats,
    };
    keysRef.current = { left: false, right: false };
    setStats(initialStats);
    setTimeLeft(ROUND_SECONDS);
    setStatus("running");
    canvasRef.current?.focus();
  };

  const moveGatewayToPointer = (event) => {
    if (status !== "running" || !canvasRef.current) return;
    const bounds = canvasRef.current.getBoundingClientRect();
    gameRef.current.targetX = ((event.clientX - bounds.left) / bounds.width) * WIDTH;
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
      event.preventDefault();
      keysRef.current.left = true;
    } else if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
      event.preventDefault();
      keysRef.current.right = true;
    } else if (event.key === "Escape" && status === "running") {
      setStatus("paused");
    }
  };

  const releaseControls = () => {
    keysRef.current = { left: false, right: false };
  };

  const statCardClass = `min-w-[72px] rounded-lg px-3 py-2 text-center ${isDark ? "bg-white/5" : "bg-slate-50"}`;
  const statLabelClass = `block text-[9px] uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-500"}`;
  const statValueClass = `font-mono text-lg font-bold ${isDark ? "text-white" : "text-slate-900"}`;
  const controlButtonClass = `flex min-h-12 flex-1 items-center justify-center rounded-xl border text-sm font-semibold select-none touch-none ${
    isDark
      ? "border-white/10 bg-white/5 text-slate-200 active:bg-white/10"
      : "border-slate-200 bg-white text-slate-700 shadow-sm active:bg-slate-100"
  }`;

  return (
    <section id="water-game" className="relative">
      <div className="section-container !py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-primary-400 text-sm tracking-widest">06</span>
              <span className="h-px w-8 bg-primary-500/40" />
              <span className="font-mono text-xs text-slate-500 tracking-widest uppercase">Optional interactive demo</span>
            </div>
            <h2 className="section-title mb-2 text-2xl sm:text-3xl">Gateway Rush</h2>
            <p className="section-subtitle mb-0 max-w-2xl text-sm sm:text-base">
              A quick, playable look at how an API gateway routes traffic across a full-stack system.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (isExpanded && status === "running") setStatus("paused");
              setIsExpanded((expanded) => !expanded);
            }}
            className="btn-outline shrink-0 justify-center"
            aria-expanded={isExpanded}
            aria-controls="gateway-rush-game"
          >
            {isExpanded ? <FiX size={16} /> : <FiPlay size={16} />}
            {isExpanded ? "Hide game" : "Play a quick round"}
          </button>
        </motion.div>

        <div id="gateway-rush-game">
        {!isExpanded && (
          <div className={`flex flex-col gap-3 rounded-2xl border px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
            isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200/80 bg-white/70 shadow-sm"
          }`}>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500">
                <FiActivity size={20} />
              </span>
              <p className={`text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                Move the gateway to catch REST, Kafka, Redis, and SQL requests before they time out.
              </p>
            </div>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-slate-500">
              React → Spring Boot → Kafka / Redis → PostgreSQL
            </span>
          </div>
        )}

        {isExpanded && (
        <div className={`overflow-hidden rounded-2xl border ${
          isDark ? "border-white/10 bg-dark-800/70" : "border-slate-200 bg-white/90 shadow-xl shadow-slate-900/5"
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500">
                <FiActivity size={20} />
              </span>
              <div>
                <h3 className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>Gateway Rush</h3>
                <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  30-second service traffic simulation
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2" aria-live="polite">
              <div className={statCardClass}>
                <span className={statLabelClass}>Processed</span>
                <span className={statValueClass}>{stats.processed}</span>
              </div>
              <div className={statCardClass}>
                <span className={statLabelClass}>Timeouts</span>
                <span className={`font-mono text-lg font-bold ${stats.timeouts > 0 ? "text-rose-500" : isDark ? "text-white" : "text-slate-900"}`}>
                  {stats.timeouts}
                </span>
              </div>
              <div className={statCardClass}>
                <span className={statLabelClass}>Redis hits</span>
                <span className={statValueClass}>{stats.cacheHits}</span>
              </div>
              <div className={statCardClass}>
                <span className={statLabelClass}>Kafka events</span>
                <span className={statValueClass}>{stats.events}</span>
              </div>
              <div className={statCardClass}>
                <span className={statLabelClass}>Time</span>
                <span className={`font-mono text-lg font-bold ${timeLeft <= 5 && status === "running" ? "text-rose-500" : isDark ? "text-white" : "text-slate-900"}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 px-5 pb-4 sm:flex-nowrap sm:px-6" aria-label="Example full-stack architecture">
            <PipelineStep icon={FiActivity} title="React client" detail="Interactive UI" isDark={isDark} />
            <span className={isDark ? "text-slate-600" : "text-slate-400"} aria-hidden="true">→</span>
            <PipelineStep icon={FiServer} title="Spring Boot" detail="REST API" isDark={isDark} />
            <span className={isDark ? "text-slate-600" : "text-slate-400"} aria-hidden="true">→</span>
            <PipelineStep icon={FiLayers} title="Kafka + Redis" detail="Events & cache" isDark={isDark} />
            <span className={isDark ? "text-slate-600" : "text-slate-400"} aria-hidden="true">→</span>
            <PipelineStep icon={FiDatabase} title="PostgreSQL" detail="Persistent data" isDark={isDark} />
          </div>

          <div className="relative mx-3 overflow-hidden rounded-xl sm:mx-5">
            <canvas
              ref={canvasRef}
              width={WIDTH}
              height={HEIGHT}
              tabIndex={0}
              onPointerMove={moveGatewayToPointer}
              onPointerDown={(event) => {
                moveGatewayToPointer(event);
                canvasRef.current?.focus();
              }}
              onKeyDown={handleKeyDown}
              onKeyUp={(event) => {
                if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") keysRef.current.left = false;
                if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") keysRef.current.right = false;
              }}
              onBlur={releaseControls}
              className="block h-auto w-full touch-none outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset"
              style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
              aria-label="Gateway Rush simulation. Move the API Gateway to process incoming REST, Kafka, Redis, and SQL traffic packets."
            />

            {status !== "running" && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/25 p-4 backdrop-blur-[2px]">
                <div className="max-w-sm text-center">
                  <p className="text-sm font-semibold text-white drop-shadow">
                    {status === "finished"
                      ? `Round complete: ${stats.processed} requests processed, ${stats.timeouts} timed out.`
                      : status === "paused"
                        ? "Simulation paused"
                        : "Ready to route some traffic?"}
                  </p>
                  <button type="button" onClick={beginGame} className="btn-primary mt-4 justify-center">
                    {status === "finished" ? <FiRotateCcw size={16} /> : <FiPlay size={16} />}
                    {status === "finished" ? "Run it again" : status === "paused" ? "Resume simulation" : "Start simulation"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 px-5 pb-4 pt-3 sm:px-6">
            <p className={`hidden text-xs sm:block ${isDark ? "text-slate-500" : "text-slate-500"}`}>
              Move with ← / → or A / D. Drag the gateway or hold the controls on mobile. Esc pauses.
            </p>
            <div className="flex w-full gap-3 sm:w-auto">
              <button
                type="button"
                className={controlButtonClass}
                aria-label="Move API Gateway left"
                onPointerDown={(event) => {
                  event.preventDefault();
                  keysRef.current.left = true;
                }}
                onPointerUp={releaseControls}
                onPointerLeave={releaseControls}
                onPointerCancel={releaseControls}
              >
                ← <span className="ml-2">Left</span>
              </button>
              <button
                type="button"
                className={controlButtonClass}
                aria-label="Move API Gateway right"
                onPointerDown={(event) => {
                  event.preventDefault();
                  keysRef.current.right = true;
                }}
                onPointerUp={releaseControls}
                onPointerLeave={releaseControls}
                onPointerCancel={releaseControls}
              >
                Right <span className="ml-2">→</span>
              </button>
            </div>
            {status === "running" && (
              <button
                type="button"
                onClick={() => setStatus("paused")}
                className={`hidden rounded-lg px-3 py-2 text-xs font-semibold sm:block ${
                  isDark ? "text-slate-300 hover:bg-white/10" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Pause
              </button>
            )}
          </div>
        </div>
        )}
        </div>
      </div>
    </section>
  );
}
