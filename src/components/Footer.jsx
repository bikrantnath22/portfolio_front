import { motion } from "framer-motion";
import { GithubOutlined, LinkedinOutlined, MailOutlined } from "@ant-design/icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full py-14 px-6 mt-8 relative">
      {/* Top divider */}
      <div className="max-w-5xl mx-auto mb-10">
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.4), rgba(6, 182, 212, 0.4), rgba(139, 92, 246, 0.3), transparent)",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Brand + Tagline + Status */}
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2.5 justify-center md:justify-start mb-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold aurora-text"
              style={{
                background: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(6,182,212,0.15))",
                border: "1px solid rgba(34,197,94,0.25)",
                fontFamily: "var(--font-heading, 'Space Grotesk', sans-serif)",
              }}
            >
              BN
            </div>
            <h3
              className="text-lg font-bold aurora-text"
              style={{ fontFamily: "var(--font-heading, 'Space Grotesk', sans-serif)", letterSpacing: "-0.02em" }}
            >
              Bikrant Nath
            </h3>
          </div>
          <p className="text-gray-500 text-sm mt-1 mb-3">
            AI/ML Engineer · Full-Stack Developer · VR Enthusiast
          </p>
          {/* Open to Work badge */}
          <span className="status-badge status-badge-green">
            <span className="pulse-dot" />
            Open to Work
          </span>
          <p className="text-gray-600 text-xs mt-2">
            📧 bikrantnath22@gmail.com
          </p>
        </div>

        {/* Center: Social links */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-600 text-xs uppercase tracking-widest font-medium">Find me on</p>
          <div className="flex items-center gap-5">
            <motion.a
              href="https://github.com/bikrantnath22"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              whileHover={{
                scale: 1.15,
                y: -2,
                background: "rgba(34,197,94,0.12)",
                borderColor: "rgba(34,197,94,0.3)",
                color: "#22c55e",
                boxShadow: "0 0 20px rgba(34,197,94,0.2)",
              }}
              aria-label="GitHub"
            >
              <GithubOutlined className="text-lg" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/bikrant-nath-7747781a7/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              whileHover={{
                scale: 1.15,
                y: -2,
                background: "rgba(6,182,212,0.12)",
                borderColor: "rgba(6,182,212,0.3)",
                color: "#06b6d4",
                boxShadow: "0 0 20px rgba(6,182,212,0.2)",
              }}
              aria-label="LinkedIn"
            >
              <LinkedinOutlined className="text-lg" />
            </motion.a>
            <motion.a
              href="mailto:bikrantnath22@gmail.com"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              whileHover={{
                scale: 1.15,
                y: -2,
                background: "rgba(139,92,246,0.12)",
                borderColor: "rgba(139,92,246,0.3)",
                color: "#a78bfa",
                boxShadow: "0 0 20px rgba(139,92,246,0.2)",
              }}
              aria-label="Email"
            >
              <MailOutlined className="text-lg" />
            </motion.a>
          </div>
        </div>

        {/* Right: Back to top */}
        <motion.button
          onClick={scrollToTop}
          className="flex flex-col items-center gap-2 text-gray-600 hover:text-green-400 text-sm transition-colors group"
          whileHover={{ y: -2 }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/8 bg-white/4 group-hover:border-green-500/30 group-hover:bg-green-500/5 transition-all duration-300"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-y-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </div>
          <span className="text-xs uppercase tracking-widest">Top</span>
        </motion.button>
      </div>

      {/* Bottom credits */}
      <div className="max-w-5xl mx-auto flex flex-col items-center mt-10 gap-2">
        <div
          className="h-px w-full max-w-xs"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
          }}
        />
        <p className="text-gray-700 text-xs mt-3">
          Built with 💙 using React · Framer Motion · Tailwind CSS
        </p>
        <p className="text-gray-800 text-xs">
          © {new Date().getFullYear()} Bikrant Nath. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
