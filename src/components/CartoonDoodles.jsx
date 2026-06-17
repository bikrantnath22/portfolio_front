import { motion } from "framer-motion";

// Floating cartoon doodle SVGs — subtle, semi-transparent decorations
const doodleVariants = {
  float: (i) => ({
    y: [0, -12, 0, 8, 0],
    x: [0, 4, -4, 2, 0],
    rotate: [0, 3, -3, 1, 0],
    transition: {
      duration: 4 + i * 0.8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }),
};

// Code brackets doodle </>
export const CodeBracketDoodle = ({ className = "", delay = 0 }) => (
  <motion.svg
    custom={delay}
    variants={doodleVariants}
    animate="float"
    className={`absolute pointer-events-none ${className}`}
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <text
      x="4"
      y="28"
      fontSize="22"
      fontFamily="Baloo 2, cursive"
      fill="currentColor"
      opacity="0.15"
      stroke="currentColor"
      strokeWidth="0.5"
    >
      {"</>"}
    </text>
  </motion.svg>
);

// Lightbulb doodle
export const LightbulbDoodle = ({ className = "", delay = 1 }) => (
  <motion.svg
    custom={delay}
    variants={doodleVariants}
    animate="float"
    className={`absolute pointer-events-none ${className}`}
    width="36"
    height="46"
    viewBox="0 0 36 46"
    fill="none"
  >
    <path
      d="M18 4C10.3 4 4 10.3 4 18c0 4.8 2.4 9 6 11.6V34a2 2 0 002 2h12a2 2 0 002-2v-4.4c3.6-2.6 6-6.8 6-11.6 0-7.7-6.3-14-14-14z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.12"
      fill="none"
      strokeDasharray="3 3"
    />
    <path
      d="M13 38h10M15 42h6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.12"
    />
    {/* Rays */}
    <path
      d="M18 0v2M32 6l-1.5 1.5M36 18h-2M4 18H2M7.5 7.5L6 6"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.08"
    />
  </motion.svg>
);

// Rocket doodle
export const RocketDoodle = ({ className = "", delay = 2 }) => (
  <motion.svg
    custom={delay}
    variants={doodleVariants}
    animate="float"
    className={`absolute pointer-events-none ${className}`}
    width="36"
    height="44"
    viewBox="0 0 36 44"
    fill="none"
  >
    <path
      d="M18 2c0 0-8 8-8 22h16C26 10 18 2 18 2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.12"
      fill="none"
      strokeDasharray="3 2"
    />
    <path
      d="M10 24l-4 8 6-2M26 24l4 8-6-2"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.10"
    />
    <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.2" opacity="0.12" />
    <path
      d="M14 32l4 10 4-10"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.10"
    />
  </motion.svg>
);

// Star doodle
export const StarDoodle = ({ className = "", delay = 3 }) => (
  <motion.svg
    custom={delay}
    variants={doodleVariants}
    animate="float"
    className={`absolute pointer-events-none ${className}`}
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
  >
    <path
      d="M14 2l3.5 8.5L26 12l-6.5 5L21 26l-7-4.5L7 26l1.5-9L2 12l8.5-1.5L14 2z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.12"
      fill="none"
      strokeDasharray="2 2"
    />
  </motion.svg>
);

// Gear doodle
export const GearDoodle = ({ className = "", delay = 4 }) => (
  <motion.svg
    custom={delay}
    variants={doodleVariants}
    animate="float"
    className={`absolute pointer-events-none ${className}`}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M16 10a6 6 0 100 12 6 6 0 000-12z"
      stroke="currentColor"
      strokeWidth="1.3"
      opacity="0.12"
      fill="none"
    />
    <path
      d="M14 2h4l.5 3.5a10 10 0 013 1.7L25 5.5l2 3.5-3 2a10 10 0 010 6l3 2-2 3.5-3.5-1.7a10 10 0 01-3 1.7L18 26h-4l-.5-3.5a10 10 0 01-3-1.7L7 22.5l-2-3.5 3-2a10 10 0 010-6l-3-2 2-3.5 3.5 1.7a10 10 0 013-1.7L14 2z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.10"
      fill="none"
      strokeDasharray="2 2"
    />
  </motion.svg>
);

// Wavy section divider
export const WavyDivider = ({ className = "" }) => (
  <div className={`w-full overflow-hidden ${className}`}>
    <svg
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      className="w-full h-8 md:h-12"
      fill="none"
    >
      <path
        d="M0 30 Q150 5, 300 30 T600 30 T900 30 T1200 30"
        stroke="rgba(34,197,94,0.15)"
        strokeWidth="2"
        strokeDasharray="8 6"
        fill="none"
      />
      <path
        d="M0 35 Q150 55, 300 35 T600 35 T900 35 T1200 35"
        stroke="rgba(34,197,94,0.08)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
      />
    </svg>
  </div>
);

// Trophy doodle for achievements
export const TrophyDoodle = ({ className = "", delay = 0 }) => (
  <motion.svg
    custom={delay}
    variants={doodleVariants}
    animate="float"
    className={`pointer-events-none ${className}`}
    width="44"
    height="50"
    viewBox="0 0 44 50"
    fill="none"
  >
    <path
      d="M12 6h20v16c0 5.5-4.5 10-10 10s-10-4.5-10-10V6z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.15"
      fill="none"
      strokeDasharray="3 3"
    />
    <path
      d="M12 10H6c0 6 4 8 6 8M32 10h6c0 6-4 8-6 8"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      opacity="0.12"
    />
    <path
      d="M18 32v6h8v-6M14 38h16"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      opacity="0.12"
    />
    {/* Star on trophy */}
    <path
      d="M22 14l2 4 4.5.5-3.2 3.2.8 4.5L22 24l-4.1 2.2.8-4.5L15.5 18.5 20 18l2-4z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.10"
      fill="none"
    />
  </motion.svg>
);

// Graduation cap doodle for education
export const GradCapDoodle = ({ className = "", delay = 0 }) => (
  <motion.svg
    custom={delay}
    variants={doodleVariants}
    animate="float"
    className={`pointer-events-none ${className}`}
    width="44"
    height="36"
    viewBox="0 0 44 36"
    fill="none"
  >
    <path
      d="M22 4L2 14l20 10 20-10L22 4z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.15"
      fill="none"
      strokeDasharray="3 3"
    />
    <path
      d="M10 19v10c0 0 5 5 12 5s12-5 12-5V19"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      opacity="0.12"
      fill="none"
    />
    <path
      d="M38 14v14"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      opacity="0.12"
    />
    <circle cx="38" cy="30" r="2" stroke="currentColor" strokeWidth="1" opacity="0.10" />
  </motion.svg>
);

export default {
  CodeBracketDoodle,
  LightbulbDoodle,
  RocketDoodle,
  StarDoodle,
  GearDoodle,
  WavyDivider,
  TrophyDoodle,
  GradCapDoodle,
};
