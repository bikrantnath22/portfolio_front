import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import BottomNavBar from "./components/BottomNav";
import StarsBackground from "./components/StarBackGround";
import ProgressLoader from "./components/ProgressLoader";

function App() {
  const [loading, setLoading] = useState(!localStorage.getItem('dataLoaded'));

  useEffect(() => {
    if (!localStorage.getItem('dataLoaded')) {
      const timer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem('dataLoaded', 'true');
      }, 3100); // Loader duration

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <ProgressLoader />;
  }

  return (
    <Router>
      <StarsBackground />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <BottomNavBar />
    </Router>
  );
}

export default App;
""
