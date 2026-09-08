import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FaJs,
  FaCuttlefish,
  FaPython,
  FaReact,
  FaNodeJs,
  FaGit,
  FaJava,
  FaShieldAlt,
  FaBrain,
  FaPlug,
  FaDatabase,
  FaDocker,
} from "react-icons/fa";
import {
  SiMongodb,
  SiNextdotjs,
  SiTailwindcss,
  SiFirebase,
  SiUnity,
  SiPytorch,
  SiExpress,
  SiPostman,
  SiMysql,
  SiFastapi,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiStreamlit,
  SiDocker,
  SiOpencv,
} from "react-icons/si";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useRef } from "react";
import { GearDoodle, StarDoodle } from "./CartoonDoodles";
import AiTerminal from "./AiTerminal";
import "./styles.css";

const skillCategories = {
  Languages: [
    { name: "Python", icon: <FaPython className="text-blue-300 text-2xl" /> },
    { name: "JavaScript", icon: <FaJs className="text-yellow-400 text-2xl" /> },
    { name: "Java", icon: <FaJava className="text-red-400 text-2xl" /> },
    { name: "C / C#", icon: <FaCuttlefish className="text-blue-500 text-2xl" /> },
    { name: "SQL", icon: <FaDatabase className="text-cyan-300 text-2xl" /> },
  ],
  "Web & Backend": [
    { name: "React", icon: <FaReact className="text-blue-400 text-2xl" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-2xl" /> },
    { name: "Express.js", icon: <SiExpress className="text-gray-300 text-2xl" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-gray-200 text-2xl" /> },
    { name: "FastAPI", icon: <SiFastapi className="text-teal-400 text-2xl" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400 text-2xl" /> },
  ],
  "AI / ML": [
    { name: "PyTorch", icon: <SiPytorch className="text-orange-500 text-2xl" /> },
    { name: "Scikit-learn", icon: <SiScikitlearn className="text-orange-400 text-2xl" /> },
    { name: "NumPy", icon: <SiNumpy className="text-blue-300 text-2xl" /> },
    { name: "Pandas", icon: <SiPandas className="text-purple-400 text-2xl" /> },
    { name: "GANs / DP", icon: <FaBrain className="text-pink-400 text-2xl" /> },
    { name: "LLMs & RAG", icon: <FaBrain className="text-purple-400 text-2xl" /> },
    { name: "LangGraph", icon: <FaBrain className="text-green-400 text-2xl" /> },
    { name: "Streamlit", icon: <SiStreamlit className="text-red-400 text-2xl" /> },
  ],
  "Databases & DevOps": [
    { name: "MongoDB", icon: <SiMongodb className="text-green-400 text-2xl" /> },
    { name: "MySQL", icon: <SiMysql className="text-blue-400 text-2xl" /> },
    { name: "Firebase", icon: <SiFirebase className="text-orange-400 text-2xl" /> },
    { name: "Docker", icon: <SiDocker className="text-blue-500 text-2xl" /> },
    { name: "Git", icon: <FaGit className="text-orange-500 text-2xl" /> },
    { name: "WebSockets", icon: <FaPlug className="text-blue-400 text-2xl" /> },
  ],
  "Security & Research": [
    { name: "Pen Testing", icon: <FaShieldAlt className="text-red-400 text-2xl" /> },
    { name: "Ethical Hacking", icon: <FaShieldAlt className="text-green-400 text-2xl" /> },
    { name: "Nmap", icon: <FaShieldAlt className="text-blue-400 text-2xl" /> },
    { name: "Wireshark", icon: <FaShieldAlt className="text-cyan-400 text-2xl" /> },
    { name: "Burp Suite", icon: <FaShieldAlt className="text-orange-400 text-2xl" /> },
    { name: "AI Agents", icon: <FaBrain className="text-cyan-400 text-2xl" /> },
  ],
  "Platforms": [
    { name: "Unity (VR)", icon: <SiUnity className="text-gray-300 text-2xl" /> },
    { name: "React Native", icon: <FaReact className="text-cyan-400 text-2xl" /> },
    { name: "Shopify Liquid", icon: <FaJs className="text-green-400 text-2xl" /> },
    { name: "Postman", icon: <SiPostman className="text-orange-500 text-2xl" /> },
    { name: "Cloudinary", icon: <FaDatabase className="text-blue-300 text-2xl" /> },
  ],
};

const categoryColors = {
  Languages: { primary: "#22c55e", glow: "rgba(34,197,94,0.15)", emoji: "💻" },
  "Web & Backend": { primary: "#06b6d4", glow: "rgba(6,182,212,0.15)", emoji: "⚡" },
  "AI / ML": { primary: "#8b5cf6", glow: "rgba(139,92,246,0.15)", emoji: "🧠" },
  "Databases & DevOps": { primary: "#f59e0b", glow: "rgba(245,158,11,0.15)", emoji: "🗄️" },
  "Security & Research": { primary: "#ef4444", glow: "rgba(239,68,68,0.15)", emoji: "🔒" },
  "Platforms": { primary: "#ec4899", glow: "rgba(236,72,153,0.15)", emoji: "🚀" },
};

const SkillsContactPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Languages");
  const [formData, setFormData] = useState({ name: "", email: "", description: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://portfolio-back-j2mg.onrender.com/send-email",
        formData
      );
      setMessage(response.data.message);
      setFormData({ name: "", email: "", description: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setMessage("Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentColors = categoryColors[selectedCategory] || { primary: "#22c55e", glow: "rgba(34,197,94,0.15)" };
  const accentColor = currentColors.primary;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.4,
          },
        },
      }}
      className="w-full max-w-6xl p-4 mb-6 md:mb-0 relative"
    >
      {/* Floating cartoon doodles */}
      <GearDoodle className="text-cyan-400 -top-6 right-12 hidden md:block" delay={0} />
      <StarDoodle className="text-green-300 bottom-10 left-8 hidden md:block" delay={2} />

      <div className="flex flex-col md:flex-row justify-center items-start md:mt-6 text-white p-2 gap-6">
        {/* Left - Skills Section */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 md:p-8"
        >
          <h2 className="cartoon-heading text-xl md:text-3xl font-bold italic mb-2 aurora-text md:mt-0">
            My Skills
          </h2>
          <p className="text-gray-500 text-xs mb-5">
            {skillCategories[selectedCategory]?.length} skills in this category
          </p>

          {/* Skill Category Tabs */}
          <style>{`
            .hide-scroll::-webkit-scrollbar { display: none; }
            .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(skillCategories).map((category) => {
              const colors = categoryColors[category] || { primary: "#22c55e" };
              const isActive = selectedCategory === category;
              return (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${isActive
                      ? "text-black shadow-lg"
                      : "bg-transparent text-white/60 hover:text-white hover:bg-white/5 border border-white/10"
                    }`}
                  style={{
                    backgroundColor: isActive ? colors.primary : undefined,
                    boxShadow: isActive ? `0 4px 20px ${colors.primary}60` : undefined,
                    borderRadius: "8px",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{colors.emoji}</span>
                  {category}
                </motion.button>
              );
            })}
          </div>

          {/* Animated Skill Grid */}
          <div className="grid grid-cols-2 md:gap-3 gap-2">
            <AnimatePresence mode="wait">
              {skillCategories[selectedCategory].map((skill, idx) => (
                <motion.div
                  key={`${selectedCategory}-${skill.name}`}
                  className="flex flex-col p-3 rounded-xl glass cursor-default group"
                  style={{
                    border: `1px solid ${accentColor}20`,
                    background: `linear-gradient(135deg, rgba(255,255,255,0.03), ${currentColors.glow})`,
                    borderRadius: "14px 6px 14px 6px",
                  }}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  transition={{
                    duration: 0.35,
                    delay: idx * 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: `0 0 25px ${accentColor}25`,
                    borderColor: `${accentColor}40`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <motion.span
                      className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg"
                      style={{ background: `${accentColor}15` }}
                      whileHover={{ rotate: 12, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {skill.icon}
                    </motion.span>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm md:text-base text-gray-200 font-semibold block truncate">
                        {skill.name}
                      </span>
                      <span className="text-[10px] text-gray-500 font-medium">{skill.level}%</span>
                    </div>
                  </div>
                  {/* Animated proficiency bar */}
                  <div className="skill-bar-track mt-2">
                    <motion.div
                      className="skill-bar-fill"
                      style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}99)` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: idx * 0.05 + 0.2, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right - Contact Form */}
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 md:p-8 rounded-lg mt-4 md:mt-0"
        >
          <h2 className="cartoon-heading text-xl md:text-3xl font-bold mb-6 italic"
            style={{
              background: "linear-gradient(90deg, #06b6d4, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact Me
          </h2>

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="relative mt-2">
              <motion.label
                className="absolute left-4 text-gray-400 pointer-events-none transition-all duration-300 text-sm"
                animate={{
                  y: focusedField === "name" || formData.name ? -26 : 12,
                  scale: focusedField === "name" || formData.name ? 0.85 : 1,
                  color: focusedField === "name" ? "#06b6d4" : "#9ca3af",
                }}
              >
                Your Name
              </motion.label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full p-3 pt-5 rounded-xl text-white transition-all duration-300"
                style={{
                  borderRadius: "14px 6px 14px 6px",
                  background: "rgba(8, 14, 26, 0.8)",
                  border: focusedField === "name"
                    ? "1.5px solid rgba(6,182,212,0.6)"
                    : "1.5px solid rgba(255,255,255,0.1)",
                  boxShadow: focusedField === "name" ? "0 0 0 3px rgba(6,182,212,0.1)" : "none",
                  outline: "none",
                }}
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <motion.label
                className="absolute left-4 text-gray-400 pointer-events-none transition-all duration-300 text-sm"
                animate={{
                  y: focusedField === "email" || formData.email ? -26 : 12,
                  scale: focusedField === "email" || formData.email ? 0.85 : 1,
                  color: focusedField === "email" ? "#06b6d4" : "#9ca3af",
                }}
              >
                Your Email
              </motion.label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full p-3 pt-5 rounded-xl text-white transition-all duration-300"
                style={{
                  borderRadius: "14px 6px 14px 6px",
                  background: "rgba(8, 14, 26, 0.8)",
                  border: focusedField === "email"
                    ? "1.5px solid rgba(6,182,212,0.6)"
                    : "1.5px solid rgba(255,255,255,0.1)",
                  boxShadow: focusedField === "email" ? "0 0 0 3px rgba(6,182,212,0.1)" : "none",
                  outline: "none",
                }}
              />
            </div>

            {/* Message Textarea */}
            <div className="relative">
              <motion.label
                className="absolute left-4 text-gray-400 pointer-events-none transition-all duration-300 text-sm"
                animate={{
                  y: focusedField === "description" || formData.description ? -26 : 12,
                  scale: focusedField === "description" || formData.description ? 0.85 : 1,
                  color: focusedField === "description" ? "#06b6d4" : "#9ca3af",
                }}
              >
                Your Message
              </motion.label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                onFocus={() => setFocusedField("description")}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full p-3 pt-5 rounded-xl text-white resize-none transition-all duration-300"
                style={{
                  minHeight: typeof window !== 'undefined' && window.innerWidth < 768 ? "90px" : "120px",
                  borderRadius: "14px 6px 14px 6px",
                  background: "rgba(8, 14, 26, 0.8)",
                  border: focusedField === "description"
                    ? "1.5px solid rgba(6,182,212,0.6)"
                    : "1.5px solid rgba(255,255,255,0.1)",
                  boxShadow: focusedField === "description" ? "0 0 0 3px rgba(6,182,212,0.1)" : "none",
                  outline: "none",
                }}
              />
            </div>

            {/* Success message */}
            <AnimatePresence>
              {message && (
                <motion.p
                  className={`text-sm ${success ? "text-green-400" : "text-red-400"}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {success ? "✨ " : "⚠️ "}{message}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="btn-premium p-3 text-white w-full h-12 flex items-center justify-center font-semibold"
              style={{
                borderRadius: "14px 6px 14px 6px",
                background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 4px 25px rgba(6, 182, 212, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <ClipLoader size={20} color="#fff" />
              ) : success ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  ✓ Sent!
                </motion.span>
              ) : (
                "Send Message →"
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Floating AI Pet restricted to About section */}
      <AiTerminal />
    </motion.div>
  );
};

export default SkillsContactPage;
