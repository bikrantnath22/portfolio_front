import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeftOutlined, GithubOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { projects } from "../data/projects";
import MediaFrame from "../components/MediaFrame";
import SystemBlueprint from "../components/SystemBlueprint";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === Number(id));
  const currentIndex = projects.findIndex((p) => p.id === Number(id));
  const [phoneView, setPhoneView] = useState(false);

  if (!project) {
    return (
      <div className="text-white text-center mt-20 text-xl font-heading">
        Project not found
      </div>
    );
  }

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  // For Athaana (id: 2), support toggling between desktop and mobile portrait media
  const activeProjectMedia = phoneView && project.id === 2 ? {
    ...project,
    mediaType: "phone",
    detailVideo: project.phoneVideo,
    detailWebm: project.phoneWebm,
    detailImage: project.phoneImage,
  } : project;

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6 text-white font-body"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        type="button"
        onClick={() => navigate("/#project")}
        className="mb-8 px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_4px_20px_rgba(34,211,238,0.3)] transition-all cursor-pointer text-xs font-mono uppercase tracking-wider"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <ArrowLeftOutlined /> Back to Projects
      </motion.button>

      {/* Eyebrow / Category & Year */}
      <div className="flex items-center gap-2.5 mb-3 flex-wrap">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-400/30 px-3 py-1 rounded-md">
          {project.role}
        </span>
        {project.featured && (
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 bg-cyan-950/60 border border-cyan-400/40 px-2.5 py-1 rounded-md flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Featured
          </span>
        )}
        {project.year && (
          <span className="text-xs text-gray-400 font-mono">
            {project.year}
          </span>
        )}
        {project.metric && (
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-400/40 px-2.5 py-1 rounded-md">
            {project.metric}
          </span>
        )}
      </div>

      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 font-heading text-white tracking-tight leading-tight"
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {project.title}
      </motion.h1>

      <motion.p
        className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 max-w-[65ch]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        {project.tagline}
      </motion.p>

      {/* Tech Stack + GitHub Action */}
      <motion.div
        className="flex justify-between items-center gap-4 mt-2 mb-8 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex gap-2 flex-wrap">
          {project.stack.map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-full bg-white/5 text-gray-300 border border-white/10 font-mono"
            >
              <span>{tech.icon}</span>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/50 px-5 py-2 text-xs sm:text-sm font-semibold text-cyan-300 hover:bg-cyan-400 hover:text-black transition shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            <GithubOutlined /> View GitHub
          </a>
        )}
      </motion.div>

      {/* Athaana Desktop / Mobile Media View Toggle */}
      {project.id === 2 && (
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            type="button"
            onClick={() => setPhoneView(false)}
            className={`px-3.5 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer ${
              !phoneView
                ? "bg-cyan-400 text-black font-semibold"
                : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
            }`}
          >
            Desktop (Browser Frame)
          </button>
          <button
            type="button"
            onClick={() => setPhoneView(true)}
            className={`px-3.5 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer ${
              phoneView
                ? "bg-cyan-400 text-black font-semibold"
                : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
            }`}
          >
            Mobile (Phone Frame)
          </button>
        </div>
      )}

      {/* MediaFrame: Browser / Phone / Square or Upgraded Technical Cover */}
      <motion.div
        className="w-full my-8"
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <MediaFrame project={activeProjectMedia} />
      </motion.div>

      {/* Detailed Description */}
      <motion.div
        className="mt-8 card-unified p-6 sm:p-8"
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">
          Architecture &amp; Implementation Details
        </h2>
        <p className="text-gray-300 text-base leading-relaxed whitespace-pre-line max-w-[65ch]">
          {project.description}
        </p>
      </motion.div>

      {/* Role & Highlights Grid */}
      <motion.div
        className="mt-8 grid gap-4 md:grid-cols-[240px_1fr]"
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="card-unified p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 font-mono">Role</p>
            <p className="mt-1 text-lg font-semibold text-white font-heading">
              {project.role}
            </p>

            {project.year && (
              <>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-mono mt-4">Year</p>
                <p className="mt-1 text-sm font-medium text-cyan-400 font-mono">
                  {project.year}
                </p>
              </>
            )}

            {project.metric && (
              <>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-mono mt-4">Key Metric</p>
                <p className="mt-1 text-sm font-bold text-cyan-300 font-mono">
                  {project.metric}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="card-unified p-5 sm:p-6">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-mono">
            Key highlights
          </p>
          <ul className="mt-4 space-y-3 text-gray-300">
            {project.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed max-w-[65ch]">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_6px_#22d3ee]" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Interactive System Architecture Blueprint (for featured systems) */}
      <SystemBlueprint projectId={project.id} />

      {/* Prev / Next navigation */}
      <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10 gap-4 flex-wrap">
        {prevProject ? (
          <button
            type="button"
            onClick={() => navigate(`/project/${prevProject.id}`)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <ArrowLeftOutlined />
            <span className="truncate max-w-[150px] md:max-w-none">{prevProject.title}</span>
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={() => navigate("/#project")}
          className="px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider bg-white/5 hover:bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 hover:border-cyan-400/60 transition-all cursor-pointer flex items-center gap-2"
        >
          <ArrowLeftOutlined /> All Projects
        </button>

        {nextProject ? (
          <button
            type="button"
            onClick={() => navigate(`/project/${nextProject.id}`)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors ml-auto cursor-pointer"
          >
            <span className="truncate max-w-[150px] md:max-w-none">{nextProject.title}</span>
            <ArrowRightOutlined />
          </button>
        ) : (
          <div />
        )}
      </div>
    </motion.div>
  );
};

export default ProjectDetailPage;
