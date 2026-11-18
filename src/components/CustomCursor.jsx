import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable for fine-pointer devices and when user has not requested reduced motion
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Track hoverable elements across the entire website including chatbox
    const handleMouseOver = (e) => {
      const el = e.target;
      if (
        el &&
        (el.tagName === "A" ||
          el.tagName === "BUTTON" ||
          el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.closest?.("a") ||
          el.closest?.("button") ||
          el.classList?.contains("cursor-pointer") ||
          el.closest?.(".cursor-pointer"))
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // Hide native cursor everywhere across the entire website including modals
    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.body.style.cursor = "";
      const existingStyle = document.getElementById("custom-cursor-style");
      if (existingStyle) existingStyle.remove();
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <>
      {/* Main cursor dot (highest z-index so it renders on top of everything including chatbox) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100002] mix-blend-difference"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 2000,
          damping: 50,
          mass: 0.1,
        }}
      >
        <div
          className="w-2 h-2 rounded-full bg-cyan-300"
          style={{
            boxShadow: "0 0 8px rgba(34, 211, 238, 0.9)",
          }}
        />
      </motion.div>

      {/* Trailing reactive ring (floats above modal, reacts to buttons, chips, and links) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100001]"
        animate={{
          x: mousePos.x - (isHovering ? 24 : 16),
          y: mousePos.y - (isHovering ? 24 : 16),
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 25,
          mass: 0.2,
        }}
      >
        <div
          className="w-full h-full rounded-full border-[1.5px] transition-colors duration-200"
          style={{
            borderColor: isHovering
              ? "rgba(34, 211, 238, 0.85)"
              : "rgba(255, 255, 255, 0.25)",
            background: isHovering
              ? "rgba(34, 211, 238, 0.12)"
              : "transparent",
            boxShadow: isHovering
              ? "0 0 18px rgba(34, 211, 238, 0.4)"
              : "none",
          }}
        />
      </motion.div>
    </>
  );
}
