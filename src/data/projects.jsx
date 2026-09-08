import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiUnity,
  SiPytorch,
  SiShopify,
  SiFirebase,
  SiPython,
  SiNumpy,
  SiPandas,
  SiMysql,
  SiDocker,
  SiFastapi,
  SiScikitlearn,
  SiStreamlit,
  SiGooglecloud,
} from "react-icons/si";
import { FaCode, FaBrain, FaRobot, FaPlug, FaDatabase, FaShieldAlt } from "react-icons/fa";
 
export const projects = [
  {
    id: 1,
    title: "DP-CTGAN with Rare Minority Sampling",
    tagline:
      "Privacy-preserving synthetic data generation using differentially private CTGAN pipelines.",
    description:
      "Designed and implemented a Differentially Private CTGAN pipeline using PyTorch and Opacus, evaluated across multiple privacy budget configurations on four real-world datasets with formal (ε, δ)-DP guarantees tracked via the Rényi Differential Privacy accountant. Integrated StableNVP normalizing flow scoring and gradient refinement to improve sample fidelity. Benchmarked against PATE-GAN (SynCity) and DP-CGAN (dp-cgans) — DP-CTGAN combined consistently outperformed both on AUC and distributional fidelity (KS). Implemented MIA privacy auditing with KNN-MIA and LR-MIA; confirmed attack scores near 0.50 across all configurations. Tuned hyperparameters with Optuna using a three-stage search.",
    image: "/dpctgan.png",
    detailImage: "/dpctgan.png",
    role: "ML Researcher",
    year: "2025–2026",
    highlights: [
      "Built a differentially private CTGAN pipeline with formal (ε, δ)-DP guarantees using PyTorch and Opacus.",
      "Outperformed PATE-GAN and DP-CGAN baselines on AUC and distributional fidelity across 4 datasets.",
      "Validated privacy with MIA auditing (KNN-MIA, LR-MIA) — attack scores near 0.50 across all configs.",
      "Used Optuna for 3-stage hyperparameter search with sealed holdout to prevent evaluation leakage.",
    ],
    stack: [
      { name: "PyTorch", icon: <SiPytorch className="text-orange-500" /> },
      { name: "Python", icon: <SiPython className="text-blue-400" /> },
      { name: "NumPy", icon: <SiNumpy className="text-blue-300" /> },
      { name: "Pandas", icon: <SiPandas className="text-purple-400" /> },
    ],
    github: "https://github.com/bikrantnath22/dp-ctgan",
  },
  {
    id: 2,
    title: "Athaana — eCommerce (Startup Nalbari, Assam based)",
    tagline:
      "A full-stack grocery ordering platform with checkout, order tracking, and admin-ready data flows.",
    description:
      "Developed a production full-stack grocery eCommerce platform for a local startup — product listings, cart, order management, and live order tracking. Implemented user authentication, checkout flow, and order tracking system serving real customers in Nalbari.",
    image: "/AthaanaPC.gif",
    detailImage: "/athaana.gif",
    role: "Full-stack developer",
    year: "2022",
    highlights: [
      "Designed responsive shopping and checkout flows for mobile and desktop users.",
      "Implemented backend APIs for products, carts, authentication, and order tracking.",
      "Structured the MongoDB data model to support scalable catalog and order records.",
    ],
    stack: [
      { name: "React", icon: <SiReact className="text-blue-400" /> },
      { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-400" /> },
    ],
    github: "https://github.com/bikrantnath22/AthaanaProdMain",
  },
  {
    id: 3,
    title: "AI Research & Fact-Verification Agent",
    tagline:
      "A multi-agent LangGraph system that plans, retrieves, synthesizes, and verifies answers for hallucination risk.",
    description:
      "Built a multi-agent AI research system with LangGraph that decomposes queries into sub-questions, retrieves from a Qdrant vector DB and live Tavily web search, synthesizes answers with inline source citations, and runs a four-signal hallucination verifier (Semantic Entropy + Ensemble Disagreement + Faithfulness). High-risk answers automatically trigger a re-retrieval loop with a refined query. Deployed via FastAPI with Dockerized MCP microservices.",
    image: "/dpctgan.png",
    detailImage: "/dpctgan.png",
    role: "AI/ML Engineer",
    year: "2026",
    highlights: [
      "Multi-agent pipeline: Planner → Retriever → Synthesizer → Verifier with automatic re-retrieval loop.",
      "Verifier combines Semantic Entropy (50%), Ensemble Disagreement (30%), and Faithfulness (20%) for hallucination risk scoring.",
      "Retrieves from local Qdrant vector DB and live Tavily web search with confidence-based deduplication.",
      "Deployed with FastAPI + Docker Compose using MCP microservices for Qdrant and Tavily integrations.",
    ],
    stack: [
      { name: "Python", icon: <SiPython className="text-blue-400" /> },
      { name: "LangGraph", icon: <FaBrain className="text-green-400" /> },
      { name: "FastAPI", icon: <SiFastapi className="text-teal-400" /> },
      { name: "Docker", icon: <SiDocker className="text-blue-500" /> },
      { name: "AI Agents", icon: <FaRobot className="text-cyan-400" /> },
    ],
    github: "https://github.com/bikrantnath22/AI-Research-Fact-Verification-Agent",
  },
  {
    id: 4,
    title: "RAG Guardrail System",
    tagline:
      "A multi-layered input/output security shield protecting RAG systems from prompt injections and data exfiltration.",
    description:
      "Designed and built a comprehensive security guardrail system for RAG-based AI assistants, defending against prompt injections, jailbreaks, and sensitive data leakage. Implemented a 4-layer input guard (Regex → DeBERTa classifier → Semantic Similarity via MiniLM-L6 → LLM Judge) and a 2-layer output guard (PII Redaction + Sensitivity Leak Check). Includes an interactive glassmorphism dashboard with a real-time toggleable guardrail switch and role-based access control (Guest/Employee/Admin) for testing data boundaries.",
    image: "/dpctgan.png",
    detailImage: "/dpctgan.png",
    role: "AI Security Engineer",
    year: "2026",
    highlights: [
      "4-layer input guard: Regex heuristics → DeBERTa classifier → MiniLM-L6 semantic similarity → LLM Judge fallback.",
      "Role-aware output PII redaction and sensitivity leak verification across public/restricted/confidential data tiers.",
      "Interactive glassmorphism dashboard with real-time guardrail toggle and RBAC simulation.",
      "Stack: FastAPI backend, PyTorch, HuggingFace Transformers, Groq LLM API, Docker.",
    ],
    stack: [
      { name: "Python", icon: <SiPython className="text-blue-400" /> },
      { name: "FastAPI", icon: <SiFastapi className="text-teal-400" /> },
      { name: "PyTorch", icon: <SiPytorch className="text-orange-500" /> },
      { name: "Docker", icon: <SiDocker className="text-blue-500" /> },
      { name: "AI Security", icon: <FaShieldAlt className="text-red-400" /> },
    ],
    github: "https://github.com/bikrantnath22/RAG-Guardrail-System",
  },
  {
    id: 5,
    title: "VALTA Cafe — Online Food Ordering",
    tagline:
      "A full-stack cafe ordering platform with Google auth, Cloudinary images, real-time order tracking, and role-based access.",
    description:
      "Built a production-ready full-stack food ordering platform for VALTA Cafe — React frontend with Zustand state management and a Node.js/Express backend. Features Google OAuth sign-in, role-based access (Customer / Admin / Superadmin), mobile-first cart and checkout flow, COD order placement and status tracking, Cloudinary image hosting, and server-controlled open/closed hours so ordering availability is never dependent on the device clock.",
    image: "/dpctgan.png",
    detailImage: "/dpctgan.png",
    role: "Full-stack developer",
    year: "2026",
    highlights: [
      "Server-controlled open/closed status via computed isOpen boolean — ordering never depends on device clock.",
      "Google OAuth with role-based access: Customer, Admin, and Superadmin with JWT httpOnly cookie sessions.",
      "Zustand cart persisted to localStorage, Cloudinary image hosting for menu items.",
      "Full RESTful API: menu, cart, addresses, orders, settings with mobile-first React UI.",
    ],
    stack: [
      { name: "React", icon: <SiReact className="text-blue-400" /> },
      { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-400" /> },
      { name: "Google Auth", icon: <SiGooglecloud className="text-yellow-400" /> },
    ],
    github: "https://github.com/bikrantnath22/Cafe-res",
  },

  {
    id: 6,
    title: "SQL Bank Fraud Detection System",
    tagline:
      "A pure-SQL bank fraud detection engine with real-time triggers, stored procedures, and risk-weighted flagging.",
    description:
      "Built a comprehensive SQL-based fraud detection system for banking transactions in MySQL 8.x — pure relational intelligence, no external ML frameworks. Features 2000+ seeded transactions with planted fraud scenarios, an AFTER INSERT trigger for real-time per-transaction evaluation, stored procedures for on-demand risk assessment, and a SQL VIEW for dashboard reporting. Detects High Velocity (5+ txns in 2 min), High Value Anomaly (10× account average), and Structuring/Smurfing patterns.",
    image: "/dpctgan.png",
    detailImage: "/dpctgan.png",
    role: "Data Engineer",
    year: "2026",
    highlights: [
      "AFTER INSERT trigger for real-time per-transaction fraud evaluation with configurable risk weight thresholds.",
      "Detects High Velocity, High Value Anomaly, and Structuring (Smurfing) fraud patterns.",
      "Rolling average anomaly detection and LAG() window function velocity queries.",
      "SQL VIEW-based fraud dashboard — 2000+ seeded transactions with planted fraud scenarios.",
    ],
    stack: [
      { name: "MySQL", icon: <SiMysql className="text-blue-500" /> },
      { name: "SQL", icon: <FaDatabase className="text-yellow-400" /> },
    ],
    github: "https://github.com/bikrantnath22/SQL-Fraud-Detection-",
  },

  {
    id: 7,
    title: "Telco Customer Churn Analysis",
    tagline:
      "End-to-end analytics pipeline — EDA, K-Means segmentation, SQL BI, and Random Forest churn prediction (AUC 0.846).",
    description:
      "Performed a full analytical pipeline on the IBM Telco Customer Churn dataset (7,043 customers, 21 features) — from raw data cleaning and EDA to K-Means customer segmentation, financial impact analysis, retention curve modeling, MySQL database creation for BI pipelines, and a predictive churn model. Best-fit model selection landed on Random Forest with AUC = 0.846.",
    image: "/dpctgan.png",
    detailImage: "/dpctgan.png",
    role: "Data Analyst / ML Engineer",
    year: "2026",
    highlights: [
      "Full analytical pipeline: data cleaning → EDA → segmentation → financial impact → retention curves → prediction.",
      "K-Means clustering for customer segmentation with Silhouette Score optimization.",
      "Best-fit churn prediction model: Random Forest with AUC = 0.846.",
      "MySQL database schema for BI pipelines with SQL VIEW-based analytics dashboard.",
    ],
    stack: [
      { name: "Python", icon: <SiPython className="text-blue-400" /> },
      { name: "Pandas", icon: <SiPandas className="text-purple-400" /> },
      { name: "Scikit-learn", icon: <SiScikitlearn className="text-orange-400" /> },
      { name: "MySQL", icon: <SiMysql className="text-blue-500" /> },
      { name: "NumPy", icon: <SiNumpy className="text-blue-300" /> },
    ],
    github: "https://github.com/bikrantnath22/Telco-Customer-Churn",
  },
  {
    id: 8,
    title: "LLM Hallucination Detector",
    tagline:
      "An information-theoretic pipeline using Semantic Entropy and Ensemble Disagreement to flag hallucinating LLMs.",
    description:
      "Designed an end-to-end, locally verifiable hallucination detection pipeline for LLMs using two complementary techniques: Semantic Entropy (clustering generative variance via NLI-based bidirectional entailment, then computing Shannon entropy over cluster distributions) and Ensemble Disagreement (cross-examining factual claims from an 8B vs. 70B model). High entropy or cross-model contradiction signals hallucination risk without requiring external retrieval. Served via FastAPI with HuggingFace Transformers and Groq API.",
    image: "/dpctgan.png",
    detailImage: "/dpctgan.png",
    role: "AI/ML Engineer",
    year: "2026",
    highlights: [
      "Semantic Entropy: N high-temperature samples → NLI-based bidirectional entailment clustering → Shannon entropy hallucination risk.",
      "Ensemble Disagreement: cross-model factual claim comparison between 8B and 70B LLMs via Groq API.",
      "No external RAG needed — interrogates the model's internal consistency for epistemic uncertainty.",
      "FastAPI service with HuggingFace Transformers (DeBERTa NLI), locally verifiable on any dataset.",
    ],
    stack: [
      { name: "Python", icon: <SiPython className="text-blue-400" /> },
      { name: "FastAPI", icon: <SiFastapi className="text-teal-400" /> },
      { name: "PyTorch", icon: <SiPytorch className="text-orange-500" /> },
      { name: "LLM API", icon: <FaBrain className="text-pink-400" /> },
    ],
    github: "https://github.com/bikrantnath22/llm-hallucination-detector",
  },
  {
    id: 9,
    title: "Image Annotation & Quality-Audit Pipeline",
    tagline:
      "An end-to-end data annotation and quality-control workflow with dual-pass auditing and automated reporting.",
    description:
      "Built a structured image annotation and quality-control pipeline following a formal SOP: images are labeled (bounding box + class) in two independent passes, then audited using IoU for bounding box overlap agreement and Cohen's Kappa for label agreement. Outputs a structured quality audit CSV report and visualizations. Designed to simulate real-world annotation quality workflows used in computer vision data pipelines.",
    image: "/dpctgan.png",
    detailImage: "/dpctgan.png",
    role: "ML Data Engineer",
    year: "2025",
    highlights: [
      "Dual-pass annotation: full pass 1 labeling + random 20% audit sample in pass 2.",
      "Quality metrics: IoU (bounding box overlap) and Cohen's Kappa (label agreement) per image.",
      "Automated quality audit CSV report and visualization generation.",
      "SOP-driven workflow simulating production annotation pipelines for computer vision datasets.",
    ],
    stack: [
      { name: "Python", icon: <SiPython className="text-blue-400" /> },
      { name: "NumPy", icon: <SiNumpy className="text-blue-300" /> },
      { name: "Pandas", icon: <SiPandas className="text-purple-400" /> },
      { name: "Scikit-learn", icon: <SiScikitlearn className="text-orange-400" /> },
    ],
    github: "https://github.com/bikrantnath22/Image-Annotation-Quality-Audit-Pipeline",
  },
  {
    id: 10,
    title: "Text Data Quality Checker",
    tagline:
      "A Python pipeline and Streamlit dashboard for auditing real Amazon review data quality before ML use.",
    description:
      "Built a comprehensive text data quality auditing pipeline for real Amazon review data — normalizes raw CSV input into a clean audit format, then checks each review against multiple quality rules: schema validation, language detection, grammar/spelling flags, and content flags (profanity, PII exposure). Outputs a structured CSV report and an interactive Streamlit dashboard for visual quality inspection.",
    image: "/dpctgan.png",
    detailImage: "/dpctgan.png",
    role: "Data Engineer",
    year: "2025",
    highlights: [
      "Multi-rule audit: schema validation, language detection, grammar/spelling flags, and content moderation.",
      "Reads real Amazon Reviews CSV — no synthetic data; errors out cleanly if source file is missing.",
      "Outputs a structured quality audit CSV report and an interactive Streamlit visual dashboard.",
      "Covers PII exposure flags (phone numbers, emails) and profanity detection per review.",
    ],
    stack: [
      { name: "Python", icon: <SiPython className="text-blue-400" /> },
      { name: "Pandas", icon: <SiPandas className="text-purple-400" /> },
      { name: "Streamlit", icon: <SiStreamlit className="text-red-400" /> },
      { name: "NumPy", icon: <SiNumpy className="text-blue-300" /> },
    ],
    github: "https://github.com/bikrantnath22/Text-quality-checker",
  },
  {
    id: 11,
    title: "VR Computer Literacy Assessment",
    tagline:
      "A Meta Quest learning and assessment prototype for improving student engagement.",
    description:
      "Designed a VR-based computer literacy learning and assessment system for school students on Meta Quest, supported by a companion mobile and desktop app for progress tracking. Developed assessment modules to deliver quizzes, collect responses, and track per-student performance — 3D VR interface simulated computer hardware interactions. Conducted controlled experiment comparing VR vs. text-based learning groups; VR group demonstrated measurably higher engagement and quiz comprehension scores. Proposed a hybrid pedagogy model combining text-based theory with VR practical simulations.",
    image: "/Vr.gif",
    detailImage: "/Vr.gif",
    role: "VR and full-stack developer",
    year: "2023-2024",
    highlights: [
      "Built interactive Unity modules for quiz-based learning and practical computer literacy tasks.",
      "Connected learning progress to a companion app for tracking student performance.",
      "Proposed a hybrid model that combines text theory with VR simulations for stronger engagement.",
      "VR group demonstrated measurably higher engagement and comprehension scores in controlled testing.",
    ],
    stack: [
      { name: "Unity", icon: <SiUnity className="text-gray-400" /> },
      { name: "C#", icon: <FaCode className="text-purple-500" /> },
      { name: "React Native", icon: <SiReact className="text-blue-400" /> },
      { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
    ],
  },
  {
    id: 12,
    title: "AI Chat Agent — Human-like Messaging",
    tagline:
      "An AI-powered conversational agent that replicates individual messaging styles using LLMs.",
    description:
      "Built an AI-powered conversational agent that replicates individual messaging styles using LLM-based generation with persistent memory/context handling. Designed the system to learn from prior conversations and adapt tone, vocabulary, and response cadence to match a target user's communication patterns. Implemented real-time message delivery using Node.js + WebSockets, with sub-200ms response latency under normal load.",
    image: "/chatbot.png",
    detailImage: "/chatbot.png",
    role: "AI/ML Developer",
    year: "2025",
    highlights: [
      "Replicates individual messaging styles using LLM-based generation with persistent memory.",
      "Adapts tone, vocabulary, and response cadence from prior conversation patterns.",
      "Sub-200ms response latency using Node.js + WebSockets for real-time delivery.",
    ],
    stack: [
      { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
      { name: "WebSockets", icon: <FaPlug className="text-blue-400" /> },
      { name: "LLM API", icon: <FaBrain className="text-pink-400" /> },
      { name: "AI Agents", icon: <FaRobot className="text-cyan-400" /> },
    ],
  },
  {
    id: 13,
    title: "Animal Rescue Platform",
    tagline:
      "A real-time rescue coordination platform with NGO matching and geolocation alerts.",
    description:
      "Built a full-stack NGO-facing rescue coordination platform with React.js, Node.js (WebSockets), MongoDB, and Cloudinary image uploads. Implemented real-time geolocation-based NGO matching and alert dispatch, reducing manual coordination overhead for rescue case intake. Designed an admin dashboard with case tracking, status analytics, and NGO management — supporting multi-role access.",
    image: "/Animal.png",
    detailImage: "/Animal.png",
    role: "Full-stack developer",
    year: "2024-2025",
    highlights: [
      "Implemented real-time NGO matching and status updates using WebSockets.",
      "Integrated location-based rescue alerts to speed up response coordination.",
      "Created dashboard-oriented flows for case tracking and operational visibility.",
    ],
    stack: [
      { name: "React", icon: <SiReact className="text-blue-400" /> },
      { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
      { name: "WebSockets", icon: <FaPlug className="text-blue-400" /> },
    ],
    github: "https://github.com/bikrantnath22/AnimalMain",
  },
  {
    id: 14,
    title: "Task Management System",
    tagline:
      "A company task platform with role-based access, deadlines, messaging, and attachments.",
    description:
      "Built a project and task management system that lets companies create projects with deadlines, assign managers, manage role-based access, and support employee-to-manager messaging with file attachments. The platform focuses on clear accountability, collaboration, and scalable team workflows.",
    image: "/Task.jpeg",
    detailImage: "/Task.jpeg",
    role: "Full-stack developer",
    year: "2023",
    highlights: [
      "Added role-based access so managers and employees see the correct workflows.",
      "Supported project deadlines, assignment flows, and task progress visibility.",
      "Built messaging with attachment support for smoother internal communication.",
    ],
    stack: [
      { name: "React", icon: <SiReact className="text-blue-400" /> },
      { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
    ],
    github: "https://github.com/bikrantnath22/TAsk_manegment",
  },
  {
    id: 15,
    title: "Vastramaniae — Shopify Clothing Store",
    tagline:
      "A customized Shopify storefront for an online clothing brand with Liquid templates.",
    description:
      "Customized a Shopify storefront for an online clothing brand — implemented Liquid templates for product pages, collections, and UI enhancements. Focused on delivering a polished shopping experience with clean product layouts and brand-consistent styling.",
    image: "/vastramaniae.png",
    detailImage: "/vastramaniae.png",
    role: "Frontend developer",
    year: "2024",
    highlights: [
      "Implemented custom Liquid templates for product pages and collections.",
      "Delivered brand-consistent UI enhancements for an online clothing store.",
      "Optimized storefront layout for a polished shopping experience.",
    ],
    stack: [
      { name: "Shopify", icon: <SiShopify className="text-green-500" /> },
      { name: "JavaScript", icon: <FaCode className="text-yellow-400" /> },
      { name: "CSS", icon: <FaCode className="text-blue-400" /> },
    ],
  },
];
