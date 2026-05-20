import { useState, useEffect, useRef, memo } from "react";
import { FiCloud, FiLayers, FiServer, FiDatabase, FiActivity, FiZap, FiShield, FiGlobe } from "react-icons/fi";
import { SiRedis, SiPrometheus, SiGrafana } from "react-icons/si";

// Main architecture nodes with positions optimized for distributed rate limiter
const NODES = [
  // CLIENT LAYER
  { id: "web",     label: "Web Client",      sub: "React SPA",           Icon: FiCloud,          x: 7,  y: 20, color: "#38bdf8", tier: "client"   },
  { id: "mobile",  label: "Mobile App",      sub: "iOS / Android",       Icon: FiCloud,          x: 7,  y: 38, color: "#38bdf8", tier: "client"   },
  { id: "api3p",   label: "3rd Party API",   sub: "External consumers",  Icon: FiGlobe,          x: 7,  y: 56, color: "#38bdf8", tier: "client"   },
  
  // EDGE LAYER
  { id: "cdn",     label: "CDN",             sub: "Cloudflare Edge",     Icon: FiGlobe,          x: 22, y: 16, color: "#34d399", tier: "edge"     },
  { id: "waf",     label: "WAF",             sub: "DDoS Mitigation",     Icon: FiShield,         x: 22, y: 36, color: "#34d399", tier: "edge"     },
  { id: "lb",      label: "Load Balancer",   sub: "Consistent Hash",     Icon: FiLayers,         x: 22, y: 56, color: "#34d399", tier: "edge"     },
  
  // API GATEWAY
  { id: "gateway", label: "API Gateway",     sub: "Auth · JWT · Route",  Icon: FiLayers,         x: 36, y: 36, color: "#a78bfa", tier: "gateway"  },
  
  // RATE LIMITER SERVICE (Central - the star of the show)
  { id: "limiter", label: "Rate Limiter",    sub: "Distributed Service", Icon: FiZap,            x: 54, y: 36, color: "#f97316", tier: "limiter"  },
  
  // CACHE LAYER
  { id: "redis",   label: "Redis Cluster",   sub: "Distributed Counter", Icon: SiRedis,          x: 54, y: 60, color: "#f87171", tier: "cache"    },
  
  // MICROSERVICES
  { id: "user",    label: "User Service",    sub: "Identity & Auth",     Icon: FiServer,         x: 78, y: 18, color: "#60a5fa", tier: "service"  },
  { id: "payment", label: "Payment Service", sub: "Stripe / Razorpay",   Icon: FiDatabase,       x: 78, y: 34, color: "#60a5fa", tier: "service"  },
  { id: "notify",  label: "Notification",    sub: "Email · SMS · Push",  Icon: FiActivity,       x: 78, y: 50, color: "#60a5fa", tier: "service"  },
  { id: "analytics",label: "Analytics",      sub: "ClickHouse Events",   Icon: FiDatabase,       x: 78, y: 66, color: "#2dd4bf", tier: "service"  },
  
  // OBSERVABILITY
  { id: "prometheus",label: "Prometheus",    sub: "Metrics Scraper",     Icon: SiPrometheus,     x: 92, y: 20, color: "#fb923c", tier: "observe"  },
  { id: "grafana",   label: "Grafana",       sub: "Dashboards",          Icon: SiGrafana,        x: 92, y: 38, color: "#fb923c", tier: "observe"  },
  { id: "tracing",   label: "Jaeger",        sub: "Distributed Trace",   Icon: FiActivity,       x: 92, y: 56, color: "#fb923c", tier: "observe"  },
];

// Algorithm strategy modules (floating near Rate Limiter)
const ALGORITHMS = [
  { id: "fixed",   label: "Fixed Window",     sub: "O(1) INCR+TTL",     color: "#fbbf24", offsetX: -10, offsetY: -16 },
  { id: "sliding", label: "Sliding Window",   sub: "Sorted Set O(log n)", color: "#34d399", offsetX: 0,   offsetY: -16 },
  { id: "token",   label: "Token Bucket",     sub: "Refill + Burst",    color: "#a78bfa", offsetX: 10,  offsetY: -16 },
  { id: "leaky",   label: "Leaky Bucket",     sub: "Queue Drain",       color: "#f87171", offsetX: 8,   offsetY: 12  },
  { id: "counter", label: "Sliding Counter",  sub: "Hybrid O(1)",       color: "#fb923c", offsetX: -8,  offsetY: 12  },
];

// Edges with routing paths
const EDGES = [
  // Client → Edge
  { id: "e1",  from: "web",     to: "cdn",       label: "HTTPS",    color: "#38bdf8", dashed: false },
  { id: "e2",  from: "mobile",  to: "waf",       label: "HTTPS",    color: "#38bdf8", dashed: false },
  { id: "e3",  from: "api3p",   to: "lb",        label: "HTTPS",    color: "#38bdf8", dashed: false },
  
  // Edge → Gateway
  { id: "e4",  from: "cdn",     to: "gateway",   label: "HTTP/2",   color: "#34d399", dashed: false },
  { id: "e5",  from: "waf",     to: "gateway",   label: "Filter",   color: "#34d399", dashed: false },
  { id: "e6",  from: "lb",      to: "gateway",   label: "Route",    color: "#34d399", dashed: false },
  
  // Gateway → Rate Limiter
  { id: "e7",  from: "gateway", to: "limiter",   label: "Check",    color: "#a78bfa", dashed: false },
  
  // Rate Limiter → Redis (atomic operations)
  { id: "e8",  from: "limiter", to: "redis",     label: "INCR·Lua", color: "#f87171", dashed: true  },
  
  // Rate Limiter → Services (allowed traffic)
  { id: "e9",  from: "limiter", to: "user",      label: "Allow",    color: "#60a5fa", dashed: false },
  { id: "e10", from: "limiter", to: "payment",   label: "Allow",    color: "#60a5fa", dashed: false },
  { id: "e11", from: "limiter", to: "notify",    label: "Allow",    color: "#60a5fa", dashed: false },
  { id: "e12", from: "limiter", to: "analytics", label: "Event",    color: "#2dd4bf", dashed: true  },
  
  // Services → Observability
  { id: "e13", from: "user",    to: "prometheus",label: "Metrics",  color: "#fb923c", dashed: true  },
  { id: "e14", from: "payment", to: "prometheus",label: "",         color: "#fb923c", dashed: true  },
  { id: "e15", from: "limiter", to: "prometheus",label: "Metrics",  color: "#fb923c", dashed: true  },
  { id: "e16", from: "prometheus",to: "grafana", label: "Query",    color: "#fb923c", dashed: true  },
  { id: "e17", from: "limiter", to: "tracing",   label: "Spans",    color: "#fb923c", dashed: true  },
  
  // Rejected path (429 response - highlighted in red)
  { id: "e18r", from: "waf",    to: "web",       label: "429",      color: "#ef4444", dashed: true, rejected: true },
  { id: "e19r", from: "gateway",to: "mobile",    label: "429",      color: "#ef4444", dashed: true, rejected: true },
];

const LATENCIES = { 
  e1: "12ms", e2: "11ms", e3: "13ms", e4: "5ms", e5: "4ms", e6: "6ms",
  e7: "3ms", e8: "1ms", e9: "7ms", e10: "9ms", e11: "8ms", e12: "15ms",
  e13: "10ms", e14: "11ms", e15: "9ms", e16: "5ms", e17: "12ms"
};

// Technical walkthrough phases definition
const PHASES = [
  {
    id: "edge",
    title: "01. Edge Security & Scrubbing",
    subtitle: "DDoS Mitigation & Geo-Blocking at the Network Edge",
    activeNodes: ["web", "mobile", "api3p", "cdn", "waf", "lb"],
    activeEdges: ["e1", "e2", "e3", "e18r"],
    kpis: [
      { label: "EDGE LATENCY", value: "< 1.5ms", color: "#34d399" },
      { label: "DDoS CAPACITY", value: "10 Tbps", color: "#38bdf8" },
      { label: "MITIGATION RATE", value: "99.99%", color: "#ef4444" }
    ],
    description: "Traffic enters from client apps. Cloudflare CDN serves cached static resources. Concurrently, the WAF monitors reputation logs. Malicious payloads or volumetric flood packets are directly filtered and blackholed at the edge, returning a 429 Too Many Requests response before ever reaching the interior infrastructure.",
    code: `// WAF Configuration snippet
ruleset "Edge-Rate-Limiter" {
  rule "DDoS-Filter" {
    match request_burst_1s > 200
    match reputation_score < 35
    action respond_429("Rate limit exceeded")
  }
}`
  },
  {
    id: "gateway",
    title: "02. API Gateway Dispatch",
    subtitle: "SSL Termination, Authentication & JWT Decoding",
    activeNodes: ["web", "mobile", "api3p", "cdn", "waf", "lb", "gateway"],
    activeEdges: ["e1", "e2", "e3", "e4", "e5", "e6", "e19r"],
    kpis: [
      { label: "AUTH LATENCY", value: "~ 3.2ms", color: "#a78bfa" },
      { label: "SSL OFFLOAD", value: "Hardware", color: "#60a5fa" },
      { label: "GATEWAY REQS", value: "140k/sec", color: "#2dd4bf" }
    ],
    description: "Load Balancers distribute clean HTTPS traffic to the API Gateway. The Gateway terminates SSL, decodes incoming JWT access tokens, and extracts key identifiers (User ID, API Key, or Client IP address). These identifiers are then formatted into unified rate limit keys.",
    code: `# API Gateway Route Definition
routes:
  - path: /api/v1/checkout/*
    methods: [POST]
    filters:
      - OAuth2Authenticator
      - ExtractApiKeyHeader
      - ForwardToRateLimiter`
  },
  {
    id: "limiter",
    title: "03. Central Rate Limiter & Redis",
    subtitle: "Distributed Token Bucket Check with O(1) Cache Lookup",
    activeNodes: ["gateway", "limiter", "redis"],
    activeEdges: ["e7", "e8"],
    kpis: [
      { label: "CACHE LOOKUP", value: "O(1) Redis", color: "#f87171" },
      { label: "LUA EXECUTION", value: "< 0.6ms", color: "#fb923c" },
      { label: "CONSISTENCY", value: "Atomic", color: "#fbbf24" }
    ],
    description: "The Rate Limiter evaluates the client's key. It queries the distributed Redis cluster running sharded token buckets. To prevent race conditions (Read-Modify-Write anomalies), the rate limit validation is executed inside an atomic Lua script directly in Redis memory.",
    code: `-- Atomic Token Bucket script in Lua
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local now = tonumber(ARGV[2])
local current = redis.call('get', key)
if current and tonumber(current) >= limit then
  return 0 -- Rejected
else
  redis.call('INCR', key)
  return 1 -- Allowed
end`
  },
  {
    id: "services",
    title: "04. Downstream Microservices",
    subtitle: "Request Dispatching, Quota Headers & Event Streaming",
    activeNodes: ["limiter", "user", "payment", "notify", "analytics"],
    activeEdges: ["e9", "e10", "e11", "e12"],
    kpis: [
      { label: "HTTP STATE", value: "200 OK", color: "#22c55e" },
      { label: "DISPATCH TIME", value: "< 8.5ms", color: "#818cf8" },
      { label: "LOG BACKPLANE", value: "ClickHouse", color: "#2dd4bf" }
    ],
    description: "If rate limiting permits, the API Gateway forwards the request to the target microservice (e.g. Payments). Standard headers (X-RateLimit-Remaining) are injected into the response. An access log event is asynchronously pushed to the analytics queue for reporting.",
    code: `// HTTP Response Headers (Approved request)
HTTP/2 200 OK
Content-Type: application/json
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1716200250`
  },
  {
    id: "observability",
    title: "05. Observability & Telemetry",
    subtitle: "Scraping Metrics, Live Dashboards & Jaeger Tracing",
    activeNodes: ["limiter", "user", "prometheus", "grafana", "tracing"],
    activeEdges: ["e13", "e14", "e15", "e16", "e17"],
    kpis: [
      { label: "SCRAPE TIME", value: "10s interval", color: "#fb923c" },
      { label: "ALERTS DELAY", value: "< 5.0s", color: "#ef4444" },
      { label: "TRACE SPANS", value: "100% Sample", color: "#fb923c" }
    ],
    description: "Prometheus scrapes telemetry metrics from core microservices and the rate limiter. Grafana plots graphs of requests per second, 429 errors, and database latency. Jaeger traces request spans across services, helping developers find latencies and lock bottlenecks.",
    code: `# Prometheus Query: Rejected rate
rate(rate_limiter_rejected_requests_total[1m])

# Trace tag metadata
jaeger.span.tag("rate_limit.rule", "Tier-Gold")
jaeger.span.tag("rate_limit.remaining", "412")`
  },
  {
    id: "all",
    title: "Complete System Topology",
    subtitle: "End-to-End Visual Infrastructure View",
    activeNodes: NODES.map(n => n.id),
    activeEdges: EDGES.map(e => e.id),
    kpis: [
      { label: "TOTAL NODES", value: "15 Online", color: "#38bdf8" },
      { label: "TOTAL PATHS", value: "19 Configured", color: "#fbbf24" },
      { label: "SYSTEM STATUS", value: "OPERATIONAL", color: "#22c55e" }
    ],
    description: "All layers working together in a unified cluster. Hover over any active node to inspect real-time metrics (CPU, RAM, RPS), or track data packets as they travel from web/mobile clients, get evaluated at the rate limiter, and reach target services.",
    code: `// Distributed Rate Limiter System Architecture
// High Availability Setup:
// - Multi-AZ API Gateways
// - Redis Cluster with Replication (3 Primary, 3 Replica)
// - Sharded Clickhouse log database`
  }
];

// Hook for simulating live node metrics
function useNodeMetrics(nodeId) {
  const [metrics, setMetrics] = useState(() => ({
    cpu: Math.floor(Math.random() * 35 + 15),
    ram: Math.floor(Math.random() * 40 + 25),
    rps: Math.floor(Math.random() * 1200 + 200),
    status: "healthy",
  }));
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(m => ({
        cpu: Math.max(8, Math.min(94, m.cpu + (Math.random() * 12 - 6))),
        ram: Math.max(15, Math.min(88, m.ram + (Math.random() * 8 - 4))),
        rps: Math.max(100, Math.min(2500, m.rps + (Math.random() * 250 - 125))),
        status: m.cpu > 85 ? "warning" : "healthy",
      }));
    }, 2200 + Math.random() * 800);
    
    return () => clearInterval(interval);
  }, [nodeId]);
  
  return metrics;
}

// Mini sparkline component for visualizing metric trends
const MiniSparkline = memo(function MiniSparkline({ color }) {
  const [points, setPoints] = useState(() =>
    Array.from({ length: 14 }, () => Math.random() * 26 + 6)
  );
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(p => [...p.slice(1), Math.random() * 26 + 6]);
    }, 1400);
    return () => clearInterval(interval);
  }, []);
  
  const w = 80, h = 38;
  const path = points.map((v, i) => `${(i / (points.length - 1)) * w},${h - v}`).join(" ");
  
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <polyline 
        points={path} 
        fill="none" 
        stroke={color} 
        strokeWidth="1.6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        opacity="0.75" 
      />
      <polyline 
        points={`0,${h} ${path} ${w},${h}`} 
        fill={color} 
        fillOpacity="0.1" 
        stroke="none" 
      />
    </svg>
  );
});

// Individual node card component (with support for dimming)
const NodeCard = memo(function NodeCard({ node, isHovered, onEnter, onLeave, isDimmed }) {
  const metrics = useNodeMetrics(node.id);
  const { Icon } = node;
  const glow = isHovered && !isDimmed;
  
  return (
    <div
      onMouseEnter={isDimmed ? undefined : onEnter}
      onMouseLeave={isDimmed ? undefined : onLeave}
      style={{
        position: "absolute",
        left: `${node.x}%`,
        top: `${node.y}%`,
        zIndex: 20,
        cursor: isDimmed ? "default" : "pointer",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        filter: glow 
          ? `drop-shadow(0 0 14px ${node.color}95)` 
          : isDimmed
            ? "grayscale(50%) blur(0.5px)"
            : "drop-shadow(0 2px 9px rgba(0,0,0,0.55))",
        opacity: isDimmed ? 0.12 : 1,
        pointerEvents: isDimmed ? "none" : "auto",
        transform: `translate(-50%, -50%) scale(${isDimmed ? 0.88 : 1})`,
      }}
    >
      {/* Main card with glassmorphism */}
      <div className="bg-slate-950/94 border border-white/8 rounded-[11px] p-[9px_13px] min-w-[125px] transition-all duration-[280ms] backdrop-blur-[14px]">
        {/* Header with icon, title, status */}
        <div className="flex items-center gap-[9px] mb-[7px]">
          <div 
            className="w-[30px] h-[30px] rounded-[7px] flex items-center justify-center flex-shrink-0 border"
            style={{
              background: `${node.color}1a`,
              borderColor: `${node.color}45`,
              color: node.color,
            }}
          >
            <Icon size={15} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-[10.5px] font-bold tracking-wider leading-[1.25]">
              {node.label}
            </div>
            <div className="text-white/38 text-[7.5px] mt-[1.5px] tracking-wide truncate">
              {node.sub}
            </div>
          </div>
        </div>

        {/* Live metric values */}
        <div className="flex border-t border-b border-white/5 py-[5px] mb-[6px] gap-1">
          <MetricPill label="CPU" value={`${Math.round(metrics.cpu)}%`} color={metrics.cpu > 78 ? "#ef4444" : "#e2e8f0"} />
          <MetricPill label="MEM" value={`${Math.round(metrics.ram)}%`} color={metrics.ram > 75 ? "#f59e0b" : "#e2e8f0"} />
          <MetricPill label="RPS" value={metrics.rps > 999 ? `${(metrics.rps/1000).toFixed(1)}k` : Math.round(metrics.rps)} color={node.color} />
        </div>

        {/* Sparkline track */}
        <div className="mt-[7px]">
          <MiniSparkline color={node.color} />
        </div>
      </div>
    </div>
  );
});

// Metric pill sub-component
function MetricPill({ label, value, color }) {
  return (
    <div className="flex-1 text-center font-mono">
      <div className="text-white/32 text-[7.5px] tracking-[0.09em]">
        {label}
      </div>
      <div 
        className="text-[9.5px] font-bold mt-[2px] transition-colors duration-[600ms]"
        style={{ color }}
      >
        {value}
      </div>
    </div>
  );
}

// Algorithm strategy module card (with support for dimming)
const AlgorithmModule = memo(function AlgorithmModule({ algo, baseNode, isActive, isDimmed }) {
  return (
    <div 
      className="absolute z-25 transition-all duration-[500ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{
        left: `calc(${baseNode.x}% + ${algo.offsetX}%)`,
        top: `calc(${baseNode.y}% + ${algo.offsetY}%)`,
        transform: "translate(-50%, -50%)",
        cursor: isDimmed ? "default" : "pointer",
        opacity: isDimmed ? 0.08 : isActive ? 1 : 0.7,
        pointerEvents: isDimmed ? "none" : "auto",
      }}
    >
      <div 
        className="border rounded-lg p-[6px_11px] min-w-[100px] backdrop-blur-[10px] transition-transform duration-[500ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          background: `linear-gradient(135deg, ${algo.color}16, ${algo.color}08)`,
          borderColor: `${algo.color}50`,
          transform: isDimmed ? "scale(0.85)" : "scale(1)",
        }}
      >
        <div className="text-white text-[9px] font-bold tracking-wider leading-[1.3]">
          {algo.label}
        </div>
        <div className="text-white/38 text-[7.5px] tracking-widest mt-[2px]">
          {algo.sub}
        </div>
      </div>
    </div>
  );
});

// Simple responsive node card for mobile view
const NodeCardMobile = memo(function NodeCardMobile({ node }) {
  const metrics = useNodeMetrics(node.id);
  const { Icon } = node;
  return (
    <div className="bg-slate-950/94 border border-white/8 rounded-xl p-3 flex items-center justify-between gap-3 backdrop-blur-[14px]">
      <div className="flex items-center gap-3">
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center border"
          style={{
            background: `${node.color}1a`,
            borderColor: `${node.color}45`,
            color: node.color,
          }}
        >
          <Icon size={16} />
        </div>
        <div>
          <div className="text-white text-xs font-bold tracking-wide">
            {node.label}
          </div>
          <div className="text-white/40 text-[9px] mt-0.5">
            {node.sub}
          </div>
        </div>
      </div>
      
      {/* Node Metrics side */}
      <div className="flex gap-3 text-right">
        <div className="flex flex-col items-end">
          <span className="text-white/30 text-[8px]">CPU</span>
          <span className="text-[10px] font-bold" style={{ color: metrics.cpu > 75 ? "#f87171" : node.color }}>
            {Math.round(metrics.cpu)}%
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-white/30 text-[8px]">RPS</span>
          <span className="text-[10px] font-bold" style={{ color: node.color }}>
            {metrics.rps > 999 ? `${(metrics.rps/1000).toFixed(1)}k` : Math.round(metrics.rps)}
          </span>
        </div>
      </div>
    </div>
  );
});

// Main component
export default function RateLimiterSystemDesign({ phase = 5 }) {
  const [hovered, setHovered] = useState(null);
  const [totalReqs, setTotalReqs] = useState(0);
  const [rejectedReqs, setRejectedReqs] = useState(0);
  const [uptime] = useState(() => Date.now() - Math.floor(Math.random() * 7200000));
  const [uptimeStr, setUptimeStr] = useState("");
  const svgRef = useRef(null);
  const [svgRect, setSvgRect] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Phase checking helpers
  const isNodeActive = (nodeId) => {
    return PHASES[phase].activeNodes.includes(nodeId);
  };

  const isEdgeActive = (edgeId) => {
    return PHASES[phase].activeEdges.includes(edgeId);
  };

  // Update SVG dimensions on resize
  useEffect(() => {
    if (!svgRef.current) return;
    const ro = new ResizeObserver(() => {
      if (svgRef.current) setSvgRect(svgRef.current.getBoundingClientRect());
    });
    ro.observe(svgRef.current);
    setSvgRect(svgRef.current.getBoundingClientRect());
    return () => ro.disconnect();
  }, []);

  // Uptime clock ticker
  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - uptime;
      const h = Math.floor(elapsed / 3600000);
      const m = Math.floor((elapsed % 3600000) / 60000);
      const s = Math.floor((elapsed % 60000) / 1000);
      setUptimeStr(`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [uptime]);

  // Simulating lightweight stats updates to keep HUD live
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalReqs(r => r + Math.floor(Math.random() * 45 + 15));
      if (Math.random() < 0.28) {
        setRejectedReqs(rj => rj + Math.floor(Math.random() * 8 + 1));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getNodePos = (id) => {
    const n = NODES.find(x => x.id === id);
    return n ? { x: n.x, y: n.y } : { x: 0, y: 0 };
  };

  const rejectionRate = totalReqs > 0 ? ((rejectedReqs / totalReqs) * 100).toFixed(1) : "0.0";

  if (isMobile) {
    return (
      <div className="w-full flex flex-col gap-6 font-mono text-white select-none">
        {/* Top Mini HUD */}
        <div className="bg-[#090e1a]/90 border border-white/8 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-[pulse-dot_2.3s_ease-in-out_infinite]" />
            <span className="text-orange-500 text-[10px] font-bold tracking-[0.16em]">
              RATE.LIMITER.TOPOLOGY
            </span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="text-right">
              <span className="text-white/30 text-[9px] block">UPTIME</span>
              <span className="text-green-400 font-bold">{uptimeStr}</span>
            </div>
            <div className="text-right">
              <span className="text-white/30 text-[9px] block">REQ/S</span>
              <span className="text-indigo-400 font-bold">{totalReqs.toLocaleString()}</span>
            </div>
            <div className="text-right">
              <span className="text-white/30 text-[9px] block">REJECT</span>
              <span className="text-red-400 font-bold">{rejectionRate}%</span>
            </div>
          </div>
        </div>

        {/* Vertical Pipeline Layout */}
        <div className="flex flex-col items-center gap-4 bg-[#050810]/50 border border-white/[0.04] rounded-2xl p-6 relative">
          <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[linear-gradient(rgba(255,255,255,0.85)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.85)_1px,transparent_1px)] bg-[size:32px_32px] rounded-2xl" />

          {/* Render tiers vertically */}
          {["client", "edge", "gateway", "limiter", "cache", "service", "observe"].map((tier, idx) => {
            const activeNodes = NODES.filter(n => n.tier === tier && isNodeActive(n.id));
            if (activeNodes.length === 0) return null;

            const connectorLabel = 
              tier === "client" ? "HTTPS" :
              tier === "edge" ? "HTTP/2" :
              tier === "gateway" ? "Check" :
              tier === "limiter" ? "Allow" :
              tier === "service" ? "Metrics" : null;

            const connectorColor =
              tier === "client" ? "#38bdf8" :
              tier === "edge" ? "#34d399" :
              tier === "gateway" ? "#a78bfa" :
              tier === "limiter" ? "#60a5fa" :
              tier === "service" ? "#fb923c" : null;

            return (
              <div key={tier} className="w-full flex flex-col items-center gap-3 z-10">
                {/* Connector Arrow before tier (if not client) */}
                {idx > 0 && (
                  <div className="flex flex-col items-center gap-1 my-1">
                    <span className="text-[9px] font-bold tracking-wider" style={{ color: connectorColor || "#555" }}>
                      {connectorLabel}
                    </span>
                    <svg width="12" height="18" fill="none" viewBox="0 0 12 18">
                      <path d="M6 1 L6 17 M2 13 L6 17 L10 13" stroke={connectorColor || "#555"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}

                {/* Tier Label badge */}
                <div className="text-[8px] tracking-[0.15em] text-white/20 uppercase font-bold self-start pl-1">
                  {tier} layer
                </div>

                {/* Tier Nodes */}
                <div className="w-full flex flex-col gap-3">
                  {activeNodes.map(node => (
                    <NodeCardMobile key={node.id} node={node} />
                  ))}
                </div>

                {/* If Rate Limiter (limiter) layer, show floating algorithms and special Redis cache connection inline */}
                {tier === "limiter" && (
                  <>
                    {/* Active algorithms for Phase 2 / Phase 5 */}
                    {(phase === 2 || phase === 5) && (
                      <div className="w-full grid grid-cols-2 gap-2 mt-2">
                        {ALGORITHMS.map(algo => (
                          <div 
                            key={algo.id} 
                            className="border rounded-lg p-2 flex flex-col backdrop-blur-[10px]"
                            style={{
                              background: `linear-gradient(135deg, ${algo.color}16, ${algo.color}08)`,
                              borderColor: `${algo.color}35`,
                            }}
                          >
                            <span className="text-white text-[10px] font-bold">{algo.label}</span>
                            <span className="text-white/40 text-[8px] mt-0.5">{algo.sub}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Check if Redis is active for this phase */}
                    {isNodeActive("redis") && (
                      <div className="w-full flex flex-col items-center gap-2 mt-2">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[9px] text-[#f87171] font-bold tracking-wider">
                            INCR · Lua
                          </span>
                          <svg width="12" height="18" fill="none" viewBox="0 0 12 18">
                            <path d="M6 1 L6 17 M2 13 L6 17 L10 13" stroke="#f87171" strokeDasharray="3 3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="w-full">
                          <div className="text-[8px] tracking-[0.15em] text-white/20 uppercase font-bold self-start pl-1 mb-1">
                            cache layer
                          </div>
                          <NodeCardMobile node={NODES.find(n => n.id === "redis")} />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Phase Metrics & Live Terminal */}
        <div className="flex flex-col gap-4">
          {/* Phase KPIs */}
          <div className="bg-[#090e1a]/90 border border-white/8 rounded-2xl p-4 flex flex-col gap-3">
            <div className="text-white/30 text-[9px] font-bold tracking-widest uppercase">
              Phase Metrics
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {PHASES[phase].kpis.map((kpi, idx) => (
                <div key={idx} className="bg-white/3 border border-white/5 rounded-xl p-3 flex justify-between items-center">
                  <span className="text-white/35 text-[9px] tracking-wide">
                    {kpi.label}
                  </span>
                  <span className="text-[10px] font-bold" style={{ color: kpi.color }}>
                    {kpi.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Console Code Terminal */}
          <div className="bg-[#03060c] border border-white/8 rounded-2xl p-4 flex flex-col min-w-0 overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-white/30 text-[9px] ml-1 tracking-wider">
                  shell_snippet.sh
                </span>
              </div>
              <span className="text-white/22 text-[8px] tracking-wider">
                UTF-8
              </span>
            </div>
            <pre data-lenis-prevent className="text-[10px] leading-relaxed text-[#a5b4fc] overflow-x-auto whitespace-pre pr-1 font-mono">
              {PHASES[phase].code}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-lenis-prevent className="w-full overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0" style={{ WebkitOverflowScrolling: 'touch' }}>
      {/* Outer wrapper: styled entirely in Tailwind CSS */}
      <div className="relative w-[85%] min-w-[900px] h-[810px] bg-gradient-to-br from-[#050810] via-[#0a0e18] to-[#060a11] rounded-[22px] border border-white/[0.06] overflow-hidden font-mono select-none flex flex-col items-center justify-center mx-auto shadow-2xl">
        <style>{`
          @keyframes pulse-dot { 
            0%, 100% { opacity: 1 } 
            50% { opacity: 0.35 } 
          }
          @keyframes scan { 
            0% { transform: translateY(-100%) } 
            100% { transform: translateY(280%) } 
          }
          @keyframes glow-pulse {
            0%, 100% { opacity: 0.05 }
            50% { opacity: 0.08 }
          }
        `}</style>

        {/* Animated grid background using Tailwind classes */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.028] bg-[linear-gradient(rgba(255,255,255,0.85)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.85)_1px,transparent_1px)] bg-[size:42px_42px]" />

        {/* Scanning line effect */}
        <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/18 to-transparent animate-[scan_9s_linear_infinite] pointer-events-none" />

        {/* Ambient glow center */}
        <div className="absolute top-[35%] left-[48%] w-[550px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.045)_0%,transparent_68%)] -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-[glow-pulse_8s_ease-in-out_infinite]" />

        {/* SVG layer for bidirectional edges */}
        <svg 
          ref={svgRef} 
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <defs>
            {/* Forward arrow head */}
            <marker id="arrow-forward" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto">
              <path d="M2 2 L8 5 L2 8" fill="none" stroke="context-stroke" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </marker>
            {/* Backward arrow head */}
            <marker id="arrow-backward" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto">
              <path d="M8 2 L2 5 L8 8" fill="none" stroke="context-stroke" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </marker>
          </defs>

          {/* Draw all edges with bidirectional markers */}
          {EDGES.map(edge => {
            const s = getNodePos(edge.from), t = getNodePos(edge.to);
            const isHov = hovered === edge.from || hovered === edge.to;
            const isEdgeDimmed = !isEdgeActive(edge.id);
            const mx = (s.x + t.x) / 2, my = (s.y + t.y) / 2;
            
            // Perpendicular offset for parallel dual lanes
            const dx = t.x - s.x, dy = t.y - s.y;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            const px = (-dy / len) * 1.3, py = (dx / len) * 1.3;
            const off = edge.rejected ? 1.2 : -1.2;
            
            return (
              <g key={edge.id}>
                <line
                  x1={`${s.x + px * off}%`} 
                  y1={`${s.y + py * off}%`}
                  x2={`${t.x + px * off}%`} 
                  y2={`${t.y + py * off}%`}
                  stroke={isEdgeDimmed ? "rgba(255,255,255,0.015)" : isHov ? edge.color : edge.rejected ? "rgba(239,68,68,0.55)" : edge.color + "c8"}
                  strokeWidth={isEdgeDimmed ? 0.35 : isHov ? 1.6 : 1.1}
                  strokeDasharray={edge.dashed ? "7 6" : "none"}
                  style={{
                    transition: "stroke 0.4s, stroke-width 0.3s",
                    filter: !isEdgeDimmed ? `drop-shadow(0 0 3px ${edge.color}45)` : "none",
                  }}
                  markerEnd={isEdgeDimmed ? "none" : "url(#arrow-forward)"}
                  markerStart={isEdgeDimmed ? "none" : "url(#arrow-backward)"}
                />
                {/* Edge label */}
                {edge.label && !isEdgeDimmed && (
                  <text
                    x={`${mx}%`} 
                    y={`${my}%`}
                    textAnchor="middle" 
                    dominantBaseline="middle"
                    fontSize="8" 
                    fontFamily="monospace" 
                    letterSpacing="0.07em"
                    fill={isHov ? edge.color : "rgba(255,255,255,0.22)"}
                    style={{ transition: "fill 0.32s" }}
                    dy="-8"
                  >
                    {edge.label}
                  </text>
                )}
                {/* Latency label on hover */}
                {isHov && !isEdgeDimmed && LATENCIES[edge.id] && (
                  <text
                    x={`${mx}%`} 
                    y={`${my}%`}
                    textAnchor="middle" 
                    dominantBaseline="middle"
                    fontSize="7.5" 
                    fontFamily="monospace"
                    fill={edge.color} 
                    opacity="0.68" 
                    dy="6"
                  >
                    {LATENCIES[edge.id]}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Node cards */}
        {NODES.map(node => (
          <NodeCard
            key={node.id}
            node={node}
            isHovered={hovered === node.id}
            isDimmed={!isNodeActive(node.id)}
            onEnter={() => setHovered(node.id)}
            onLeave={() => setHovered(null)}
          />
        ))}

        {/* Algorithm strategy modules floating near Rate Limiter */}
        {ALGORITHMS.map(algo => {
          const limiterNode = NODES.find(n => n.id === "limiter");
          const isDim = phase !== 2 && phase !== 5;
          return limiterNode ? (
            <AlgorithmModule 
              key={algo.id} 
              algo={algo} 
              baseNode={limiterNode}
              isActive={!isDim && Math.random() < 0.3} // Random activity simulation
              isDimmed={isDim}
            />
          ) : null;
        })}

        {/* Top-left HUD - Styled in Tailwind CSS */}
        <div className="absolute top-[17px] left-[22px] z-30 pointer-events-none flex flex-col font-mono">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-[pulse-dot_2.3s_ease-in-out_infinite]" />
            <span className="text-orange-500 text-[10px] font-bold tracking-[0.16em]">
              RATE.LIMITER.TOPOLOGY
            </span>
          </div>
          <div className="text-white/24 text-[8px] tracking-[0.11em]">
            STATUS: LIVE &nbsp;·&nbsp; MULTI-REGION &nbsp;·&nbsp; DDOS: ACTIVE
          </div>
        </div>

        {/* Top-right live counters - Styled in Tailwind CSS */}
        <div className="absolute top-[17px] right-[22px] z-30 pointer-events-none flex gap-[18px] items-start font-mono">
          <HudStat label="UPTIME" value={uptimeStr} color="#22c55e" mono />
          <HudStat label="REQ/s" value={totalReqs.toLocaleString()} color="#818cf8" />
          <HudStat label="REJECT" value={`${rejectionRate}%`} color="#ef4444" />
          <HudStat label="AVG LATENCY" value="6.8ms" color="#fbbf24" />
        </div>

        {/* Bottom legend - Styled in Tailwind CSS (shifted up to clear info footer card) */}
        <div className="absolute bottom-[202px] left-[22px] z-30 pointer-events-none flex gap-[18px] items-center">
          <LegendItem color="#60a5fa" label="Allowed flow" dashed={false} />
          <LegendItem color="#ef4444" label="Rejected (429)" dashed={true} />
          <LegendItem color="#fbbf24" label="Event stream" dashed={true} />
          <LegendItem color="#22c55e" label="Healthy" dot />
        </div>

        {/* Bottom-right tier labels - Styled in Tailwind CSS (shifted up to clear info footer card) */}
        <div className="absolute bottom-[202px] right-[22px] z-30 pointer-events-none flex gap-[9px]">
          {["client", "edge", "gateway", "limiter", "cache", "service", "observe"].map(tier => (
            <div key={tier} className="text-[7.5px] tracking-[0.11em] text-white/22 bg-white/[0.045] border border-white/7 rounded px-2 py-0.5 uppercase">
              {tier}
            </div>
          ))}
        </div>

        {/* Special annotations - conditionally rendered by active phase */}
        {[2, 5].includes(phase) && (
          <div className="absolute left-[48%] top-[26%] z-28 text-[7px] tracking-wider text-amber-400 bg-amber-400/8 border border-amber-400/25 rounded px-[7px] py-[2px] pointer-events-none italic transition-opacity duration-300">
            ↻ Token Refill · Burst Handling
          </div>
        )}
        
        {[0, 1, 5].includes(phase) && (
          <div className="absolute left-[32%] top-[52%] z-28 text-[7px] tracking-wider text-red-500 bg-red-500/8 border border-red-500/25 rounded px-[7px] py-[2px] pointer-events-none italic transition-opacity duration-300">
            429 Too Many Requests
          </div>
        )}
        
        {[2, 5].includes(phase) && (
          <div className="absolute left-[48%] top-[78%] z-28 text-[6.5px] tracking-wider text-white/32 pointer-events-none italic transition-opacity duration-300">
            Atomic INCR · TTL Expiry · Lua Scripts · O(1) Lookup
          </div>
        )}

        {/* Bottom Details Dashboard Panel - Styled in Tailwind CSS */}
        <div className="absolute bottom-[18px] left-[22px] right-[22px] h-[170px] bg-[#090d17]/88 border border-white/8 rounded-2xl p-4 px-5 backdrop-blur-[20px] flex gap-5 items-stretch shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-35 font-mono">
          {/* Left Column: Description & Slide Metadata */}
          <div className="flex-[1_1_42%] flex flex-col justify-between min-w-0">
            <div>
              <div className="flex items-center gap-[10px]">
                <span className="text-orange-500 text-[10px] font-bold bg-orange-500/12 border border-orange-500/25 px-[7px] py-[2px] rounded uppercase">
                  {PHASES[phase].id === "all" ? "System" : `Phase 0${phase + 1}`}
                </span>
                <span className="text-white text-[12.5px] font-bold tracking-wide">
                  {PHASES[phase].title}
                </span>
              </div>
              <div className="text-white/38 text-[9.5px] tracking-wide mt-1 font-semibold">
                {PHASES[phase].subtitle}
              </div>
              <p className="text-white/58 text-[9.5px] leading-relaxed mt-2.5 tracking-wide line-clamp-3">
                {PHASES[phase].description}
              </p>
            </div>
            
            <div className="text-[9px] text-white/30 tracking-wider">
              * Navigate slides above to transition system topology
            </div>
          </div>
          
          {/* Middle Column: Phase-specific KPIs - Styled in Tailwind CSS */}
          <div className="flex-[1_1_24%] border-l border-r border-white/6 px-[18px] flex flex-col justify-between">
            <div className="text-white/30 text-[8.5px] font-bold tracking-widest uppercase mb-1">
              Phase Metrics
            </div>
            <div className="flex flex-col gap-2 flex-1 justify-center">
              {PHASES[phase].kpis.map((kpi, idx) => (
                <div key={idx} className="bg-white/3 border border-white/5 rounded-lg p-[6px_10px] flex justify-between items-center">
                  <span className="text-white/35 text-[8px] tracking-wide">
                    {kpi.label}
                  </span>
                  <span className="text-[9.5px] font-bold tracking-wide" style={{ color: kpi.color }}>
                    {kpi.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column: Code Console Terminal - Styled in Tailwind CSS */}
          <div className="flex-[1_1_34%] bg-[#03060c] border border-white/5 rounded-[12px] p-2.5 px-3.5 flex flex-col min-w-0 overflow-hidden">
            {/* Console Header */}
            <div className="flex items-center justify-between border-bottom border-white/5 pb-1.5 mb-1.5 flex-shrink-0">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-white/30 text-[8px] ml-1 tracking-wider">
                  shell_snippet.sh
                </span>
              </div>
              <span className="text-white/22 text-[7px] tracking-wider">
                UTF-8
              </span>
            </div>
            
            {/* Console Content */}
            <pre data-lenis-prevent className="m-0 text-[8px] leading-relaxed text-[#a5b4fc] overflow-y-auto flex-1 whitespace-pre-wrap break-all pr-1 scrollbar-thin">
              {PHASES[phase].code}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// HUD stat component
function HudStat({ label, value, color, mono }) {
  return (
    <div className="text-right font-mono">
      <div className="text-white/27 text-[7.5px] tracking-[0.13em] mb-0.5">
        {label}
      </div>
      <div 
        className="text-[11.5px] font-bold tracking-wide font-variant-numeric-tabular"
        style={{ color, fontSize: mono ? '10.5px' : '11.5px' }}
      >
        {value}
      </div>
    </div>
  );
}

// Legend item component
function LegendItem({ color, label, dashed, dot }) {
  return (
    <div className="flex items-center gap-1.5 font-mono">
      {dot ? (
        <div 
          className="w-1.5 h-1.5 rounded-full"
          style={{ 
            background: color, 
            boxShadow: `0 0 7px ${color}` 
          }} 
        />
      ) : (
        <svg width={22} height={9}>
          <line x1="0" y1="4.5" x2="22" y2="4.5"
            stroke={color} strokeWidth="1.6"
            strokeDasharray={dashed ? "5 4" : "none"}
          />
        </svg>
      )}
      <span className="text-white/32 text-[8px] tracking-wider">
        {label}
      </span>
    </div>
  );
}
