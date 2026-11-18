import { useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRightOutlined, EyeOutlined, GithubOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import { projectBanners } from "../data/projectBanners";

const categoryFilters = [
  { label: "All", value: "all" },
  { label: "AI / ML", value: "ai" },
  { label: "Full-Stack", value: "fullstack" },
  { label: "Data", value: "data" },
  { label: "Security", value: "security" },
  { label: "VR / Research", value: "vr" },
];

const projectCategories = {
  1: "ai",
  2: "fullstack",
  3: "ai",
  4: "security",
  5: "fullstack",
  6: "data",
  7: "data",
  8: "ai",
  9: "data",
  10: "data",
  11: "vr",
  12: "ai",
  13: "fullstack",
  14: "fullstack",
  15: "fullstack",
  16: "ai",
  18: "fullstack",
  20: "ai",
};

// Pointer-event based 3D tilt with specular glare, disabled on touch & reduced motion
const TiltCard = ({ children, className = "", onClick, onMouseEnter, onMouseLeave }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isTiltDisabled, setIsTiltDisabled] = useState(false);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsTiltDisabled(isCoarse || prefersReducedMotion);
  }, []);

  const handlePointerMove = (e) => {
    if (isTiltDisabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    // Max 8 degrees tilt on each axis
    const tiltX = (0.5 - py) * 16;
    const tiltY = (px - 0.5) * 16;
    const clampedX = Math.max(-8, Math.min(8, tiltX));
    const clampedY = Math.max(-8, Math.min(8, tiltY));

    setTilt({ x: clampedX, y: clampedY });
    setGlare({ x: px * 100, y: py * 100, opacity: 0.18 });
  };

  const handlePointerLeave = () => {
    if (isTiltDisabled) return;
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      className={`relative col-span-1 h-full select-none ${className}`}
      style={{ perspective: isTiltDisabled ? "none" : "1000px" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div
        className="w-full h-full rounded-2xl transition-transform duration-200 ease-out flex flex-col"
        style={{
          transform: isTiltDisabled
            ? "none"
            : `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg)`,
          transformStyle: isTiltDisabled ? "flat" : "preserve-3d",
        }}
      >
        {children}

        {/* Soft Glare Specular Highlight */}
        {!isTiltDisabled && (
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle 380px at ${glare.x}% ${glare.y}%, rgba(34, 211, 238, 0.2), transparent 70%)`,
            }}
          />
        )}
      </div>
    </div>
  );
};

// Upgraded Gradient Banner Cover (uniform 176px height across every card)
const CardCover = ({ project, isHovered, banner }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <div
      className="relative w-full h-44 rounded-t-2xl overflow-hidden flex flex-col justify-between p-4 select-none transition-all duration-500 shrink-0"
      style={{ background: banner.gradient }}
    >
      {/* Subtle Dot Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#22d3ee 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Large faint domain icon watermark */}
      <div className="absolute right-3 -bottom-4 text-7xl text-white opacity-[0.07] pointer-events-none select-none transition-transform duration-500 group-hover:scale-110">
        {banner.icon}
      </div>

      {/* Hover Video Layer (muted & looping on hover, gradient as poster) */}
      {project.video && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none z-[1]"
          style={{ opacity: isHovered ? 0.95 : 0 }}
        >
          {project.webm && <source src={project.webm} type="video/webm" />}
          <source src={project.video} type="video/mp4" />
        </video>
      )}

      {/* Top Meta: Category Chip + Featured Tag + Metric + Year */}
      <div className="flex items-center justify-between gap-2 z-10">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
            style={{
              borderColor: `${banner.accent}55`,
              backgroundColor: `${banner.accent}15`,
              color: banner.accent,
            }}
          >
            {banner.label}
          </span>
          {project.featured && (
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 flex items-center gap-1 shadow-[0_0_8px_rgba(34,211,238,0.25)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Featured
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {project.metric && (
            <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-400/35 px-2 py-0.5 rounded-md">
              {project.metric}
            </span>
          )}
          {project.year && (
            <span className="text-xs font-mono text-gray-400">
              {project.year}
            </span>
          )}
        </div>
      </div>

      {/* Bottom preview info inside cover */}
      <div className="z-10">
        <p className="text-xs text-gray-300/90 font-medium line-clamp-1 leading-snug">
          {project.tagline}
        </p>
      </div>

      {/* Subtle edge vignette */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
    </div>
  );
};

// Project Card Component (100% uniform slot dimensions across all 15 cards)
const ProjectCard = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const banner = projectBanners[project.id] || {
    gradient: "linear-gradient(135deg, #071322 0%, #0d2238 100%)",
    accent: "#22d3ee",
    label: "Engineering",
    icon: null,
  };

  return (
    <TiltCard
      className="group cursor-pointer rounded-2xl bg-gradient-to-br from-gray-950 via-[#070c14] to-black border border-white/10 hover:border-cyan-400/40 transition-all duration-300 shadow-xl flex flex-col overflow-hidden h-full"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cover (Fixed 176px height) */}
      <CardCover
        project={project}
        isHovered={isHovered}
        banner={banner}
      />

      {/* Card Content Body with fixed slot heights for 100% uniform card geometry */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        <div className="space-y-2">
          {/* Title slot: exactly 48px height (2 lines) */}
          <div className="h-[48px] flex items-start overflow-hidden">
            <h3 className="font-heading font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug text-base sm:text-lg line-clamp-2">
              {project.title}
            </h3>
          </div>

          {/* Tagline slot: exactly 36px height (2 lines) */}
          <div className="h-[36px] overflow-hidden">
            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
              {project.tagline}
            </p>
          </div>

          {/* Highlights snippet slot: exactly 32px height */}
          <div className="h-[32px] overflow-hidden flex items-center">
            {project.highlights && project.highlights.length > 0 ? (
              <div className="flex items-start gap-2 text-[11px] text-gray-400 leading-snug">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_6px_#22d3ee]" />
                <span className="line-clamp-2">{project.highlights[0]}</span>
              </div>
            ) : (
              <div className="text-[11px] font-mono text-gray-500">
                Full architecture details in case study
              </div>
            )}
          </div>
        </div>

        <div className="pt-3 border-t border-white/5 space-y-3">
          {/* Tech stack chips slot: exactly 28px height */}
          <div className="h-7 flex items-center gap-1.5 overflow-hidden">
            {project.stack.slice(0, 3).map((tech, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-300 font-mono whitespace-nowrap shrink-0"
              >
                <span className="text-xs">{tech.icon}</span>
                <span>{tech.name}</span>
              </div>
            ))}
            {project.stack.length > 3 && (
              <span className="text-xs font-mono text-cyan-400/80 px-1 shrink-0">
                +{project.stack.length - 3}
              </span>
            )}
          </div>

          {/* Action Buttons slot: exactly 34px height */}
          <div className="flex items-center justify-between gap-3 h-[34px]">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-400 text-black hover:bg-cyan-300 transition-colors shadow-[0_0_12px_rgba(34,211,238,0.2)] cursor-pointer shrink-0"
            >
              <EyeOutlined /> Case Study <ArrowRightOutlined className="text-[10px]" />
            </button>

            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors shrink-0"
              >
                <GithubOutlined /> GitHub
              </a>
            ) : (
              <span className="text-[11px] font-mono text-gray-500">Case study only</span>
            )}
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

export default function ProjectPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [techFilter, setTechFilter] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const INITIAL_LIMIT = 9;

  // Listen to cross-component skill clicks (from Bento grid)
  useEffect(() => {
    const handleFilterTech = (e) => {
      if (e.detail && e.detail.tech) {
        setTechFilter(e.detail.tech);
        setActiveFilter("all");
        setIsExpanded(true);
        const el = document.getElementById("project");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    window.addEventListener("filter-tech", handleFilterTech);
    return () => window.removeEventListener("filter-tech", handleFilterTech);
  }, []);

  // Filter projects across all entries (preserves custom display order from projects.jsx)
  const filteredProjects = useMemo(() => {
    let result = projects;
    if (activeFilter !== "all") {
      result = result.filter((p) => (projectCategories[p.id] || "ai") === activeFilter);
    }
    if (techFilter) {
      const q = techFilter.toLowerCase();
      result = result.filter((p) =>
        (p.stack || []).some((s) => s.name.toLowerCase().includes(q)) ||
        (p.description || "").toLowerCase().includes(q) ||
        (p.tagline || "").toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeFilter, techFilter]);

  // Display projects directly in defined order
  const sortedProjects = filteredProjects;

  // Initially render 9 cards, then reveal the rest
  const displayedProjects = isExpanded
    ? sortedProjects
    : sortedProjects.slice(0, INITIAL_LIMIT);

  const handleFilterChange = (val) => {
    setActiveFilter(val);
    setIsExpanded(false);
  };

  const openProject = (id) => {
    navigate(`/project/${id}`);
  };

  return (
    <div id="project" className="w-full max-w-6xl mx-auto px-4 sm:px-6 font-body text-white">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
          SYSTEMS &amp; PRODUCTION
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight mt-2">
          Projects
        </h2>
        <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-[65ch] mx-auto leading-relaxed">
          {activeFilter === "all"
            ? `Showing ${displayedProjects.length} of ${projects.length} projects spanning AI/ML, full-stack, data engineering, and more`
            : `Showing ${displayedProjects.length} of ${sortedProjects.length} ${
                categoryFilters.find((c) => c.value === activeFilter)?.label
              } projects`}
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categoryFilters.map(({ label, value }) => {
          const isActive = activeFilter === value;
          const count =
            value === "all"
              ? projects.length
              : projects.filter((p) => projectCategories[p.id] === value).length;

          return (
            <button
              key={value}
              type="button"
              onClick={() => handleFilterChange(value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                isActive
                  ? "text-black bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                  : "text-gray-400 border border-white/10 hover:text-white hover:border-white/20 bg-white/[0.02]"
              }`}
            >
              {label}
              <span className="ml-1.5 opacity-60 font-mono text-[11px]">
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Skill Filter Badge */}
      {techFilter && (
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-400/40 px-4 py-1.5 rounded-full flex items-center gap-2.5 shadow-[0_0_15px_rgba(34,211,238,0.25)]">
            <span>
              Skill filter: <strong className="text-white">{techFilter}</strong> ({filteredProjects.length} match{filteredProjects.length === 1 ? "" : "es"})
            </span>
            <button
              type="button"
              onClick={() => setTechFilter(null)}
              className="w-4 h-4 rounded-full bg-cyan-400/20 hover:bg-cyan-400 hover:text-black flex items-center justify-center text-[10px] transition-colors cursor-pointer"
              title="Clear skill filter"
            >
              ✕
            </button>
          </span>
        </div>
      )}

      {/* Single Unified Grid: auto-rows-fr guarantees identical height for all cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: Math.min(idx * 0.03, 0.25) }}
              className="col-span-1 h-full"
            >
              <ProjectCard
                project={project}
                onClick={() => openProject(project.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {sortedProjects.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-3xl mb-2">🔍</p>
          <p className="text-sm font-mono">No projects in this category.</p>
        </div>
      )}

      {/* Reveal Rest Button */}
      {sortedProjects.length > INITIAL_LIMIT && !isExpanded && (
        <div className="flex justify-center mt-12">
          <motion.button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="px-6 py-3 rounded-full text-xs font-semibold font-mono tracking-wider bg-white/5 hover:bg-cyan-400 hover:text-black border border-cyan-400/40 hover:border-cyan-400 text-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.15)] cursor-pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Show all {sortedProjects.length} projects →
          </motion.button>
        </div>
      )}
    </div>
  );
}
