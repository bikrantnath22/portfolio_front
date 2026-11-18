// Centralized resume data for Experience, Education, and Awards sections

export const experience = [
  {
    id: 3,
    role: "Agentic RAG Development Intern",
    company: "SkillAudit Ai",
    duration: "Sep 2026 – Oct 2026",
    location: "Remote",
    highlights: [
      "Built an Agentic RAG pipeline with LLM-based routing, query decomposition, and self-check with query rewriting and retries.",
      "Ingested PDF, CSV, and TXT files into ChromaDB and improved retrieval with Sentence-Transformers cross-encoder re-ranking.",
      "Shipped a Streamlit app that shows the agent’s decisions live alongside each answer.",
    ],
    tech: ["Python", "Streamlit", "ChromaDB", "Groq (gpt-oss-120b)", "Sentence-Transformers"],
  },
  {
    id: 1,
    role: "Co-Founder & Full-Stack Developer",
    company: "Athaana — Grocery eCommerce Startup",
    duration: "Feb 2022 – Jun 2022",
    location: "Nalbari, Assam",
    highlights: [
      "Built and launched a full-stack grocery eCommerce platform for a local startup in Nalbari, reaching 1000+ real orders before the business closed.",
      "Developed product listings, cart management, user authentication, checkout flow, and an order tracking system from scratch.",
      "Implemented RESTful backend APIs and structured MongoDB data models to support scalable product catalog and order records.",
      "Designed fully responsive shopping and checkout UIs optimised for both mobile and desktop users.",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "CSS"],
  },
  {
    id: 2,
    role: "Software Development Intern",
    company: "Fineworks Media & Solution Technologies",
    duration: "Jan 2022 – Jul 2022",
    location: "Assam",
    highlights: [
      "Built a full-stack hotel booking platform from scratch (React frontend + Node.js/Express backend + MongoDB), reducing manual booking errors through automated availability checks and reservation workflows.",
      "Designed and implemented RESTful APIs for booking management, inventory tracking, and reservation workflows — supporting concurrent room lookups and live status updates.",
      "Integrated a third-party online payment gateway, enabling secure end-to-end transactions with confirmation receipts.",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
  },
];

export const education = [
  {
    id: 1,
    degree: "M.Tech — Computer Science & Engineering",
    institution: "Tezpur University",
    duration: "2024 – 2026",
    location: "Tezpur, Assam",
    cgpa: "7.63 / 10 ",
  },
  {
    id: 2,
    degree: "MCA — Master of Computer Applications",
    institution: "Tripura University",
    duration: "2022 – 2024",
    location: "Agartala, Tripura",
    cgpa: "7.71 / 10",
  },
];

export const awards = [
  {
    id: 3,
    title: "NPTEL Certifications",
    organization: "NPTEL / IIT",
    year: "2023 – 2024",
    badge: "Certified",
    category: "Certification",
    description:
      "Completed certifications in Machine Learning, Cloud Computing, IoT, and Ethical Hacking.",
  },
  {
    id: 2,
    title: "NGIN Seed Funding for VR Learning Project",
    organization: "NGIN",
    year: "2024",
    badge: "Seed Funding",
    category: "Grant",
    description:
      "Received ₹1,00,000 seed funding to develop a VR-based computer-assisted learning intervention for school students.",
  },
  {
    id: 1,
    title: "Codestellation Hackathon: 1st Runner-Up",
    organization: "Assam Engineering College (AEC)",
    year: "2022",
    badge: "1st Runner-Up",
    category: "Hackathon",
    description:
      "Built a resume builder with live template selection and real-time previews, securing top-2 finish among 50+ teams.",
  },
];

export const professionalSummary =
  "AI/ML Engineer and Full-Stack Developer with expertise in AI agents, Agentic RAG systems, cloud-native orchestration with Kubernetes and Docker, high-throughput caching with Redis, and relational/vector databases (PostgreSQL, MySQL, ChromaDB). Holds M.Tech in Computer Science & Engineering from Tezpur University (2026) with hands-on research in privacy-preserving generative AI.";
