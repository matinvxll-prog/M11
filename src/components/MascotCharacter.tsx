import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MascotCharacterProps {
  size?: number;
  className?: string;
  animated?: boolean;
  expression?: "happy" | "cheering" | "excited" | "wink" | "encouraging";
  showShadow?: boolean;
}

export const MascotCharacter: React.FC<MascotCharacterProps> = ({
  size = 140,
  className = "",
  animated = true,
  expression = "happy",
  showShadow = true,
}) => {
  const isExcited = expression === "excited" || expression === "cheering";
  const isEncouraging = expression === "encouraging";

  return (
    <motion.div
      initial={animated ? { y: 15, scale: 0.85, opacity: 0 } : false}
      animate={
        animated
          ? {
              y: isExcited ? [0, -10, 0] : isEncouraging ? [0, -4, 0] : [0, -6, 0],
              scale: 1,
              opacity: 1,
            }
          : { scale: 1, opacity: 1 }
      }
      transition={
        animated
          ? {
              y: {
                duration: isExcited ? 1.8 : isEncouraging ? 2.2 : 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              },
              scale: { duration: 0.4 },
              opacity: { duration: 0.3 },
            }
          : {}
      }
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size * 1.1 }}
    >
      {/* Outer Floating Backlight Glow */}
      <div className="absolute inset-0 bg-purple-500/25 rounded-full blur-2xl -z-10 animate-pulse pointer-events-none" />

      {/* SVG Mascot Graphic */}
      <svg
        viewBox="0 0 200 230"
        className="w-full h-full overflow-visible drop-shadow-xl"
      >
        <defs>
          {/* Main 3D Purple Body Gradient */}
          <linearGradient id="mascotBodyGrad" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#aa52ff" />
            <stop offset="30%" stopColor="#8c2bff" />
            <stop offset="75%" stopColor="#6711e3" />
            <stop offset="100%" stopColor="#4c06b5" />
          </linearGradient>

          {/* Top Horn / Tuft Gradient */}
          <linearGradient id="mascotTuftGrad" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#ba69ff" />
            <stop offset="100%" stopColor="#7119e8" />
          </linearGradient>

          {/* Left / Right Arm Gradients */}
          <linearGradient id="mascotArmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9b42ff" />
            <stop offset="100%" stopColor="#580cc4" />
          </linearGradient>

          {/* Face Screen White / Lavender 3D Gradient */}
          <linearGradient id="mascotFaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="65%" stopColor="#f3e8ff" />
            <stop offset="100%" stopColor="#e2c8ff" />
          </linearGradient>

          {/* Cheek Blush Gradient */}
          <radialGradient id="mascotBlush" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff77c6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff77c6" stopOpacity="0" />
          </radialGradient>

          {/* Soft Drop Shadow Filter for Face Screen */}
          <filter id="innerFaceShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#3c0082" floodOpacity="0.25" />
          </filter>

          {/* 3D Highlight Shine Filter */}
          <filter id="topShine" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#ffffff" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* 1. Ground Shadow */}
        {showShadow && (
          <ellipse
            cx="100"
            cy="218"
            rx="52"
            ry="10"
            fill="#30015c"
            opacity="0.22"
            className="animate-pulse"
          />
        )}

        {/* 2. Top Antenna / Tuft (3D Curved Egg/Nodule) */}
        <motion.path
          animate={
            animated
              ? { rotate: [-4, 6, -4] }
              : false
          }
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "100px 52px" }}
          d="M 100,52 
             C 92,42 85,25 96,14 
             C 107,3 125,18 114,38 
             C 109,48 103,53 100,52 Z"
          fill="url(#mascotTuftGrad)"
          stroke="#ca8aff"
          strokeWidth="1.5"
        />

        {/* Top Tuft Highlight */}
        <path
          d="M 97,22 C 94,28 98,38 103,42 C 101,36 102,26 105,20 C 100,19 98,20 97,22 Z"
          fill="#ffffff"
          opacity="0.45"
        />

        {/* 3. Left Arm */}
        <motion.ellipse
          animate={
            animated && (isExcited || isEncouraging)
              ? { rotate: [-15, -35, -15], y: [-2, -6, -2] }
              : animated
              ? { rotate: [0, -12, 0] }
              : false
          }
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "42px 130px" }}
          cx="38"
          cy="142"
          rx="15"
          ry="30"
          fill="url(#mascotArmGrad)"
          stroke="#b266ff"
          strokeWidth="1.2"
        />

        {/* 4. Right Arm */}
        <motion.ellipse
          animate={
            animated && (isExcited || isEncouraging)
              ? { rotate: [15, 35, 15], y: [-2, -6, -2] }
              : animated
              ? { rotate: [0, 12, 0] }
              : false
          }
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "158px 130px" }}
          cx="162"
          cy="142"
          rx="15"
          ry="30"
          fill="url(#mascotArmGrad)"
          stroke="#b266ff"
          strokeWidth="1.2"
        />

        {/* 5. MAIN BODY (Cute Rounded Teardrop Pod) */}
        <path
          d="M 100,42 
             C 148,42 178,72 178,122 
             C 178,162 148,200 100,212 
             C 52,200 22,162 22,122 
             C 22,72 52,42 100,42 Z"
          fill="url(#mascotBodyGrad)"
          stroke="#be7dff"
          strokeWidth="2"
        />

        {/* Body Top Gloss Highlight Curve */}
        <path
          d="M 60,54 C 80,47 120,47 140,54 C 158,62 168,78 170,96 C 158,74 135,62 100,62 C 65,62 42,74 30,96 C 32,78 42,62 60,54 Z"
          fill="#ffffff"
          opacity="0.3"
        />

        {/* 6. FACE SCREEN / VISOR (Lavender Pill Container) */}
        <path
          d="M 100,68 
             C 134,68 152,80 152,106 
             C 152,128 134,138 100,138 
             C 66,138 48,128 48,106 
             C 48,80 66,68 100,68 Z"
          fill="url(#mascotFaceGrad)"
          stroke="#d2adff"
          strokeWidth="2.5"
          filter="url(#innerFaceShadow)"
        />

        {/* Face Top Reflection Highlight */}
        <path
          d="M 64,74 C 80,70 120,70 136,74 C 146,80 148,88 145,95 C 138,84 122,78 100,78 C 78,78 62,84 55,95 C 52,88 54,80 64,74 Z"
          fill="#ffffff"
          opacity="0.7"
        />

        {/* 7. CHEEKS (Cute Pink Blushes) */}
        <ellipse cx="65" cy="115" rx="11" ry="6.5" fill="#ff7eb6" opacity="0.85" />
        <ellipse cx="135" cy="115" rx="11" ry="6.5" fill="#ff7eb6" opacity="0.85" />

        {/* 8. EYES (Cute Smiling Closed Arcs ^ ^ Exactly Matching User Image) */}
        <g id="mascotEyes">
          {/* Left Eye: Cute Happy Smiling Arch ^ */}
          <path
            d="M 72,102 C 72,88 92,88 92,102"
            fill="none"
            stroke="#220946"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Right Eye: Cute Happy Smiling Arch ^ */}
          <path
            d="M 108,102 C 108,88 128,88 128,102"
            fill="none"
            stroke="#220946"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>

        {/* 9. MOUTH (Joyful Open Smiling D-Shape Mouth Exactly Matching User Image) */}
        <g id="mascotMouth">
          <path
            d="M 88,113 Q 100,112 112,113 C 112,127 88,127 88,113 Z"
            fill="#220946"
            stroke="#220946"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>

        {/* Floating Sparkles around Mascot when excited */}
        {(isExcited || isEncouraging) && (
          <g>
            <motion.circle
              animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              cx="25"
              cy="65"
              r="4"
              fill="#ffe866"
            />
            <motion.circle
              animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
              cx="175"
              cy="75"
              r="5"
              fill="#ff6cb3"
            />
            <motion.path
              animate={{ rotate: 360, scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ transformOrigin: "165px 45px" }}
              d="M 165,38 L 167,43 L 172,45 L 167,47 L 165,52 L 163,47 L 158,45 L 163,43 Z"
              fill="#ffffff"
            />
          </g>
        )}
      </svg>
    </motion.div>
  );
};

{/* Exact Glowing Mascot Circle Badge matching user's uploaded image */}
export const GlowingMascotBadge: React.FC<{
  size?: number;
  expression?: "happy" | "cheering" | "excited" | "wink" | "encouraging";
  showStars?: boolean;
}> = ({ size = 150, expression = "happy", showStars = true }) => {
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
    >
      {/* Outer Glow Ambient Aura */}
      <div className="absolute inset-0 rounded-full bg-purple-400/20 blur-xl animate-pulse" />

      {/* Outer Gradient Ring Frame matching user image */}
      <div className="w-full h-full rounded-full p-[3px] bg-gradient-to-tr from-purple-400 via-pink-300 via-amber-200 to-purple-500 shadow-md shadow-purple-500/15 relative flex items-center justify-center">
        {/* Inner Light Pastel Circle Canvas */}
        <div className="w-full h-full rounded-full bg-gradient-to-b from-[#fdfbfd] via-[#f5ebff] to-[#edd9ff] flex items-center justify-center relative shadow-inner overflow-visible">
          
          {/* Floating Stars around Ring exactly matching uploaded image */}
          {showStars && (
            <>
              {/* Top-Left: Orange 5-point Star */}
              <motion.div
                animate={{ y: [-2, 2, -2], rotate: [0, 10, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-1 left-2 z-20 pointer-events-none drop-shadow-sm"
              >
                <svg className="w-5 h-5 text-amber-500 fill-amber-400" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </motion.div>

              {/* Top-Right: Yellow 4-point Sparkle */}
              <motion.div
                animate={{ y: [2, -2, 2], rotate: [0, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1 -right-1 z-20 pointer-events-none drop-shadow-sm"
              >
                <svg className="w-5 h-5 text-amber-400 fill-amber-300" viewBox="0 0 24 24">
                  <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </svg>
              </motion.div>

              {/* Bottom-Left: Purple 5-point Star */}
              <motion.div
                animate={{ y: [-1, 3, -1] }}
                transition={{ duration: 2.7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-1 left-3 z-20 pointer-events-none drop-shadow-sm"
              >
                <svg className="w-4 h-4 text-purple-600 fill-purple-400" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </motion.div>

              {/* Bottom-Right: Yellow 5-point Star */}
              <motion.div
                animate={{ y: [2, -3, 2] }}
                transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1 -right-1 z-20 pointer-events-none drop-shadow-sm"
              >
                <svg className="w-5 h-5 text-amber-500 fill-amber-400" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </motion.div>
            </>
          )}



          {/* Center Mascot Character */}
          <div className="relative z-10 transform scale-90 translate-y-1">
            <MascotCharacter size={size * 0.65} expression={expression} showShadow={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

{/* Exact Peeking Purple Mascot SVG peeking out from behind a white wall edge - Replicating user's uploaded image */}
export const PeekingMascotLogo: React.FC<{ size?: number; className?: string }> = ({
  size = 150,
  className = "",
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none overflow-visible ${className}`}
      style={{ width: size, height: size * 1.05 }}
    >
      <svg
        viewBox="0 0 200 210"
        className="w-full h-full overflow-visible drop-shadow-2xl"
      >
        <defs>
          {/* Main 3D Purple Body Gradient */}
          <linearGradient id="peekingBodyGrad" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#b563ff" />
            <stop offset="35%" stopColor="#8d2cf6" />
            <stop offset="75%" stopColor="#6912db" />
            <stop offset="100%" stopColor="#4c06b5" />
          </linearGradient>

          {/* Top Tuft Gradient */}
          <linearGradient id="peekingTuftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cb88ff" />
            <stop offset="100%" stopColor="#7518eb" />
          </linearGradient>

          {/* White / Lavender Face Screen Gradient */}
          <linearGradient id="peekingFaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#f3e8ff" />
            <stop offset="100%" stopColor="#dfbeff" />
          </linearGradient>

          {/* Paw / Hand Gradient */}
          <linearGradient id="peekingPawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a347ff" />
            <stop offset="100%" stopColor="#570ac4" />
          </linearGradient>

          {/* Cheek Blush Gradient */}
          <radialGradient id="peekingBlush" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff77c6" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#ff77c6" stopOpacity="0" />
          </radialGradient>

          {/* Soft Drop Shadow for Face Visor */}
          <filter id="peekingInnerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="-1" dy="3" stdDeviation="3" floodColor="#31006e" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* 1. White Wall/Card Panel Edge on the Right (x = 120) */}
        <path
          d="M 120,0 L 120,210 L 200,210 L 200,0 Z"
          fill="#ffffff"
          opacity="0.98"
        />
        {/* Border Shadow of the Wall Edge */}
        <line x1="120" y1="0" x2="120" y2="210" stroke="#e2e8f0" strokeWidth="3" />

        {/* 2. Top Antenna / Tuft (Curved Purple Nodule) */}
        <path
          d="M 82,42 
             C 74,30 68,12 80,4 
             C 92,-4 108,12 98,32 
             C 92,40 86,43 82,42 Z"
          fill="url(#peekingTuftGrad)"
          stroke="#d49eff"
          strokeWidth="1.5"
        />
        {/* Tuft Highlight */}
        <path
          d="M 78,14 C 76,20 80,28 85,32 C 83,26 84,18 87,12 C 82,11 80,12 78,14 Z"
          fill="#ffffff"
          opacity="0.5"
        />

        {/* 3. Main 3D Purple Body peeking out from left of wall line (x = 120) */}
        <path
          d="M 120,38 
             C 60,38 20,68 20,118 
             C 20,160 55,198 120,208 
             Z"
          fill="url(#peekingBodyGrad)"
          stroke="#ca8aff"
          strokeWidth="2"
        />

        {/* Body Shine Curve */}
        <path
          d="M 52,52 C 70,44 100,44 118,50 C 105,62 82,65 52,80 C 48,68 49,58 52,52 Z"
          fill="#ffffff"
          opacity="0.32"
        />

        {/* 4. White / Lavender 3D Face Screen Visor */}
        <path
          d="M 120,58 
             C 78,58 42,72 42,106 
             C 42,134 78,144 120,144 
             Z"
          fill="url(#peekingFaceGrad)"
          stroke="#d8b4fe"
          strokeWidth="2.5"
          filter="url(#peekingInnerShadow)"
        />

        {/* Face Top Reflection Highlight */}
        <path
          d="M 58,66 C 74,62 100,62 118,65 C 115,74 98,76 72,78 C 62,82 58,74 58,66 Z"
          fill="#ffffff"
          opacity="0.65"
        />

        {/* 5. Pink Cheek Blushes */}
        <ellipse cx="62" cy="118" rx="10" ry="6" fill="url(#peekingBlush)" />

        {/* 6. Happy Curved Eyes (^ ^) */}
        <g>
          {/* Left Eye: Happy Arc ^ */}
          <path
            d="M 60,104 C 60,90 78,90 78,104"
            fill="none"
            stroke="#2d025b"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          {/* Right Eye: Happy Arc ^ */}
          <path
            d="M 94,104 C 94,90 112,90 112,104"
            fill="none"
            stroke="#2d025b"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
        </g>

        {/* 7. Cute Open Happy Smile */}
        <path
          d="M 76,114 C 76,128 98,128 98,114"
          fill="#2d025b"
          stroke="#2d025b"
          strokeWidth="1"
        />
        {/* Pink Tongue */}
        <path
          d="M 80,121 C 83,126 91,126 94,121 Z"
          fill="#ff6cb3"
        />

        {/* 8. 3D Purple Hand / Paw grasping the white wall edge (x = 120) */}
        <path
          d="M 102,154 C 102,132 136,132 136,154 C 136,172 102,172 102,154 Z"
          fill="url(#peekingPawGrad)"
          stroke="#d8b4fe"
          strokeWidth="2"
        />
        {/* Paw Gloss Highlight */}
        <ellipse cx="118" cy="144" rx="8" ry="4" fill="#ffffff" opacity="0.45" />
      </svg>
    </div>
  );
};

{/* FULL-BODY DANCING, SINGING & READING MASCOT (ڕکێشان و بلڤینێ ب تەواوی لەشی کارەکتەری و بخۆینیت) */}
export const FullBodyDancingMascot: React.FC<{
  size?: number;
  speechText?: string;
  isSpeaking?: boolean;
  onReadSpeech?: () => void;
  className?: string;
}> = ({
  size = 240,
  speechText = "پیرۆزە! بەرسڤا تە گەلەک ب دروستی هاتە دان! 🚀",
  isSpeaking = false,
  onReadSpeech,
  className = "",
}) => {
  return (
    <div className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}>
      {/* Dynamic Floating Musical Notes Dancing around Mascot */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {/* Note 1 */}
        <motion.div
          animate={{
            y: [-10, -50, -10],
            x: [-15, -35, -15],
            opacity: [0.2, 1, 0.2],
            rotate: [-10, 20, -10],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-2 left-0 text-2xl font-bold text-amber-400 drop-shadow-md"
        >
          🎵
        </motion.div>

        {/* Note 2 */}
        <motion.div
          animate={{
            y: [-5, -60, -5],
            x: [15, 35, 15],
            opacity: [0.3, 1, 0.3],
            rotate: [15, -25, 15],
            scale: [0.9, 1.4, 0.9],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          className="absolute top-0 right-2 text-2xl font-bold text-pink-400 drop-shadow-md"
        >
          🎶
        </motion.div>

        {/* Note 3 */}
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [-30, -50, -30],
            opacity: [0.2, 0.9, 0.2],
            scale: [0.7, 1.2, 0.7],
          }}
          transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute bottom-16 left-[-10px] text-xl font-bold text-indigo-400 drop-shadow-md"
        >
          🎼
        </motion.div>

        {/* Floating Sparkles & Star Particles */}
        <motion.div
          animate={{ scale: [0.6, 1.4, 0.6], rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-4 left-10 text-amber-300 text-lg"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.5, 1], rotate: -360 }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          className="absolute top-8 right-8 text-amber-300 text-xl"
        >
          ⭐
        </motion.div>
      </div>

      {/* Main Dancing Bouncing Full Body Motion Wrapper */}
      <motion.div
        animate={{
          y: [0, -18, 0, -10, 0],
          rotate: [-4, 4, -4, 2, -4],
          scaleY: [1, 0.95, 1.05, 0.98, 1],
          scaleX: [1, 1.03, 0.97, 1.01, 1],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width: size, height: size * 1.15 }}
        className="relative flex items-center justify-center cursor-pointer overflow-visible"
        onClick={onReadSpeech}
      >
        {/* Soft Animated Ground Shadow */}
        <motion.div
          animate={{
            scaleX: [1, 0.7, 1, 0.85, 1],
            opacity: [0.35, 0.15, 0.35, 0.2, 0.35],
          }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-2 w-[70%] h-5 bg-purple-950/30 rounded-full blur-md -z-10"
        />

        {/* Ambient Backlight Aura Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 via-pink-400/30 to-amber-300/30 rounded-full blur-2xl -z-10 animate-pulse" />

        {/* SVG FULL BODY MASCOT GRAPHIC */}
        <svg
          viewBox="0 0 220 260"
          className="w-full h-full overflow-visible filter drop-shadow-2xl"
        >
          <defs>
            {/* 3D Body Gradient */}
            <linearGradient id="fullBodyGrad" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#bc6eff" />
              <stop offset="35%" stopColor="#9638ff" />
              <stop offset="75%" stopColor="#6b12e3" />
              <stop offset="100%" stopColor="#4f08b8" />
            </linearGradient>

            {/* Arm & Paw Gradient */}
            <linearGradient id="fullArmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#aa4dff" />
              <stop offset="100%" stopColor="#5d0ac7" />
            </linearGradient>

            {/* Feet Gradient */}
            <linearGradient id="fullFootGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7e20f5" />
              <stop offset="100%" stopColor="#3c0087" />
            </linearGradient>

            {/* Face Visor Gradient */}
            <linearGradient id="fullFaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="65%" stopColor="#f5edff" />
              <stop offset="100%" stopColor="#debaff" />
            </linearGradient>

            {/* Gold Crown / Cap Gradient */}
            <linearGradient id="crownGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>

            {/* Cheek Blush */}
            <radialGradient id="fullBlush" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff77c6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff77c6" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. LEFT DANCING FOOT (Stepping side to side) */}
          <motion.ellipse
            animate={{
              cy: [228, 220, 228, 225, 228],
              cx: [72, 68, 72, 75, 72],
              rx: [20, 18, 20, 19, 20],
            }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            cx="72"
            cy="228"
            rx="20"
            ry="11"
            fill="url(#fullFootGrad)"
            stroke="#c082ff"
            strokeWidth="1.5"
          />

          {/* 2. RIGHT DANCING FOOT (Stepping side to side) */}
          <motion.ellipse
            animate={{
              cy: [228, 225, 228, 220, 228],
              cx: [148, 145, 148, 152, 148],
              rx: [20, 19, 20, 18, 20],
            }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            cx="148"
            cy="228"
            rx="20"
            ry="11"
            fill="url(#fullFootGrad)"
            stroke="#c082ff"
            strokeWidth="1.5"
          />

          {/* 3. LEFT WAVING & DANCING ARM (Up & Down Celebration Wave) */}
          <motion.g
            animate={{
              rotate: [-25, 35, -25],
              y: [-6, 6, -6],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "48px 125px" }}
          >
            <ellipse
              cx="32"
              cy="110"
              rx="14"
              ry="32"
              fill="url(#fullArmGrad)"
              stroke="#ca8aff"
              strokeWidth="1.5"
            />
            {/* Hand Gloss */}
            <circle cx="28" cy="90" r="5" fill="#ffffff" opacity="0.4" />
          </motion.g>

          {/* 4. RIGHT WAVING & DANCING ARM (Up & Down Celebration Wave) */}
          <motion.g
            animate={{
              rotate: [25, -35, 25],
              y: [6, -6, 6],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            style={{ transformOrigin: "172px 125px" }}
          >
            <ellipse
              cx="188"
              cy="110"
              rx="14"
              ry="32"
              fill="url(#fullArmGrad)"
              stroke="#ca8aff"
              strokeWidth="1.5"
            />
            {/* Hand Gloss */}
            <circle cx="192" cy="90" r="5" fill="#ffffff" opacity="0.4" />
          </motion.g>

          {/* 5. MAIN FULL BODY TORSO & HEAD POD (Smooth Teardrop Body) */}
          <path
            d="M 110,40 
               C 162,40 192,72 192,128 
               C 192,175 160,218 110,224 
               C 60,218 28,175 28,128 
               C 28,72 58,40 110,40 Z"
            fill="url(#fullBodyGrad)"
            stroke="#c488ff"
            strokeWidth="2.5"
          />

          {/* Body Top Gloss Reflection */}
          <path
            d="M 68,54 C 88,46 132,46 152,54 C 172,64 182,82 182,102 C 170,78 145,66 110,66 C 75,66 50,78 38,102 C 38,82 48,64 68,54 Z"
            fill="#ffffff"
            opacity="0.3"
          />

          {/* 6. TOP ANTENNA / SWAYING TUFT */}
          <motion.path
            animate={{ rotate: [-10, 12, -10] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "110px 40px" }}
            d="M 110,40 C 100,28 92,8 105,-2 C 118,-12 136,5 124,26 C 118,36 112,41 110,40 Z"
            fill="url(#fullArmGrad)"
            stroke="#ca8aff"
            strokeWidth="1.5"
          />

          {/* 7. GOLDEN VICTORY CROWN ON TOP */}
          <motion.g
            animate={{ y: [-2, 2, -2], rotate: [-3, 3, -3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "110px 25px" }}
          >
            <path
              d="M 88,38 L 94,18 L 104,28 L 110,12 L 116,28 L 126,18 L 132,38 Z"
              fill="url(#crownGoldGrad)"
              stroke="#854d0e"
              strokeWidth="1.5"
            />
            {/* Crown Jewels */}
            <circle cx="110" cy="20" r="3" fill="#ef4444" />
            <circle cx="94" cy="26" r="2.5" fill="#3b82f6" />
            <circle cx="126" cy="26" r="2.5" fill="#3b82f6" />
          </motion.g>

          {/* 8. WHITE / LAVENDER 3D FACE VISOR */}
          <path
            d="M 110,68 
               C 148,68 168,82 168,110 
               C 168,135 148,146 110,146 
               C 72,146 52,135 52,110 
               C 52,82 72,68 110,68 Z"
            fill="url(#fullFaceGrad)"
            stroke="#d8b8ff"
            strokeWidth="2.5"
          />

          {/* Face Reflection Highlight */}
          <path
            d="M 70,75 C 88,70 132,70 150,75 C 160,82 163,92 158,100 C 150,88 132,82 110,82 C 88,82 70,88 62,100 C 57,92 60,82 70,75 Z"
            fill="#ffffff"
            opacity="0.6"
          />

          {/* 9. CHEEKS (Cute Pink Blushes) */}
          <ellipse cx="72" cy="122" rx="11" ry="7" fill="url(#fullBlush)" />
          <ellipse cx="148" cy="122" rx="11" ry="7" fill="url(#fullBlush)" />

          {/* 10. EYES (Happy Winking / Singing Eyes) */}
          <g>
            {/* Left Eye: Happy Arch ^ */}
            <path
              d="M 78,110 C 78,96 96,96 96,110"
              fill="none"
              stroke="#2c0254"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Right Eye: Wink Arc / Happy Arc */}
            <path
              d="M 124,110 C 124,96 142,96 142,110"
              fill="none"
              stroke="#2c0254"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>

          {/* 11. SINGING / READING OPEN MOUTH (بخۆینیت) */}
          <motion.g
            animate={
              isSpeaking
                ? { scaleY: [1, 1.4, 1, 1.3, 1], scaleX: [1, 0.9, 1, 0.92, 1] }
                : { scaleY: [1, 1.1, 1] }
            }
            transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "110px 128px" }}
          >
            {/* Wide Open Singing Mouth */}
            <path
              d="M 98,122 C 98,138 122,138 122,122 Z"
              fill="#2c0254"
              stroke="#2c0254"
              strokeWidth="2"
            />
            {/* Pink Singing Tongue */}
            <path
              d="M 103,130 C 108,137 114,137 117,130 Z"
              fill="#ff6cb3"
            />
          </motion.g>
        </svg>
      </motion.div>

      {/* Audio Sound Wave Speaker Button (بخۆینیت و بخوێنێتەوە) */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={onReadSpeech}
        className="mt-3 px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs sm:text-sm shadow-lg shadow-purple-500/30 flex items-center gap-2 cursor-pointer border border-purple-300/60"
      >
        <span className="animate-pulse">🔊</span>
        <span>
          {isSpeaking ? "مامۆستا دخۆینیت... 🎶" : "گوهدارییا دەنگێ مامۆستای بکه 🔊"}
        </span>
      </motion.button>
    </div>
  );
};




