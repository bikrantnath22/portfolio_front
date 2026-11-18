// Grounded offline keyword fallback logic built directly from chatContext.json
// Replaces static hardcoded facts with dynamic context lookups.

import chatContext from "../data/chatContext.json";

export const getBotResponse = (userInput) => {
  if (!userInput || typeof userInput !== "string") {
    return "How can I help you today? Ask me about Bikrant's projects, experience, or education.";
  }

  const input = userInput.toLowerCase().trim();
  const { author, education = [], experience = [], projects = [] } = chatContext;

  // 1. Recruiter Fast-Track Handlers
  if (input.includes("60s") || input.includes("pitch") || input.includes("elevator pitch")) {
    return `**Bikrant Nath — AI/ML & Full-Stack Systems Engineer**\n\n• **Core Specialization:** Production Agentic RAG, LangGraph multi-agent orchestration, and GenAI systems with FastAPI, Redis, and ChromaDB.\n• **Proven Impact:** Built hybrid RAG pipeline achieving 0.82 MRR & sub-50ms cache latency; deployed WooCommerce on Kubernetes with Helm; co-founded eCommerce serving 1000+ real orders.\n• **Education:** M.Tech in CSE (Tezpur University) + MCA (Tripura University).\n• **Availability:** Ready for AI/ML and Full-Stack Engineering roles. Email: bikrantnath4@gmail.com`;
  }

  if (input.includes("architecture & tech") || (input.includes("architecture") && !input.includes("detail"))) {
    return `**System Architecture & Engineering Capabilities:**\n\n• **RAG & Agent Pipelines:** Query decomposition, hybrid search (dense + BM25), Sentence-Transformers cross-encoder reranking, and self-evaluating retry loops in LangGraph.\n• **High-Throughput Backend:** FastAPI async APIs, sub-50ms Redis query caching, Prometheus metrics.\n• **Cloud & DevOps:** Kubernetes (k3s/k3d), Helm packaging, Docker microservices, automated bootstrap jobs.\n• **Frontend:** React, Tailwind CSS, real-time UI/streaming agents.`;
  }

  if (input.includes("benchmark") || input.includes("metrics") || input.includes("numbers")) {
    return `**Key Verified Impact & Benchmarks:**\n\n• **0.82 MRR & 78% Precision@3:** Evaluated across 85 test queries on Agentic RAG pipeline.\n• **<50ms P50 Latency:** Redis caching vs 4.16s cold queries for repeat synthetic corpus queries.\n• **1000+ Real Orders:** Co-founded and deployed Athaana eCommerce startup platform.\n• **₹1 Lakh Grant:** NGIN seed funding awarded for Meta Quest VR learning intervention.\n• **CGPA:** 7.63/10 (M.Tech CSE) & 7.71/10 (MCA).`;
  }

  if (input.includes("resume & contact") || input.includes("download resume") || input.includes("cv")) {
    return `**Bikrant's Resume & Contact Details:**\n\n• **Download Resume (PDF):** /CV-Bikrant_Nath.pdf\n• **Email:** bikrantnath4@gmail.com\n• **LinkedIn:** https://www.linkedin.com/in/bikrant-nath-7747781a7/\n• **GitHub:** https://github.com/bikrantnath22\n• **Location:** Guwahati, India (Open to Relocation & Remote).`;
  }

  // 2. Greetings & Help
  if (
    /^(hi|hello|hey|greetings|help|who are you|what can you do)/i.test(input) ||
    input.includes("what can i ask") ||
    input.includes("example")
  ) {
    return `Hello! I am Bikrant's portfolio assistant. You can ask me about his AI/ML engineering work, full-stack systems, educational background, or contact details. Feel free to try: "Best AI project?", "Full-stack work?", "Education", or "How to contact?".`;
  }

  // 2. Specific Project Queries
  if (input.includes("dp") || input.includes("ctgan") || input.includes("privacy")) {
    const p = projects.find((pr) => pr.id === 1);
    return `${p.title}: ${p.description}\n\nStack: ${p.stack.join(", ")}\nGitHub: ${p.github}`;
  }

  if (input.includes("eval") || input.includes("rag service") || input.includes("agentic rag service")) {
    const p = projects.find((pr) => pr.id === 16);
    return `${p.title}: ${p.description}\n\nMetric: ${p.metric}\nStack: ${p.stack.join(", ")}\nGitHub: ${p.github}`;
  }

  if (input.includes("fact") || input.includes("verification") || input.includes("hallucination risk")) {
    const p = projects.find((pr) => pr.id === 3);
    return `${p.title}: ${p.description}\n\nStack: ${p.stack.join(", ")}\nGitHub: ${p.github}`;
  }

  if (input.includes("urumi") || input.includes("woocommerce") || input.includes("kubernetes") || input.includes("k8s") || input.includes("mcp")) {
    const p = projects.find((pr) => pr.id === 18);
    return `${p.title}: ${p.description}\n\nStack: ${p.stack.join(", ")}${p.github ? `\nGitHub: ${p.github}` : ""}`;
  }

  if (input.includes("athaana") || input.includes("grocery")) {
    const p = projects.find((pr) => pr.id === 2);
    return `${p.title}: ${p.description}\n\nRole: ${p.role}\nStack: ${p.stack.join(", ")}\nGitHub: ${p.github}`;
  }

  if (input.includes("vr") || input.includes("quest") || input.includes("unity") || input.includes("literacy")) {
    const p = projects.find((pr) => pr.id === 11);
    return `${p.title}: ${p.description}\n\nKey Highlight: Received ₹1 lakh seed funding (NGIN, 2024).\nStack: ${p.stack.join(", ")}`;
  }

  if (input.includes("guardrail") || input.includes("security")) {
    const p = projects.find((pr) => pr.id === 4);
    return `${p.title}: ${p.description}\n\nMetric: ${p.metric}\nStack: ${p.stack.join(", ")}\nGitHub: ${p.github}`;
  }

  if (input.includes("hallucination detector") || input.includes("entropy")) {
    const p = projects.find((pr) => pr.id === 8);
    return `${p.title}: ${p.description}\n\nStack: ${p.stack.join(", ")}\nGitHub: ${p.github}`;
  }

  if (input.includes("ecafe") || input.includes("cafe")) {
    const p = projects.find((pr) => pr.id === 5);
    return `${p.title}: ${p.description}\n\nStack: ${p.stack.join(", ")}\nGitHub: ${p.github}`;
  }

  // 3. Best AI Project / General AI Projects
  if (
    input.includes("best ai") ||
    input.includes("ai project") ||
    input.includes("best project") ||
    input.includes("favorite project")
  ) {
    const p1 = projects.find((pr) => pr.id === 1);
    const p16 = projects.find((pr) => pr.id === 16);
    const p3 = projects.find((pr) => pr.id === 3);
    return `Bikrant's standout AI/ML projects include:\n1. ${p1.title} (${p1.github})\n2. ${p16.title} (${p16.github})\n3. ${p3.title} (${p3.github})\nAsk about any of them for technical details!`;
  }

  // 4. Full-stack work
  if (
    input.includes("fullstack") ||
    input.includes("full-stack") ||
    input.includes("full stack") ||
    input.includes("web app")
  ) {
    const p18 = projects.find((pr) => pr.id === 18);
    const p2 = projects.find((pr) => pr.id === 2);
    const p5 = projects.find((pr) => pr.id === 5);
    return `Bikrant's key full-stack systems:\n• ${p18.title}: Kubernetes, Helm, MySQL, MCP Gateway, FastAPI, React.\n• ${p2.title}: React, Node.js, Express, MongoDB (served 1000+ orders in Nalbari).\n• ${p5.title}: React, Zustand, Node.js, MongoDB, Google OAuth.`;
  }

  // 5. General Projects list
  if (input.includes("project") || input.includes("portfolio") || input.includes("work")) {
    const top = projects.slice(0, 5).map((p) => `• ${p.title} (${p.role})`).join("\n");
    return `Bikrant has built ${projects.length} documented projects spanning AI/ML, full-stack, and systems engineering:\n${top}\n\nExplore them in the Projects section above!`;
  }

  // 6. Education
  if (
    input.includes("education") ||
    input.includes("college") ||
    input.includes("university") ||
    input.includes("degree") ||
    input.includes("mtech") ||
    input.includes("m.tech") ||
    input.includes("mca") ||
    input.includes("cgpa") ||
    input.includes("tezpur") ||
    input.includes("tripura")
  ) {
    const eduText = education
      .map(
        (e) => `• ${e.degree} — ${e.institution} (${e.duration}, ${e.location}) [CGPA: ${e.cgpa}]`
      )
      .join("\n");
    return `Bikrant's Education:\n${eduText}`;
  }

  // 7. Experience / Internships
  if (
    input.includes("experience") ||
    input.includes("internship") ||
    input.includes("job") ||
    input.includes("skilaudit") ||
    input.includes("fineworks")
  ) {
    const expText = experience
      .map((e) => `• ${e.role} at ${e.company} (${e.duration}${e.location ? ` · ${e.location}` : ""})`)
      .join("\n");
    return `Bikrant's Work Experience:\n${expText}`;
  }

  // 8. Skills
  if (
    input.includes("skills") ||
    input.includes("tech stack") ||
    input.includes("technologies") ||
    input.includes("frameworks") ||
    input.includes("tools")
  ) {
    return `Core Technical Skills:\n• AI / ML: Python, PyTorch, LangGraph, ChromaDB, Sentence-Transformers, Opacus, RAG, Docker, Redis.\n• Full-Stack: React, Node.js, Express.js, FastAPI, MongoDB, MySQL, Tailwind CSS, Kubernetes, Helm.\n• Domains: Agentic RAG, Differentially Private Synthetic Data, MCP Servers, VR (Unity/C#).`;
  }

  // 9. Contact
  if (
    input.includes("contact") ||
    input.includes("email") ||
    input.includes("phone") ||
    input.includes("reach") ||
    input.includes("hire") ||
    input.includes("linkedin") ||
    input.includes("github")
  ) {
    return `You can contact Bikrant directly:\n• Email: ${author.email}\n• Phone: ${author.phone}\n• Location: ${author.location}\n• GitHub: ${author.github}\n• LinkedIn: ${author.linkedin}`;
  }

  // 10. Resume / CV
  if (input.includes("resume") || input.includes("cv") || input.includes("download")) {
    return `You can download Bikrant's complete CV by clicking the 'Download CV' button in the hero profile section of this site.`;
  }

  // 11. Strict Fallback for Unknown Questions (e.g. salary, private info, random queries)
  return `I don't have that information in Bikrant's portfolio. You can get in touch with Bikrant directly at ${author.email}.`;
};
