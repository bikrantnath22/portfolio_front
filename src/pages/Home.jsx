import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import ProfileCard from "../components/Profile";
import StarsBackground from "../components/StarBackGround";
import BottomNavBar from "../components/BottomNav";
import ProjectPage from "../components/ProjectPage";
import SkillsContactPage from "../components/SkillContent";
import { Element } from 'react-scroll';

const App = ({ children }) => {
  // Check if device is mobile

  return (
    <div className="">
      <div className="snap-y snap-mandatory h-screen ">
        <section id="Home" className="flex justify-center items-center w-full min-h-screen">
          <ProfileCard />
        </section>

        <section id="project" className="flex justify-center items-center w-full min-h-screen">
          <ProjectPage />
        </section>

        <section id="about" className="flex justify-center items-center w-full min-h-screen">
          <SkillsContactPage />
        </section>

        
      </div>
      

      {/* Adds enough space for scrolling */}
      {children}
    </div>
  );
};

export default App;
