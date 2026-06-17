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
} from "react-icons/si";
import { FaCode, FaBrain, FaRobot, FaPlug } from "react-icons/fa";

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
    title: "VR Computer Literacy Assessment",
    tagline:
      "A Meta Quest learning and assessment prototype for improving student engagement.",
    description:
      "Designed a VR-based computer literacy learning and assessment system for school students on Meta Quest, supported by a companion mobile and desktop app for progress tracking. Developed assessment modules to deliver quizzes, collect responses, and track per-student performance — 3D VR interface simulated computer hardware interactions. Conducted controlled experiment comparing VR vs. text-based learning groups; VR group demonstrated measurably higher engagement and quiz comprehension scores. Proposed a hybrid pedagogy model combining text-based theory with VR practical simulations.",
    image: "/Vr.gif",
    detailImage: "/Vr.gif",
    role: "VR and full-stack developer",
    year: "2024",
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
    id: 4,
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
    id: 5,
    title: "Animal Rescue Platform",
    tagline:
      "A real-time rescue coordination platform with NGO matching and geolocation alerts.",
    description:
      "Built a full-stack NGO-facing rescue coordination platform with React.js, Node.js (WebSockets), MongoDB, and Cloudinary image uploads. Implemented real-time geolocation-based NGO matching and alert dispatch, reducing manual coordination overhead for rescue case intake. Designed an admin dashboard with case tracking, status analytics, and NGO management — supporting multi-role access.",
    image: "/Animal.png",
    detailImage: "/Animal.png",
    role: "Full-stack developer",
    year: "2024",
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
    id: 6,
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
    id: 7,
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
