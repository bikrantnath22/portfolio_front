import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import ProgressLoader from "./components/ProgressLoader";
import StarsBackground from "./components/StarBackGround";
import Home from "./pages/Home";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import CustomCursor from "./components/CustomCursor";
import ThemePeel from "./components/ThemePeel";

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
  const [loading, setLoading] = useState(!localStorage.getItem("dataLoaded"));

  useEffect(() => {
    if (!localStorage.getItem("dataLoaded")) {
      const timer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem("dataLoaded", "true");
      }, 3100);

      return () => clearTimeout(timer);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <ProgressLoader />;
  }

  return (
    <Router>
      <ThemePeel />
      <StarsBackground />
      <CustomCursor />
      <Header />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
