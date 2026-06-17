import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftOutlined, GithubOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { projects } from "../data/projects";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === Number(id));
  const currentIndex = projects.findIndex((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="text-white text-center mt-20 text-xl">
        Project not found
      </div>
    );
  }

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto py-12 px-4 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.button
        onClick={() => navigate(-1)}
        className="mb-8 px-6 py-3 rounded-full font-semibold flex items-center gap-2 btn-premium text-black"
        style={{
          background: "linear-gradient(135deg, #22c55e, #06b6d4)",
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 4px 25px rgba(34, 197, 94, 0.3)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeftOutlined /> Back
      </motion.button>

      <motion.h2
        className="text-4xl md:text-5xl font-extrabold mb-4 aurora-text tracking-wide"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {project.title}
      </motion.h2>

      <motion.p
        className="text-gray-300 text-lg leading-relaxed mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {project.tagline}
      </motion.p>

      <motion.div
        className="flex justify-between items-center gap-4 mt-2 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex gap-3 flex-wrap">
          {project.stack.map((tech, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-1.5 text-md px-3 py-1.5 rounded-full glass text-gray-300"
              style={{ border: "1px solid rgba(34, 197, 94, 0.15)" }}
              whileHover={{ scale: 1.05, borderColor: "rgba(6, 182, 212, 0.4)" }}
            >
              {tech.icon}
              <span>{tech.name}</span>
            </motion.div>
          ))}
        </div>

        {project.github && (
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium inline-flex items-center gap-2 rounded-full border border-green-500/50 px-4 py-2 text-sm font-medium text-green-300 transition hover:bg-green-500 hover:text-black"
            whileHover={{ scale: 1.05 }}
          >
            <GithubOutlined /> View GitHub
          </motion.a>
        )}
      </motion.div>

      {/* Full-width hero image with parallax */}
      <motion.div
        className="overflow-hidden rounded-2xl mb-8 mt-6 theme-ignore relative"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 z-10 pointer-events-none rounded-2xl" />
        <motion.img
          src={project.detailImage || project.image}
          alt={project.title}
          className="w-full h-[320px] md:h-[430px] object-contain rounded-2xl bg-black/20"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      <motion.p
        className="text-gray-300 text-lg leading-relaxed whitespace-pre-line"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {project.description}
      </motion.p>

      <motion.div
        className="mt-8 grid gap-4 md:grid-cols-[220px_1fr]"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="glass rounded-xl p-5 neon-hover"
          style={{ border: "1px solid rgba(34, 197, 94, 0.1)" }}
        >
          <p className="text-sm uppercase tracking-wide text-gray-500">Role</p>
          <p className="mt-2 text-lg font-semibold text-white">
            {project.role}
          </p>
          {project.year && (
            <>
              <p className="text-sm uppercase tracking-wide text-gray-500 mt-4">Year</p>
              <p className="mt-1 text-base font-medium text-green-400">
                {project.year}
              </p>
            </>
          )}
        </div>
        <div className="glass rounded-xl p-5 neon-hover"
          style={{ border: "1px solid rgba(34, 197, 94, 0.1)" }}
        >
          <p className="text-sm uppercase tracking-wide text-gray-500">
            Key highlights
          </p>
          <ul className="mt-3 space-y-3 text-gray-300">
            {project.highlights.map((highlight, idx) => (
              <motion.li
                key={highlight}
                className="flex gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-green-400 to-cyan-400" />
                <span>{highlight}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Next/Previous Project Navigation */}
      <motion.div
        className="mt-16 flex justify-between items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {prevProject ? (
          <motion.button
            onClick={() => navigate(`/project/${prevProject.id}`)}
            className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors group"
            whileHover={{ x: -4 }}
          >
            <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <span className="text-xs text-gray-600 block">Previous</span>
              <span className="text-sm font-medium">{prevProject.title}</span>
            </div>
          </motion.button>
        ) : (
          <div />
        )}

        {nextProject ? (
          <motion.button
            onClick={() => navigate(`/project/${nextProject.id}`)}
            className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group text-right"
            whileHover={{ x: 4 }}
          >
            <div>
              <span className="text-xs text-gray-600 block">Next</span>
              <span className="text-sm font-medium">{nextProject.title}</span>
            </div>
            <ArrowRightOutlined className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        ) : (
          <div />
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetailPage;
