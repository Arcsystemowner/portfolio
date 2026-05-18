import { useState, useEffect, useRef, useCallback } from "react";
import { FiCloud, FiLayers, FiServer, FiDatabase, FiActivity, FiZap, FiShield } from "react-icons/fi";
import { SiApachekafka, SiRedis } from "react-icons/si";

const NODES = [
  { id: "client",  label: "Web Client",    sub: "React SPA",        Icon: FiCloud,       x: 8,  y: 50, color: "#38bdf8", tier: "client"   },
  { id: "gateway", label: "API Gateway",   sub: "Rate Limiting",    Icon: FiLayers,      x: 28, y: 50, color: "#34d399", tier: "gateway"  },
  { id: "auth",    label: "Auth Service",  sub: "JWT / OAuth2",     Icon: FiShield,      x: 50, y: 20, color: "#a78bfa", tier: "service"  },
  { id: "core",    label: "Core Service",  sub: "Business Logic",   Icon: FiServer,      x: 50, y: 50, color: "#818cf8", tier: "service"  },
  { id: "kafka",   label: "Kafka",         sub: "Event Streaming",  Icon: SiApachekafka, x: 50, y: 80, color: "#fbbf24", tier: "infra"    },
  { id: "redis",   label: "Redis",         sub: "Cache / PubSub",   Icon: SiRedis,       x: 74, y: 28, color: "#f87171", tier: "infra"    },
  { id: "db",      label: "PostgreSQL",    sub: "Primary DB",       Icon: FiDatabase,    x: 74, y: 58, color: "#60a5fa", tier: "infra"    },
  { id: "worker",  label: "Worker",        sub: "Async Processing", Icon: FiActivity,    x: 74, y: 82, color: "#2dd4bf", tier: "service"  },
];

const EDGES = [
  { id: "e1",  from: "client",  to: "gateway", label: "HTTPS",   color: "#38bdf8", dashed: false },
  { id: "e1r", from: "gateway", to: "client",  label: "",        color: "#38bdf880", dashed: false, reply: true },
  { id: "e2",  from: "gateway", to: "auth",    label: "gRPC",    color: "#a78bfa", dashed: false },
  { id: "e2r", from: "auth",    to: "gateway", label: "",        color: "#a78bfa80", dashed: false, reply: true },
  { id: "e3",  from: "gateway", to: "core",    label: "gRPC",    color: "#34d399", dashed: false },
  { id: "e3r", from: "core",    to: "gateway", label: "",        color: "#34d39980", dashed: false, reply: true },
  { id: "e4",  from: "core",    to: "redis",   label: "TCP",     color: "#f87171", dashed: false },
  { id: "e4r", from: "redis",   to: "core",    label: "",        color: "#f8717180", dashed: false, reply: true },
  { id: "e5",  from: "core",    to: "db",      label: "SQL",     color: "#60a5fa", dashed: false },
  { id: "e5r", from: "db",      to: "core",    label: "",        color: "#60a5fa80", dashed: false, reply: true },
  { id: "e6",  from: "core",    to: "kafka",   label: "Event",   color: "#fbbf24", dashed: true  },
  { id: "e7",  from: "kafka",   to: "worker",  label: "Consume", color: "#2dd4bf", dashed: true  },
];

const LATENCIES = { e1: "12ms", e2: "3ms", e3: "4ms", e4: "1ms", e5: "6ms", e6: "8ms", e7: "15ms" };
// Only forward edges are selectable for random traffic bursts
const FORWARD_EDGES = EDGES.filter(e => !e.reply);

function useNodeMetrics(nodeId) {
  const [metrics, setMetrics] = useState(() => ({
    cpu: Math.floor(Math.random() * 35 + 10),
    ram: Math.floor(Math.random() * 40 + 20),
    rps: Math.floor(Math.random() * 900 + 100),
    status: "healthy",
  }));
  useEffect(() => {
    const t = setInterval(() => {
      setMetrics(m => ({
        cpu: Math.max(5, Math.min(95, m.cpu + (Math.random() * 10 - 5))),
        ram: Math.max(10, Math.min(90, m.ram + (Math.random() * 6 - 3))),
        rps: Math.max(50, Math.min(2000, m.rps + (Math.random() * 200 - 100))),
        status: "healthy",
      }));
    }, 2000 + Math.random() * 1000);
    return () => clearInterval(t);
  }, [nodeId]);
  return metrics;
}

function MiniSparkline({ color }) {
  const [points, setPoints] = useState(() =>
    Array.from({ length: 12 }, () => Math.random() * 28 + 4)
  );
  useEffect(() => {
    const t = setInterval(() => {
      setPoints(p => [...p.slice(1), Math.random() * 28 + 4]);
    }, 1200);
    return () => clearInterval(t);
  }, []);
  const w = 72, h = 36;
  const path = points.map((v, i) => `${(i / (points.length - 1)) * w},${h - v}`).join(" L ");
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <polyline points={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <polyline points={`0,${h} ${path} ${w},${h}`} fill={color} fillOpacity="0.08" stroke="none" />
    </svg>
  );
}

function NodeCard({ node, isHovered, isActive, onEnter, onLeave }) {
  const metrics = useNodeMetrics(node.id);
  const { Icon } = node;
  const glow = isHovered || isActive;
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "absolute",
        left: `${node.x}%`,
        top: `${node.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 20,
        cursor: "pointer",
        transition: "filter 0.3s ease",
        filter: glow ? `drop-shadow(0 0 12px ${node.color}90)` : "drop-shadow(0 2px 8px rgba(0,0,0,0.5))",
      }}
    >
      {/* Ping ring — expands outward from card center, no ghost box */}
      {/* {isActive && (
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: 0, height: 0,
          pointerEvents: "none",
          zIndex: 5,
        }}>
          <div style={{
            position: "absolute",
            width: 160, height: 80,
            top: -40, left: -80,
            borderRadius: 12,
            border: `1px solid ${node.color}80`,
            animation: "ping-ring 1.8s ease-out infinite",
            pointerEvents: "none",
          }} />
        </div>
      )} */}

      {/* Main card */}
      <div style={{
        background: glow
          ? `linear-gradient(135deg, ${node.color}18, ${node.color}08)`
          : "rgba(13,17,26,0.92)",
        border: `1px solid ${glow ? node.color + "60" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 12,
        padding: "10px 14px",
        minWidth: 130,
        transition: "all 0.25s ease",
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: `${node.color}18`,
            border: `1px solid ${node.color}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: node.color, flexShrink: 0,
          }}>
            <Icon size={16} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", lineHeight: 1.2 }}>
              {node.label}
            </div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, letterSpacing: "0.08em", marginTop: 1 }}>
              {node.sub}
            </div>
          </div>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#22c55e",
            boxShadow: "0 0 6px #22c55e",
            animation: "pulse-dot 2s ease-in-out infinite",
            flexShrink: 0,
          }} />
        </div>

        {/* Metrics row */}
        <div style={{
          display: "flex", gap: 8,
          borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingTop: 7, marginTop: 2,
        }}>
          <MetricPill label="CPU" value={`${Math.round(metrics.cpu)}%`} color={metrics.cpu > 70 ? "#f87171" : node.color} />
          <MetricPill label="MEM" value={`${Math.round(metrics.ram)}%`} color={metrics.ram > 75 ? "#fbbf24" : node.color} />
          <MetricPill label="RPS" value={metrics.rps > 999 ? `${(metrics.rps/1000).toFixed(1)}k` : Math.round(metrics.rps)} color={node.color} />
        </div>
        <div style={{ marginTop: 6 }}>
          <MiniSparkline color={node.color} />
        </div>
      </div>
    </div>
  );
}

function MetricPill({ label, value, color }) {
  return (
    <div style={{ flex: 1, textAlign: "center" }}>
      <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 8, letterSpacing: "0.1em" }}>{label}</div>
      <div style={{ color, fontSize: 10, fontWeight: 700, marginTop: 1, transition: "color 0.5s" }}>{value}</div>
    </div>
  );
}

function Packet({ edge, svgRect, nodes }) {
  const src = nodes.find(n => n.id === edge.from);
  const tgt = nodes.find(n => n.id === edge.to);
  if (!src || !tgt || !svgRect) return null;
  // Perpendicular offset — same logic as edge drawing
  const dx = tgt.x - src.x, dy = tgt.y - src.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const px = (-dy / len) * 1.2, py = (dx / len) * 1.2;
  const off = edge.reply ? 1 : -1;
  const x1 = ((src.x + px * off) / 100) * svgRect.width;
  const y1 = ((src.y + py * off) / 100) * svgRect.height;
  const x2 = ((tgt.x + px * off) / 100) * svgRect.width;
  const y2 = ((tgt.y + py * off) / 100) * svgRect.height;
  const dur = 0.7 + Math.random() * 0.5;
  const r = edge.reply ? 2.5 : 3.5;
  return (
    <circle r={r} fill={edge.color} style={{ filter: `drop-shadow(0 0 4px ${edge.color})` }}>
      <animateMotion dur={`${dur}s`} repeatCount="1" fill="freeze"
        path={`M${x1},${y1} L${x2},${y2}`}
        calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1"
      />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.85;1" dur={`${dur}s`} repeatCount="1" fill="freeze" />
    </circle>
  );
}

export default function SystemDesign() {
  const [hovered, setHovered] = useState(null);
  const [packets, setPackets] = useState([]);
  const [activeEdges, setActiveEdges] = useState(new Set());
  const [totalReqs, setTotalReqs] = useState(0);
  const [uptime] = useState(() => {
    const start = Date.now() - Math.floor(Math.random() * 86400000);
    return start;
  });
  const [uptimeStr, setUptimeStr] = useState("");
  const svgRef = useRef(null);
  const [svgRect, setSvgRect] = useState(null);
  const packetId = useRef(0);

  useEffect(() => {
    if (!svgRef.current) return;
    const ro = new ResizeObserver(() => {
      if (svgRef.current) setSvgRect(svgRef.current.getBoundingClientRect());
    });
    ro.observe(svgRef.current);
    setSvgRect(svgRef.current.getBoundingClientRect());
    return () => ro.disconnect();
  }, []);

  // Uptime clock
  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - uptime;
      const h = Math.floor(elapsed / 3600000);
      const m = Math.floor((elapsed % 3600000) / 60000);
      const s = Math.floor((elapsed % 60000) / 1000);
      setUptimeStr(`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [uptime]);

  // Packet emitter — fires forward + delayed return on request edges
  useEffect(() => {
    let running = true;
    const emit = () => {
      if (!running) return;
      const edge = FORWARD_EDGES[Math.floor(Math.random() * FORWARD_EDGES.length)];
      const fwdId = packetId.current++;
      // Forward packet
      setPackets(p => [...p.slice(-30), { ...edge, uid: fwdId }]);
      setActiveEdges(ae => new Set([...ae, edge.id]));
      setTotalReqs(r => r + 1);
      const dur = 900 + Math.random() * 500;
      setTimeout(() => {
        setActiveEdges(ae => { const s = new Set(ae); s.delete(edge.id); return s; });
        setPackets(p => p.filter(x => x.uid !== fwdId));
        // Return packet on reply edge (if exists)
        const replyEdge = EDGES.find(e => e.id === edge.id + "r");
        if (replyEdge) {
          const retId = packetId.current++;
          setPackets(p => [...p.slice(-30), { ...replyEdge, uid: retId }]);
          setTimeout(() => {
            setPackets(p => p.filter(x => x.uid !== retId));
          }, dur);
        }
      }, dur);
      const next = 180 + Math.random() * 320;
      setTimeout(emit, next);
    };
    const t = setTimeout(emit, 300);
    return () => { running = false; clearTimeout(t); };
  }, []);

  const getNodePos = (id) => {
    const n = NODES.find(x => x.id === id);
    return n ? { x: n.x, y: n.y } : { x: 0, y: 0 };
  };

  return (
    <div style={{
      position: "relative", width: "80%", height: 580,
      background: "linear-gradient(135deg, #060910 0%, #0a0d16 60%, #06090f 100%)",
      borderRadius: 20,
      border: "1px solid rgba(255,255,255,0.05)",
      overflow: "hidden",
      fontFamily: "monospace",
      userSelect: "none",
      alignItems:"center",
      justifyContent:"center",
      margin:"auto"
    }}>
      <style>{`
        @keyframes ping-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.25);opacity:0} }
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes scan { 0%{transform:translateY(-100%)} 100%{transform:translateY(200%)} }
      `}</style>

      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.025,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Scan line */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.15), transparent)",
        animation: "scan 8s linear infinite",
        pointerEvents: "none",
      }} />

      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "30%", left: "40%",
        width: 500, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)",
        transform: "translate(-50%,-50%)", pointerEvents: "none",
      }} />

      {/* SVG edges + packets */}
      <svg ref={svgRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <defs>
          <marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M2 2L8 5L2 8" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
          <marker id="ah-rev" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M2 2L8 5L2 8" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
        </defs>

        {/* Base edges — forward and reply drawn as parallel offset lines */}
        {EDGES.map(edge => {
          const s = getNodePos(edge.from), t = getNodePos(edge.to);
          const isActive = activeEdges.has(edge.id);
          const isHov = hovered === edge.from || hovered === edge.to;
          const mx = (s.x + t.x) / 2, my = (s.y + t.y) / 2;
          // Perpendicular offset for parallel lanes (reply edges offset by 2px)
          const dx = t.x - s.x, dy = t.y - s.y;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const px = (-dy / len) * 1.2, py = (dx / len) * 1.2; // perp unit * 1.2%
          const off = edge.reply ? 1 : -1;
          return (
            <g key={edge.id}>
              <line
                x1={`${s.x + px * off}%`} y1={`${s.y + py * off}%`}
                x2={`${t.x + px * off}%`} y2={`${t.y + py * off}%`}
                stroke={isActive || isHov ? edge.color : edge.reply ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.07)"}
                strokeWidth={isActive ? 1.5 : 0.8}
                strokeDasharray={edge.dashed ? "6 5" : "none"}
                style={{
                  transition: "stroke 0.3s, stroke-width 0.2s",
                  filter: isActive ? `drop-shadow(0 0 3px ${edge.color}70)` : "none",
                }}
                markerEnd={!edge.reply ? "url(#ah)" : "url(#ah-rev)"}
              />
              {/* Label only on forward edges */}
              {!edge.reply && edge.label && (
                <text
                  x={`${mx}%`} y={`${my}%`}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="8" fontFamily="monospace" letterSpacing="0.08em"
                  fill={isActive || isHov ? edge.color : "rgba(255,255,255,0.18)"}
                  style={{ transition: "fill 0.3s" }}
                  dy="-7"
                >
                  {edge.label}
                </text>
              )}
              {(isActive || isHov) && LATENCIES[edge.id] && (
                <text
                  x={`${mx}%`} y={`${my}%`}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="7" fontFamily="monospace"
                  fill={edge.color} opacity="0.65" dy="5"
                >
                  {LATENCIES[edge.id]}
                </text>
              )}
            </g>
          );
        })}

        {/* Live packets */}
        {svgRect && packets.map(p => (
          <Packet key={p.uid} edge={p} svgRect={svgRect} nodes={NODES} />
        ))}
      </svg>

      {/* Node cards */}
      {NODES.map(node => (
        <NodeCard
          key={node.id}
          node={node}
          isHovered={hovered === node.id}
          isActive={activeEdges.has(EDGES.find(e => e.from === node.id || e.to === node.id)?.id)}
          onEnter={() => setHovered(node.id)}
          onLeave={() => setHovered(null)}
        />
      ))}

      {/* Top-left HUD */}
      <div style={{ position: "absolute", top: 16, left: 20, zIndex: 30, pointerEvents: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", animation: "pulse-dot 2s ease-in-out infinite" }} />
          <span style={{ color: "#818cf8", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em" }}>SYSTEM.TOPOLOGY</span>
        </div>
        <div style={{ color: "rgba(255,255,255,0.22)", fontSize: 8, letterSpacing: "0.1em" }}>
          STATUS: LIVE &nbsp;·&nbsp; NODES: {NODES.length} &nbsp;·&nbsp; EDGES: {EDGES.length}
        </div>
      </div>

      {/* Top-right live counters */}
      <div style={{
        position: "absolute", top: 16, right: 20, zIndex: 30, pointerEvents: "none",
        display: "flex", gap: 16, alignItems: "flex-start",
      }}>
        <HudStat label="UPTIME" value={uptimeStr} color="#22c55e" mono />
        <HudStat label="REQUESTS" value={totalReqs.toLocaleString()} color="#818cf8" />
        <HudStat label="LATENCY" value="avg 7ms" color="#fbbf24" />
        <HudStat label="ERRORS" value="0.00%" color="#22c55e" />
      </div>

      {/* Bottom legend */}
      <div style={{
        position: "absolute", bottom: 14, left: 20, zIndex: 30, pointerEvents: "none",
        display: "flex", gap: 16, alignItems: "center",
      }}>
        <LegendItem color="#818cf8" label="HTTP/gRPC" dashed={false} />
        <LegendItem color="#fbbf24" label="Event stream" dashed={true} />
        <LegendItem color="#22c55e" label="Healthy" dot />
      </div>

      {/* Bottom-right tier labels */}
      <div style={{
        position: "absolute", bottom: 14, right: 20, zIndex: 30, pointerEvents: "none",
        display: "flex", gap: 8,
      }}>
        {["client","gateway","service","infra"].map(tier => (
          <div key={tier} style={{
            fontSize: 8, letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 4, padding: "2px 7px", textTransform: "uppercase",
          }}>{tier}</div>
        ))}
      </div>
    </div>
  );
}

function HudStat({ label, value, color, mono }) {
  return (
    <div style={{ textAlign: "right" }}>
      <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 7, letterSpacing: "0.12em", marginBottom: 2 }}>{label}</div>
      <div style={{ color, fontSize: mono ? 10 : 11, fontWeight: 700, letterSpacing: mono ? "0.05em" : "0.02em", fontVariantNumeric: "tabular-nums" }}>{value}</div>
    </div>
  );
}

function LegendItem({ color, label, dashed, dot }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      {dot ? (
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}` }} />
      ) : (
        <svg width={20} height={8}>
          <line x1="0" y1="4" x2="20" y2="4"
            stroke={color} strokeWidth="1.5"
            strokeDasharray={dashed ? "4 3" : "none"}
          />
        </svg>
      )}
      <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 8, letterSpacing: "0.08em" }}>{label}</span>
    </div>
  );
}