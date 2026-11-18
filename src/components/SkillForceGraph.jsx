import { useEffect, useRef, useState, useMemo } from "react";
import ForceGraph2D from "react-force-graph-2d";

const GRAPH_DATA = {
  nodes: [
    // Core Domain Hubs
    { id: "hub-ml", name: "AI / ML", val: 26, color: "#22d3ee", isHub: true },
    { id: "hub-sys", name: "Backend", val: 22, color: "#38bdf8", isHub: true },
    { id: "hub-data", name: "Data & Privacy", val: 20, color: "#06b6d4", isHub: true },
    { id: "hub-lang", name: "Languages", val: 20, color: "#67e8f9", isHub: true },
    { id: "hub-sec", name: "Security", val: 18, color: "#0ea5e9", isHub: true },

    // AI/ML Skills
    { id: "ai-agents", name: "AI Agents", val: 15, color: "#a5f3fc" },
    { id: "agentic-rag", name: "Agentic RAG", val: 15, color: "#a5f3fc" },
    { id: "pytorch", name: "PyTorch", val: 14, color: "#a5f3fc" },
    { id: "langgraph", name: "LangGraph", val: 15, color: "#a5f3fc" },
    { id: "llms-rag", name: "LLMs & RAG", val: 15, color: "#a5f3fc" },
    { id: "scikit", name: "Scikit-learn", val: 12, color: "#a5f3fc" },
    { id: "dp-gans", name: "DP-CTGAN", val: 14, color: "#a5f3fc" },

    // Backend & Infrastructure
    { id: "fastapi", name: "FastAPI", val: 14, color: "#bae6fd" },
    { id: "kubernetes", name: "Kubernetes", val: 14, color: "#bae6fd" },
    { id: "docker", name: "Docker", val: 13, color: "#bae6fd" },
    { id: "nodejs", name: "Node.js", val: 13, color: "#bae6fd" },
    { id: "websockets", name: "WebSockets", val: 12, color: "#bae6fd" },

    // Languages
    { id: "python", name: "Python", val: 16, color: "#e0f2fe" },
    { id: "sql", name: "SQL", val: 13, color: "#e0f2fe" },
    { id: "javascript", name: "JavaScript", val: 13, color: "#e0f2fe" },
    { id: "csharp", name: "C / C#", val: 11, color: "#e0f2fe" },

    // Databases & Storage
    { id: "postgresql", name: "PostgreSQL", val: 14, color: "#cffafe" },
    { id: "redis", name: "Redis", val: 14, color: "#cffafe" },
    { id: "chromadb", name: "ChromaDB", val: 14, color: "#cffafe" },
    { id: "mongodb", name: "MongoDB", val: 12, color: "#cffafe" },
    { id: "mysql", name: "MySQL", val: 12, color: "#cffafe" },
    { id: "pandas", name: "Pandas", val: 11, color: "#cffafe" },

    // Specialized & Spatial
    { id: "pentest", name: "Pen Testing", val: 11, color: "#7dd3fc" },
    { id: "unity-vr", name: "Unity (VR)", val: 12, color: "#7dd3fc" },
  ],
  links: [
    // Hub connections
    { source: "hub-ml", target: "ai-agents" },
    { source: "hub-ml", target: "agentic-rag" },
    { source: "hub-ml", target: "pytorch" },
    { source: "hub-ml", target: "langgraph" },
    { source: "hub-ml", target: "llms-rag" },
    { source: "hub-ml", target: "scikit" },
    { source: "hub-ml", target: "dp-gans" },

    { source: "hub-sys", target: "fastapi" },
    { source: "hub-sys", target: "kubernetes" },
    { source: "hub-sys", target: "docker" },
    { source: "hub-sys", target: "nodejs" },
    { source: "hub-sys", target: "websockets" },

    { source: "hub-lang", target: "python" },
    { source: "hub-lang", target: "sql" },
    { source: "hub-lang", target: "javascript" },
    { source: "hub-lang", target: "csharp" },

    { source: "hub-data", target: "postgresql" },
    { source: "hub-data", target: "redis" },
    { source: "hub-data", target: "chromadb" },
    { source: "hub-data", target: "mongodb" },
    { source: "hub-data", target: "mysql" },
    { source: "hub-data", target: "pandas" },

    { source: "hub-sec", target: "pentest" },
    { source: "hub-sec", target: "unity-vr" },

    // Cross-domain technical relationships
    { source: "python", target: "pytorch" },
    { source: "python", target: "fastapi" },
    { source: "langgraph", target: "ai-agents" },
    { source: "agentic-rag", target: "chromadb" },
    { source: "fastapi", target: "redis" },
    { source: "kubernetes", target: "docker" },
    { source: "sql", target: "postgresql" },
    { source: "sql", target: "mysql" },
    { source: "llms-rag", target: "langgraph" },
    { source: "dp-gans", target: "pytorch" },
  ],
};

export default function SkillForceGraph() {
  const containerRef = useRef(null);
  const fgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 340 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({
          width: offsetWidth || 500,
          height: offsetHeight || 340,
        });
      }
    };

    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const data = useMemo(() => GRAPH_DATA, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[300px] relative overflow-hidden select-none"
    >
      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={data}
        backgroundColor="rgba(0,0,0,0)"
        nodeRelSize={4}
        nodeColor={(node) => node.color}
        linkColor={() => "rgba(34, 211, 238, 0.22)"}
        linkWidth={1.2}
        d3VelocityDecay={0.35}
        cooldownTicks={100}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const r = node.isHub ? 7 : 4;
          const label = node.name;
          const fontSize = node.isHub ? 12 / globalScale : 10 / globalScale;

          // Glow ring for hubs
          if (node.isHub) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, r + 3, 0, 2 * Math.PI, false);
            ctx.fillStyle = "rgba(34, 211, 238, 0.15)";
            ctx.fill();
          }

          // Node circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
          ctx.fillStyle = node.color;
          ctx.fill();

          // Label text
          ctx.font = `${node.isHub ? "bold" : "normal"} ${fontSize}px 'Space Grotesk', system-ui, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          // Text shadow
          ctx.fillStyle = "#020409";
          ctx.fillText(label, node.x, node.y + r + fontSize * 0.9 + 1);

          // Text fill
          ctx.fillStyle = node.isHub ? "#22d3ee" : "#e2e8f0";
          ctx.fillText(label, node.x, node.y + r + fontSize * 0.9);
        }}
      />

      {/* Subtle interaction tip badge */}
      <div className="absolute bottom-3 right-3 pointer-events-none px-2.5 py-1 rounded-md bg-black/60 border border-white/10 text-[10px] font-mono text-gray-400 backdrop-blur-sm">
        Drag &amp; pan nodes
      </div>
    </div>
  );
}
