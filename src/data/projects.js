export const projects = [
  {
    id: 101,
    title: 'Real-Time Application Monitoring System',
    description:
      'Production-grade monitoring platform delivering live service health, SLA analytics, and automated alerting for distributed systems.',
    problem:
      'Critical services lacked immediate detection and escalation which caused SLA breaches and slow incident response for on-call teams.',
    solution:
      'A distributed monitoring platform with lightweight heartbeat collectors, high-throughput ingestion APIs, real-time processing, and a React-based operations dashboard. The system uses streaming and caching to deliver sub-second status updates and integrates with notification providers for automated escalation.',
    architecture:
      'Frontend (React dashboard) ↔ Backend API (Spring Boot) → Stream processor (Kafka) → Time-series store (Postgres/TimescaleDB) + Redis cache; Alerts service integrates with SMS/voice/email providers and a runbook/automation engine for remediation.',
    keyFeatures: [
      'Live status dashboard with WebSocket/SSE streaming',
      'Heartbeat & synthetic checks with configurable SLAs',
      'Alerting & escalation (SMS, voice, email, PagerDuty)',
      'Uptime analytics, SLA reports and historical trends',
      'Auto-remediation hooks and incident annotations',
      'Multi-tenant service grouping and role-based views',
    ],
    techStack: [
      'React',
      'Java',
      'Spring Boot',
      'WebSocket / Server-Sent Events',
      'Kafka',
      'Postgres / TimescaleDB',
      'Redis',
      'Docker',
      'Prometheus / Grafana',
    ],
    impact: [
      'Mean-time-to-detection reduced from ~22 minutes to under 3 minutes (≈86% improvement)',
      'Enabled 24/7 automated escalation — SLA breaches reduced by ~60%',
      'Platform processed 50k+ heartbeats/sec at peak with <200ms UI update latency',
    ],
    role: [
      'Led frontend design and implementation of real-time React dashboard (WebSocket/SSE).',
      'Implemented Spring Boot ingestion APIs, streaming pipeline integration, and alerting service.',
      'Designed data model and Timescale-backed analytics for SLA reporting.',
      'Built CI/CD pipelines and production deployment (Docker, GitHub Actions).',
    ],
    metrics: [
      'Live status tracking',
      'Real-time alerts & escalation',
      'SLA analytics',
    ],
    github: null,
    demo: null,
    featured: true,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 102,
    title: 'Data Export & Reporting System',
    description:
      'High-throughput reporting engine that generates scheduled and on-demand Excel/PDF reports from multi-million row datasets with resumable, parallel processing.',
    problem:
      'Business users required structured, auditable reports from large datasets but existing exports were slow, manual, and prone to failure.',
    solution:
      'Implemented an asynchronous export pipeline using Spring Batch and background workers to chunk, aggregate and stream results. The UI allows template-driven report definitions and scheduling, while the backend uploads large exports to object storage and provides secure download links.',
    architecture:
      'UI (React) → Report API (Spring Boot) → Job queue (RabbitMQ) → Worker pool (Spring Batch) → MySQL source + Redis for job state → Object storage (S3) for large file delivery.',
    keyFeatures: [
      'Dynamic report templates (Excel/PDF) with template variables',
      'Parallelized chunked exports for large tables (resumable)',
      'Scheduled and on-demand exports with email delivery',
      'Server-side streaming for memory-efficient generation',
      'Audit logs, retry policies, and monitoring metrics',
    ],
    techStack: ['React', 'Java', 'Spring Boot', 'Spring Batch', 'MySQL', 'RabbitMQ', 'Redis', 'Apache POI', 'iText', 'Docker'],
    impact: [
      'Reduced report generation time for million-row exports from hours to under 15 minutes through parallel processing',
      'Automated 2,000+ monthly reports — eliminating manual effort and reducing errors by 95%',
      'Delivered secure S3-based downloads with pre-signed URLs, reducing server load by 70% on peak days',
    ],
    role: [
      'Designed the export pipeline and data chunking strategy using Spring Batch.',
      'Implemented backend workers, retry logic, and streaming exporters for Excel/PDF.',
      'Built the React UI for report templates, schedule management, and job tracking.',
      'Added monitoring and health checks to ensure job reliability in production.',
    ],
    metrics: [
      'Dynamic report generation',
      'Large dataset support',
      'Automated scheduling & delivery',
    ],
    github: null,
    demo: null,
    featured: true,
    color: 'from-indigo-500 to-violet-600',
  },
  {
    id: 103,
    title: 'Secure API Communication Layer',
    description:
      'Application-level encryption layer for inter-service APIs providing payload encryption, signing, key rotation, and secure SDKs for clients.',
    problem:
      'Sensitive payloads were at risk despite transport TLS — additional application-level confidentiality, integrity and auditing were required for compliance.',
    solution:
      'Built a request/response encryption middleware and client SDKs. The solution uses asymmetric key exchange to establish symmetric session keys (AES-GCM), HMAC signing, nonce-based replay protection, and automated key rotation via a secure key vault.',
    architecture:
      'Client SDKs (JS/Java) ↔ API Gateway (encryption middleware) ↔ Internal Services (decrypted payloads) + Key Management (Vault) for rotation and audit.',
    keyFeatures: [
      'Payload encryption/decryption with AES-GCM',
      'Asymmetric key exchange & session keys',
      'HMAC signing and replay protection',
      'Key rotation and Vault integration',
      'Performance-optimized with <10% average latency overhead',
    ],
    techStack: ['Java', 'Spring Boot', 'React (admin UI)', 'HashiCorp Vault', 'Redis', 'Docker'],
    impact: [
      'Met compliance requirements for sensitive data handling and reduced exposure risk across internal APIs',
      'Security audit passed with zero critical findings related to data-in-transit',
      'Benchmark overhead <10% for typical request sizes after optimizations',
    ],
    role: [
      'Designed the encryption protocol, implemented middleware and the Java client SDK.',
      'Integrated key management with HashiCorp Vault and automated rotation in CI/CD.',
      'Authored performance tests and hardened error handling for production reliability.',
    ],
    metrics: ['Payload encryption', 'Key rotation', 'Audit logging'],
    github: null,
    demo: null,
    featured: true,
    color: 'from-orange-500 to-rose-600',
  },
  // keep legacy examples for reference (not featured)
  {
    id: 4,
    title: 'Project Planner',
    description:
      'Personal project planning application with drag-and-drop interface, timeline management, and progress tracking.',
    techStack: ['React.js', 'TypeScript', 'Java', 'Spring Boot', 'MongoDB', 'Tailwind CSS'],
    metrics: ['Drag-drop interface', 'Timeline visualization'],
    github: 'https://github.com/Arcsystemowner/project-planner',
    demo: null,
    featured: false,
    color: 'from-pink-500 to-red-600',
  },
];
