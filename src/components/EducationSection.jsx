import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { education } from "../data/resumeData";
import { GradCapDoodle, StarDoodle } from "./CartoonDoodles";
import "./styles.css";

// Count-up animation for CGPA
const CountUp = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const numericTarget = parseFloat(target);
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount((numericTarget * eased).toFixed(2));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
};

const EducationSection = () => {
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
      {/* Floating cartoon doodles */}
      <StarDoodle className="text-cyan-400 -top-2 left-10 hidden md:block" delay={1} />

      <motion.h2
        className="cartoon-heading text-2xl md:text-4xl font-bold text-center mb-10 aurora-text tracking-wide"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Education
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            className="hand-drawn-border p-6 md:p-7 glass cartoon-card group relative overflow-hidden neon-hover"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            whileHover={{ y: -6 }}
          >
            {/* Graduation cap doodle in corner */}
            <div className="absolute -top-1 -right-1 opacity-60 group-hover:opacity-100 transition-opacity">
              <GradCapDoodle className="text-green-400" delay={index} />
            </div>

            {/* Gradient accent strip */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-400 via-cyan-400 to-purple-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />

            <div className="pl-3">
              <h3 className="text-lg md:text-xl font-bold text-white mb-1 pr-10">
                {edu.degree}
              </h3>
              <p className="text-green-400 font-medium text-sm md:text-base mb-2">
                {edu.institution}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-3">
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {edu.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {edu.location}
                </span>
              </div>

              {/* CGPA badge with count-up animation */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
                style={{
                  background: "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(6, 182, 212, 0.08))",
                  borderColor: "rgba(34, 197, 94, 0.2)",
                }}
              >
                <span className="text-xs text-gray-400 uppercase tracking-wider">CGPA</span>
                <span className="text-sm font-bold text-green-400">
                  <CountUp target={edu.cgpa.split(" ")[0]} />
                  <span className="ml-1 text-[11px] md:text-xs text-green-400/80 font-normal tracking-normal">
                    {edu.cgpa.substring(edu.cgpa.indexOf(" ") + 1)}
                  </span>
                </span>
              </div>
            </div>

            {/* Ambient glow on hover */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-500/0 group-hover:bg-green-500/5 rounded-full blur-3xl transition-all duration-500" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EducationSection;
