export const projects = [
  {
    id: 1,
    title: 'SRE Monitoring Platform',
    description:
      'A real-time Site Reliability Engineering platform that monitors over 100,000 live services across infrastructure. Built to detect anomalies, trigger intelligent alerts, and ensure 99.9% uptime SLAs. Integrated dashboards provide instant observability for on-call engineers.',
    problem: 'Managing reliability for hundreds of services at scale, with zero tolerance for downtime.',
    solution: 'Built a centralized monitoring dashboard with real-time alerting, performance caching, and service health scoring.',
    techStack: ['React.js', 'Node.js', 'WebSockets', 'Redis', 'PostgreSQL', 'Chart.js'],
    metrics: [
      '100,000+ services monitored',
      '99.9% uptime maintained',
      '70% performance improvement',
      'Real-time alert system',
    ],
    github: 'https://github.com/archityadav',
    demo: null,
    featured: true,
    color: 'from-indigo-500 to-violet-600',
  },
  {
    id: 2,
    title: 'SecureShield Browser Extension',
    description:
      'A browser extension that protects users against phishing attempts, malicious scripts, and insecure network requests. Performs real-time validation of page content and outbound requests using a curated threat-intelligence ruleset.',
    problem: 'Rising phishing and man-in-the-middle attacks targeting everyday users.',
    solution: 'Developed a lightweight browser extension that validates requests in real time and blocks malicious domains before they load.',
    techStack: ['JavaScript', 'WebExtensions API', 'Node.js', 'Express.js', 'Security APIs'],
    metrics: [
      'Real-time request validation',
      'Phishing domain detection',
      'Zero false-positive rate',
      'Lightweight (<50 KB)',
    ],
    github: 'https://github.com/archityadav',
    demo: null,
    featured: true,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 3,
    title: 'Full-Stack MERN Dashboard',
    description:
      'A production-grade MERN stack dashboard application featuring JWT-based authentication, role-based access control, fully responsive UI, and complete CRUD operations backed by a RESTful API.',
    problem: 'Need for a reusable, scalable template for internal business dashboards.',
    solution: 'Built a modular, full-stack application with React on the frontend and a secure Express + MongoDB backend.',
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Tailwind CSS'],
    metrics: [
      'JWT authentication',
      'Role-based access control',
      'Full CRUD operations',
      'Responsive design',
    ],
    github: 'https://github.com/archityadav',
    demo: null,
    featured: false,
    color: 'from-orange-500 to-rose-600',
  },
];
