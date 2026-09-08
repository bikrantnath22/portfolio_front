import { useEffect, useState } from "react";
import {
  HomeOutlined,
  InfoCircleOutlined,
  ExperimentOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { FaProjectDiagram } from "react-icons/fa";
import { motion } from "framer-motion";
import NavBtns from "./NavBtn";

export default function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["Home", "experience", "project", "education", "about"];
      for (let section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "Home", title: "Home", icon: <HomeOutlined /> },
    { id: "experience", title: "Experience", icon: <ExperimentOutlined /> },
    { id: "project", title: "Projects", icon: <FaProjectDiagram /> },
    { id: "education", title: "Education", icon: <ReadOutlined /> },
    { id: "about", title: "About", icon: <InfoCircleOutlined /> },
  ];

  return (
    <>
      {/* DESKTOP TOP NAVBAR */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full px-7 py-3 hidden md:flex justify-between items-center z-20 transition-all duration-500 ${scrolled
          ? "glass-strong shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
          }`}
        style={{
          borderBottom: scrolled
            ? "1px solid rgba(34, 197, 94, 0.1)"
            : "1px solid transparent",
        }}
      >
        {/* Left: Brand Monogram */}
        <motion.a
          href="#Home"
          className="flex items-center gap-2.5 group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >


        </motion.a>

        {/* Right: Nav Links */}
        <div className="flex gap-4 items-center text-[13px]">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="flex items-center shrink-0 relative text-xl "
              onClick={() => setActiveSection(item.id)}
            >
              <NavBtns
                icon={item.icon}
                title={item.title}
                isActive={activeSection === item.id}
              />
            </a>
          ))}
        </div>
      </motion.nav>

      {/* MOBILE FLOATING PILL NAV */}
      <motion.div
        initial={{ x: "-50%", y: 60, opacity: 0 }}
        animate={{ x: "-50%", y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        className="md:hidden fixed bottom-6 left-1/2 z-[100] glass-strong px-5 py-3 rounded-full flex gap-6 shadow-[0_8px_32px_rgba(34,197,94,0.18)]"
        style={{ border: "1px solid rgba(34, 197, 94, 0.2)" }}
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => setActiveSection(item.id)}
            className={`relative flex flex-col items-center justify-center gap-0.5 transition-all duration-300 ${activeSection === item.id
              ? "text-green-400 scale-110 -translate-y-1.5"
              : "text-white opacity-40 hover:opacity-80 hover:scale-105"
              }`}
          >
            <span className="text-[20px]">{item.icon}</span>
            <span
              className={`text-[9px] font-semibold tracking-wide uppercase transition-opacity duration-200 ${activeSection === item.id ? "opacity-100" : "opacity-0"
                }`}
            >
              {item.title}
            </span>
            {activeSection === item.id && (
              <span className="absolute -bottom-2 w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_8px_#4ade80]" />
            )}
          </a>
        ))}
      </motion.div>
    </>
  );
}
