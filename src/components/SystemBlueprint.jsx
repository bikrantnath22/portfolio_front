import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const BLUEPRINTS = {
  16: {
    title: "Agentic RAG Architecture & Verification Flow",
    subtitle: "End-to-end multi-agent retrieval, reranking, and self-evaluating execution pipeline",
    nodes: [
      {
        id: "cache",
        label: "Redis Cache Layer",
        role: "Query Ingestion & In-Memory Cache",
        latency: "<50ms (Cache Hit)",
        tech: ["Redis", "FastAPI"],
        description: "Checks Redis key-value store for repeat query hashes. Serves instant responses in under 50ms compared to 4.16s P50 for cold queries.",
      },
      {
        id: "router",
        label: "LangGraph Agent Router",
        role: "Intent Routing & Decomposition",
        latency: "~240ms",
        tech: ["LangGraph", "Groq / Llama", "FastAPI"],
        description: "Intelligent agent that breaks down multi-hop queries, selects between 4 tools (retriever, Python code runner, math engine, web search), and refused 15/15 out-of-domain test queries.",
      },
      {
        id: "retriever",
        label: "Hybrid Search Engine",
        role: "Dense Semantic + Keyword Retrieval",
        latency: "~180ms",
        tech: ["ChromaDB", "Sentence-Transformers"],
        description: "Fuses dense vector cosine similarity (ChromaDB) with BM25 keyword matching over a 500-page corpus (2,461 chunks) for high recall.",
      },
      {
        id: "reranker",
        label: "Cross-Encoder Reranker",
        role: "Deep Relevance Scoring",
        latency: "~110ms",
        tech: ["Sentence-Transformers", "PyTorch"],
        description: "Applies a cross-encoder model to score and reorder top candidate chunks, boosting Precision@3 to 78% and achieving 0.82 MRR across 85 test queries.",
      },
      {
        id: "selfcheck",
        label: "Self-Check & Retry Loop",
        role: "Citation & Hallucination Guardrail",
        latency: "~310ms",
        tech: ["LangGraph", "Eval Prompts"],
        description: "Self-critique layer verifies that every generated claim has a supporting citation in the retrieved context. Automatically rewrites queries and retries up to 2 times on weak evidence.",
      },
      {
        id: "output",
        label: "Verified Response API",
        role: "Streaming Output & Telemetry",
        latency: "P50: 4.16s (Cold)",
        tech: ["FastAPI", "Prometheus", "Docker"],
        description: "Delivers verified response with clickable citation anchors while streaming metrics into Prometheus for latency and recall monitoring.",
      },
    ],
  },
  18: {
    title: "Kubernetes MCP Commerce Architecture",
    subtitle: "Cloud-native WooCommerce platform exposed to AI agents via MCP Gateway",
    nodes: [
      {
        id: "client",
        label: "React Ops Dashboard",
        role: "Admin & AI Chat Interface",
        latency: "Real-time",
        tech: ["React", "Tailwind CSS", "Vite"],
        description: "Real-time web frontend allowing store administrators to chat with the store agent, monitor cluster pods, and inspect catalog changes.",
      },
      {
        id: "gateway",
        label: "FastAPI MCP Gateway",
        role: "Protocol Gateway & Tool Router",
        latency: "<35ms",
        tech: ["FastAPI", "Python", "Docker"],
        description: "Central router implementing the Model Context Protocol (MCP). Authenticates requests, inspects agent intents, and safely dispatches tools to underlying MCP servers.",
      },
      {
        id: "mcp",
        label: "Scoped MCP Micro-Servers",
        role: "Dedicated Tool Handlers",
        latency: "~60ms",
        tech: ["woo-mcp", "WooCommerce REST API"],
        description: "Separate micro-servers: write-enabled woo-mcp (create_product, update_stock) and read-only analytics server operating with strictly restricted WooCommerce API credentials.",
      },
      {
        id: "k8s",
        label: "Kubernetes Cluster (k3d/k3s)",
        role: "Container Orchestration",
        latency: "Self-healing",
        tech: ["k3d", "k3s", "WSL2"],
        description: "Isolated multi-node Kubernetes cluster running inside WSL2 locally and targeting VPS via k3s. Handles networking, service discovery, and pod lifecycle.",
      },
      {
        id: "helm",
        label: "Helm Chart & Storage",
        role: "Declarative Infrastructure",
        latency: "Automated",
        tech: ["Helm", "MySQL 8.4", "Kubernetes Secrets"],
        description: "Declarative Helm chart managing WooCommerce and MySQL 8.4 deployments. Secrets generated via external script to keep credentials strictly out of version control.",
      },
      {
        id: "bootstrap",
        label: "Bootstrap Automation Job",
        role: "Cluster Provisioning & Verification",
        latency: "One-shot Job",
        tech: ["K8s Jobs", "Bash", "WooCommerce CLI"],
        description: "Automated Kubernetes Job that installs the WordPress store, activates WooCommerce, configures Cash on Delivery (COD), and places a synthetic test order upon cluster startup.",
      },
    ],
  },
  3: {
    title: "Multi-Agent Research & Fact-Verification Flow",
    subtitle: "Autonomous research agent pipeline with atomic claim verification",
    nodes: [
      {
        id: "brief",
        label: "Research Brief & Decomposer",
        role: "Query Decomposition",
        latency: "~120ms",
        tech: ["LangChain", "FastAPI"],
        description: "Accepts research topics or factual propositions and extracts sub-questions and key factual entities.",
      },
      {
        id: "retrieval",
        label: "Multi-Source Academic Search",
        role: "Live Evidence Gathering",
        latency: "~650ms",
        tech: ["ArXiv API", "Tavily Search"],
        description: "Queries ArXiv academic repository and verified search APIs to collect peer-reviewed papers and reliable technical sources.",
      },
      {
        id: "matcher",
        label: "Cross-Reference Matrix",
        role: "NLI & Entailment Scoring",
        latency: "~240ms",
        tech: ["HuggingFace", "Cross-Encoder"],
        description: "Scores candidate source passages against each sub-claim using natural language inference (entailment, neutral, contradiction).",
      },
      {
        id: "verifier",
        label: "Hallucination Risk Scorer",
        role: "Confidence & Citation Audit",
        latency: "~150ms",
        tech: ["Python", "FastAPI"],
        description: "Computes a normalized hallucination risk score. Flags unverified assertions and marks weak corroboration.",
      },
      {
        id: "report",
        label: "Audited Report Synthesis",
        role: "Fact-Checked Delivery",
        latency: "~800ms",
        tech: ["Markdown", "React"],
        description: "Compiles a structured research report with direct inline citations, evidence extracts, and verification confidence tags.",
      },
    ],
  },
  1: {
    title: "DP-CTGAN Rare Minority Architecture",
    subtitle: "Differentially private tabular synthesis with rare class oversampling",
    nodes: [
      {
        id: "input",
        label: "Imbalanced Tabular Data",
        role: "Raw Imbalanced Dataset",
        latency: "Pre-processing",
        tech: ["Pandas", "Scikit-Learn"],
        description: "Takes high-dimensional tabular data with severe class imbalance (rare disease cases or fraud records down to <1% representation).",
      },
      {
        id: "minority",
        label: "Rare Minority Sampling",
        role: "Cluster & Density Identification",
        latency: "Dynamic",
        tech: ["NumPy", "Scikit-Learn"],
        description: "Identifies rare minority feature distributions and applies conditional vectors to force equalized representation during GAN training.",
      },
      {
        id: "generator",
        label: "Conditional Generator (WGAN)",
        role: "Continuous & Discrete Synthesis",
        latency: "Training",
        tech: ["PyTorch", "CTGAN"],
        description: "Variational auto-encoder transforms categorical and multimodal numerical columns into uniform embeddings conditioned on minority attributes.",
      },
      {
        id: "dp",
        label: "Differential Privacy Engine",
        role: "Gradient Clipping & Noise Addition",
        latency: "Formal Guarantees",
        tech: ["PyTorch DP", "Opacus"],
        description: "Binds strict differential privacy bounds (ε, δ) by clipping critic gradients and injecting calibrated Gaussian noise to prevent data memorization.",
      },
      {
        id: "eval",
        label: "Fidelity & Privacy Evaluator",
        role: "Utility & Privacy Auditing",
        latency: "Validation",
        tech: ["SDMetrics", "Python"],
        description: "Evaluates synthetic distribution fidelity (Wasserstein distance, statistical similarity) and verifies protection against membership inference attacks.",
      },
    ],
  },
};

export default function SystemBlueprint({ projectId }) {
  const blueprint = BLUEPRINTS[projectId];
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);

  if (!blueprint) return null;

  const activeNode = blueprint.nodes[activeNodeIndex] || blueprint.nodes[0];

  return (
    <section className="mt-14 pt-10 border-t border-white/10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              System Architecture Blueprint
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight">
            {blueprint.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 font-sans mt-0.5">
            {blueprint.subtitle}
          </p>
        </div>

        <div className="text-[11px] font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-400/30 px-3 py-1.5 rounded-lg shrink-0 self-start sm:self-auto flex items-center gap-1.5">
          <span>Click stages below to inspect</span>
        </div>
      </div>

      {/* Interactive Pipeline Steps / Nodes Carousel */}
      <div className="bg-[#030712]/80 backdrop-blur-md border border-cyan-500/25 rounded-2xl p-4 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        {/* Horizontal Node Track */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 hide-scroll">
          {blueprint.nodes.map((node, idx) => {
            const isActive = activeNodeIndex === idx;
            return (
              <div key={node.id} className="flex items-center shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveNodeIndex(idx)}
                  className={`group relative text-left p-3.5 rounded-xl border transition-all cursor-pointer min-w-[150px] max-w-[180px] select-none ${
                    isActive
                      ? "bg-cyan-950/60 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                      : "bg-white/[0.03] border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-gray-400 font-semibold">
                      0{idx + 1}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? "bg-cyan-400 shadow-[0_0_6px_#22d3ee]" : "bg-white/20"
                      }`}
                    />
                  </div>
                  <h4
                    className={`text-xs font-heading font-bold truncate ${
                      isActive ? "text-cyan-300" : "text-gray-200 group-hover:text-white"
                    }`}
                  >
                    {node.label}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-mono truncate mt-0.5">
                    {node.tech[0]}
                  </p>
                </button>

                {/* Arrow connector between stages */}
                {idx < blueprint.nodes.length - 1 && (
                  <div className="px-2 text-cyan-400/40 font-mono text-xs select-none">
                    ➔
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Stage Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-4 pt-5 border-t border-white/10 flex flex-col md:flex-row md:items-start justify-between gap-6"
          >
            {/* Left Description */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-400/30 px-2.5 py-0.5 rounded-md">
                  Stage 0{activeNodeIndex + 1} · {activeNode.role}
                </span>
                {activeNode.latency && (
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-400/30 px-2 py-0.5 rounded-md">
                    ⚡ {activeNode.latency}
                  </span>
                )}
              </div>

              <h4 className="text-lg font-bold font-heading text-white mb-2">
                {activeNode.label}
              </h4>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-3xl">
                {activeNode.description}
              </p>
            </div>

            {/* Right Tech Chips */}
            <div className="shrink-0 flex flex-col gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                Core Technologies
              </span>
              <div className="flex flex-wrap gap-1.5 max-w-[240px]">
                {activeNode.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-cyan-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
