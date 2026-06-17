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
} from "react-icons/si";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useRef } from "react";
import { GearDoodle, StarDoodle } from "./CartoonDoodles";
import AiTerminal from "./AiTerminal";
import "./styles.css";
const skillCategories = {
  Language: [
    { name: "Python", icon: <FaPython className="text-blue-300 text-3xl" /> },
    { name: "JavaScript", icon: <FaJs className="text-yellow-400 text-3xl" /> },
    { name: "Java", icon: <FaJava className="text-red-400 text-3xl" /> },
    { name: "C", icon: <FaCuttlefish className="text-blue-500 text-3xl" /> },
    { name: "C#", icon: <SiUnity className="text-purple-500 text-3xl" /> },
  ],
  "Framework": [
    { name: "React", icon: <FaReact className="text-blue-400 text-3xl" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-gray-200 text-3xl" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-3xl" /> },
    { name: "Express.js", icon: <SiExpress className="text-gray-300 text-3xl" /> },
    { name: "React Native", icon: <FaReact className="text-cyan-400 text-3xl" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400 text-3xl" /> },
  ],
  "AI / ML": [
    { name: "PyTorch", icon: <SiPytorch className="text-orange-500 text-3xl" /> },
    { name: "GANs", icon: <FaBrain className="text-pink-400 text-3xl" /> },
    { name: "LLMs & RAG", icon: <FaBrain className="text-purple-400 text-3xl" /> },
    { name: "Prompt Eng.", icon: <FaBrain className="text-cyan-400 text-3xl" /> },
    { name: "AI Agents", icon: <FaBrain className="text-green-400 text-3xl" /> },
  ],
  "DB & Tools": [
    { name: "MongoDB", icon: <SiMongodb className="text-green-400 text-3xl" /> },
    { name: "SQL", icon: <FaDatabase className="text-blue-300 text-3xl" /> },
    { name: "Firebase", icon: <SiFirebase className="text-orange-400 text-3xl" /> },
    { name: "Git", icon: <FaGit className="text-orange-500 text-3xl" /> },
    { name: "Postman", icon: <SiPostman className="text-orange-500 text-3xl" /> },
    { name: "WebSockets", icon: <FaPlug className="text-blue-400 text-3xl" /> },
  ],
  "Security": [
    { name: "Pen Testing", icon: <FaShieldAlt className="text-red-400 text-3xl" /> },
    { name: "Ethical Hacking", icon: <FaShieldAlt className="text-green-400 text-3xl" /> },
    { name: "Nmap", icon: <FaShieldAlt className="text-blue-400 text-3xl" /> },
    { name: "Wireshark", icon: <FaShieldAlt className="text-cyan-400 text-3xl" /> },
    { name: "Burp Suite", icon: <FaShieldAlt className="text-orange-400 text-3xl" /> },
    { name: "Metasploit", icon: <FaShieldAlt className="text-purple-400 text-3xl" /> },
  ],
};

const categoryColors = {
  Language: "#22c55e",
  "Framework": "#06b6d4",
  "AI / ML": "#8b5cf6",
  "DB & Tools": "#f59e0b",
  "Security": "#ef4444",
};

const SkillsContactPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Language");
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

  const accentColor = categoryColors[selectedCategory] || "#22c55e";

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

      <div className="flex flex-col md:flex-row justify-center items-center md:mt-6 text-white p-2">
        {/* Left - Skills Section */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 md:p-8"
        >
          <h2 className="cartoon-heading text-xl md:text-3xl font-bold italic mb-4 aurora-text md:mt-0">
            My Skills
          </h2>

          {/* Skill Category Tabs with sliding pill */}
          <style>{`
            .hide-scroll::-webkit-scrollbar { display: none; }
            .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          <div className="flex md:justify-normal justify-start md:space-x-2 mb-6 overflow-x-auto pb-2 gap-2 hide-scroll">
            {Object.keys(skillCategories).map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 md:px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "text-black shadow-lg"
                    : "bg-transparent text-white/70 hover:text-white hover:bg-white/5 border border-white/10"
                }`}
                style={{
                  borderRadius: selectedCategory === category ? "14px 6px 14px 6px" : "8px",
                  backgroundColor: selectedCategory === category ? accentColor : undefined,
                  boxShadow: selectedCategory === category
                    ? `0 4px 20px ${accentColor}40`
                    : undefined,
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                layout
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Animated Skill Grid */}
          <div className="grid grid-cols-2 md:gap-3 gap-2">
            <AnimatePresence mode="wait">
              {skillCategories[selectedCategory].map((skill, idx) => (
                <motion.div
                  key={`${selectedCategory}-${skill.name}`}
                  className="flex items-center space-x-3 p-3 rounded-xl glass neon-hover cursor-default group"
                  style={{
                    borderRadius: "14px 6px 14px 6px",
                    border: `1px solid ${accentColor}15`,
                  }}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  transition={{
                    duration: 0.35,
                    delay: idx * 0.06,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 20px ${accentColor}20`,
                  }}
                >
                  <motion.span
                    className="shrink-0"
                    whileHover={{ rotate: 12, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {skill.icon}
                  </motion.span>
                  <span className="text-sm md:text-base text-gray-200 font-medium">
                    {skill.name}
                  </span>
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
            <div className="relative">
              <motion.label
                className="absolute left-3 text-gray-400 pointer-events-none transition-all duration-300 text-sm"
                animate={{
                  y: focusedField === "name" || formData.name ? -24 : 10,
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
                className="w-full p-3 pt-4 rounded-xl bg-slate-900/80 text-white input-premium"
                style={{ borderRadius: "14px 6px 14px 6px" }}
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <motion.label
                className="absolute left-3 text-gray-400 pointer-events-none transition-all duration-300 text-sm"
                animate={{
                  y: focusedField === "email" || formData.email ? -24 : 10,
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
                className="w-full p-3 pt-4 rounded-xl bg-slate-900/80 text-white input-premium"
                style={{ borderRadius: "14px 6px 14px 6px" }}
              />
            </div>

            {/* Message Textarea */}
            <div className="relative">
              <motion.label
                className="absolute left-3 text-gray-400 pointer-events-none transition-all duration-300 text-sm"
                animate={{
                  y: focusedField === "description" || formData.description ? -24 : 10,
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
                className="w-full p-3 pt-4 rounded-xl bg-slate-900/80 text-white input-premium resize-none"
                style={{
                  minHeight: typeof window !== 'undefined' && window.innerWidth < 768 ? "90px" : "120px",
                  borderRadius: "14px 6px 14px 6px",
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
