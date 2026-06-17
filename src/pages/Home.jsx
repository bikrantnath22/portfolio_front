import BouncingBallTransition from "../components/BallTransition";
import ProfileCard from "../components/Profile";
import ProjectPage from "../components/ProjectPage";
import SkillsContactPage from "../components/SkillContent";
import ExperienceSection from "../components/ExperienceSection";
import EducationSection from "../components/EducationSection";
import AchievementsSection from "../components/AchievementsSection";
import Footer from "../components/Footer";
import { WavyDivider } from "../components/CartoonDoodles";
import { motion } from "framer-motion";

// Section wrapper with scroll-triggered reveal
const RevealSection = ({ children, id, className = "" }) => (
  <motion.section
    id={id}
    className={`flex justify-center items-center w-full ${className}`}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.section>
);

const Home = ({ children }) => {
  return (
    <div>
      <div className="overflow-y-auto scroll-smooth">
        {/* Hero / Profile */}
        <section
          id="Home"
          className="flex justify-center items-center w-full min-h-[86vh] md:min-h-screen"
        >
          <ProfileCard />
        </section>

        <WavyDivider className="my-2 md:my-0" />
        <BouncingBallTransition />

        {/* Experience */}
        <RevealSection
          id="experience"
          className="min-h-[60vh] md:min-h-screen"
        >
          <ExperienceSection />
        </RevealSection>

        <WavyDivider className="my-2 md:my-0" />
        <BouncingBallTransition />

        {/* Projects */}
        <RevealSection
          id="project"
          className="min-h-[86vh] md:min-h-screen mb-2"
        >
          <ProjectPage />
        </RevealSection>

        <WavyDivider className="my-2 md:my-0" />
        <BouncingBallTransition />

        {/* Education & Achievements */}
        <RevealSection
          id="education"
          className="flex-col min-h-[70vh] md:min-h-screen"
        >
          <EducationSection />
          <AchievementsSection />
        </RevealSection>

        <WavyDivider className="my-2 md:my-0" />
        <BouncingBallTransition />

        {/* Skills & Contact */}
        <RevealSection
          id="about"
          className="min-h-[90vh] md:min-h-screen"
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
