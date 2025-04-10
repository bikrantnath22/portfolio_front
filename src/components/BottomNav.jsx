import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  HomeOutlined,
  ProjectOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import { FaProjectDiagram } from "react-icons/fa"; // Project icon
import NavBtns from "./NavBtn";



const BottomNavBar = () => {
    const location = useLocation();

    const [activeSection, setActiveSection] = useState("");
    
      useEffect(() => {
        const handleScroll = () => {
          const sections = ["Home", "project", "about"];
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
      <div className=" z-50 fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-90 flex justify-around items-center w-[90%] max-w-md p-3 rounded-full shadow-lg md:hidden">
        
      <a href="#Home" className="flex items-center" onClick={() => setActiveSection("Home")}>
          <NavBtns
            icon={<HomeOutlined />}
            title="Home"
            isActive={activeSection === "Home"}
          />
        </a>
        <a href="#project" className="flex items-center" onClick={() => setActiveSection("project")}>
          <NavBtns
            icon={<FaProjectDiagram />}
            title="Projects"
            isActive={activeSection === "project"}
          />
        </a>
        <a href="#about" className="flex items-center" onClick={() => setActiveSection("about")}>
          <NavBtns
            icon={<InfoCircleOutlined />}
            title={"Abouts"}
            isActive={activeSection === "about"}
          />
        </a>
        
      </div>
    </>
  );
};

export default React.memo(BottomNavBar);;
