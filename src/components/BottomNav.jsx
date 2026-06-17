import { memo, useEffect, useState } from "react";
import {
  HomeOutlined,
  InfoCircleOutlined,
  ExperimentOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { FaProjectDiagram } from "react-icons/fa";
import NavBtns from "./NavBtn";



const BottomNavBar = () => {
    const [activeSection, setActiveSection] = useState("");
    
      useEffect(() => {
        const handleScroll = () => {
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
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
  return (
    <>
      <div className=" z-50 fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-90 flex justify-around items-center w-[95%] max-w-lg p-2.5 rounded-full shadow-lg md:hidden backdrop-blur-sm border border-green-500/10">
        
      <a href="#Home" className="flex items-center" onClick={() => setActiveSection("Home")}>
          <NavBtns
            icon={<HomeOutlined />}
            title="Home"
            isActive={activeSection === "Home"}
          />
        </a>
        <a href="#experience" className="flex items-center" onClick={() => setActiveSection("experience")}>
          <NavBtns
            icon={<ExperimentOutlined />}
            title="Exp"
            isActive={activeSection === "experience"}
          />
        </a>
        <a href="#project" className="flex items-center" onClick={() => setActiveSection("project")}>
          <NavBtns
            icon={<FaProjectDiagram />}
            title="Projects"
            isActive={activeSection === "project"}
          />
        </a>
        <a href="#education" className="flex items-center" onClick={() => setActiveSection("education")}>
          <NavBtns
            icon={<ReadOutlined />}
            title="Edu"
            isActive={activeSection === "education"}
          />
        </a>
        <a href="#about" className="flex items-center" onClick={() => setActiveSection("about")}>
          <NavBtns
            icon={<InfoCircleOutlined />}
            title="About"
            isActive={activeSection === "about"}
          />
        </a>
        
      </div>
    </>
  );
};

export default memo(BottomNavBar);
