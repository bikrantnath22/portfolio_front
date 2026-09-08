import { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  EyeOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { projects } from "../data/projects";

// Unique gradient banner per project â€” no repeated images
const projectBanners = {
  1:  { gradient: "linear-gradient(135deg, #0f2027 0%, #1a1a2e 40%, #16213e 70%, #0d1b2a 100%)", accent: "#f97316", label: "Privacy ML" },
  2:  { gradient: "linear-gradient(135deg, #0a2e1a 0%, #064e3b 50%, #065f46 100%)", accent: "#34d399", label: "eCommerce" },
  3:  { gradient: "linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #1e1b4b 100%)", accent: "#a78bfa", label: "Multi-Agent AI" },
  4:  { gradient: "linear-gradient(135deg, #1a0000 0%, #3b0f0f 50%, #450a0a 100%)", accent: "#f87171", label: "AI Security" },
  5:  { gradient: "linear-gradient(135deg, #0c1a33 0%, #1e3a5f 50%, #1e40af 100%)", accent: "#60a5fa", label: "Data Analytics" },
  6:  { gradient: "linear-gradient(135deg, #1a1200 0%, #3d2b00 50%, #451a00 100%)", accent: "#fbbf24", label: "SQL" },
  7:  { gradient: "linear-gradient(135deg, #001a0c 0%, #033f1a 50%, #064e3b 100%)", accent: "#4ade80", label: "Full-Stack" },
  8:  { gradient: "linear-gradient(135deg, #1a0a1a 0%, #3b0764 50%, #2e1065 100%)", accent: "#c084fc", label: "LLM Research" },
  9:  { gradient: "linear-gradient(135deg, #0a1628 0%, #1e3a5f 45%, #0c4a6e 100%)", accent: "#38bdf8", label: "CV Pipeline" },
  10: { gradient: "linear-gradient(135deg, #0f1a10 0%, #1e3a23 50%, #14532d 100%)", accent: "#86efac", label: "Data Quality" },
  11: { gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)", accent: "#818cf8", label: "VR / Unity" },
  12: { gradient: "linear-gradient(135deg, #001a1a 0%, #0e4d4d 50%, #0c4a6e 100%)", accent: "#22d3ee", label: "AI Chat" },
  13: { gradient: "linear-gradient(135deg, #0d1f0d 0%, #1a3a1a 50%, #166534 100%)", accent: "#4ade80", label: "Full-Stack" },
  14: { gradient: "linear-gradient(135deg, #0a0a1a 0%, #1e1e3f 50%, #1e1b4b 100%)", accent: "#a5b4fc", label: "Full-Stack" },
  15: { gradient: "linear-gradient(135deg, #1a0a00 0%, #431407 50%, #7c2d12 100%)", accent: "#fb923c", label: "Frontend" },
};

const categoryFilters = [
  { label: "All", value: "all" },
  { label: "AI / ML", value: "ai" },
  { label: "Full-Stack", value: "fullstack" },
  { label: "Data", value: "data" },
  { label: "Security", value: "security" },
  { label: "VR / Research", value: "vr" },
];

const projectCategories = {
  1: "ai", 2: "fullstack", 3: "ai", 4: "security",
  5: "data", 6: "data", 7: "fullstack", 8: "ai",
  9: "data", 10: "data", 11: "vr", 12: "ai",
  13: "fullstack", 14: "fullstack", 15: "fullstack",
};

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
      x: ((y - centerY) / centerY) * -3,
      y: ((x - centerX) / centerX) * 3,
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
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(34, 197, 94, 0.10) 0%, transparent 65%)`,
        }}
      />
      {children}
    </motion.div>
  );
};

// Project banner â€” unique gradient per project (no repeated images)
const ProjectBanner = ({ project }) => {
  const banner = projectBanners[project.id] || {
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
    accent: "#22c55e",
    label: "Project",
  };

  return (
    <div className="relative overflow-hidden h-44" style={{ background: banner.gradient }}>
      {/* Geometric accent shapes */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 blur-xl"
        style={{ background: banner.accent }}
      />
      <div
        className="absolute bottom-4 -left-6 w-20 h-20 rounded-full opacity-10 blur-lg"
        style={{ background: banner.accent }}
      />
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(${banner.accent}33 1px, transparent 1px), linear-gradient(90deg, ${banner.accent}33 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      {/* Category label pill */}
      <div
        className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
        style={{ background: `${banner.accent}22`, color: banner.accent, border: `1px solid ${banner.accent}40` }}
      >
        {banner.label}
      </div>
      {/* Project ID watermark */}
      <div
        className="absolute bottom-4 right-4 text-6xl font-black opacity-10 select-none"
        style={{ color: banner.accent }}
      >
        #{String(project.id).padStart(2, "0")}
      </div>
      {/* Project title overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 pb-3">
        <div
          className="w-8 h-0.5 mb-2 rounded-full"
          style={{ background: banner.accent }}
        />
      </div>
      {/* Hover tagline */}
      <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-all duration-400">
        <div
          className="w-full rounded-xl p-2.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-400"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)", border: `1px solid ${banner.accent}25` }}
        >
          <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">{project.tagline}</p>
        </div>
      </div>
    </div>
  );
};

const ProjectPage = () => {
  const [page, setPage] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const projectsPerPage = 6;
  const topRef = useRef(null);
  const navigate = useNavigate();

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => projectCategories[p.id] === activeFilter);
  }, [activeFilter]);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handleNext = () => {
    if ((page + 1) * projectsPerPage < filteredProjects.length) {
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

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setPage(0);
  };

  const openProject = (id) => {
    navigate(`/project/${id}`);
  };

  const currentProjects = filteredProjects.slice(
    page * projectsPerPage,
    (page + 1) * projectsPerPage
  );

  const filterColors = {
    all: "#22c55e", ai: "#a78bfa", fullstack: "#06b6d4",
    data: "#f59e0b", security: "#ef4444", vr: "#818cf8",
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 md:px-6">
      <motion.h1
        ref={topRef}
        className="cartoon-heading text-4xl md:text-5xl font-extrabold text-center aurora-text mb-3 tracking-wide"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        My Projects
      </motion.h1>

      <motion.p
        className="text-center text-gray-400 text-sm mb-6 max-w-lg mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {filteredProjects.length} projects spanning AI/ML, full-stack, data engineering, and more
      </motion.p>

      {/* Category Filter Tabs */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mb-10"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        {categoryFilters.map(({ label, value }) => {
          const isActive = activeFilter === value;
          const color = filterColors[value];
          return (
            <motion.button
              key={value}
              onClick={() => handleFilterChange(value)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                isActive ? "text-black" : "text-white/60 border border-white/10 hover:text-white hover:border-white/20"
              }`}
              style={{
                backgroundColor: isActive ? color : "transparent",
                boxShadow: isActive ? `0 4px 18px ${color}40` : "none",
              }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
              {label}
              {value !== "all" && (
                <span className="ml-1.5 opacity-60">
                  ({projects.filter((p) => projectCategories[p.id] === value).length})
                </span>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Projects Grid â€” 3 columns on large screen */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeFilter}-${page}`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {currentProjects.map((project, index) => {
            const banner = projectBanners[project.id] || { accent: "#22c55e" };
            return (
              <TiltCard
                key={`project-${activeFilter}-${page}-${project.id}`}
                className="group relative rounded-2xl bg-gradient-to-br from-gray-900/90 via-gray-950 to-black shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden cursor-pointer border border-gray-800/50"
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                }}
                onClick={() => openProject(project.id)}
              >
                {/* Hover border glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${banner.accent}35`,
                    borderRadius: "16px",
                  }}
                />

                {/* Project Banner */}
                <ProjectBanner project={project} />

                {/* Card content */}
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <h2 className="text-base font-bold text-white group-hover:text-green-300 transition-colors duration-300 leading-snug line-clamp-2">
                    {project.title}
                  </h2>

                  {/* Role badge */}
                  <span
                    className="text-xs font-medium uppercase tracking-widest"
                    style={{ color: `${banner.accent}bb` }}
                  >
                    {project.role}
                  </span>

                  {/* Tech stack pills â€” max 3 shown + overflow count */}
                  <div className="flex gap-1.5 mt-1 flex-wrap">
                    {project.stack.slice(0, 3).map((tech, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#9ca3af",
                        }}
                      >
                        <span className="text-sm">{tech.icon}</span>
                        <span>{tech.name}</span>
                      </div>
                    ))}
                    {project.stack.length > 3 && (
                      <div
                        className="flex items-center text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: `${banner.accent}15`,
                          border: `1px solid ${banner.accent}30`,
                          color: banner.accent,
                        }}
                      >
                        +{project.stack.length - 3}
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="mt-auto pt-3 flex flex-wrap gap-2">
                    <motion.button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openProject(project.id);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200"
                      style={{
                        border: `1px solid ${banner.accent}40`,
                        color: banner.accent,
                        background: `${banner.accent}08`,
                      }}
                      whileHover={{
                        scale: 1.04,
                        background: banner.accent,
                        color: "#000",
                      }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <EyeOutlined /> Case Study
                    </motion.button>
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-gray-400 transition-all duration-200"
                        style={{
                          border: "1px solid rgba(255,255,255,0.10)",
                          background: "rgba(255,255,255,0.03)",
                        }}
                        whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.25)", color: "#fff" }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <GithubOutlined /> GitHub
                      </motion.a>
                    )}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Empty state */}
      {currentProjects.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-4xl mb-3">ðŸ”</p>
          <p className="text-sm">No projects in this category yet.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-5 mt-12">
          {page > 0 && (
            <motion.button
              onClick={handlePrev}
              className="flex items-center gap-2 px-5 py-2 rounded-xl border border-green-500/40 text-green-400 font-medium text-sm transition-all duration-200"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(34,197,94,0.1)" }}
              whileTap={{ scale: 0.97 }}
            >
              <ArrowLeftOutlined /> Previous
            </motion.button>
          )}

          {/* Page dots */}
          <div className="flex gap-2 items-center">
            {Array.from({ length: totalPages }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  setPage(i);
                  topRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === page ? "bg-green-400 w-6" : "bg-gray-600 hover:bg-gray-400 w-2"
                }`}
                whileHover={{ scale: 1.3 }}
              />
            ))}
          </div>

          {(page + 1) * projectsPerPage < filteredProjects.length && (
            <motion.button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2 rounded-xl border border-green-500/40 text-green-400 font-medium text-sm transition-all duration-200"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(34,197,94,0.1)" }}
              whileTap={{ scale: 0.97 }}
            >
              Next <ArrowRightOutlined />
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectPage;

