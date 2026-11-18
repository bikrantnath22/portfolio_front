import { useEffect, useRef, useState } from "react";
import { education } from "../data/resumeData";

// Count-up animation for CGPA
const CountUp = ({ target, duration = 1800 }) => {
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
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount((numericTarget * eased).toFixed(2));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
};

const EducationSection = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 font-body text-white">
      {/* Eyebrow + Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
          ACADEMIC FOUNDATION
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight mt-2">
          Education
        </h2>
        <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-[65ch] mx-auto leading-relaxed">
          Postgraduate engineering and computing degrees with specialized coursework in machine learning and distributed systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="card-unified p-6 md:p-8 rounded-2xl group relative overflow-hidden transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Institution badge + degree row */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 font-heading bg-cyan-950/40 border border-cyan-400/30 text-cyan-400">
                  {edu.institution.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug font-heading">
                    {edu.degree}
                  </h3>
                  <p className="text-cyan-400 font-medium text-sm mt-1">
                    {edu.institution}
                  </p>
                </div>
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-6 font-mono">
                <span>📅 {edu.duration}</span>
                <span>📍 {edu.location}</span>
              </div>
            </div>

            {/* CGPA badge */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-gray-400 uppercase tracking-wider font-mono">
                Cumulative Grade
              </span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-400/30">
                <span className="text-sm font-bold font-mono text-cyan-300">
                  <CountUp target={edu.cgpa.split(" ")[0]} />
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {edu.cgpa.substring(edu.cgpa.indexOf(" ") + 1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationSection;
