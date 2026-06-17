import { useState, useEffect } from "react";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

export default function ThemePeel() {
  const [isDragging, setIsDragging] = useState(false);
  const [radius, setRadius] = useState(80);
  const [isLightMode, setIsLightMode] = useState(false);

  const handlePointerDown = (e) => {
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const newRadius = e.clientX + e.clientY; 
    setRadius(Math.max(80, newRadius));
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const clickDistance = e.clientX + e.clientY;
    const maxRadius = window.innerWidth + window.innerHeight + 200;
    
    if (clickDistance < 150 && radius < 150) {
      // Toggle
      setRadius(80);
      setIsLightMode(!isLightMode);
    } else if (radius > 150) {
      // Complete the drag
      setRadius(80);
      setIsLightMode(!isLightMode);
    } else {
      // Snap back
      setRadius(80);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };
    }
  }, [isDragging, radius, isLightMode]);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("light-mode-active");
    } else {
      document.body.classList.remove("light-mode-active");
    }
  }, [isLightMode]);

  return (
    <>
      <style>
        {`
          /* Protect images, videos, and specific elements from inversion */
          img:not(.absolute), video:not(.absolute), .theme-ignore:not(.absolute) {
            position: relative;
          }
          img, video, .theme-ignore {
            z-index: 45 !important;
          }
          /* Anti-invert class to perfectly counter the inversion layer for elements trapped in stacking contexts */
          body.light-mode-active .anti-invert {
            filter: hue-rotate(180deg) invert(1) !important;
          }
        `}
      </style>

      {/* Base Background Layer: Covers stars when light mode is fully active */}
      {isLightMode && (
        <div 
          className="fixed inset-0 z-[-5] pointer-events-none"
          style={{
            background: "linear-gradient(to bottom right, #000000, #0f172a)",
          }}
        ></div>
      )}

      {/* Background Peel Layer: Grows to cover the stars cleanly */}
      <div 
        className="fixed inset-0 z-[-5] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom right, #000000, #0f172a)",
          clipPath: `polygon(0 0, ${radius}px 0, 0 ${radius}px)`,
          transition: isDragging ? "none" : "clip-path 0.5s ease-out"
        }}
      ></div>

      {/* Base Light Layer: Active only when isLightMode is true */}
      {isLightMode && (
        <div 
          className="fixed inset-0 z-[30] pointer-events-none"
          style={{
            backdropFilter: "invert(1) hue-rotate(180deg)",
            WebkitBackdropFilter: "invert(1) hue-rotate(180deg)",
          }}
        >
        </div>
      )}

      {/* Peel Layer: The interactive diagonal corner starting from TOP-LEFT */}
      <div 
        className="fixed inset-0 z-[40] pointer-events-none"
        style={{
          backdropFilter: "invert(1) hue-rotate(180deg)",
          WebkitBackdropFilter: "invert(1) hue-rotate(180deg)",
          clipPath: `polygon(0 0, ${radius}px 0, 0 ${radius}px)`,
          transition: isDragging ? "none" : "clip-path 0.5s ease-out"
        }}
      >
      </div>

      {/* The Draggable TOP-LEFT Corner (Dog-ear fold) */}
      <div 
        onPointerDown={handlePointerDown}
        className="fixed top-0 left-0 z-[95] cursor-pointer touch-none flex items-start justify-start p-2"
        style={{
          width: 80, 
          height: 80,
          clipPath: "polygon(0 0, 100% 0, 0 100%)", // Top-left triangle
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
          backdropFilter: "blur(2px)",
          borderBottomRightRadius: "8px", 
        }}
        title="Drag or Click to switch theme!"
      >
        <div className="flex flex-col items-center justify-center w-8 h-8 opacity-70 hover:opacity-100 transition-opacity">
          {isLightMode ? (
            <MoonOutlined className="text-xl drop-shadow-md transition-colors text-white" />
          ) : (
            <SunOutlined className="text-xl drop-shadow-md transition-colors text-black" />
          )}
        </div>
      </div>
    </>
  );
}
