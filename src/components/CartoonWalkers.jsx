import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimationControls } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   PURE CSS WALKING CHARACTERS 
   Legs and body animated by CSS Keyframes
   ═══════════════════════════════════════════════════════ */

const DevChar = ({ walking, mirror, front }) => {
  const flip = { transform: mirror ? "scaleX(-1)" : "none", display: "block" };
  const legAnimF = walking ? "leg-swing-f 0.5s infinite linear" : "none";
  const legAnimB = walking ? "leg-swing-b 0.5s infinite linear" : "none";
  const armAnimF = walking ? "arm-swing-f 0.5s infinite linear" : "none";
  const armAnimB = walking ? "arm-swing-b 0.5s infinite linear" : "none";
  const bobAnim  = walking ? "body-bob 0.25s infinite linear" : "none";

  if (front) return (
    <svg width="36" height="54" viewBox="0 0 36 54" fill="none" style={{ display:"block" }}>
      <ellipse cx="18" cy="4.5" rx="8" ry="4" fill="#1e293b"/>
      <circle cx="18" cy="9" r="7" fill="#fcd34d" stroke="#92400e" strokeWidth="0.8"/>
      <rect x="11.5" y="6.5" width="5" height="3.5" rx="1.2" stroke="#334155" strokeWidth="0.7" fill="rgba(100,200,255,0.25)"/>
      <rect x="19" y="6.5" width="5" height="3.5" rx="1.2" stroke="#334155" strokeWidth="0.7" fill="rgba(100,200,255,0.25)"/>
      <line x1="16.5" y1="8.2" x2="19" y2="8.2" stroke="#334155" strokeWidth="0.5"/>
      <circle cx="14" cy="8.8" r="1" fill="#1e293b"/><circle cx="21.5" cy="8.8" r="1" fill="#1e293b"/>
      <path d="M14 12 Q18 15 22 12" stroke="#92400e" strokeWidth="0.6" fill="none" strokeLinecap="round"/>
      <rect x="12" y="17" width="12" height="13" rx="2.5" fill="#3b82f6"/>
      <line x1="12" y1="21" x2="7" y2="28" stroke="#fcd34d" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="24" y1="21" x2="29" y2="28" stroke="#fcd34d" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="15" y1="30" x2="13" y2="44" stroke="#1e40af" strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="21" y1="30" x2="23" y2="44" stroke="#1e40af" strokeWidth="2.8" strokeLinecap="round"/>
      <ellipse cx="12.5" cy="45.5" rx="3.2" ry="1.5" fill="#1e293b"/>
      <ellipse cx="23.5" cy="45.5" rx="3.2" ry="1.5" fill="#1e293b"/>
    </svg>
  );

  return (
    <svg width="36" height="54" viewBox="0 0 36 54" fill="none" style={flip}>
      {/* Body Bob Wrapper */}
      <g style={{ animation: bobAnim }}>
        {/* Hair */}
        <path d="M16 3 Q24 0 31 4 Q28 1 22 1.5 Z" fill="#1e293b"/>
        {/* Head */}
        <circle cx="24" cy="9" r="7" fill="#fcd34d" stroke="#92400e" strokeWidth="0.8"/>
        {/* Eye */}
        <circle cx="28.5" cy="8.5" r="1.1" fill="#1e293b"/>
        <circle cx="29" cy="8" r="0.4" fill="white"/>
        {/* Glasses side */}
        <ellipse cx="29" cy="8.5" rx="3.2" ry="2.2" stroke="#334155" strokeWidth="0.6" fill="rgba(100,200,255,0.12)"/>
        {/* Ear */}
        <ellipse cx="17.5" cy="10" rx="1.2" ry="1.8" fill="#fbbf24" stroke="#92400e" strokeWidth="0.4"/>
        {/* Neck */}
        <rect x="21" y="16" width="4" height="2.5" rx="1" fill="#fcd34d"/>
        
        {/* Back arm */}
        <line x1="25" y1="22" x2="25" y2="33" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" style={{ transformOrigin: "25px 22px", animation: armAnimB }} />
        
        {/* Back leg */}
        <g style={{ transformOrigin: "21px 31px", animation: legAnimB }}>
          <line x1="21" y1="31" x2="21" y2="44" stroke="#1a3a8f" strokeWidth="2.2" strokeLinecap="round"/>
          <ellipse cx="21" cy="45.2" rx="2.8" ry="1.2" fill="#111827"/>
        </g>

        {/* Hoodie body */}
        <rect x="15" y="18" width="12" height="13" rx="2.5" fill="#3b82f6"/>
        
        {/* Front arm (laptop) */}
        <g style={{ transformOrigin: "16px 22px", animation: armAnimF }}>
          <line x1="16" y1="22" x2="15" y2="33" stroke="#fcd34d" strokeWidth="2.2" strokeLinecap="round"/>
          <rect x="8" y="27" width="9" height="6" rx="0.8" fill="#94a3b8" stroke="#64748b" strokeWidth="0.5"/>
          <rect x="9" y="28" width="7" height="4" rx="0.3" fill="#0ea5e9"/>
        </g>

        {/* Front leg */}
        <g style={{ transformOrigin: "20px 31px", animation: legAnimF }}>
          <line x1="20" y1="31" x2="20" y2="44" stroke="#1e40af" strokeWidth="2.8" strokeLinecap="round"/>
          <ellipse cx="20" cy="45.4" rx="3.2" ry="1.4" fill="#1e293b"/>
        </g>
      </g>
    </svg>
  );
};

const TeacherChar = ({ walking, mirror, front }) => {
  const flip = { transform: mirror ? "scaleX(-1)" : "none", display: "block" };
  const legAnimF = walking ? "leg-swing-f 0.5s infinite linear" : "none";
  const legAnimB = walking ? "leg-swing-b 0.5s infinite linear" : "none";
  const armAnimF = walking ? "arm-swing-f 0.5s infinite linear" : "none";
  const armAnimB = walking ? "arm-swing-b 0.5s infinite linear" : "none";
  const bobAnim  = walking ? "body-bob 0.25s infinite linear" : "none";

  if (front) return (
    <svg width="36" height="54" viewBox="0 0 36 54" fill="none" style={{ display:"block" }}>
      <ellipse cx="18" cy="5" rx="7" ry="4.5" fill="#92400e"/>
      <circle cx="18" cy="2.5" r="3" fill="#92400e"/>
      <circle cx="18" cy="10" r="7" fill="#fbbf24" stroke="#92400e" strokeWidth="0.8"/>
      <circle cx="14.5" cy="9" r="1.1" fill="#1e293b"/><circle cx="21.5" cy="9" r="1.1" fill="#1e293b"/>
      <circle cx="15" cy="8.5" r="0.4" fill="white"/><circle cx="22" cy="8.5" r="0.4" fill="white"/>
      <ellipse cx="12" cy="11.5" rx="1.8" ry="1" fill="#fca5a5" opacity="0.5"/>
      <ellipse cx="24" cy="11.5" rx="1.8" ry="1" fill="#fca5a5" opacity="0.5"/>
      <path d="M14 13 Q18 16.5 22 13" stroke="#92400e" strokeWidth="0.6" fill="none" strokeLinecap="round"/>
      <path d="M11 18 L9 30 L27 30 L25 18 Z" fill="#ec4899" stroke="#db2777" strokeWidth="0.5"/>
      <line x1="11" y1="22" x2="6" y2="29" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="25" y1="22" x2="30" y2="29" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="15" y1="30" x2="13" y2="44" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="21" y1="30" x2="23" y2="44" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="12.5" cy="45.5" rx="3" ry="1.4" fill="#dc2626"/>
      <ellipse cx="23.5" cy="45.5" rx="3" ry="1.4" fill="#dc2626"/>
    </svg>
  );

  return (
    <svg width="36" height="54" viewBox="0 0 36 54" fill="none" style={flip}>
      <g style={{ animation: bobAnim }}>
        {/* Hair bun */}
        <ellipse cx="23" cy="5" rx="6.5" ry="4" fill="#92400e"/>
        <circle cx="23" cy="2" r="3" fill="#92400e"/>
        {/* Head */}
        <circle cx="23" cy="10" r="7" fill="#fbbf24" stroke="#92400e" strokeWidth="0.8"/>
        {/* Eye */}
        <circle cx="27.5" cy="9.5" r="1.1" fill="#1e293b"/>
        <circle cx="28" cy="9" r="0.4" fill="white"/>
        {/* Ear */}
        <ellipse cx="16.5" cy="11" rx="1.2" ry="1.8" fill="#f59e0b" stroke="#92400e" strokeWidth="0.4"/>
        {/* Blush */}
        <ellipse cx="27" cy="12" rx="1.8" ry="1" fill="#fca5a5" opacity="0.45"/>
        {/* Smile side */}
        <path d="M22 13 Q24.5 15.5 27 13" stroke="#92400e" strokeWidth="0.5" fill="none" strokeLinecap="round"/>
        
        {/* Back arm */}
        <line x1="24" y1="23" x2="24" y2="33" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" style={{ transformOrigin: "24px 23px", animation: armAnimB }} />
        
        {/* Back leg */}
        <g style={{ transformOrigin: "21px 32px", animation: legAnimB }}>
          <line x1="21" y1="32" x2="21" y2="44" stroke="#111" strokeWidth="2.2" strokeLinecap="round"/>
          <ellipse cx="21" cy="45.2" rx="2.5" ry="1.1" fill="#991b1b"/>
        </g>

        {/* Dress */}
        <path d="M14 17 L11 32 L27 32 L25 17 Z" fill="#ec4899" stroke="#db2777" strokeWidth="0.5"/>
        
        {/* Front arm (book) */}
        <g style={{ transformOrigin: "15px 23px", animation: armAnimF }}>
          <line x1="15" y1="23" x2="15" y2="33" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round"/>
          <rect x="8" y="27" width="7" height="9" rx="0.8" fill="#22c55e" stroke="#15803d" strokeWidth="0.5"/>
          <line x1="11.5" y1="28" x2="11.5" y2="35" stroke="#15803d" strokeWidth="0.4"/>
        </g>

        {/* Front leg */}
        <g style={{ transformOrigin: "20px 32px", animation: legAnimF }}>
          <line x1="20" y1="32" x2="20" y2="44" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round"/>
          <ellipse cx="20" cy="45.4" rx="3" ry="1.4" fill="#dc2626"/>
        </g>
      </g>
    </svg>
  );
};

const ProfChar = ({ walking, mirror, front }) => {
  const flip = { transform: mirror ? "scaleX(-1)" : "none", display: "block" };
  const legAnimF = walking ? "leg-swing-f 0.5s infinite linear" : "none";
  const legAnimB = walking ? "leg-swing-b 0.5s infinite linear" : "none";
  const armAnimF = walking ? "arm-swing-f 0.5s infinite linear" : "none";
  const armAnimB = walking ? "arm-swing-b 0.5s infinite linear" : "none";
  const bobAnim  = walking ? "body-bob 0.25s infinite linear" : "none";

  if (front) return (
    <svg width="36" height="58" viewBox="0 0 36 58" fill="none" style={{ display:"block" }}>
      <rect x="9" y="1" width="18" height="4" rx="1" fill="#1e293b"/>
      <rect x="6" y="5" width="24" height="2.5" rx="1" fill="#1e293b"/>
      <circle cx="18" cy="14" r="7" fill="#d4a373" stroke="#92400e" strokeWidth="0.8"/>
      <path d="M11 15.5 Q18 23 25 15.5" fill="#e2e8f0"/>
      <circle cx="14.5" cy="13" r="1.1" fill="#1e293b"/><circle cx="21.5" cy="13" r="1.1" fill="#1e293b"/>
      <circle cx="21.5" cy="13" r="3.5" stroke="#eab308" strokeWidth="0.8" fill="none"/>
      <rect x="12" y="22" width="12" height="14" rx="2" fill="#334155"/>
      <path d="M18 22 L16.5 27 L18 36 L19.5 27 Z" fill="#dc2626"/>
      <line x1="12" y1="26" x2="7" y2="34" stroke="#d4a373" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="24" y1="26" x2="29" y2="34" stroke="#d4a373" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="15" y1="36" x2="13" y2="50" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="21" y1="36" x2="23" y2="50" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round"/>
      <ellipse cx="12.5" cy="51.5" rx="3.2" ry="1.5" fill="#451a03"/>
      <ellipse cx="23.5" cy="51.5" rx="3.2" ry="1.5" fill="#451a03"/>
    </svg>
  );

  return (
    <svg width="36" height="58" viewBox="0 0 36 58" fill="none" style={flip}>
      <g style={{ animation: bobAnim }}>
        {/* Top hat */}
        <rect x="16" y="1" width="14" height="4.5" rx="1" fill="#1e293b"/>
        <rect x="13" y="5.5" width="20" height="2.5" rx="1" fill="#1e293b"/>
        {/* Head */}
        <circle cx="24" cy="13" r="7" fill="#d4a373" stroke="#92400e" strokeWidth="0.8"/>
        {/* White beard */}
        <path d="M17 15.5 Q24 23 31 15.5" fill="#e2e8f0"/>
        {/* Eye */}
        <circle cx="28.5" cy="12" r="1.1" fill="#1e293b"/>
        {/* Monocle */}
        <circle cx="28.5" cy="12" r="3.5" stroke="#eab308" strokeWidth="0.8" fill="none"/>
        {/* Ear */}
        <ellipse cx="17.5" cy="14" rx="1.2" ry="1.8" fill="#c8a27a" stroke="#92400e" strokeWidth="0.4"/>
        
        {/* Back arm */}
        <line x1="24" y1="26" x2="24" y2="37" stroke="#c8a27a" strokeWidth="1.8" strokeLinecap="round" style={{ transformOrigin: "24px 26px", animation: armAnimB }} />

        {/* Back leg */}
        <g style={{ transformOrigin: "21px 35px", animation: legAnimB }}>
          <line x1="21" y1="35" x2="21" y2="50" stroke="#111" strokeWidth="2.2" strokeLinecap="round"/>
          <ellipse cx="21" cy="51.3" rx="2.8" ry="1.2" fill="#2d1200"/>
        </g>

        {/* Suit */}
        <rect x="15" y="22" width="11" height="14" rx="2" fill="#334155"/>
        {/* Red tie */}
        <path d={`M21 22 L19.5 26 L21 35 L22.5 26 Z`} fill="#dc2626"/>

        {/* Front arm (pointer) */}
        <g style={{ transformOrigin: "16px 26px", animation: armAnimF }}>
          <line x1="16" y1="26" x2="16" y2="37" stroke="#d4a373" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="16" y1="37" x2="3" y2="30" stroke="#92400e" strokeWidth="1.3" strokeLinecap="round"/>
          <circle cx="3" cy="30" r="1.8" fill="#ef4444"/>
        </g>

        {/* Front leg */}
        <g style={{ transformOrigin: "20px 35px", animation: legAnimF }}>
          <line x1="20" y1="35" x2="20" y2="50" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round"/>
          <ellipse cx="20" cy="51.4" rx="3.2" ry="1.4" fill="#451a03"/>
        </g>
      </g>
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════
   WALKER — logic component using Framer Motion for position
   ═══════════════════════════════════════════════════════ */
const CharMap = { dev: DevChar, teacher: TeacherChar, professor: ProfChar };

function Walker({ id, Char, startX, cardBounds, walkPps, phaseMs }) {
  const { c1s, c1e, c2s, c2e, c3s, c3e } = cardBounds;
  const controls    = useAnimationControls();
  const [walking,   setWalking]  = useState(true);
  const [mirrored,  setMirrored] = useState(false);
  const [looking,   setLooking]  = useState(false);
  const lookTimer   = useRef(null);

  // Click → face viewer → resume
  const handleClick = useCallback((e) => {
    e.stopPropagation();
    clearTimeout(lookTimer.current);
    controls.stop();
    setLooking(true);
    setWalking(false);
    lookTimer.current = setTimeout(() => {
      setLooking(false);
      setWalking(true);
      // Let the main loop catch up and continue
    }, 2200);
  }, [controls]);

  // Main movement loop using recursive async approach
  useEffect(() => {
    let alive = true;
    let dir = 1; // 1 = right, -1 = left
    let x = startX;

    const run = async () => {
      while (alive) {
        // Pause if looking
        while (looking) {
          await new Promise(r => setTimeout(r, 100));
        }
        if (!alive) break;

        // Determine segment end and jump logic
        let segEnd, isGap, jumpTo;
        if (dir === 1) {
          if (x < c1e)       { segEnd = c1e; isGap = true;  jumpTo = c2s; }
          else if (x < c2e)  { segEnd = c2e; isGap = true;  jumpTo = c3s; }
          else                { segEnd = c3e; isGap = false; jumpTo = null; }
        } else {
          if (x > c3s)       { segEnd = c3s; isGap = true;  jumpTo = c2e; }
          else if (x > c2s)  { segEnd = c2s; isGap = true;  jumpTo = c1e; }
          else                { segEnd = c1s; isGap = false; jumpTo = null; }
        }

        setMirrored(dir === -1);
        setWalking(true);

        const dist = Math.abs(segEnd - x);
        const dur = dist / walkPps;

        if (dist > 2) {
          await controls.start({
            x: segEnd,
            transition: { duration: dur, ease: "linear" },
          });
          x = segEnd;
        }

        if (!alive) break;

        // Random logic at gaps
        if (isGap && !looking) {
          if (Math.random() > 0.5) {
            // Jump!
            setWalking(false);
            await controls.start({
              x: jumpTo,
              y: [0, -25, 0],
              transition: { duration: 0.5, ease: "easeInOut", times: [0, 0.5, 1] }
            });
            x = jumpTo;
            setWalking(true);
          } else {
            // Turn around
            dir = -dir;
          }
        } else if (!isGap) {
          // Reached the absolute end
          dir = -dir;
        }
        
        await new Promise(r => setTimeout(r, 50));
      }
    };

    run();
    return () => { alive = false; };
  }, [cardBounds, walkPps, looking]);

  return (
    <motion.div
      animate={controls}
      initial={{ x: startX, y: 0 }}
      style={{ position: "absolute", bottom: 0, left: 0, zIndex: 30, cursor: "pointer" }}
      onClick={handleClick}
    >
      <Char walking={walking && !looking} mirror={mirrored && !looking} front={looking} />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════ */
// Start X is spaced out: Developer at 0, Teacher in the middle, Professor near the end
const WALKERS = [
  { id: "dev",       char: "dev",       startX: 10,  walkPps: 55 },
  { id: "teacher",   char: "teacher",   startX: 150, walkPps: 45 },
  { id: "professor", char: "professor", startX: 280, walkPps: 35 },
];

export default function CartoonWalkers({ containerWidth = 500 }) {
  if (containerWidth < 80) return null;

  const gap   = 12;
  const cardW = Math.floor((containerWidth - gap * 2) / 3);
  const c1s = 0,            c1e = cardW;
  const c2s = cardW + gap,  c2e = c2s + cardW;
  const c3s = c2e + gap,    c3e = c3s + cardW;
  const cardBounds = { c1s, c1e, c2s, c2e, c3s, c3e };

  return (
    <div style={{ position: "relative", width: "100%", height: 66, overflow: "visible" }}>
      {WALKERS.map(w => (
        <Walker
          key={w.id}
          id={w.id}
          Char={CharMap[w.char]}
          startX={Math.min(w.startX, c3e - 40)}
          cardBounds={cardBounds}
          walkPps={w.walkPps}
        />
      ))}
    </div>
  );
}
