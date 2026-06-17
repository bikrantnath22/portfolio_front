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
        <div className="absolute left-[20px] md:left-[28px] top-6 bottom-6 w-[2px] bg-white/10 rounded-full" />
        
        {/* Scrollytelling Animated Line */}
        <motion.div 
          className="absolute left-[20px] md:left-[28px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-green-500 via-cyan-500 to-purple-500 origin-top rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)]"
          style={{ scaleY: scrollYProgress }}
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
                className="w-4 h-4 rounded-full bg-black border-2 border-green-500 shadow-[0_0_10px_#22c55e]"
                whileInView={{ scale: [1, 1.5, 1], boxShadow: ["0 0 10px #22c55e", "0 0 30px #22c55e", "0 0 10px #22c55e"] }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>

            {/* Speech bubble card with tilt + neon hover */}
            <motion.div
              className="glass p-6 md:p-8 rounded-2xl border border-white/10 hover:border-green-500/30 transition-all duration-300 shadow-xl group"
              whileHover={{
                y: -6,
                boxShadow: "0 10px 40px -10px rgba(34, 197, 94, 0.2)",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-green-400 transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base font-medium mt-1">
                    {exp.company}
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-green-400 text-sm font-bold flex items-center gap-1.5 md:justify-end bg-green-500/10 px-3 py-1 rounded-full w-fit md:ml-auto">
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
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/80 shadow-[0_0_5px_#06b6d4]" />
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Tech tags with gradient hover */}
              <div className="flex flex-wrap gap-2 mt-6">
                {exp.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-lg border border-white/5 bg-white/5 text-gray-300 group-hover:border-cyan-500/20 group-hover:text-cyan-300 transition-all cursor-default shadow-sm"
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
