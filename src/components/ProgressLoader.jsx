import { useEffect, useState } from "react";
import StarsBackground from "./StarBackGround";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";

export default function ProgressLoader() {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setCompleted(true), 600); // Add delay for completion animation
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <StarsBackground />

      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
        <AnimatePresence>
          {!completed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative w-96 h-10 rounded-xl overflow-hidden shadow-2xl border border-green-400"
            >
              {/* Background shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-black"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ backgroundSize: "200% 200%" }}
              />

              {/* Progress fill */}
              <motion.div
                style={{ width: `${progress}%` }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 via-emerald-400 to-green-700 shadow-lg"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />

              {/* Glow overlay */}
              <motion.div
                className="absolute inset-y-0 left-0 bg-green-400/30 blur-2xl"
                style={{ width: `${progress}%` }}
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Icon + Percentage */}
              <div className="absolute inset-0 flex items-center justify-center gap-2">
                {progress < 100 ? (
                  <>
                    <FaSpinner className="animate-spin text-green-300 text-xl" />
                    <span className="text-green-200 font-semibold">
                      {progress}%
                    </span>
                  </>
                ) : null}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center justify-center text-center"
            >
              <FaCheckCircle className="text-green-400 text-5xl drop-shadow-lg animate-bounce" />
              <motion.p
                className="text-green-200 font-semibold text-lg mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Loaded Successfully!
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
