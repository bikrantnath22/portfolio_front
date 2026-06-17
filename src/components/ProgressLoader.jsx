import { useEffect, useState } from "react";
import StarsBackground from "./StarBackGround";
import { motion, AnimatePresence } from "framer-motion";

const loadingMessages = [
  "Loading...",
];

export default function ProgressLoader() {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setCompleted(true), 600);
          return 100;
        }
        return prev + 1;
      });
    }, 28);

    return () => clearInterval(interval);
  }, []);

  // Cycle loading messages
  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 600);
    return () => clearInterval(msgInterval);
  }, []);

  return (
    <>
      <StarsBackground />

      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/90 z-50">
        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.div
              key="loading"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-center gap-6"
            >
              {/* Animated logo/monogram */}
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-extrabold aurora-text"
                style={{
                  background: "linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(6, 182, 212, 0.15))",
                  border: "1px solid rgba(34, 197, 94, 0.2)",
                }}
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                BN
              </motion.div>

              {/* Circular progress ring */}
              <div className="relative w-28 h-28">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="rgba(34, 197, 94, 0.1)"
                    strokeWidth="4"
                  />
                  {/* Progress circle */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    strokeDashoffset={2 * Math.PI * 42 * (1 - progress / 100)}
                    style={{
                      filter: "drop-shadow(0 0 6px rgba(34, 197, 94, 0.4))",
                    }}
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="50%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Percentage in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{progress}%</span>
                </div>
              </div>

              {/* Loading message */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={msgIndex}
                  className="text-gray-400 text-sm tracking-wider"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {loadingMessages[msgIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="completed"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center justify-center text-center gap-3"
            >
              <motion.div
                className="text-5xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                ✨
              </motion.div>
              <motion.p
                className="text-green-400 font-semibold text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Welcome!
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
