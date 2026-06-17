import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBox from "./ChatBox";

export default function AiTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const wrapperRef = useRef(null);

  // Initialize container size
  useEffect(() => {
    if (!wrapperRef.current) return;
    
    const updateSize = () => {
      setContainerSize({ 
        width: wrapperRef.current.offsetWidth, 
        height: wrapperRef.current.offsetHeight 
      });
    };
    
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Wandering Bot Logic
  useEffect(() => {
    if (isOpen || containerSize.width === 0) return; // Stop wandering when chat is open

    const moveBot = () => {
      const margin = 50; // keep it 50px away from edges
      const randomX = margin + Math.random() * (containerSize.width - margin * 2);
      const randomY = margin + Math.random() * (containerSize.height - margin * 2);
      
      setPosition({ x: randomX, y: randomY });
    };

    // Initial jump
    moveBot();
    
    // Move every 15 seconds (very slow speed)
    const interval = setInterval(moveBot, 15000);
    return () => clearInterval(interval);
  }, [isOpen, containerSize]);

  // Calculate safe modal coordinates to prevent overflow within the parent
  const modalWidth = 360;
  const modalHeight = 500;
  const safeX = Math.max(10, Math.min(position.x, containerSize.width - modalWidth - 10));
  const safeY = Math.max(10, Math.min(position.y, containerSize.height - modalHeight - 10));

  return (
    <div ref={wrapperRef} className="absolute inset-0 pointer-events-none overflow-hidden z-[100]">
      {/* Wandering Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              x: position.x, 
              y: position.y, 
              opacity: 1, 
              scale: 1 
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              x: { duration: 15, ease: "easeInOut" }, 
              y: { duration: 15, ease: "easeInOut" },
              opacity: { duration: 0.3 }
            }}
            onClick={() => setIsOpen(true)}
            className="absolute top-0 left-0 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:shadow-[0_0_40px_rgba(34,197,94,0.8)] bg-black/90 border border-green-500 theme-ignore cursor-pointer pointer-events-auto"
            style={{ willChange: "transform, opacity" }}
            whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.9 }}
            title="Catch me to chat!"
          >
            <span className="text-2xl drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">🤖</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Popup Modal Window at Exact Position */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute w-[340px] md:w-[380px] h-[500px] rounded-3xl flex flex-col overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.15)] border border-green-500/20 theme-ignore pointer-events-auto"
            style={{
              left: safeX,
              top: safeY,
              background: "linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(0, 0, 0, 0.98) 100%)",
              willChange: "transform, opacity",
            }}
          >
            <ChatBox onClose={() => setIsOpen(false)} />
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
