import ProfileCard from "../components/Profile";
import ProjectPage from "../components/ProjectPage";
import SkillsContactPage from "../components/SkillContent";
import ExperienceSection from "../components/ExperienceSection";
import EducationSection from "../components/EducationSection";
import AchievementsSection from "../components/AchievementsSection";
import Footer from "../components/Footer";
import { motion } from "motion/react";

// Subtle technical section divider
const SectionDivider = () => (
  <div
    className="w-full max-w-5xl mx-auto my-6 md:my-10 h-px"
    style={{
      background:
        "linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.2), transparent)",
    }}
  />
);

// Consistent section reveal: fade + 16px rise, 0.5s (Rule 7)
const RevealSection = ({ children, id, className = "" }) => (
  <motion.section
    id={id}
    className={`w-full flex justify-center items-center ${className}`}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.section>
);

const Home = ({ children }) => {
  return (
    <div className="bg-[#020409] text-white selection:bg-cyan-400 selection:text-black">
      <div className="overflow-y-auto scroll-smooth">
        {/* Hero / Profile */}
        <section
          id="Home"
          className="relative flex justify-center items-center w-full min-h-[90vh] md:min-h-screen"
        >
          <ProfileCard />
        </section>

        <SectionDivider />

        {/* Experience */}
        <RevealSection
          id="experience"
          className="py-20 md:py-28"
        >
          <ExperienceSection />
        </RevealSection>

        <SectionDivider />

        {/* Projects */}
        <RevealSection
          id="project"
          className="py-20 md:py-28"
        >
          <ProjectPage />
        </RevealSection>

        <SectionDivider />

        {/* Education & Achievements */}
        <RevealSection
          id="education"
          className="flex-col py-20 md:py-28"
        >
          <EducationSection />
          <AchievementsSection />
        </RevealSection>

        <SectionDivider />

        {/* Skills & Contact */}
        <RevealSection
          id="about"
          className="py-20 md:py-28"
        >
          <SkillsContactPage />
        </RevealSection>

        {/* Footer */}
        <Footer />
      </div>

      {children}
    </div>
  );
};

export default Home;
