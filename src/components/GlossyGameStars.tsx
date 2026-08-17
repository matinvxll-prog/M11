import React from "react";
import { motion } from "framer-motion";
import { MascotCharacter } from "./MascotCharacter";

interface GlossyGameStarProps {
  earned: boolean;
  size?: number;
  delay?: number;
  isCenter?: boolean;
}

export const GlossyGameStar: React.FC<GlossyGameStarProps> = ({
  earned,
  size = 100,
  delay = 0,
  isCenter = false
}) => {
  const filterId = `star-shadow-${size}-${delay}`;
  const goldGradId = `gold-grad-${size}-${delay}`;
  const pinkGradId = `pink-grad-${size}-${delay}`;
  const unearnedGradId = `unearned-grad-${size}-${delay}`;

  return (
    <motion.div
      initial={{ scale: 0, y: 35, rotate: -15 }}
      animate={{
        scale: earned ? 1 : 0.88,
        y: isCenter ? -12 : 0,
        rotate: 0
      }}
      transition={{
        delay,
        duration: 0.55,
        type: "spring",
        stiffness: 280,
        damping: 18
      }}
      className="relative flex items-center justify-center shrink-0 select-none"
      style={{ width: size, height: size }}
    >
      {/* Animated Outer Glow for Earned Star */}
      {earned && (
        <motion.div
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.65, 0.95, 0.65],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full blur-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-pink-500 pointer-events-none"
        />
      )}

      <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible drop-shadow-md">
        <defs>
          {/* Outer Pink Pad Gradient */}
          <linearGradient id={pinkGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffe6f4" />
            <stop offset="25%" stopColor="#ff5ea8" />
            <stop offset="70%" stopColor="#e61c7e" />
            <stop offset="100%" stopColor="#9e004a" />
          </linearGradient>

          {/* Inner 3D Gold Star Gradient */}
          <linearGradient id={goldGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fffa99" />
            <stop offset="25%" stopColor="#ffd000" />
            <stop offset="70%" stopColor="#ff7b00" />
            <stop offset="100%" stopColor="#d94100" />
          </linearGradient>

          {/* Inner Glossy Unearned Dark Magenta Gradient */}
          <linearGradient id={unearnedGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7a186b" />
            <stop offset="45%" stopColor="#520e48" />
            <stop offset="85%" stopColor="#360530" />
            <stop offset="100%" stopColor="#21021d" />
          </linearGradient>

          {/* Gloss Glow Filter */}
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#d90060" floodOpacity="0.45" />
            {earned && (
              <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#ff8c00" floodOpacity="0.7" />
            )}
          </filter>
        </defs>

        {/* 1. PINK GLOSSY BUBBLY BACKING STAR */}
        <g filter={`url(#${filterId})`}>
          <path
            d="M 60,8 
               C 63,8 67,16 72,27 
               C 74,31 79,35 84,36 
               C 96,38 104,42 105,47 
               C 106,52 98,60 90,69 
               C 86,73 84,79 86,85 
               C 89,97 86,104 81,104 
               C 77,104 67,97 59,91 
               C 55,88 49,88 45,91 
               C 37,97 27,104 23,104 
               C 18,104 15,97 18,85 
               C 20,79 18,73 14,69 
               C 6,60 -2,52 -1,47 
               C 0,42 8,38 20,36 
               C 25,35 30,31 32,27 
               C 37,16 41,8 44,8 
               C 48,8 52,8 60,8 Z"
            fill={`url(#${pinkGradId})`}
            stroke="#ffffff"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />

          {/* White Gloss Light Curve on Pink Backing */}
          <path
            d="M 60,13 C 62,13 65,19 69,28 C 70,30 72,31 74,32 C 81,34 88,37 92,40 C 82,38 72,39 60,39 C 48,39 38,38 28,40 C 32,37 39,34 46,32 C 48,31 50,30 51,28 C 55,19 58,13 60,13 Z"
            fill="#ffffff"
            opacity="0.75"
          />
        </g>

        {/* 2. INNER STAR BODY */}
        {earned ? (
          <g>
            {/* Main Gold Star Body */}
            <path
              d="M 60,18 
                 C 62,18 65,24 69,33 
                 C 71,37 75,40 79,41 
                 C 89,43 95,46 95,50 
                 C 95,54 88,60 81,67 
                 C 78,70 76,75 78,80 
                 C 80,89 77,94 74,94 
                 C 71,94 62,88 55,83 
                 C 52,81 48,81 45,83 
                 C 38,88 29,94 26,94 
                 C 23,94 20,89 22,80 
                 C 24,75 22,70 19,67 
                 C 12,60 5,54 5,50 
                 C 5,46 11,43 21,41 
                 C 25,40 29,37 31,33 
                 C 35,24 38,18 40,18 
                 C 44,18 48,18 60,18 Z"
              fill={`url(#${goldGradId})`}
              stroke="#ffeb80"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Glossy Top Reflection Highlight */}
            <path
              d="M 60,21 C 62,21 64,26 67,33 C 68,35 71,37 74,38 C 81,39 86,41 88,43 C 78,42 69,43 60,43 C 51,43 42,42 32,43 C 34,41 39,39 46,38 C 49,37 52,35 53,33 C 56,26 58,21 60,21 Z"
              fill="#ffffff"
              opacity="0.88"
            />

            {/* Sparkle Glint Circles */}
            <circle cx="60" cy="26" r="3.2" fill="#ffffff" opacity="0.95" />
            <circle cx="78" cy="45" r="2.2" fill="#ffffff" opacity="0.85" />
            <circle cx="42" cy="45" r="2" fill="#ffffff" opacity="0.85" />

            {/* Animated Sparkle Starburst */}
            <motion.g
              animate={{ rotate: 360, scale: [0.85, 1.15, 0.85] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "60px 30px" }}
            >
              <path
                d="M 60,21 L 61.5,24 L 64.5,25.5 L 61.5,27 L 60,30 L 58.5,27 L 55.5,25.5 L 58.5,24 Z"
                fill="#ffffff"
                opacity="0.9"
              />
            </motion.g>
          </g>
        ) : (
          /* Rich Unearned Dark Magenta Glossy Star Body */
          <g>
            <path
              d="M 60,18 
                 C 62,18 65,24 69,33 
                 C 71,37 75,40 79,41 
                 C 89,43 95,46 95,50 
                 C 95,54 88,60 81,67 
                 C 78,70 76,75 78,80 
                 C 80,89 77,94 74,94 
                 C 71,94 62,88 55,83 
                 C 52,81 48,81 45,83 
                 C 38,88 29,94 26,94 
                 C 23,94 20,89 22,80 
                 C 24,75 22,70 19,67 
                 C 12,60 5,54 5,50 
                 C 5,46 11,43 21,41 
                 C 25,40 29,37 31,33 
                 C 35,24 38,18 40,18 
                 C 44,18 48,18 60,18 Z"
              fill={`url(#${unearnedGradId})`}
              stroke="#9e1e82"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />

            {/* Glossy Top Reflection Curve on Unearned Star */}
            <path
              d="M 60,21 C 62,21 64,26 67,33 C 68,35 71,37 74,38 C 81,39 86,41 88,43 C 78,42 69,43 60,43 C 51,43 42,42 32,43 C 34,41 39,39 46,38 C 49,37 52,35 53,33 C 56,26 58,21 60,21 Z"
              fill="#ffffff"
              opacity="0.32"
            />
          </g>
        )}
      </svg>
    </motion.div>
  );
};

interface GlossyGameStarsRowProps {
  starsCount: number; // 0, 1, 2, 3
}

export const GlossyGameStarsRow: React.FC<GlossyGameStarsRowProps> = ({ starsCount }) => {
  React.useEffect(() => {
    if (starsCount > 0) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        if (ctx.state === "suspended") ctx.resume();

        const timings = [
          { count: 1, freq: 523.25, time: 0.2 },
          { count: 2, freq: 659.25, time: 0.6 },
          { count: 3, freq: 783.99, time: 1.0 }
        ];

        timings.forEach((t) => {
          if (starsCount >= t.count) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(t.freq, ctx.currentTime + t.time);
            gain.gain.setValueAtTime(0.2, ctx.currentTime + t.time);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t.time + 0.35);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + t.time);
            osc.stop(ctx.currentTime + t.time + 0.35);
          }
        });
      } catch {
        // Audio fallback
      }
    }
  }, [starsCount]);

  return (
    <div className="relative flex flex-col items-center justify-center pt-8 pb-4 my-2 select-none overflow-visible">
      {/* Rotating Sunburst / Light Rays (شەوق) behind Mascot */}
      <div className="absolute -top-16 z-0 pointer-events-none flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="w-72 h-72 opacity-40"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <g fill="url(#sunburstGrad)">
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
                <path
                  key={angle}
                  transform={`rotate(${angle} 100 100)`}
                  d="M 100,100 L 92,0 L 108,0 Z"
                />
              ))}
            </g>
            <defs>
              <radialGradient id="sunburstGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffb020" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#ff40a0" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8000ff" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Soft Glowing Backdrop */}
        <div className="absolute w-64 h-64 bg-gradient-to-r from-amber-400/30 via-pink-500/30 to-purple-600/30 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* 3D Mascot Character sitting behind/above the stars */}
      <div className="absolute -top-12 z-0 pointer-events-none drop-shadow-2xl">
        <MascotCharacter
          size={145}
          expression={starsCount >= 2 ? "cheering" : starsCount === 1 ? "happy" : "wink"}
          animated={true}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center gap-3 sm:gap-6 pt-10">
        {/* Star 1 (Left) - Delay 0.2s */}
        <GlossyGameStar earned={starsCount >= 1} size={88} delay={0.2} />

        {/* Star 2 (Middle - Elevated & Bigger) - Delay 0.6s */}
        <GlossyGameStar earned={starsCount >= 2} size={112} delay={0.6} isCenter={true} />

        {/* Star 3 (Right) - Delay 1.0s */}
        <GlossyGameStar earned={starsCount >= 3} size={88} delay={1.0} />
      </div>
    </div>
  );
};
