import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import Header from "./components/Header";
import StarsBackground from "./components/StarBackGround";
import Home from "./pages/Home";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import CustomCursor from "./components/CustomCursor";
import AiTerminal from "./components/AiTerminal";

// Robust scroll manager: handles hash scrolling across routes & resets top on route change
function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      let attempts = 0;
      const interval = setInterval(() => {
        attempts += 1;
        const el = document.getElementById(id);
        if (el) {
          clearInterval(interval);
          if (window.lenis) {
            window.lenis.scrollTo(el, { offset: -60, duration: 0.8 });
          } else {
            el.scrollIntoView({ behavior: "smooth" });
          }
        } else if (attempts > 30) {
          clearInterval(interval);
        }
      }, 40);
      return () => clearInterval(interval);
    } else {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    }
  }, [location.pathname, location.hash]);

  return null;
}

// Animated routes wrapper
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/project/:id"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectDetailPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  // Dynamic browser tab title switcher on visibility change
  useEffect(() => {
    const originalTitle = document.title;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Bikrant Nath | Ready to build 🚀";
      } else {
        document.title = originalTitle;
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    // Respect user's motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      infinite: false,
    });
    window.lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <Router>
      <ScrollManager />
      <StarsBackground />
      <CustomCursor />
      <Header />
      <AnimatedRoutes />
      <AiTerminal />
    </Router>
  );
}

export default App;
