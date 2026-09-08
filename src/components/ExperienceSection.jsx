import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experience } from "../data/resumeData";
import { CodeBracketDoodle, GearDoodle } from "./CartoonDoodles";
import "./styles.css";

const ExperienceSection = () => {
  const containerRef = useRef(null);
  
  // Scrollytelling hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const rocketTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const experienceColors = [
    { primary: "#22c55e", bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)" },
    { primary: "#06b6d4", bg: "rgba(6,182,212,0.12)", border: "rgba(6,182,212,0.3)" },
    { primary: "#8b5cf6", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.3)" },
    { primary: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)" },
  ];

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.3 },
        },
      }}
      className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12 relative"
    >
      {/* Floating cartoon doodles */}
      <CodeBracketDoodle className="text-green-400 -top-4 right-8 hidden md:block" delay={0} />
      <GearDoodle className="text-cyan-400 top-20 -left-6 hidden md:block" delay={2} />

      <motion.h2
        className="cartoon-heading text-4xl md:text-5xl font-extrabold text-center mb-16 tracking-tight"
        style={{
          background: "linear-gradient(to right, #fff, #a1a1aa, #22c55e)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        My Journey
      </motion.h2>

      <div className="relative pl-12 md:pl-16 space-y-12">
        {/* Scrollytelling Track Background */}
        <div className="absolute left-[20px] md:left-[28px] top-6 bottom-6 w-[2px] bg-white/5 rounded-full" />
        
        {/* Scrollytelling Animated Line */}
        <motion.div 
          className="absolute left-[20px] md:left-[28px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-green-500 via-cyan-500 to-purple-500 origin-top rounded-full"
          style={{ 
            scaleY: scrollYProgress,
            filter: "drop-shadow(0 0 8px rgba(34,197,94,0.8)) drop-shadow(0 0 20px rgba(34,197,94,0.4))",
          }}
        />

        {/* The Rocket Explorer */}
        <div className="absolute left-[6px] md:left-[14px] top-6 bottom-6 w-8 pointer-events-none z-20">
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 text-2xl drop-shadow-[0_0_20px_rgba(34,197,94,1)]"
            style={{ 
              top: rocketTop,
              marginTop: "-15px"
            }}
          >
            🚀
          </motion.div>
        </div>

        {experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            className="relative"
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            {/* Timeline Planet / Node */}
            <div className="absolute -left-12 md:-left-16 top-6">
              <motion.div 
                className="w-4 h-4 rounded-full bg-black border-2 border-green-500"
                style={{ boxShadow: "0 0 12px #22c55e, 0 0 30px rgba(34,197,94,0.4)" }}
                whileInView={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>

            {/* Card */}
            <motion.div
              className="glass p-6 md:p-8 rounded-2xl border border-white/8 hover:border-green-500/30 transition-all duration-300 shadow-xl group relative overflow-hidden"
              whileHover={{
                y: -6,
                boxShadow: "0 15px 50px -10px rgba(34, 197, 94, 0.2), 0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${experienceColors[index % experienceColors.length].primary}60, transparent)`,
                }}
              />

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  {/* Company Initials Badge */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 mt-0.5"
                    style={{
                      background: experienceColors[index % experienceColors.length].bg,
                      border: `1px solid ${experienceColors[index % experienceColors.length].border}`,
                      color: experienceColors[index % experienceColors.length].primary,
                      fontFamily: "var(--font-heading, 'Space Grotesk', sans-serif)",
                    }}
                  >
                    {exp.company.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-green-400 transition-colors leading-tight"
                      style={{ fontFamily: "var(--font-heading, 'Space Grotesk', sans-serif)", letterSpacing: "-0.02em" }}
                    >
                      {exp.role}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base font-medium mt-1">
                      {exp.company}
                    </p>
                  </div>
                </div>
                <div className="text-left md:text-right shrink-0">
                  <p
                    className="text-sm font-bold flex items-center gap-1.5 md:justify-end px-3 py-1 rounded-full w-fit md:ml-auto"
                    style={{
                      background: experienceColors[index % experienceColors.length].bg,
                      color: experienceColors[index % experienceColors.length].primary,
                      border: `1px solid ${experienceColors[index % experienceColors.length].border}`,
                    }}
                  >
                    {exp.duration}
                  </p>
                  <p className="text-gray-500 text-xs flex items-center gap-1.5 md:justify-end mt-2">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {exp.location}
                  </p>
                </div>
              </div>

              <ul className="space-y-3 mt-5">
                {exp.highlights.map((highlight, idx) => (
                  <motion.li
                    key={idx}
                    className="flex gap-3 text-gray-300 text-sm leading-relaxed"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{
                        background: experienceColors[index % experienceColors.length].primary,
                        boxShadow: `0 0 6px ${experienceColors[index % experienceColors.length].primary}`,
                      }}
                    />
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {exp.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-lg text-gray-300 transition-all cursor-default"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid rgba(255,255,255,0.07)`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = experienceColors[index % experienceColors.length].border;
                      e.currentTarget.style.color = experienceColors[index % experienceColors.length].primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                      e.currentTarget.style.color = "#d1d5db";
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExperienceSection;
