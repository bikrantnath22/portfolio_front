import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import "./styles.css";
import ShinyText from "./ShinyText";
import {
  CodeBracketDoodle,
  LightbulbDoodle,
  RocketDoodle,
  StarDoodle,
} from "./CartoonDoodles";

const descriptions = [
  "AI/ML Engineer",
  "Full-Stack Developer",
  "VR Developer",
  "GenAI, LLM, RAG & GAN",
];

const skillTags = [
  { label: "AI/ML + Privacy", color: "green" },
  { label: "Full-Stack Apps", color: "cyan" },
  { label: "VR & GenAI", color: "purple" },
];

// Orbital particle ring around profile photo
const OrbitalParticles = () => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 2,
    orbitRadius: 52 + Math.random() * 5,
    speed: 20 + Math.random() * 15,
    delay: i * (360 / 12),
    color:
      i % 3 === 0
        ? "rgba(34, 197, 94, 0.8)"
        : i % 3 === 1
        ? "rgba(6, 182, 212, 0.6)"
        : "rgba(139, 92, 246, 0.5)",
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: p.speed,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay * 0.05,
          }}
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            position: "absolute",
            top: "50%",
            left: "50%",
            transformOrigin: `0 0`,
          }}
        >
          <motion.div
            style={{
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              borderRadius: "50%",
              position: "absolute",
              top: `-${p.orbitRadius}%`,
              left: `-${p.size / 2}px`,
            }}
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: p.speed,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

const SittingCartoon = () => {
  const [isWaving, setIsWaving] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isWaving) {
      setIsWaving(true);
      setTimeout(() => {
        setIsWaving(false);
      }, 2000);
    }
  };

  return (
    <div className="absolute -top-[48px] right-4 z-10 cursor-pointer group anti-invert" onClick={handleClick}>
      <style>
        {`
          @keyframes hand-wave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-15deg); }
            75% { transform: rotate(15deg); }
          }
          @keyframes type-left {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-1.5px); }
          }
          @keyframes type-right {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-1.5px); }
          }
          @keyframes leg-swing {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(8deg); }
          }
        `}
      </style>
      <div className="relative">
        <svg width="75" height="60" viewBox="0 0 75 60" fill="none" className="block drop-shadow-xl overflow-visible">
            {/* Background Leg (Dangling) with idle swing */}
            <g style={{ transformOrigin: "32px 46px", animation: "leg-swing 3s infinite ease-in-out" }}>
              {/* Short */}
              <path d="M32 46 L32 50" stroke="#1e3a8a" strokeWidth="4" strokeLinecap="round"/>
              {/* Leg */}
              <path d="M32 49 L32 55" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round"/>
              {/* Shoe */}
              <ellipse cx="33" cy="56" rx="4" ry="2" fill="#ef4444"/>
              <path d="M30 57.5 L36 57.5" stroke="#ffffff" strokeWidth="1"/>
            </g>

            {/* Background Arm Typing */}
            {!isWaving && (
              <g style={{ animation: "type-left 0.3s infinite alternate ease-in-out" }}>
                <path d="M38 32 Q44 38 50 43" stroke="#b91c1c" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="51" cy="43" r="1.5" fill="#fcd34d"/>
              </g>
            )}
            
            {/* Laptop Base & Screen (Right Side) */}
            <rect x="45" y="45" width="18" height="2" rx="1" fill="#475569"/>
            {/* Hinge is at x=61. Screen opens to the left towards x=58 */}
            <path d="M61 45 L58 28 L56 28 L59 45 Z" fill="#1e293b"/>
            {/* Glowing Screen facing Left */}
            <path d="M60 44 L57 29 L56 29 L59 44 Z" fill="#bae6fd"/>
            <path d="M59 40 L57 40 M59 36 L56 36 M58 32 L57 32" stroke="#4ade80" strokeWidth="1"/>

            {/* Body (Red Hoodie) */}
            <path d="M28 47 Q28 35 34 29 L40 29 Q44 35 42 47 Z" fill="#ef4444"/>
            <path d="M28 40 Q24 30 34 29 Z" fill="#ef4444"/>

            {/* Foreground Leg (Crossed on ledge) */}
            <path d="M30 45 Q38 44.5 45 47" stroke="#fcd34d" strokeWidth="3.5" strokeLinecap="round"/>
            <ellipse cx="46" cy="47" rx="2.5" ry="1.5" fill="#fcd34d"/>
            {/* Foreground Short */}
            <path d="M29 45 Q34 44 38 45.5" stroke="#1e3a8a" strokeWidth="5" strokeLinecap="round"/>

            {/* Neck */}
            <rect x="34" y="25" width="4" height="6" fill="#fcd34d"/>

            {/* Head Toggle */}
            {isWaving ? (
              <g id="head-front">
                <rect x="30" y="12" width="13" height="15" rx="4" fill="#fcd34d"/>
                {/* Front Cap (Backward) */}
                <path d="M28 14 C 28 2, 45 2, 45 14 Z" fill="#0f172a"/>
                {/* Snapback strap and hole */}
                <path d="M33 14 C 33 9, 40 9, 40 14 Z" fill="#fcd34d"/>
                <path d="M34 11 L39 11 M34 13 L39 13" stroke="#1e293b" strokeWidth="1"/>
                <circle cx="36.5" cy="4" r="1.5" fill="#0f172a"/>
                {/* Eyes Front */}
                <ellipse cx="33" cy="18" rx="2" ry="2.5" fill="#fff"/>
                <circle cx="33" cy="18" r="1" fill="#000"/>
                <ellipse cx="39" cy="18" rx="2" ry="2.5" fill="#fff"/>
                <circle cx="39" cy="18" r="1" fill="#000"/>
                {/* Big Front Smile */}
                <path d="M33 23 Q36 26 39 23" stroke="#9a3412" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                {/* Front Headphones */}
                <path d="M28 14 Q36 2 44 14" stroke="#1e3a8a" strokeWidth="2.5" fill="none"/>
                <rect x="27" y="13" width="3" height="8" rx="1.5" fill="#3b82f6" stroke="#1e40af" strokeWidth="0.5"/>
                <rect x="43" y="13" width="3" height="8" rx="1.5" fill="#3b82f6" stroke="#1e40af" strokeWidth="0.5"/>
              </g>
            ) : (
              <g id="head-profile">
                <rect x="30" y="12" width="13" height="15" rx="4" fill="#fcd34d"/>
                {/* Normal Profile Nose */}
                <path d="M43 18 Q44.5 20 43 22" stroke="#b45309" strokeWidth="1" fill="none"/>
                {/* Profile Cap (Backward) */}
                <path d="M28 14 C 28 4, 44 4, 44 14 Z" fill="#0f172a"/>
                {/* Brim facing left (backwards) */}
                <path d="M34 12 Q 28 10 22 12 L 22 14 Q 28 13 34 14 Z" fill="#1e293b"/>
                <circle cx="36" cy="6" r="1.5" fill="#0f172a"/>
                {/* Profile Eye */}
                <ellipse cx="40" cy="18" rx="2" ry="2.5" fill="#fff"/>
                <circle cx="41" cy="18" r="1" fill="#000"/>
                <path d="M38 15 L42 15" stroke="#9a3412" strokeWidth="1" strokeLinecap="round"/>
                {/* Profile Mouth */}
                <path d="M39 24 L42 24" stroke="#9a3412" strokeWidth="0.8"/>
                {/* Profile Headphones */}
                <path d="M34 6 Q40 4 43 12" stroke="#1e3a8a" strokeWidth="2.5" fill="none"/>
                <rect x="33" y="13" width="5" height="9" rx="2" fill="#3b82f6" stroke="#1e40af" strokeWidth="0.5"/>
                <circle cx="35.5" cy="17.5" r="1.5" fill="#fcd34d"/>
              </g>
            )}

            {/* Foreground Arm (Red Hoodie Sleeve) */}
            {!isWaving ? (
              <g style={{ animation: "type-right 0.35s infinite alternate ease-in-out" }}>
                <path d="M32 32 Q38 38 45 44" stroke="#ef4444" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="46" cy="44" r="2" fill="#fcd34d"/>
              </g>
            ) : (
              <g style={{ transformOrigin: "32px 32px", animation: "hand-wave 0.8s infinite ease-in-out" }}>
                <path d="M32 32 Q35 20 42 12" stroke="#ef4444" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="42" cy="12" r="2.5" fill="#fcd34d"/>
              </g>
            )}
        </svg>
      </div>
    </div>
  );
};

// Stagger animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const ProfileCard = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/CV-Bikrant_Nath.pdf";
    link.download = "CV-Bikrant-Nath.pdf";
    link.click();
  };

  // Typing effect
  useEffect(() => {
    if (charIndex < descriptions[index].length) {
      const timeout = setTimeout(() => {
        setText(descriptions[index].slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setText(" ");
      setCharIndex(0);
      setIndex((prevIndex) => (prevIndex + 1) % descriptions.length);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [charIndex, index]);

  const colorMap = {
    green: {
      border: "rgba(34, 197, 94, 0.5)",
      bg: "rgba(34, 197, 94, 0.06)",
      glow: "rgba(34, 197, 94, 0.1)",
    },
    cyan: {
      border: "rgba(6, 182, 212, 0.5)",
      bg: "rgba(6, 182, 212, 0.06)",
      glow: "rgba(6, 182, 212, 0.1)",
    },
    purple: {
      border: "rgba(139, 92, 246, 0.5)",
      bg: "rgba(139, 92, 246, 0.06)",
      glow: "rgba(139, 92, 246, 0.1)",
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex flex-col-reverse md:flex-row justify-center items-center w-full max-w-6xl mx-auto p-2 md:p-4 text-white font-poppins bg-transparent rounded-xl mb-6 md:mb-0"
    >
      {/* Floating cartoon doodles */}
      <CodeBracketDoodle className="text-green-400 top-4 left-4 hidden md:block" delay={0} />
      <LightbulbDoodle className="text-yellow-400 top-8 right-12 hidden md:block" delay={1} />
      <RocketDoodle className="text-cyan-400 bottom-8 left-16 hidden md:block" delay={2} />
      <StarDoodle className="text-green-300 bottom-16 right-4 hidden md:block" delay={3} />

      <div className="w-full text-center md:text-left px-4">
        {/* Greeting */}
        <motion.div variants={childVariants}>
          <span className="text-sm md:text-base font-medium text-gray-400 tracking-widest uppercase mb-2 block">
            Welcome to my portfolio
          </span>
        </motion.div>

        {/* Name - Aurora gradient */}
        <motion.h1
          variants={childVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold aurora-text leading-tight"
        >
          Hello, I am Bikrant
        </motion.h1>

        {/* Typing roles */}
        <motion.p
          variants={childVariants}
          className="text-green-400 text-lg sm:text-xl md:text-2xl mt-3 font-bold min-h-8"
        >
          {text}
          <span className="animate-pulse text-cyan-400">|</span>
        </motion.p>

        {/* Bio */}
        <motion.div variants={childVariants}>
          <ShinyText
            text="Results-driven AI/ML Engineer and Full-Stack Developer with expertise in privacy-preserving machine learning, Generative AI, LLM-powered applications, and scalable system design. M.Tech in CS&E from Tezpur University with hands-on research in differentially private synthetic data generation."
            disabled={false}
            speed={3}
            className="custom-class text-left md:text-justify text-gray-300 max-w-3xl mx-auto md:mx-0 leading-relaxed italic mt-4"
          />
        </motion.div>

        {/* ── Skill cards with gradient borders ── */}
        <motion.div
          variants={childVariants}
          className="mt-8 max-w-3xl"
          style={{ overflow: "visible" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {skillTags.map((item) => {
              const colors = colorMap[item.color];
              return (
                <motion.div
                  key={item.label}
                  className="relative rounded-lg px-4 py-3.5 text-sm text-gray-200 glass neon-hover cursor-default"
                  style={{
                    borderRadius: "14px 6px 14px 6px",
                    border: `1px solid ${colors.border}`,
                    background: colors.bg,
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: `0 0 25px ${colors.glow}`,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label === "VR & GenAI" && <SittingCartoon />}
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={childVariants}
          className="mt-8 flex flex-col sm:flex-row items-center sm:items-start gap-4"
        >
          <motion.button
            onClick={handleDownload}
            className="btn-premium border border-green-500/50 text-green-400 hover:bg-green-500 hover:text-black font-semibold px-6 py-2.5 rounded-full transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(34, 197, 94, 0.25)" }}
            whileTap={{ scale: 0.97 }}
          >
            Download CV
          </motion.button>

          <div className="flex gap-5 pt-1 sm:mt-0 items-center">
            <motion.a
              href="https://github.com/bikrantnath22"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              whileHover={{ scale: 1.15, color: "#22c55e" }}
              className="text-3xl text-white/70 hover:text-white transition-colors"
            >
              <GithubOutlined />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/bikrant-nath-7747781a7/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              whileHover={{ scale: 1.15, color: "#06b6d4" }}
              className="text-3xl text-white/70 hover:text-white transition-colors"
            >
              <LinkedinOutlined />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Profile photo with orbital particles */}
      <motion.div
        variants={childVariants}
        className="w-full flex justify-center mb-4 mt-2 md:mb-0 md:mt-0"
      >
        <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 flex items-center justify-center">
          {/* Orbital particles */}
          <OrbitalParticles />

          {/* Outer dashed orbital ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
            className="absolute w-[102%] h-[102%] rounded-full border-[1px] border-dashed border-gray-500/40"
          />

          {/* Inner smooth orbital ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute w-[96%] h-[96%] rounded-full border-[2px] border-transparent"
            style={{
              borderTopColor: "rgba(34, 197, 94, 0.8)",
              borderRightColor: "rgba(6, 182, 212, 0.8)",
              borderBottomColor: "rgba(139, 92, 246, 0.8)",
              filter: "drop-shadow(0 0 10px rgba(6, 182, 212, 0.3))",
            }}
          />

          {/* Soft ambient glow behind everything */}
          <div
            className="absolute w-[110%] h-[110%] rounded-full blur-2xl opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(34,197,94,0.4) 0%, rgba(6,182,212,0.1) 60%, transparent 100%)",
            }}
          />

          {/* Profile image */}
          <div
            className="w-[90%] h-[90%] rounded-full bg-cover bg-center relative z-10 theme-ignore"
            style={{
              backgroundImage: "url('/imgProfile.jpeg')",
              maskImage: "url('/image.png')",
              WebkitMaskImage: "url('/image.png')",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        </div>
      </motion.div>

      {/* Scroll down indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="scroll-indicator"
        >
          <path
            d="M4 7L10 13L16 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
};

export default ProfileCard;
