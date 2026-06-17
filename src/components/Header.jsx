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
      // Track scroll position for header blur
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
      {/* DESKTOP TOP NAVBAR (Hidden on Mobile) */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full px-7 py-2.5 hidden md:flex justify-end items-center z-20 transition-all duration-500 ${
          scrolled
            ? "glass-strong shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
        style={{
          borderBottom: scrolled
            ? "1px solid rgba(34, 197, 94, 0.08)"
            : "1px solid transparent",
        }}
      >
        {/* Right Side: Navigation Links */}
        <div className="flex gap-1.5 items-center font-poppins text-[13px] justify-end relative">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="flex items-center shrink-0 relative"
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

      {/* MOBILE UNIQUE FLOATING PILL NAV */}
      <motion.div
        initial={{ x: "-50%", y: 60, opacity: 0 }}
        animate={{ x: "-50%", y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        className="md:hidden fixed bottom-6 left-1/2 z-[100] glass-strong px-6 py-3 rounded-full flex gap-7 shadow-[0_8px_32px_rgba(34,197,94,0.15)]"
        style={{
          border: "1px solid rgba(34, 197, 94, 0.15)",
        }}
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => setActiveSection(item.id)}
            className={`relative flex items-center justify-center text-[22px] transition-all duration-300 ${
              activeSection === item.id
                ? "text-green-400 scale-125 -translate-y-2"
                : "text-white opacity-50 hover:opacity-100 hover:scale-110"
            }`}
          >
            {item.icon}
            {activeSection === item.id && (
              <span className="absolute -bottom-3 w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_8px_#4ade80]" />
            )}
          </a>
        ))}
      </motion.div>
    </>
  );
}
