import { useState, useEffect, useRef } from "react";
import { FaReact, FaJava, FaDocker } from "react-icons/fa";
import { SiSpringboot, SiPostgresql, SiMongodb, SiRedis, SiTypescript, SiApachekafka, SiKubernetes } from "react-icons/si";

const CATEGORIES = [
  { id: "backend",   label: "Backend",   color: "#f59e0b", glow: "#f59e0b40", x: 50, y: 33 },
  { id: "frontend",  label: "Frontend",  color: "#3b82f6", glow: "#3b82f640", x: 22, y: 55 },
  { id: "messaging", label: "Messaging", color: "#8b5cf6", glow: "#8b5cf640", x: 78, y: 45 },
  { id: "database",  label: "Databases", color: "#10b981", glow: "#10b98140", x: 42, y: 72 },
  { id: "devops",    label: "DevOps",    color: "#ef4444", glow: "#ef444440", x: 76, y: 72 },
];

const SKILLS = [
  { id: "java",     label: "Java",       parent: "backend",   x: 36, y: 18, exp: "Advanced",     expColor: "#f59e0b", desc: "Core language for enterprise services and JVM-based microservices.",  Icon: FaJava },
  { id: "spring",   label: "Spring",     parent: "backend",   x: 64, y: 18, exp: "Advanced",     expColor: "#f59e0b", desc: "Building REST APIs, microservices, and event-driven applications.",     Icon: SiSpringboot },
  { id: "react",    label: "React",      parent: "frontend",  x: 10, y: 42, exp: "Advanced",     expColor: "#3b82f6", desc: "SPA and dashboard UI development with hooks and modern patterns.",      Icon: FaReact },
  { id: "ts",       label: "TypeScript", parent: "frontend",  x: 10, y: 68, exp: "Intermediate", expColor: "#3b82f6", desc: "Type-safe client architectures and component libraries.",               Icon: SiTypescript },
  { id: "kafka",    label: "Kafka",      parent: "messaging", x: 90, y: 32, exp: "Intermediate", expColor: "#8b5cf6", desc: "Event-driven streaming and distributed message processing.",            Icon: SiApachekafka },
  { id: "redis",    label: "Redis",      parent: "messaging", x: 90, y: 58, exp: "Intermediate", expColor: "#8b5cf6", desc: "In-memory caching, Pub/Sub, and session management.",                  Icon: SiRedis },
  { id: "postgres", label: "Postgres",   parent: "database",  x: 28, y: 88, exp: "Advanced",     expColor: "#10b981", desc: "Relational data modelling, ACID compliance, and complex queries.",    Icon: SiPostgresql },
  { id: "mongo",    label: "MongoDB",    parent: "database",  x: 56, y: 88, exp: "Intermediate", expColor: "#10b981", desc: "NoSQL document stores for flexible, schema-less data.",               Icon: SiMongodb },
  { id: "docker",   label: "Docker",     parent: "devops",    x: 88, y: 84, exp: "Intermediate", expColor: "#ef4444", desc: "Containerisation and reproducible build environments.",               Icon: FaDocker },
  { id: "k8s",      label: "K8s",        parent: "devops",    x: 64, y: 84, exp: "Beginner",     expColor: "#ef4444", desc: "Container orchestration and cluster management at scale.",            Icon: SiKubernetes },
];

const EXP_LEVELS = { Advanced: 3, Intermediate: 2, Beginner: 1 };

function getCategoryById(id) {
  return CATEGORIES.find((c) => c.id === id);
}


function ExpDots({ level }) {
  const max = 3;
  const filled = EXP_LEVELS[level] || 1;
  return (
    <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 6, height: 6, borderRadius: "50%",
            background: i < filled ? "currentColor" : "rgba(255,255,255,0.2)",
            opacity: i < filled ? 1 : 0.4,
          }}
        />
      ))}
    </div>
  );
}

export default function SkillsNetwork() {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const active = selected || hovered;
  const activeSkill = SKILLS.find((s) => s.id === active);
  const activeCategory = CATEGORIES.find((c) => c.id === active);
  const activeNode = activeSkill || activeCategory;

  const isHighlighted = (node) => {
    if (!active) return false;
    if (node.id === active) return true;
    if (node.parent && node.parent === active) return true;
    if (activeSkill && node.id === activeSkill.parent) return true;
    if (activeSkill && node.parent === activeSkill.parent && node.id !== active) return true;
    return false;
  };

  const isDimmed = (node) => {
    if (!active) return false;
    return !isHighlighted(node) && node.id !== active;
  };

  return (
    <div className="w-full overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0" style={{ WebkitOverflowScrolling: 'touch' }}>
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          minWidth: 800,
          aspectRatio: "16/9",
          maxHeight: 680,
          background: "linear-gradient(135deg, #0a0d14 0%, #0d1117 50%, #0a0f18 100%)",
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.06)",
          overflow: "hidden",
          fontFamily: "monospace",
          userSelect: "none",
        }}
        onClick={(e) => {
          if (e.target === containerRef.current || e.target.tagName === "svg") {
            setSelected(null);
          }
        }}
      >
      {/* Ambient background orbs */}
      <div style={{
        position: "absolute", top: "10%", left: "20%",
        width: 320, height: 320, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "15%",
        width: 280, height: 280, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* SVG Lines */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        {SKILLS.map((skill) => {
          const cat = getCategoryById(skill.parent);
          const isActive = active && (skill.id === active || skill.parent === active ||
            (activeSkill && skill.parent === activeSkill.parent));
          const dim = isDimmed(skill);
          return (
            <line
              key={skill.id}
              x1={`${cat.x}%`} y1={`${cat.y}%`}
              x2={`${skill.x}%`} y2={`${skill.y}%`}
              stroke={isActive ? cat.color : "rgba(255,255,255,0.06)"}
              strokeWidth={isActive ? 1.5 : 0.8}
              strokeDasharray={isActive ? "none" : "4 4"}
              opacity={dim ? 0.2 : 1}
              style={{
                transition: "all 0.35s ease",
                filter: isActive ? `drop-shadow(0 0 6px ${cat.color}80)` : "none",
              }}
            />
          );
        })}
      </svg>

      {/* Category Nodes */}
      {CATEGORIES.map((cat, i) => {
        const isAct = active === cat.id || (activeSkill && activeSkill.parent === cat.id);
        const dim = active && !isAct && !(activeSkill && activeSkill.parent === cat.id);
        return (
          <div
            key={cat.id}
            onMouseEnter={() => !selected && setHovered(cat.id)}
            onMouseLeave={() => !selected && setHovered(null)}
            onClick={(e) => {
              e.stopPropagation();
              setSelected(selected === cat.id ? null : cat.id);
              setHovered(null);
            }}
            style={{
              position: "absolute",
              left: `${cat.x}%`,
              top: `${cat.y}%`,
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
              zIndex: 10,
              opacity: dim ? 0.25 : 1,
              transition: "opacity 0.35s ease, transform 0.2s ease",
            }}
          >
            {/* Outer glow ring */}
            <div style={{
              position: "absolute", inset: -8, borderRadius: "50%",
              background: isAct ? cat.glow : "transparent",
              transition: "background 0.35s ease",
              pointerEvents: "none",
            }} />
            <div
              style={{
                width: isAct ? 72 : 64,
                height: isAct ? 72 : 64,
                borderRadius: "50%",
                background: isAct
                  ? `radial-gradient(circle at 40% 35%, ${cat.color}22, ${cat.color}08)`
                  : "rgba(15,20,30,0.9)",
                border: `${isAct ? 2 : 1.5}px solid ${isAct ? cat.color : "rgba(255,255,255,0.1)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                boxShadow: isAct
                  ? `0 0 24px ${cat.color}50, inset 0 0 12px ${cat.color}10`
                  : "0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              <span style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: isAct ? cat.color : "rgba(255,255,255,0.7)",
                textTransform: "uppercase",
                textAlign: "center",
                lineHeight: 1.3,
                transition: "color 0.3s ease",
                padding: "0 6px",
              }}>
                {cat.label}
              </span>
            </div>
          </div>
        );
      })}

      {/* Skill Nodes */}
      {SKILLS.map((skill, i) => {
        const cat = getCategoryById(skill.parent);
        const isAct = active === skill.id || (active === skill.parent) ||
          (activeSkill && activeSkill.parent === skill.parent);
        const isFocused = active === skill.id;
        const dim = active && !isAct;
        return (
          <div
            key={skill.id}
            onMouseEnter={() => !selected && setHovered(skill.id)}
            onMouseLeave={() => !selected && setHovered(null)}
            onClick={(e) => {
              e.stopPropagation();
              setSelected(selected === skill.id ? null : skill.id);
              setHovered(null);
            }}
            style={{
              position: "absolute",
              left: `${skill.x}%`,
              top: `${skill.y}%`,
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
              zIndex: 10,
              opacity: dim ? 0.2 : 1,
              transition: "opacity 0.35s ease",
            }}
          >
            {/* Skill tooltip label */}
            <div style={{
              position: "absolute",
              bottom: "calc(100% + 8px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(10,13,20,0.95)",
              border: `1px solid ${cat.color}60`,
              borderRadius: 6,
              padding: "3px 8px",
              fontSize: 10,
              color: cat.color,
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
              opacity: isFocused ? 1 : 0,
              pointerEvents: "none",
              transition: "opacity 0.2s ease",
              boxShadow: `0 4px 16px rgba(0,0,0,0.5)`,
            }}>
              {skill.label}
            </div>
            <div
              style={{
                width: isFocused ? 52 : 44,
                height: isFocused ? 52 : 44,
                borderRadius: "50%",
                background: isFocused
                  ? `radial-gradient(circle at 40% 35%, ${cat.color}28, ${cat.color}08)`
                  : "rgba(12,16,24,0.9)",
                border: `${isFocused ? 2 : 1}px solid ${isFocused ? cat.color : "rgba(255,255,255,0.1)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                boxShadow: isFocused
                  ? `0 0 20px ${cat.color}40, inset 0 0 8px ${cat.color}10`
                  : "0 2px 12px rgba(0,0,0,0.4)",
                color: isFocused ? cat.color : "rgba(255,255,255,0.45)",
              }}
            >
              <skill.Icon size={isFocused ? 20 : 17} />
            </div>
          </div>
        );
      })}

      {/* Info Panel */}
      <div style={{
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 260,
        minHeight: 100,
        pointerEvents: "none",
        zIndex: 20,
      }}>
        <div style={{
          background: "rgba(10,13,20,0.95)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${activeSkill ? activeSkill.expColor : activeCategory ? activeCategory.color : "rgba(255,255,255,0.08)"}30`,
          borderRadius: 14,
          padding: activeNode ? "16px 18px" : "0",
          height: activeNode ? "auto" : 0,
          overflow: "hidden",
          opacity: activeNode ? 1 : 0,
          transform: activeNode ? "translateY(0) scale(1)" : "translateY(8px) scale(0.97)",
          transition: "opacity 0.25s ease, transform 0.25s ease, padding 0.2s, height 0.2s, border-color 0.3s",
          boxShadow: activeNode
            ? `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px ${activeSkill ? activeSkill.expColor : activeCategory ? activeCategory.color : "transparent"}18`
            : "none",
        }}>
          {activeSkill && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: `${activeSkill.expColor}18`,
                  border: `1px solid ${activeSkill.expColor}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: activeSkill.expColor, flexShrink: 0,
                }}>
                  <activeSkill.Icon size={18} />
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, letterSpacing: "0.04em" }}>
                    {activeSkill.label}
                  </div>
                  <div style={{ color: activeSkill.expColor, fontSize: 10, letterSpacing: "0.1em", marginTop: 1 }}>
                    {activeSkill.exp.toUpperCase()}
                  </div>
                </div>
                <div style={{ marginLeft: "auto", color: activeSkill.expColor }}>
                  <ExpDots level={activeSkill.exp} />
                </div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 1.6, margin: 0 }}>
                {activeSkill.desc}
              </p>
              <div style={{
                marginTop: 10, paddingTop: 10,
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: getCategoryById(activeSkill.parent).color,
                }} />
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: "0.08em" }}>
                  {getCategoryById(activeSkill.parent).label.toUpperCase()}
                </span>
              </div>
            </>
          )}
          {activeCategory && !activeSkill && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: activeCategory.color,
                  boxShadow: `0 0 8px ${activeCategory.color}`,
                }} />
                <span style={{ color: activeCategory.color, fontWeight: 700, fontSize: 13, letterSpacing: "0.08em" }}>
                  {activeCategory.label.toUpperCase()}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {SKILLS.filter(s => s.parent === activeCategory.id).map(s => (
                  <div
                    key={s.id}
                    style={{
                      display: "flex", alignItems: "center", gap: 5,
                      background: `${activeCategory.color}12`,
                      border: `1px solid ${activeCategory.color}30`,
                      borderRadius: 8, padding: "4px 10px",
                      fontSize: 11, color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    <span style={{ color: activeCategory.color, display: "flex" }}>
                      <s.Icon size={12} />
                    </span>
                    {s.label}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Top-left badge */}
      <div style={{ position: "absolute", top: 18, left: 20, pointerEvents: "none" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 6, marginBottom: 3,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#10b981",
            boxShadow: "0 0 8px #10b981",
            animation: "pulse 2s ease-in-out infinite",
          }} />
          <span style={{ color: "#3b82f6", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em" }}>
            NETWORK_GRAPH.exe
          </span>
        </div>
        <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 9, letterSpacing: "0.1em" }}>
          {active ? `NODE: ${active.toUpperCase()}` : "STATUS: ONLINE · 5 DOMAINS · 10 SKILLS"}
        </div>
      </div>

      {/* Legend bottom-left */}
      <div style={{
        position: "absolute", bottom: 20, left: 20,
        display: "flex", flexDirection: "column", gap: 6,
        pointerEvents: "none",
      }}>
        {[["Advanced", 3], ["Intermediate", 2], ["Beginner", 1]].map(([label, dots]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ display: "flex", gap: 3 }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: i < dots ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.1)",
                }} />
              ))}
            </div>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 9, letterSpacing: "0.08em" }}>
              {label.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
      </div>
    </div>
  );
}