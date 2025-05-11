import { useEffect, useState } from "react";
import StarsBackground from "./StarBackGround";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa"; // Importing a spinner icon

export default function ProgressLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30); // Speed of progress

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <StarsBackground />
      <div className="fixed inset-0 flex items-center justify-center  bg-opacity-90 z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="relative w-80 h-8  rounded-xl overflow-hidden shadow-lg border border-green-500"
        >
          {/* Progress bar background */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black" />

          {/* Animated progress bar fill */}
          <motion.div
            style={{ width: `${progress}%` }}
            className="absolute inset-0 bg-gradient-to-r from-gray-800 to-green-800"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6 }}
          />

          {/* Icon and Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            {progress < 100 ? (
              <FaSpinner className="animate-spin text-white text-xl" />
            ) : (
              <span className="text-white text-xl">
                {progress}%
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
