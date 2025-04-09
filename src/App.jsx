import react, { useState, useEffect } from "react";
import { Outlet, BrowserRouter as Router, useParams } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

import BottomNavBar from "./components/BottomNav";
import StarsBackground from "./components/StarBackGround";

function App() {
  return (
    <>
      <Router>
      <StarsBackground />
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
         
         
        </Routes>
        <BottomNavBar/>
      </Router>
    </>
  );
}

export default App;
