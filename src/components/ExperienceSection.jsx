import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { experience } from "../data/resumeData";

const ExperienceSection = () => {
  const containerRef = useRef(null);

  // Scrollytelling hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const progressTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 font-body text-white"
    >
      {/* Section Eyebrow + Heading */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
          CAREER &amp; INDUSTRY
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight mt-2">
          Experience
        </h2>
        <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-[65ch] mx-auto leading-relaxed">
          Production software engineering, startup founding, and full-stack system architecture.
        </p>
      </div>

      <div className="relative pl-10 md:pl-16 space-y-8 max-w-4xl mx-auto">
        {/* Scrollytelling Track Background */}
        <div className="absolute left-[16px] md:left-[24px] top-4 bottom-4 w-[2px] bg-white/5 rounded-full" />

        {/* Scrollytelling Animated Technical Line */}
        <motion.div
          className="absolute left-[16px] md:left-[24px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-cyan-400 via-cyan-500 to-cyan-600 origin-top rounded-full"
          style={{
            scaleY: scrollYProgress,
            filter: "drop-shadow(0 0 6px rgba(34,211,238,0.7))",
          }}
        />

        {/* The Technical Tracker Node */}
        <div className="absolute left-[10px] md:left-[18px] top-4 bottom-4 w-4 pointer-events-none z-20">
          <motion.div
            className="w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-black"
            style={{
              top: progressTop,
              boxShadow: "0 0 10px #22d3ee",
              marginTop: "-7px",
            }}
          />
        </div>

        {experience.map((exp) => (
          <div key={exp.id} className="relative">
            {/* Timeline Node */}
            <div className="absolute -left-10 md:-left-16 top-6">
              <div
                className="w-3.5 h-3.5 rounded-full bg-black border-2 border-cyan-400"
                style={{ boxShadow: "0 0 10px #22d3ee" }}
              />
            </div>

            {/* Unified Card */}
            <div className="card-unified p-6 md:p-8 rounded-2xl group relative overflow-hidden transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  {/* Company Badge */}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 font-heading text-cyan-400 bg-cyan-950/40 border border-cyan-400/30">
                    {exp.company.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight font-heading">
                      {exp.role}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base font-medium mt-1">
                      {exp.company}
                    </p>
                  </div>
                </div>

                <div className="text-left md:text-right shrink-0">
                  <span className="text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-400/30 px-2.5 py-1 rounded-md inline-block">
                    {exp.duration}
                  </span>
                  {exp.location && (
                    <p className="text-gray-400 text-xs flex items-center gap-1.5 md:justify-end mt-2 font-mono">
                      <span>📍</span>
                      <span>{exp.location}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Highlights (strictly original text preserved) */}
              <ul className="space-y-2.5 mt-5">
                {exp.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-gray-300 text-sm leading-relaxed max-w-[65ch]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Chips */}
              {exp.tech && (
                <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-white/5">
                  {exp.tech
                    .flatMap((t) => (typeof t === "string" ? t.split(",").map((s) => s.trim()) : t))
                    .filter(Boolean)
                    .map((t, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
