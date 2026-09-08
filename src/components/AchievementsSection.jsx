import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { awards } from "../data/resumeData";
import { TrophyDoodle } from "./CartoonDoodles";
import "./styles.css";

// Particle burst component for hover
const ParticleBurst = ({ active }) => {
  if (!active) return null;

  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 200,
    y: (Math.random() - 0.5) * 100 - 30,
    size: Math.random() * 5 + 3,
    color: ["#22c55e", "#eab308", "#06b6d4", "#ec4899", "#8b5cf6"][i % 5],
    shape: i % 3 === 0 ? "star" : i % 3 === 1 ? "circle" : "diamond",
    delay: i * 0.05,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-0"
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: 0,
            scale: 0,
            rotate: 360,
          }}
          transition={{
            duration: 1.2,
            delay: p.delay,
            ease: "easeOut",
          }}
        >
          {p.shape === "star" ? (
            <svg width={p.size * 2} height={p.size * 2} viewBox="0 0 20 20">
              <path
                d="M10 0L12.5 7.5L20 10L12.5 12.5L10 20L7.5 12.5L0 10L7.5 7.5Z"
                fill={p.color}
              />
            </svg>
          ) : p.shape === "diamond" ? (
            <div
              style={{
                width: p.size,
                height: p.size,
                background: p.color,
                transform: "rotate(45deg)",
              }}
            />
          ) : (
            <div
              style={{
                width: p.size,
                height: p.size,
                background: p.color,
                borderRadius: "50%",
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

const AchievementsSection = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.3 },
        },
      }}
      className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12 relative"
    >
      <motion.h2
        className="cartoon-heading text-2xl md:text-4xl font-bold text-center mb-10 golden-shimmer tracking-wide"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Awards & Achievements
      </motion.h2>

      <div className="space-y-6">
        {awards.map((award, index) => (
          <motion.div
            key={award.id}
            className="sparkle-hover relative hand-drawn-border p-6 md:p-8 glass cartoon-card overflow-hidden group neon-hover"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            onMouseEnter={() => setHoveredId(award.id)}
            onMouseLeave={() => setHoveredId(null)}
            whileHover={{ y: -4 }}
            style={{
              borderColor: hoveredId === award.id ? "rgba(245, 158, 11, 0.45)" : "rgba(245, 158, 11, 0.2)",
              boxShadow: hoveredId === award.id
                ? "0 0 30px rgba(245,158,11,0.2), 0 0 60px rgba(245,158,11,0.08), 0 12px 40px rgba(0,0,0,0.4)"
                : "0 2px 20px rgba(0,0,0,0.3)",
              transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            {/* Particle burst on hover */}
            <AnimatePresence>
              {hoveredId === award.id && <ParticleBurst active={true} />}
            </AnimatePresence>

            {/* Top accent bar on hover */}
            <div
              className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-500"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.7), rgba(251,191,36,0.7), transparent)",
                opacity: hoveredId === award.id ? 1 : 0,
              }}
            />

            <div className="flex items-start gap-4 md:gap-6">
              {/* Trophy doodle with golden shimmer + pulse ring */}
              <div className="shrink-0 relative">
                {hoveredId === award.id && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [0.6, 0], scale: [1, 1.8] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ background: "radial-gradient(circle, rgba(245,158,11,0.3), transparent)" }}
                  />
                )}
                <motion.div
                  className="text-yellow-400"
                  animate={
                    hoveredId === award.id
                      ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.6 }}
                >
                  <TrophyDoodle className="relative" delay={0} />
                </motion.div>
              </div>

              <div className="flex-1">
                {/* Rank badge + category tag row */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="status-badge status-badge-amber">
                    🥈 1st Runner-Up
                  </span>
                  <span className="status-badge status-badge-purple">
                    🏆 Hackathon
                  </span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-2">
                  <h3 className="text-lg md:text-xl font-bold text-white"
                    style={{ fontFamily: "var(--font-heading, 'Space Grotesk', sans-serif)", letterSpacing: "-0.01em" }}
                  >
                    {award.title}
                  </h3>
                  <span className="text-amber-400 text-sm font-semibold px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 w-fit">
                    {award.year}
                  </span>
                </div>

                <p className="text-amber-400/80 text-sm font-medium mb-2">
                  📍 {award.organization}
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {award.description}
                </p>
              </div>
            </div>

            {/* Ambient glow */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/0 group-hover:bg-amber-500/8 rounded-full blur-3xl transition-all duration-500" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AchievementsSection;
