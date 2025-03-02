import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  ProjectOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { FaProjectDiagram } from "react-icons/fa"; // Project icon
import NavBtns from "./NavBtn";

export default function Header() {
  const location = useLocation();
  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent  px-7 py-2 flex justify-between items-center z-50">
      {/* Left Side: Logo */}
      <div className="text-white text-3xl font-mono font-bold mr-24 md:mr-0 justify-start">
        <Link to="/">
        <span className="text-green-400">P</span>
        <span className="text-green-500">o</span>
        <span className="text-green-50">r</span>
        <span className="text-green-100">T</span>
        <span className="text-green-200">f</span>
        <span className="text-green-300">o</span>
        <span className="text-green-400">L</span>
        <span className="text-green-500">i</span>
        <span className="text-green-600">o</span>
        </Link>
        
      </div>

      {/* Right Side: Navigation Links */}
      <div className=" space-x-6 items-center hidden md:flex font-poppins text-[13px]">
        <Link to="/" className="flex items-center">
          <NavBtns
            icon={<HomeOutlined />}
            title="Home"
            isActive={location.pathname === "/"}
          />
        </Link>
        <Link to="/project" className="flex items-center">
          <NavBtns
            icon={<FaProjectDiagram />}
            title="Projects"
            isActive={location.pathname === "/project"}
          />
        </Link>
        <Link
          to="/abouts"
          className="flex items-center"
        >
          <NavBtns icon={<InfoCircleOutlined />} title={"Abouts"} isActive={location.pathname === "/abouts"}/>
        </Link>
      </div>
    </nav>
  );
}
