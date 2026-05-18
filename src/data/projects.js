export const projects = [
  {
    id: "sre-monitoring",
    title: "SRE Monitoring Platform",
    description:
      "Enterprise observability platform monitoring 100,000+ services with live health tracking, AI-assisted triage, and domain-scoped alert routing.",
    color: "from-violet-500 to-indigo-600",
    accentColor: "#8b5cf6",
    featured: true,
    github: "https://github.com/Arcsystemowner",
    demo: null,
    techStack: ["React.js", "Spring Boot", "Kafka", "Redis", "WebSockets", "PostgreSQL"],
    metrics: [
      "100,000+ services monitored",
      "40% faster incident detection",
      "60% less frontend overhead",
      "Near-zero latency alerts",
    ],
    problem:
      "Large-scale distributed systems generate thousands of health signals per second. Manual triage was slow, noisy, and prone to alert fatigue — engineers were drowning in notifications and missing real incidents.",
    solution:
      "Built a real-time observability platform using Kafka-driven alert pipelines and WebSocket-based dashboards. AI-assisted ticket generation reduced manual triage effort; domain-scoped routing cut unnecessary notifications.",
    architecture:
      "React.js frontend → WebSocket channels → Spring Boot microservices → Kafka alert engine → Redis cache → PostgreSQL for state persistence. Alert routing uses domain scope rules to minimize noise.",
    keyFeatures: [
      "Live service health tracking for 100,000+ monitored endpoints",
      "Kafka-driven alert engine with configurable severity thresholds",
      "Real-time dashboards via persistent WebSocket connections",
      "AI-assisted incident ticket generation reducing triage effort",
      "Domain-scoped alert routing minimizing alert fatigue",
      "AMC (Annual Maintenance Contract) monitoring integration",
      "RBAC access control restricting dashboard visibility by team",
      "Structured logging and distributed request tracing",
    ],
    impact: [
      "40% reduction in incident detection time via Kafka alert pipelines",
      "60% reduction in frontend polling overhead through WebSocket migration",
      "25% improvement in MTTR via structured logging and distributed tracing",
      "Adopted across multiple internal teams at KFin Technologies",
    ],
    role: [
      "Architected the Kafka alert ingestion and routing pipeline from scratch",
      "Implemented persistent WebSocket channels for live streaming dashboards",
      "Designed domain-scoped alert routing logic to reduce notification noise",
      "Integrated AI-assisted ticket generation workflow into incident management",
      "Led RBAC implementation using Spring Security for access control",
    ],
  },
  {
    id: "asset-management",
    title: "Asset Management System",
    description:
      "Complete lifecycle management system governing 15,000+ physical and digital assets with real-time sync, AES-256 encryption, and immutable audit logging.",
    color: "from-emerald-500 to-teal-600",
    accentColor: "#10b981",
    featured: true,
    github: "https://github.com/Arcsystemowner",
    demo: null,
    techStack: ["React.js", "Spring Boot", "PostgreSQL", "Kafka", "WebSockets", "AES-256"],
    metrics: [
      "15,000+ assets managed",
      "AES-256 field encryption",
      "Real-time session sync",
      "Full audit trail compliance",
    ],
    problem:
      "Enterprise assets — servers, licenses, contracts — were tracked across spreadsheets with no real-time visibility, no encryption of sensitive metadata, and no audit trail for compliance reviews.",
    solution:
      "Built a unified lifecycle management platform with WebSocket-driven real-time sync, Kafka for distributed state propagation, AES-256 field-level encryption on sensitive data, and immutable audit logs for every state transition.",
    architecture:
      "React.js + Redux frontend → Spring Boot REST APIs → Kafka event bus for sync → PostgreSQL with immutable audit tables → AES-256 at the field level for contract and asset metadata.",
    keyFeatures: [
      "Full lifecycle management for 15,000+ physical and digital assets",
      "Real-time asset synchronization across active user sessions via WebSockets",
      "Kafka event streaming for distributed sync between monitoring and reporting",
      "AES-256 field-level encryption on sensitive asset and contract metadata",
      "Immutable audit logging capturing every asset state transition",
      "Executive analytics dashboards with utilization rates and AMC renewals",
      "Allocation summaries and lifecycle reporting for compliance teams",
      "RBAC-based access control per asset domain and department",
    ],
    impact: [
      "Governs 15,000+ assets across KFin Technologies enterprise infrastructure",
      "AES-256 encryption securing all sensitive contract and metadata fields",
      "Eliminated manual spreadsheet tracking — full real-time visibility",
      "Immutable audit logs enabling compliance reviews without manual reconstruction",
    ],
    role: [
      "Designed the AES-256 field-level encryption layer for sensitive metadata",
      "Built immutable audit logging capturing every asset state change",
      "Implemented real-time WebSocket sync across concurrent user sessions",
      "Developed Kafka pipelines for distributed state propagation",
      "Built executive analytics dashboards for utilization and AMC tracking",
    ],
  },
  {
    id: "db-activity-monitoring",
    title: "Database Activity Monitoring",
    description:
      "Enterprise security and compliance platform monitoring database activity across multiple instances with high-throughput Kafka ingestion and anomaly detection.",
    color: "from-rose-500 to-pink-600",
    accentColor: "#f43f5e",
    featured: false,
    github: "https://github.com/Arcsystemowner",
    demo: null,
    techStack: ["React.js", "Spring Boot", "Kafka", "WebSockets", "TLS", "PostgreSQL"],
    metrics: [
      "Millions of log events/day",
      "TLS-encrypted pipelines",
      "Rule-based anomaly detection",
      "Live DBA dashboards",
    ],
    problem:
      "Database administrators had no real-time visibility into suspicious query patterns, privilege escalations, or off-hours access attempts. Compliance required full activity logs but the ingestion volume was too high for traditional approaches.",
    solution:
      "Built a high-throughput Kafka ingestion pipeline capable of handling millions of log events, with TLS-encrypted channels, payload signing, and a rule-based anomaly detection engine surfacing threats in real time.",
    architecture:
      "Database agents → TLS-encrypted Kafka topics → Spring Boot processing services → rule engine for anomaly detection → React.js WebSocket dashboards for live DBA visibility → PostgreSQL for audit storage.",
    keyFeatures: [
      "High-throughput Kafka ingestion handling millions of log events efficiently",
      "Live monitoring dashboards for DBAs via WebSocket streaming",
      "TLS-encrypted communication and payload signing on all channels",
      "Rule-based anomaly detection for off-hours access and mass deletions",
      "Privilege escalation attempt detection and alerting",
      "Multi-instance database coverage in a single monitoring plane",
      "Compliance audit storage with full query-level logging",
      "Configurable rule thresholds per database and team",
    ],
    impact: [
      "Real-time detection of suspicious query patterns and privilege escalations",
      "Millions of log events processed daily without throughput degradation",
      "TLS and payload signing securing all sensitive database activity data",
      "Reduced blind spots for DBAs across multiple database instances",
    ],
    role: [
      "Designed and implemented the high-throughput Kafka ingestion pipeline",
      "Built the rule-based anomaly detection engine with configurable thresholds",
      "Implemented TLS-encrypted transport and payload signing",
      "Developed live DBA dashboards with WebSocket-based real-time streaming",
      "Architected multi-instance monitoring coverage in a unified plane",
    ],
  },
  {
    id: "task-tracker",
    title: "Task Tracker & Productivity System",
    description:
      "Centralized productivity platform supporting 50+ team members with real-time task sync, sprint analytics, and workload heatmaps to prevent delivery bottlenecks.",
    color: "from-amber-500 to-orange-600",
    accentColor: "#f59e0b",
    featured: false,
    github: "https://github.com/Arcsystemowner",
    demo: null,
    techStack: ["React.js", "Spring Boot", "WebSockets", "PostgreSQL", "Redux"],
    metrics: [
      "50+ team members",
      "35% faster load times",
      "Sprint analytics built-in",
      "Workload heatmaps",
    ],
    problem:
      "50+ team members across multiple sprints with no unified view of task ownership, workload distribution, or delivery bottlenecks. Managers couldn't identify resource imbalance until it was too late.",
    solution:
      "Built a real-time task management platform with persistent WebSocket sync, server-side pagination, request debouncing, sprint analytics, and workload heatmaps giving managers instant visibility into team health.",
    architecture:
      "React.js + Redux frontend with debounced inputs → Spring Boot REST APIs with server-side pagination → WebSocket channels for task state sync → PostgreSQL for sprint and task persistence.",
    keyFeatures: [
      "Real-time task synchronization via persistent WebSocket channels",
      "Server-side pagination and request debouncing for performance",
      "Sprint analytics with completion metrics and velocity tracking",
      "Workload heatmaps identifying resource imbalance across team members",
      "Workload distribution reports for sprint planning",
      "Support for 50+ concurrent team members",
      "Task assignment, status tracking, and deadline management",
      "Reporting dashboards for delivery bottleneck identification",
    ],
    impact: [
      "35% reduction in dashboard load times via pagination and debouncing",
      "50+ team members onboarded across multiple sprint teams",
      "Workload heatmaps surfacing resource imbalance before delivery risk",
      "Sprint analytics enabling data-driven retrospectives and planning",
    ],
    role: [
      "Built real-time WebSocket synchronization for task state across sessions",
      "Implemented server-side pagination and debouncing for performance",
      "Designed workload heatmap visualizations for manager dashboards",
      "Built sprint analytics engine tracking velocity and completion rates",
      "Developed the task assignment and deadline management workflows",
    ],
  },
];