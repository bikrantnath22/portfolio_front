import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const BallTransitionMobile = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.5 });
  const bounceControls = useAnimation();

  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isInView && visible && !fadeOut) {
      bounceControls.start("bounce");
    } else {
      bounceControls.stop();
    }
  }, [isInView, visible, fadeOut, bounceControls]);

  const handleBallClick = () => {
    setFadeOut(true); // Start fade-out
    setTimeout(() => {
      setVisible(false); // Then hide
    }, 500);
  };

  const handleLineClick = () => {
    if (!visible) {
      setFadeOut(false); // reset fade
      setVisible(true);  // show ball again
    }
  };

  return (
    <div ref={ref} className="block md:hidden relative w-full h-16">
      {/* Line: grows and clickable to restore ball */}
      <motion.div
        onClick={handleLineClick}
        initial={{ width: 0 }}
        animate={isInView ? { width: "70%" } : { width: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-0.5 bg-green-600 rounded absolute left-1/2 transform -translate-x-1/2 bottom-4 cursor-pointer"
      />

      {/* Bouncing Ball */}
      {visible && (
        <motion.div
          onClick={handleBallClick}
          className="w-3 h-3 rounded-full bg-green-600 mx-auto absolute left-1/2 transform -translate-x-1/2 bottom-5 cursor-pointer"
          variants={{
            bounce: {
              y: [0, -40, 0],
              transition: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 1.4,
                ease: "easeInOut",
              },
            },
            fadeOut: {
              opacity: 0,
              scale: 0.5,
              transition: { duration: 0.5, ease: "easeInOut" },
            },
          }}
          animate={fadeOut ? "fadeOut" : "bounce"}
        />
      )}
    </div>
  );
};

export default BallTransitionMobile;
