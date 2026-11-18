import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FaPython,
  FaReact,
  FaNodeJs,
  FaGit,
  FaJava,
  FaBrain,
  FaDatabase,
  FaShieldAlt,
  FaRobot,
} from "react-icons/fa";
import {
  SiMongodb,
  SiTailwindcss,
  SiUnity,
  SiPytorch,
  SiExpress,
  SiMysql,
  SiFastapi,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiDocker,
  SiPostgresql,
  SiRedis,
  SiKubernetes,
} from "react-icons/si";
import {
  MailOutlined,
  GithubOutlined,
  LinkedinOutlined,
  SendOutlined,
} from "@ant-design/icons";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

// Lazy load the force graph component to avoid heavy bundle and window reference errors
const SkillForceGraph = lazy(() => import("./SkillForceGraph"));

const SkillContent = () => {
  const [formData, setFormData] = useState({ name: "", email: "", description: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Cross-component click: filter projects by clicked skill
  const handleSkillClick = (skillName) => {
    const cleanName = skillName.replace(/\s*\(VR\)/i, "").replace("LLMs & ", "");
    window.dispatchEvent(new CustomEvent("filter-tech", { detail: { tech: cleanName } }));
  };

  // IntersectionObserver to only mount ForceGraph when scrolled into view (Rule 4)
  const graphContainerRef = useRef(null);
  const [isGraphInView, setIsGraphInView] = useState(false);

  useEffect(() => {
    if (!graphContainerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsGraphInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "150px" }
    );
    observer.observe(graphContainerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://portfolio-back-j2mg.onrender.com/send-email",
        formData
      );
      setMessage(response.data.message || "Message sent successfully!");
      setFormData({ name: "", email: "", description: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      const serverError = err.response?.data?.error || err.response?.data?.message;
      setMessage(
        serverError
          ? `Delivery failed: ${serverError}`
          : "Failed to send message. Please reach out directly at bikrantnath4@gmail.com"
      );
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="about" className="w-full max-w-6xl mx-auto px-4 sm:px-6 font-body text-white">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
          TECHNICAL CAPABILITIES &amp; CONTACT
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight mt-2">
          Skills &amp; Architecture
        </h2>
        <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-[65ch] mx-auto leading-relaxed">
          Applied toolchains across privacy-preserving machine learning, multi-agent RAG,
          and production-grade full-stack systems.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Tile 1: Interactive Knowledge Graph (Spans 2 columns on large screens) */}
        <div
          ref={graphContainerRef}
          className="card-unified p-6 md:p-7 md:col-span-2 flex flex-col justify-between overflow-hidden relative min-h-[380px]"
        >
          <div className="flex items-center justify-between mb-3 z-10">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                INTERACTIVE TOPOLOGY
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-white mt-0.5">
                Knowledge &amp; Toolchain Graph
              </h3>
            </div>
            <span className="text-[11px] font-mono text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md hidden sm:inline">
              Force-directed
            </span>
          </div>

          <p className="text-xs text-gray-400 mb-4 z-10 max-w-[60ch]">
            Visual clustering of core ML algorithms, backend microservices, data stores, and cross-domain integrations.
          </p>

          {/* Graph Canvas or Skeleton */}
          <div className="flex-1 w-full min-h-[280px] rounded-xl bg-black/40 border border-white/5 overflow-hidden flex items-center justify-center">
            {isGraphInView ? (
              <Suspense
                fallback={
                  <div className="flex flex-col items-center justify-center gap-2 text-xs font-mono text-gray-500">
                    <ClipLoader size={20} color="#22d3ee" />
                    <span>Loading skill graph...</span>
                  </div>
                }
              >
                <SkillForceGraph />
              </Suspense>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 text-xs font-mono text-gray-500">
                <span className="w-2 h-2 rounded-full bg-cyan-400/50 animate-ping" />
                <span>Scroll to activate interactive graph</span>
              </div>
            )}
          </div>
        </div>

        {/* Tile 2: AI / ML Specialized */}
        <div className="card-unified p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                CORE FOCUS
              </span>
              <FaBrain className="text-cyan-400 text-base" />
            </div>
            <h3 className="text-lg font-bold font-heading text-white mb-2">
              AI / Machine Learning
            </h3>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Differentially private synthesis, agentic orchestration, and uncertainty estimation.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                { name: "AI Agents", icon: <FaRobot className="text-cyan-400" /> },
                { name: "Agentic RAG", icon: <FaBrain className="text-cyan-300" /> },
                { name: "LangGraph", icon: <FaBrain className="text-cyan-400" /> },
                { name: "PyTorch", icon: <SiPytorch className="text-orange-400" /> },
                { name: "ChromaDB", icon: <FaDatabase className="text-purple-400" /> },
                { name: "DP-CTGAN", icon: <FaShieldAlt className="text-cyan-400" /> },
                { name: "Scikit-learn", icon: <SiScikitlearn className="text-yellow-400" /> },
                { name: "NumPy", icon: <SiNumpy className="text-blue-300" /> },
                { name: "Pandas", icon: <SiPandas className="text-purple-300" /> },
              ].map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSkillClick(s.name)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/50 text-xs font-mono text-gray-300 hover:text-cyan-200 transition-all cursor-pointer group select-none active:scale-95"
                  title={`View projects built with ${s.name}`}
                >
                  <span className="text-xs transition-transform group-hover:scale-110">{s.icon}</span>
                  <span>{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/5 text-[11px] font-mono text-gray-400">
            Rényi DP · StableNVP · Semantic Entropy
          </div>
        </div>

        {/* Tile 3: Backend & Architecture */}
        <div className="card-unified p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                SYSTEMS
              </span>
              <SiFastapi className="text-cyan-400 text-base" />
            </div>
            <h3 className="text-lg font-bold font-heading text-white mb-2">
              Backend &amp; APIs
            </h3>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              RESTful and WebSocket services with structured schemas and token authentication.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                { name: "FastAPI", icon: <SiFastapi className="text-teal-400" /> },
                { name: "Kubernetes", icon: <SiKubernetes className="text-blue-500" /> },
                { name: "Docker", icon: <SiDocker className="text-blue-400" /> },
                { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
                { name: "Express.js", icon: <SiExpress className="text-gray-300" /> },
                { name: "WebSockets", icon: <span className="text-cyan-400">⚡</span> },
                { name: "REST APIs", icon: <span className="text-gray-400">⇄</span> },
              ].map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSkillClick(s.name)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/50 text-xs font-mono text-gray-300 hover:text-cyan-200 transition-all cursor-pointer group select-none active:scale-95"
                  title={`View projects built with ${s.name}`}
                >
                  <span className="text-xs transition-transform group-hover:scale-110">{s.icon}</span>
                  <span>{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/5 text-[11px] font-mono text-gray-400">
            Sub-200ms real-time latency
          </div>
        </div>

        {/* Tile 4: Languages & Foundations */}
        <div className="card-unified p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                FOUNDATIONS
              </span>
              <FaPython className="text-cyan-400 text-base" />
            </div>
            <h3 className="text-lg font-bold font-heading text-white mb-2">
              Languages
            </h3>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Primary languages for systems programming, data analysis, and frontend applications.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                { name: "Python", icon: <FaPython className="text-blue-400" /> },
                { name: "SQL", icon: <FaDatabase className="text-yellow-400" /> },
                { name: "JavaScript", icon: <span className="text-yellow-300 font-bold">JS</span> },
                { name: "C / C#", icon: <span className="text-purple-400 font-bold">C#</span> },
                { name: "Java", icon: <FaJava className="text-red-400" /> },
              ].map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSkillClick(s.name)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/50 text-xs font-mono text-gray-300 hover:text-cyan-200 transition-all cursor-pointer group select-none active:scale-95"
                  title={`View projects built with ${s.name}`}
                >
                  <span className="text-xs transition-transform group-hover:scale-110">{s.icon}</span>
                  <span>{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/5 text-[11px] font-mono text-gray-400">
            Algorithms · Relational Logic
          </div>
        </div>

        {/* Tile 5: Data Stores & Platforms */}
        <div className="card-unified p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                STORAGE &amp; PLATFORMS
              </span>
              <SiMongodb className="text-cyan-400 text-base" />
            </div>
            <h3 className="text-lg font-bold font-heading text-white mb-2">
              Data &amp; Platforms
            </h3>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Relational &amp; vector persistence, spatial computing, and web interfaces.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" /> },
                { name: "Redis", icon: <SiRedis className="text-red-500" /> },
                { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
                { name: "MySQL", icon: <SiMysql className="text-blue-400" /> },
                { name: "React", icon: <FaReact className="text-sky-400" /> },
                { name: "Unity (VR)", icon: <SiUnity className="text-gray-300" /> },
                { name: "Git", icon: <FaGit className="text-orange-400" /> },
                { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
              ].map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSkillClick(s.name)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/50 text-xs font-mono text-gray-300 hover:text-cyan-200 transition-all cursor-pointer group select-none active:scale-95"
                  title={`View projects built with ${s.name}`}
                >
                  <span className="text-xs transition-transform group-hover:scale-110">{s.icon}</span>
                  <span>{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/5 text-[11px] font-mono text-gray-400">
            Meta Quest · Relational Intelligence
          </div>
        </div>

        {/* Tile 6: Get In Touch (Full width bento footer) */}
        <div className="card-unified p-6 md:p-8 md:col-span-2 lg:col-span-3">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Col (2/5): Context & Direct Links */}
            <div className="lg:col-span-2 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                  LET&apos;S CONNECT
                </span>
                <h3 className="text-2xl font-bold font-heading text-white mt-1 mb-3">
                  Get In Touch
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed max-w-[45ch]">
                  I am open to AI/ML and full-stack engineering roles. Reach out for project inquiries,
                  collaboration, or research discussions.
                </p>

                <div className="space-y-3 mt-6 text-xs text-gray-400 font-mono">
                  <div className="flex items-center gap-2.5">
                    <MailOutlined className="text-cyan-400 text-sm" />
                    <a
                      href="mailto:bikrantnath4@gmail.com"
                      className="text-gray-200 hover:text-cyan-300 transition-colors"
                    >
                      bikrantnath4@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                    <span className="text-gray-300">Guwahati, open to relocation</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/5">
                <a
                  href="https://github.com/bikrantnath22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-300 hover:text-white flex items-center gap-2 transition-colors"
                >
                  <GithubOutlined /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/bikrant-nath-7747781a7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-300 hover:text-white flex items-center gap-2 transition-colors"
                >
                  <LinkedinOutlined /> LinkedIn
                </a>
              </div>
            </div>

            {/* Right Col (3/5): Working Email Contact Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Alex"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-cyan-400/60 text-sm text-white placeholder-gray-600 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="alex@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-cyan-400/60 text-sm text-white placeholder-gray-600 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5">
                  Message
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Share details about the role or project..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-cyan-400/60 text-sm text-white placeholder-gray-600 outline-none transition-colors resize-none"
                />
              </div>

              {/* Status Message */}
              <AnimatePresence>
                {message && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`text-xs font-mono ${
                      success ? "text-cyan-400" : "text-red-400"
                    }`}
                  >
                    {success ? "✓ " : "⚠️ "} {message}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-xs bg-cyan-400 text-black hover:bg-cyan-300 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.25)] cursor-pointer"
              >
                {loading ? (
                  <ClipLoader size={16} color="#000" />
                ) : (
                  <>
                    <SendOutlined />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillContent;
