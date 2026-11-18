import { useRef } from "react";
import { motion } from "motion/react";
import {
  GithubOutlined,
  LinkedinOutlined,
  ArrowDownOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import HeroCanvas from "./HeroCanvas";
import { projects } from "../data/projects";

export default function ProfileCard() {
  const containerRef = useRef(null);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/CV-Bikrant_Nath.pdf";
    link.download = "Bikrant_Nath_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const featuredProjectsCount = projects.filter((p) => p.featured).length;

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden py-16 md:py-24"
    >
      {/* 3D Neural Network Canvas with Fallback */}
      <HeroCanvas containerRef={containerRef} />

      {/* Subtle Radial Vignette to guarantee high text contrast against 3D nodes & pulses */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 20% 45%, rgba(2, 4, 9, 0.92) 0%, rgba(2, 4, 9, 0.65) 55%, rgba(2, 4, 9, 0.2) 100%)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start max-w-4xl"
        >
          {/* Eyebrow, 72px Circular Avatar & Status Chip */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="/imgProfile.jpeg"
                  alt="Bikrant Nath"
                  className="w-[72px] h-[72px] rounded-full object-cover border-2 border-cyan-400/50 shadow-[0_0_24px_rgba(34,211,238,0.25)] shrink-0"
                />
                <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-cyan-400 border-2 border-[#020409] shadow-[0_0_8px_#22d3ee]" />
              </div>
              <div>
                <span className="text-xs md:text-sm uppercase tracking-widest text-cyan-400 font-semibold font-mono block">
                  AI/ML Engineer &amp; Full-Stack Developer
                </span>
                <span className="text-xs text-gray-400 font-medium mt-0.5 block">
                  Bikrant Nath
                </span>
              </div>
            </div>

            {/* Status chip with pulsing accent dot */}
            <div className="sm:ml-2">
              <span className="status-badge status-badge-cyan text-[11px] font-medium tracking-normal normal-case py-1 px-3">
                <span className="pulse-dot" />
                Open to AI/ML &amp; full-stack roles · Guwahati, open to relocation
              </span>
            </div>
          </motion.div>

          {/* Headline (Space Grotesk, clamp(2.5rem, 6.5vw, 5.2rem)) */}
          <motion.h1
            variants={itemVariants}
            className="font-heading font-extrabold text-white tracking-tight leading-[1.08] text-[clamp(2.5rem,6.5vw,5.2rem)]"
          >
            Hi, I&apos;m Bikrant. I build AI apps and full-stack products.
          </motion.h1>

          {/* Short, non-italic, left-aligned subline (max 2 lines) */}
          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed mt-4"
          >
            M.Tech CSE graduate, Tezpur University. RAG, AI agents and GenAI, with React, FastAPI and Node.js.
          </motion.p>

          {/* CTAs & Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 mt-8"
          >
            <motion.a
              href="#project"
              className="btn-premium px-8 py-3.5 rounded-full font-semibold text-sm text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_4px_25px_rgba(34,211,238,0.35)] transition-all flex items-center gap-2"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <span>View projects</span>
              <ArrowRightOutlined className="text-xs" />
            </motion.a>

            <motion.button
              type="button"
              onClick={handleDownload}
              className="px-8 py-3.5 rounded-full font-semibold text-sm text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all flex items-center gap-2"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <ArrowDownOutlined className="text-xs" />
              <span>Download CV</span>
            </motion.button>

            <div className="flex items-center gap-4 pl-3 sm:border-l sm:border-white/10 sm:ml-2">
              <motion.a
                href="https://github.com/bikrantnath22"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="text-gray-400 hover:text-cyan-400 text-xl transition-colors"
                whileHover={{ scale: 1.15 }}
              >
                <GithubOutlined />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/bikrant-nath-7747781a7/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="text-gray-400 hover:text-cyan-400 text-xl transition-colors"
                whileHover={{ scale: 1.15 }}
              >
                <LinkedinOutlined />
              </motion.a>
            </div>
          </motion.div>

          {/* Proof chips derived strictly from projects.jsx only */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 mt-10 pt-6 border-t border-white/10"
          >
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass border border-white/10">
              <span className="font-heading font-bold text-base md:text-lg text-cyan-400">
                {featuredProjectsCount}
              </span>
              <span className="text-[11px] md:text-xs text-gray-400 font-medium">
                Featured Projects
              </span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass border border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_6px_#22d3ee]" />
              <span className="text-[11px] md:text-xs text-gray-300 font-medium">
                Served Real Customers (Athaana)
              </span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass border border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_6px_#22d3ee]" />
              <span className="text-[11px] md:text-xs text-gray-300 font-medium">
                Multi-Agent &amp; RAG Systems
              </span>
            </div>
          </motion.div>

          {/* Interactive Live Agent Pipeline Flow */}
          <motion.div
            variants={itemVariants}
            className="w-full mt-8 p-3.5 sm:p-4 rounded-2xl bg-[#030914]/80 backdrop-blur-md border border-cyan-500/25 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                  Evaluated Agent Pipeline Architecture
                </span>
              </div>
              <span className="text-[10px] font-mono text-gray-400 hidden sm:inline">
                Real-Time Systems Telemetry
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 hide-scroll text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 shrink-0">
                User Query
              </span>
              <span className="text-cyan-400/50 select-none">➔</span>
              <span className="px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-400/35 text-cyan-200 shrink-0">
                LangGraph Router
              </span>
              <span className="text-cyan-400/50 select-none">➔</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 shrink-0">
                ChromaDB + Redis (<span className="text-emerald-400 font-semibold">&lt;50ms</span>)
              </span>
              <span className="text-cyan-400/50 select-none">➔</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 shrink-0">
                Cross-Encoder Rerank (<span className="text-cyan-300 font-semibold">0.82 MRR</span>)
              </span>
              <span className="text-cyan-400/50 select-none">➔</span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-950/50 border border-emerald-400/35 text-emerald-300 shrink-0">
                Self-Check Verified ✓
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle bottom gradient fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#020409] via-[#020409]/80 to-transparent pointer-events-none z-10" />
    </div>
  );
}
