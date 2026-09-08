// Centralized resume data for Experience, Education, and Awards sections

export const experience = [
  {
    id: 1,
    role: "Founder & Full-Stack Developer",
    company: "Athaana — Grocery eCommerce Startup",
    duration: "2022",
    location: "Nalbari, Assam",
    highlights: [
      "Built and deployed a production full-stack grocery eCommerce platform for a local startup in Nalbari, serving real customers end-to-end.",
      "Developed product listings, cart management, user authentication, checkout flow, and a live order tracking system from scratch.",
      "Implemented RESTful backend APIs and structured MongoDB data models to support scalable product catalog and order records.",
      "Designed fully responsive shopping and checkout UIs optimised for both mobile and desktop users.",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
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
    id: 1,
    title: "Codestellation Hackathon First Runner-Up",
    organization: "Assam Engineering College (AEC)",
    year: "2022",
    description:
      "Built a resume builder web application in a competitive hackathon setting — featured template selection, real-time preview, and one-click PDF export.",
  },
];

export const professionalSummary =
  "Results-driven AI/ML Engineer and Full-Stack Developer with expertise in privacy-preserving machine learning, Generative AI, LLM-powered applications, and scalable system design. Holds M.Tech in Computer Science & Engineering from Tezpur University (2026) with hands-on research experience in differentially private synthetic data generation.";
