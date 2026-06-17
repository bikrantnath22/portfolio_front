import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  EyeOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { projects } from "../data/projects";

// Mouse-tracking tilt card
const TiltCard = ({ children, className, style, onClick }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setTilt({
      x: ((y - centerY) / centerY) * -4,
      y: ((x - centerX) / centerX) * 4,
    });
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{
        ...style,
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Glow follower */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[20px]"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(34, 197, 94, 0.12) 0%, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
};

const ProjectPage = () => {
  const [page, setPage] = useState(0);
  const projectsPerPage = 4;
  const topRef = useRef(null);
  const navigate = useNavigate();

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handleNext = () => {
    if ((page + 1) * projectsPerPage < projects.length) {
      setPage((prev) => prev + 1);
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openProject = (id) => {
    navigate(`/project/${id}`);
  };

  const currentProjects = projects.slice(
    page * projectsPerPage,
    (page + 1) * projectsPerPage
  );

  return (
    <div className="w-full max-w-5xl mx-auto py-16 px-6">
      <motion.h1
        ref={topRef}
        className="cartoon-heading text-4xl md:text-5xl font-extrabold text-center aurora-text mb-4 tracking-wide"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        My Projects
      </motion.h1>

      <motion.p
        className="text-center text-gray-400 text-sm mb-10 max-w-lg mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        A collection of projects spanning AI/ML, full-stack development, VR, and more
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {currentProjects.map((project, index) => (
          <TiltCard
            key={`project-${page}-${project.id}`}
            className="group relative rounded-2xl bg-gradient-to-br from-gray-900/80 via-gray-950 to-black shadow-lg hover:shadow-green-500/20 transition-all duration-500 flex flex-col overflow-hidden cursor-pointer border border-gray-800/50 hover:border-green-500/30"
            style={{ borderRadius: "20px 8px 20px 8px" }}
            onClick={() => openProject(project.id)}
          >
            {/* Year badge */}
            {project.year && (
              <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-green-500/15 border border-green-500/25 text-xs font-medium text-green-400 backdrop-blur-sm">
                {project.year}
              </div>
            )}

            {/* Image with overlay gradient */}
            <div className="relative overflow-hidden">
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110 anti-invert"
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              />
              {/* Gradient overlay at bottom of image */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />

              {/* Shimmer effect on image */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, transparent 40%, rgba(34, 197, 94, 0.06) 50%, transparent 60%)",
                    backgroundSize: "200% 200%",
                    animation: "aurora-shift 3s ease-in-out infinite",
                  }}
                />
              </div>

              {/* Hover tagline overlay */}
              <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="w-full glass rounded-xl p-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 border border-green-500/10">
                  <p className="text-sm text-gray-200 leading-relaxed line-clamp-2">
                    {project.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Card content */}
            <div className="p-5 flex flex-col gap-2 flex-1">
              <h2 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors duration-300 leading-tight">
                {project.title}
              </h2>

              {/* Role badge */}
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                {project.role}
              </span>

              {/* Tech stack pills */}
              <div className="flex gap-1.5 mt-1 flex-wrap">
                {project.stack.map((tech, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-gray-800/60 text-gray-300 border border-gray-700/30 group-hover:border-green-500/20 transition-colors"
                    whileHover={{
                      scale: 1.08,
                      borderColor: "rgba(6, 182, 212, 0.4)",
                    }}
                  >
                    <span className="text-sm">{tech.icon}</span>
                    <span>{tech.name}</span>
                  </motion.div>
                ))}
              </div>

              {/* Action buttons - pushed to bottom */}
              <div className="mt-auto pt-4 flex flex-wrap gap-2">
                <motion.button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    openProject(project.id);
                  }}
                  className="btn-premium inline-flex items-center gap-2 border border-green-500/40 px-4 py-2 text-xs font-medium text-green-300 transition-all hover:bg-green-500 hover:text-black hover:shadow-lg hover:shadow-green-500/20"
                  style={{ borderRadius: "14px 6px 14px 6px" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <EyeOutlined /> Case study
                </motion.button>
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="btn-premium inline-flex items-center gap-2 border border-gray-600/40 px-4 py-2 text-xs font-medium text-gray-300 transition-all hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/10"
                    style={{ borderRadius: "14px 6px 14px 6px" }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <GithubOutlined /> GitHub
                  </motion.a>
                )}
              </div>
            </div>

            {/* Corner glow effect on hover */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-500/0 group-hover:bg-green-500/8 rounded-full blur-3xl transition-all duration-700" />
          </TiltCard>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 mt-14">
        {page > 0 && (
          <motion.button
            onClick={handlePrev}
            className="btn-premium flex items-center gap-2 px-6 py-2 border border-green-500/50 hover:bg-green-500 hover:text-black text-green-400 font-medium transition-all duration-300 shadow-md hover:shadow-green-500/40"
            style={{ borderRadius: "14px 6px 14px 6px" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <ArrowLeftOutlined /> Previous
          </motion.button>
        )}

        {/* Page dots */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setPage(i);
                topRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${i === page
                  ? "bg-green-400 w-7"
                  : "bg-gray-600 hover:bg-gray-400 w-2.5"
                }`}
              whileHover={{ scale: 1.3 }}
            />
          ))}
        </div>

        {(page + 1) * projectsPerPage < projects.length && (
          <motion.button
            onClick={handleNext}
            className="btn-premium flex items-center gap-2 px-6 py-2 border border-green-500/50 hover:bg-green-500 hover:text-black text-green-400 font-medium transition-all duration-300 shadow-md hover:shadow-green-500/40"
            style={{ borderRadius: "14px 6px 14px 6px" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Next <ArrowRightOutlined />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
