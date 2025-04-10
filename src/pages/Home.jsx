import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import ProfileCard from "../components/Profile";
import StarsBackground from "../components/StarBackGround";
import BottomNavBar from "../components/BottomNav";
import ProjectPage from "../components/ProjectPage";
import SkillsContactPage from "../components/SkillContent";
import { Element } from "react-scroll";
import { motion } from "framer-motion";
import BouncingBallTransition from "../components/BallTransition"

const App = ({ children }) => {
  return (
    <div className="">
      <StarsBackground />

      <div className="md:snap-y md:snap-mandatory md:h-screen overflow-y-scroll scroll-smooth">

        {/* Home Section */}
        <section
          id="Home"
          className="flex justify-center items-center w-full min-h-[86vh] md:min-h-screen md:snap-start"
        >
          <ProfileCard />
        </section>

        {/* ✨ Mobile-Only Animation Between Sections */}
        
        <BouncingBallTransition />


        {/* Project Section */}
        <section
          id="project"
          className="flex justify-center items-center w-full min-h-[86vh] md:min-h-screen md:snap-start mb-6"
        >
          <ProjectPage />
        </section>

        <BouncingBallTransition />


        {/* About Section */}
        <section
          id="about"
          className="flex justify-center items-center w-full min-h-[90vh] md:min-h-screen md:snap-start"
        >
          <SkillsContactPage />
        </section>
      </div>

      <BottomNavBar />
      {children}
    </div>
  );
};

export default App;
