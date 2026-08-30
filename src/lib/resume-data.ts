export type Entry = {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  location: string;
  bullets: string[];
};

export type SkillGroup = { id: string; label: string; items: string[] };
export type Simple = { id: string; title: string; subtitle: string };

export type Resume = {
  name: string;
  role: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
  summaryTitle: string;
  summary: string;
  experience: Entry[];
  projects: Entry[];
  skills: SkillGroup[];
  certifications: Simple[];
  achievements: Simple[];
  education: Simple[];
  languages: string[];
  accent: string;
};

export const uid = () => Math.random().toString(36).slice(2, 9);

export const defaultResume: Resume = {
  name: "Suresh Shanmugasundaram",
  role: "Senior Software Engineer",
  phone: "+91-7871279617",
  email: "sureshdevoperofficial@gmail.com",
  linkedin: "linkedin.com/in/suresh-shanmugasundaram-7590ab279",
  github: "github.com/sureshdeveloperofficial",
  location: "Coimbatore, Tamil Nadu",
  summaryTitle: "Professional Summary",
  summary:
    "Senior Software Engineer with 2.9 years of experience delivering reliable software solutions across enterprise platforms. Proven ownership of complex features from design through production, with a strong focus on engineering quality, problem solving, performance, security, and measurable business impact.",
  experience: [
    {
      id: uid(),
      title: "Associate Software Developer",
      subtitle: "Webnox Technologies",
      meta: "11/2023 - Present",
      location: "Coimbatore, India",
      bullets: [
        "Owned end-to-end delivery from requirements and technical design through implementation, deployment, optimization, and production support.",
        "Engineered modular APIs and microservice-oriented systems using Golang, NestJS, Node.js, and TypeScript with modular architecture, validation, authentication, and RBAC.",
        "Built React and Next.js applications using Zustand and TanStack Query, optimizing rendering, caching, and data-fetching patterns for responsive applications.",
        "Drove modular microservice and API design across core business workflows, improving service boundaries, maintainability, and independent feature delivery.",
        "Resolved complex production issues across APIs, databases, integrations, and background workflows, strengthening system reliability and reducing recurring operational conflicts.",
        "Implemented background jobs, schedulers, outbox, webhook pipelines, database indexing, Redis caching, and event-driven workflows to improve throughput and reliability.",
      ],
    },
  ],
  projects: [
    {
      id: uid(),
      title: "Marksorting",
      subtitle: "Industrial IoT & Field Service Management",
      meta: "",
      location: "",
      bullets: [
        "Delivered a field-service platform across web and mobile with Next.js 16, React 19, TypeScript, NestJS 11, PostgreSQL, Prisma, Redis, BullMQ, AWS S3, Socket.IO, Firebase FCM, and Flutter.",
        "Implemented 69-permission RBAC across 5 roles for diagnostics, technician assignment, service reports, installations, expenses, digital signatures, certificates, dispatch, and notifications.",
        "Accelerated high-volume processing through Redis/BullMQ jobs, indexed queries, asynchronous execution, and event-driven workflows, removing bottlenecks from service workflows.",
        "Enabled asset tracking, technician workflows, document management, customer communication, and real-time operational updates across web and mobile clients.",
      ],
    },
    {
      id: uid(),
      title: "ERP",
      subtitle: "Enterprise Resource Planning - Microservices",
      meta: "",
      location: "",
      bullets: [
        "Architected an enterprise ERP solution with Golang, NestJS, Node.js, TypeScript, PostgreSQL, Redis, Docker, and REST APIs using modular service boundaries.",
        "Standardized validation, error handling, logging, health checks, configuration, and inter-service communication to minimize integration conflicts and simplify support.",
        "Tuned PostgreSQL indexes, query execution, Redis caching, transactions, and asynchronous jobs to accommodate increasing operational workloads.",
        "Secured core workflows with JWT/RBAC, containerized deployment, Linux/Nginx administration, and controlled API access for dependable business operations.",
      ],
    },
    {
      id: uid(),
      title: "SkyNet Plugin",
      subtitle: "Shopify + WooCommerce Shipping & Logistics",
      meta: "",
      location: "",
      bullets: [
        "Engineered a unified Shopify and WooCommerce logistics solution connecting SkyNet courier APIs for live rates, PUDO selection, booking, fulfillment, tracking, customs, and waybill generation.",
        "Applied .NET 9, ASP.NET Core, Clean Architecture, CQRS/MediatR, EF Core, PostgreSQL, PHP, WordPress, REST APIs, webhooks, and background workers across merchant journeys.",
        "Streamlined shipment execution with asynchronous webhook handling, bulk waybill creation, tracking synchronization, caching, and automated documents, lowering manual effort and processing delays.",
        "Hardened tenant access through JWT authorization, encrypted credentials, HMAC verification, OAuth onboarding, and remediation of 8 high-severity security findings.",
      ],
    },
    {
      id: uid(),
      title: "Onetouch",
      subtitle: "Enterprise Facility Management & Food Catering ERP",
      meta: "",
      location: "",
      bullets: [
        "Shaped a multi-tenant enterprise platform spanning 40+ modules for jobs, service requests, quotations, contracts, inventory, maintenance, catering, orders, attendance, and leave.",
        "Developed React 18 + Vite + Material UI dashboards and Node.js + Express APIs with TanStack Query, Knex.js, MySQL, JWT authentication, and tenant/company isolation.",
        "Reduced backend response time by approximately 75% on Onetouch workloads through bulk wherein batching, Promise.all, query tuning, and MySQL keep-alive pooling.",
        "Introduced dynamic mobile catalogs, ACID transactions, Puppeteer PDF generation, and Flutter integration to reduce operational friction and support broader business adoption.",
      ],
    },
    {
      id: uid(),
      title: "Driving School",
      subtitle: "Multi-platform Service Solution",
      meta: "",
      location: "",
      bullets: [
        "Built role-based Admin, Instructor, and Student workflows covering course management, scheduling, sessions, and operational administration.",
        "Enforced RBAC and API access controls for clear responsibility boundaries, consistent permissions, and fewer workflow conflicts across user groups.",
        "Connected Firebase Cloud Messaging, automated Puppeteer documents, and secure AWS S3 storage for timely communication and controlled document handling.",
        "Managed production rollout, issue resolution, and end-to-end feature delivery for expanding course, scheduling, and user-management workflows.",
      ],
    },
    {
      id: uid(),
      title: "TalkPay",
      subtitle: "Advertisement & Payment Platform",
      meta: "",
      location: "",
      bullets: [
        "Created advertisement workflows for business clients with country, capital, and city targeting, campaign operations, and API-driven administration.",
        "Introduced configurable packages covering duration, views, limits, subscriptions, and approvals, giving business teams flexible campaign models.",
        "Structured admin and business dashboards for advertisement CRUD, package management, campaign visibility, and location-based operations, reducing manual administration.",
        "Connected rewards, advertising, and payment workflows through API-driven services to support new revenue models, package expansion, and platform growth.",
      ],
    },
  ],
  skills: [
    { id: uid(), label: "Programming Languages", items: ["Golang", "TypeScript", "JavaScript", "Python", "SQL"] },
    { id: uid(), label: "Backend & APIs", items: ["Node.js", "NestJS", "Express.js", "REST APIs", "Microservices", "FastAPI"] },
    { id: uid(), label: "Frontend", items: ["React.js", "Next.js", "HTML5", "CSS3", "Material UI", "Tailwind CSS"] },
    { id: uid(), label: "Databases & Caching", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "Knex.js"] },
    { id: uid(), label: "Architecture & Security", items: ["Clean Architecture", "CQRS", "DDD", "JWT", "OAuth 2.0", "RBAC", "Multi-Tenancy"] },
    { id: uid(), label: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes", "Nginx", "GitHub Actions", "Linux"] },
    { id: uid(), label: "Testing", items: ["Jest", "Supertest", "xUnit", "API Testing"] },
    { id: uid(), label: "AI & Developer Tools", items: ["LLM APIs", "RAG", "Cursor", "Claude", "Antigravity"] },
  ],
  certifications: [
    { id: uid(), title: "Python for AI and Machine Learning", subtitle: "Udemy" },
    { id: uid(), title: "Software Engineer Certification", subtitle: "HackerRank" },
    { id: uid(), title: "Next.js Crash Course", subtitle: "Udemy" },
    { id: uid(), title: "Generative AI Foundational Certificate Course", subtitle: "Udemy" },
    { id: uid(), title: "MERN Advanced Development", subtitle: "Skillsoft" },
    { id: uid(), title: "Mastering LLM Evaluation Build Reliable Scalable AI Systems", subtitle: "Udemy" },
    { id: uid(), title: "Resilience Patterns in Microservice Architecture Hands-On", subtitle: "Udemy" },
  ],
  achievements: [
    {
      id: uid(),
      title: "Product Engineering",
      subtitle:
        "Built and released background-remover-model, a production-ready FastAPI AI service for CPU-optimized image and video background removal. PyPI | GitHub",
    },
    {
      id: uid(),
      title: "Open Source",
      subtitle:
        "Built and released Suresh SVG Converter v0.2.0 with parallel image-to-SVG vectorization, achieving ~5-second conversion performance. Try SVG Converter",
    },
    {
      id: uid(),
      title: "Open-Source Package",
      subtitle:
        "Developed and published a TypeScript Node.js starter package with 634 NPM downloads, featuring Express, Prisma, PostgreSQL, JWT, Redis, and security features. suresh-node-ts-starter",
    },
  ],
  education: [
    {
      id: uid(),
      title: "B.Sc. Computer Science",
      subtitle: "Sri Jayendra Saraswathy Maha Vidyalaya College of Arts and Science · 2020 - 2023 · CGPA 8.1 / 10.0",
    },
  ],
  languages: ["English", "Tamil", "Kannada"],
  accent: "#2e3a59",
};
