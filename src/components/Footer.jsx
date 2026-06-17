import { motion } from "framer-motion";
import { GithubOutlined, LinkedinOutlined, MailOutlined } from "@ant-design/icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full py-12 px-6 mt-8 relative">
      {/* Top divider */}
      <div className="max-w-5xl mx-auto mb-8">
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.3), rgba(6, 182, 212, 0.3), transparent)",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Name + Tagline */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold aurora-text">Bikrant Nath</h3>
          <p className="text-gray-500 text-sm mt-1">
            AI/ML Engineer & Full-Stack Developer
          </p>
        </div>

        {/* Center: Social links */}
        <div className="flex items-center gap-6">
          <motion.a
            href="https://github.com/bikrantnath22"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-green-400 text-xl transition-colors"
            whileHover={{ scale: 1.2, y: -2 }}
            aria-label="GitHub"
          >
            <GithubOutlined />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/bikrant-nath-7747781a7/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-cyan-400 text-xl transition-colors"
            whileHover={{ scale: 1.2, y: -2 }}
            aria-label="LinkedIn"
          >
            <LinkedinOutlined />
          </motion.a>
          <motion.a
            href="mailto:bikrantnath22@gmail.com"
            className="text-gray-500 hover:text-purple-400 text-xl transition-colors"
            whileHover={{ scale: 1.2, y: -2 }}
            aria-label="Email"
          >
            <MailOutlined />
          </motion.a>
        </div>

        {/* Right: Back to top */}
        <motion.button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-gray-500 hover:text-green-400 text-sm transition-colors group"
          whileHover={{ y: -2 }}
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
          Back to top
        </motion.button>
      </div>

      {/* Bottom credit */}
      <div className="text-center mt-8">

        <p className="text-gray-700 text-xs mt-1">
          © {new Date().getFullYear()} Bikrant Nath. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
