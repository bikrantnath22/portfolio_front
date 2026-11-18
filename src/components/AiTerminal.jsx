import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ChatBox from "./ChatBox";

export default function AiTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });
  const [isHovered, setIsHovered] = useState(false);

  // Monitor viewport size
  useEffect(() => {
    const updateSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize, { passive: true });
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Track scroll progress from first page (0.0) to last page (1.0)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isMobile = viewportSize.width < 768;
  const w = viewportSize.width;
  const h = viewportSize.height;

  // Compute smooth traveling coordinates for the floating companion
  let targetX;
  let targetY;

  if (isMobile) {
    // Docked safely on the right edge on mobile screens
    targetX = Math.max(16, w - 76);
    targetY = 85 + scrollProgress * Math.max(100, h - 210);
  } else {
    // Desktop: graceful S-curve gliding journey across the viewport as user scrolls
    const margin = 65;
    const minX = margin;
    const maxX = Math.max(minX + 100, w - 135);
    // 2 complete oscillations between right and left from first page to last page
    const wave = (Math.cos(scrollProgress * Math.PI * 4) + 1) / 2;
    targetX = minX + wave * (maxX - minX);
    targetY = 85 + scrollProgress * Math.max(100, h - 210);
  }

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* 1. Traveling Cyber Bot Companion (Only visible when chat is closed) */}
      <aside
        aria-label="Portfolio AI Assistant"
        className="fixed inset-0 pointer-events-none overflow-hidden z-[9990]"
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                x: targetX,
                y: targetY,
                opacity: 1,
                scale: 1,
              }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{
                type: "spring",
                stiffness: 40,
                damping: 18,
                mass: 0.8,
              }}
              className="absolute top-0 left-0 pointer-events-auto"
              style={{ willChange: "transform" }}
            >
              {/* Micro-floating bobbing & hover animation */}
              <motion.button
                type="button"
                animate={{
                  y: [0, -8, 0],
                  rotate: isHovered ? [0, -4, 4, 0] : [0, 0, 0],
                }}
                transition={{
                  y: { repeat: Infinity, duration: 3.2, ease: "easeInOut" },
                  rotate: { duration: 0.4 },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative flex items-center gap-3 p-1.5 rounded-full cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                title="Chat with Bikrant's AI Assistant"
              >
                {/* Outer Gyro Ring with slow rotation */}
                <div className="absolute -inset-2 rounded-full border border-cyan-400/25 border-dashed animate-spin-slow pointer-events-none" />

                {/* Pulsing Outer Radar Waves */}
                <span className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping opacity-35 pointer-events-none" />

                {/* Neon Glow Aura */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500/40 via-blue-500/30 to-emerald-400/30 blur-md opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />

                {/* Glass Sphere Core */}
                <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#0a1e34]/95 via-[#040e1b]/95 to-black/95 border-2 border-cyan-400/70 group-hover:border-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.4),inset_0_1px_8px_rgba(255,255,255,0.25)] flex items-center justify-center transition-all duration-300">
                  {/* Robot SVG Avatar with animated blinking eyes */}
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-300 group-hover:text-white transition-colors drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Antenna */}
                    <line x1="12" y1="2" x2="12" y2="6" stroke="#22d3ee" />
                    <circle cx="12" cy="2" r="1.2" fill="#22d3ee" stroke="#22d3ee" />
                    {/* Head Box */}
                    <rect x="4" y="6" width="16" height="12" rx="3.5" fill="#041221" fillOpacity="0.85" stroke="#22d3ee" strokeWidth="1.6" />
                    {/* Glowing LED Eyes */}
                    <circle cx="9" cy="11" r="1.6" fill="#22d3ee" className="animate-pulse" />
                    <circle cx="15" cy="11" r="1.6" fill="#22d3ee" className="animate-pulse" />
                    {/* Digital Smile */}
                    <path d="M8.5 15c1 1 2.5 1.2 3.5 1.2s2.5-.2 3.5-1.2" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
                    {/* Side Communication Nodes */}
                    <line x1="2" y1="11" x2="4" y2="11" stroke="#38bdf8" />
                    <line x1="20" y1="11" x2="22" y2="11" stroke="#38bdf8" />
                  </svg>

                  {/* Active Live Status Dot */}
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#020409] shadow-[0_0_8px_#34d399]" />
                </div>

                {/* Holographic Pill Label (Desktop) */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-cyan-400/40 text-[11px] font-mono text-cyan-300 group-hover:text-white group-hover:border-cyan-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
                  <span className="font-semibold tracking-wide">Ask AI</span>
                  <span className="text-[9px] text-gray-400 border-l border-white/15 pl-1.5 hidden group-hover:inline">
                    Qwen 27B
                  </span>
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>

      {/* 2. Backdrop when Chat is open (click-outside to close) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[99997] pointer-events-auto"
          />
        )}
      </AnimatePresence>

      {/* 3. Solid, Fixed Chat Window Modal (Always stationary and fully interactive) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className={`fixed z-[99999] pointer-events-auto ${
              isMobile
                ? "inset-x-3 bottom-3 h-[520px] max-h-[86vh]"
                : "bottom-6 right-6 md:right-8 w-[390px] h-[540px] max-h-[85vh]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <ChatBox onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
