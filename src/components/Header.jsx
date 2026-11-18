import { useEffect, useState } from "react";
import {
  HomeOutlined,
  ExperimentOutlined,
  ReadOutlined,
  AppstoreOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { FaProjectDiagram } from "react-icons/fa";
import { motion } from "motion/react";

export default function Header() {
  const [activeSection, setActiveSection] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ["Home", "experience", "project", "education", "about"];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "Home", title: "Home", icon: <HomeOutlined /> },
    { id: "experience", title: "Experience", icon: <ExperimentOutlined /> },
    { id: "project", title: "Projects", icon: <FaProjectDiagram /> },
    { id: "education", title: "Education", icon: <ReadOutlined /> },
    { id: "about", title: "Skills", icon: <AppstoreOutlined /> },
  ];

  return (
    <>
      {/* DESKTOP MINIMAL STICKY HEADER */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#020409]/80 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3 px-6 md:px-10"
            : "bg-transparent border-b border-transparent py-5 px-6 md:px-10"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Brand Monogram */}
          <a
            href="/#Home"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-heading text-cyan-400 bg-cyan-950/40 border border-cyan-400/30 group-hover:border-cyan-400/60 shadow-[0_0_12px_rgba(34,211,238,0.15)] transition-all">
              BN
            </div>
            <span className="text-sm font-bold font-heading text-white tracking-tight group-hover:text-cyan-300 transition-colors hidden sm:inline">
              Bikrant Nath
            </span>
          </a>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full px-3 py-1 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 relative ${
                    isActive
                      ? "text-cyan-400 font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.title}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-cyan-950/60 border border-cyan-400/30 rounded-full -z-10 shadow-[0_0_10px_rgba(34,211,238,0.15)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Contact Button in Accent Color */}
          <div className="flex items-center gap-3">
            <a
              href="/#about"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-cyan-400 text-black hover:bg-cyan-300 transition-all duration-200 shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:scale-105 active:scale-95"
            >
              <MailOutlined className="text-xs" />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </motion.header>

      {/* MOBILE FLOATING NAV PILL */}
      <motion.nav
        initial={{ x: "-50%", y: 40, opacity: 0 }}
        animate={{ x: "-50%", y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="md:hidden fixed bottom-6 left-1/2 z-50 bg-[#040914]/90 backdrop-blur-xl px-4 py-2 rounded-full flex items-center gap-5 shadow-[0_8px_32px_rgba(0,0,0,0.7)] border border-cyan-400/25"
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`/#${item.id}`}
              className={`relative flex flex-col items-center justify-center p-1.5 transition-all duration-200 ${
                isActive
                  ? "text-cyan-400 scale-105"
                  : "text-gray-400 hover:text-white"
              }`}
              title={item.title}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[9px] font-mono tracking-wider mt-0.5 uppercase">
                {item.title}
              </span>
              {isActive && (
                <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
              )}
            </a>
          );
        })}
      </motion.nav>
    </>
  );
}
