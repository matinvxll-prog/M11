import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface TeacherMascotPointerProps {
  size?: number;
  className?: string;
  isTeaching?: boolean;
  speechText?: string;
  stepIndex?: number;
  mood?: "normal" | "happy" | "celebrating";
}

export const TeacherMascotPointer: React.FC<TeacherMascotPointerProps> = ({
  size = 140,
  className = "",
  isTeaching = true,
  speechText,
  stepIndex = 0,
  mood = "happy"
}) => {
  const [isBlinking, setIsBlinking] = useState(false);

  // 👀 Smooth Natural Blinking (Closing and Opening) for Teacher Mascot Only
  useEffect(() => {
    let blinkTimer: NodeJS.Timeout;
    const interval = setInterval(() => {
      setIsBlinking(true);
      blinkTimer = setTimeout(() => {
        setIsBlinking(false);
      }, 180);
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(blinkTimer);
    };
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* 💬 Teacher Speech Bubble (Clean, High Contrast, Solid) */}
      {speechText && (
        <motion.div
          key={`speech-bubble-${stepIndex}-${speechText.slice(0, 10)}`}
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.96 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mb-2 bg-white/95 backdrop-blur-sm text-purple-950 font-black text-xs sm:text-[13px] py-2 px-3.5 rounded-2xl shadow-lg shadow-purple-950/20 border-2 border-amber-400 z-20 text-center max-w-[240px] sm:max-w-[270px] flex items-center justify-center gap-1.5 relative ring-4 ring-amber-400/20 min-h-[38px]"
        >
          <span className="leading-snug drop-shadow-xs dir-rtl text-right font-bold text-gray-900">
            {speechText}
          </span>
          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
          {/* Downward Pointer Notch */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-amber-400 transform rotate-45 rounded-xs" />
        </motion.div>
      )}

      {/* 🌟 Ultra-High Quality Vector Mascot (Solid, Smooth 60fps Idle Float) */}
      <motion.div
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative flex items-center justify-center pointer-events-none"
      >
        <svg
          viewBox="0 0 240 260"
          style={{ width: size * 1.15, height: size * 1.25 }}
          className="overflow-visible filter drop-shadow-[0_16px_32px_rgba(20,5,45,0.35)]"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
        >
          <defs>
            {/* 3D Purple Skin Gradient */}
            <radialGradient id="mascotSkinGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#b76bf7" />
              <stop offset="25%" stopColor="#8f31e6" />
              <stop offset="65%" stopColor="#6c1ed4" />
              <stop offset="100%" stopColor="#480c99" />
            </radialGradient>

            {/* Dark Charcoal Blazer Gradient */}
            <linearGradient id="mascotBlazerGrad" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#4a5068" />
              <stop offset="40%" stopColor="#313647" />
              <stop offset="85%" stopColor="#1f2330" />
              <stop offset="100%" stopColor="#141720" />
            </linearGradient>

            {/* Crisp Lapel Gradient */}
            <linearGradient id="mascotLapelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5d637c" />
              <stop offset="50%" stopColor="#373b4d" />
              <stop offset="100%" stopColor="#222634" />
            </linearGradient>

            {/* Pure White Shirt Gradient */}
            <linearGradient id="mascotShirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="75%" stopColor="#f3f4f8" />
              <stop offset="100%" stopColor="#e2e6f0" />
            </linearGradient>

            {/* Royal Purple Tie Gradient */}
            <linearGradient id="mascotTieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="35%" stopColor="#9333ea" />
              <stop offset="80%" stopColor="#7928ca" />
              <stop offset="100%" stopColor="#4c06b5" />
            </linearGradient>

            {/* Porcelain Face Visor Gradient */}
            <radialGradient id="mascotFaceVisorGrad" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="75%" stopColor="#faf7ff" />
              <stop offset="100%" stopColor="#ece4f7" />
            </radialGradient>

            {/* Golden Star 3D Gradient */}
            <radialGradient id="mascotStarGold" cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#fbbf24" />
              <stop offset="90%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>

            {/* Cute Cheek Blush */}
            <radialGradient id="mascotCheekBlush" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff4d88" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#ff77a8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ff77a8" stopOpacity="0" />
            </radialGradient>

            {/* Soft Ambient Chin Drop Shadow */}
            <radialGradient id="chinShadowGrad" cx="50%" cy="0%" r="100%">
              <stop offset="0%" stopColor="#1a0438" stopOpacity="0.4" />
              <stop offset="80%" stopColor="#1a0438" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#1a0438" stopOpacity="0" />
            </radialGradient>

            {/* Star Glow Filter */}
            <filter id="mascotStarGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Ground Contact Shadow */}
          <ellipse cx="120" cy="242" rx="52" ry="8" fill="#140526" opacity="0.4" />

          {/* 2. 👟 SNEAKERS & PURPLE FEET */}
          <g>
            {/* Left Sneaker */}
            <g transform="translate(98, 218)">
              <rect x="-6" y="0" width="12" height="14" rx="6" fill="url(#mascotSkinGrad)" stroke="#7e22ce" strokeWidth="1" />
              <ellipse cx="0" cy="14" rx="12" ry="7" fill="url(#mascotSkinGrad)" stroke="#3b0764" strokeWidth="1" />
              <path d="M -12,15 C -12,19 12,19 12,15 L 12,18 C 12,22 -12,22 -12,18 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
              <line x1="-4" y1="12" x2="4" y2="12" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
            </g>

            {/* Right Sneaker */}
            <g transform="translate(142, 218)">
              <rect x="-6" y="0" width="12" height="14" rx="6" fill="url(#mascotSkinGrad)" stroke="#7e22ce" strokeWidth="1" />
              <ellipse cx="0" cy="14" rx="12" ry="7" fill="url(#mascotSkinGrad)" stroke="#3b0764" strokeWidth="1" />
              <path d="M -12,15 C -12,19 12,19 12,15 L 12,18 C 12,22 -12,22 -12,18 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
              <line x1="-4" y1="12" x2="4" y2="12" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
            </g>
          </g>

          {/* 3. 👔 CHARCOAL BLAZER & SHIRT (Proper Proportionate Chibi Fit) */}
          <g>
            {/* Main Rounded Blazer Body */}
            <path
              d="M 120,132 
                 C 96,132 74,138 68,150 
                 C 60,164 64,186 74,212 
                 C 84,222 104,226 120,226 
                 C 136,226 156,222 166,212 
                 C 176,186 180,164 172,150 
                 C 166,138 144,132 120,132 Z"
              fill="url(#mascotBlazerGrad)"
              stroke="#151722"
              strokeWidth="1.5"
            />

            {/* Crisp White Shirt V-Placket */}
            <path
              d="M 98,136 
                 C 106,138 134,138 142,136 
                 L 134,196 
                 L 106,196 Z"
              fill="url(#mascotShirtGrad)"
            />

            {/* White Shirt Collar Wings */}
            <g>
              {/* Left Collar Wing */}
              <path
                d="M 100,136 
                   L 116,145 
                   L 108,156 
                   L 98,144 Z"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="1"
                strokeLinejoin="round"
              />
              {/* Right Collar Wing */}
              <path
                d="M 140,136 
                   L 124,145 
                   L 132,156 
                   L 142,144 Z"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </g>

            {/* 💜 Royal Purple Tie */}
            <g>
              {/* Knot */}
              <polygon
                points="116,142 124,142 126,150 114,150"
                fill="url(#mascotTieGrad)"
                stroke="#3e0b8c"
                strokeWidth="0.6"
              />
              {/* Tie Body */}
              <polygon
                points="115,150 125,150 128,184 120,192 112,184"
                fill="url(#mascotTieGrad)"
                stroke="#3e0b8c"
                strokeWidth="0.6"
              />
            </g>

            {/* 🧥 Charcoal Blazer Folded Lapels */}
            {/* Left Lapel */}
            <path
              d="M 98,136 
                 L 88,154 
                 L 104,166 
                 L 100,222 
                 C 86,220 76,210 72,198 
                 C 66,178 70,158 80,146 
                 C 86,140 92,137 98,136 Z"
              fill="url(#mascotLapelGrad)"
              stroke="#151722"
              strokeWidth="1"
            />
            {/* Right Lapel */}
            <path
              d="M 142,136 
                 L 152,154 
                 L 136,166 
                 L 140,222 
                 C 154,220 164,210 168,198 
                 C 174,178 170,158 160,146 
                 C 154,140 148,137 142,136 Z"
              fill="url(#mascotLapelGrad)"
              stroke="#151722"
              strokeWidth="1"
            />

            {/* Center Blazer Button */}
            <circle cx="120" cy="204" r="2.6" fill="#0f1118" stroke="#4f5469" strokeWidth="0.8" />

            {/* Ambient Chin Shadow over Suit */}
            <ellipse cx="120" cy="140" rx="30" ry="6" fill="url(#chinShadowGrad)" />
          </g>

          {/* 4. 🟣 3D PURPLE HEAD & FACE (Sits smoothly over suit) */}
          <g>
            {/* Top Organic Raindrop Tuft */}
            <path
              d="M 120,38 
                 C 112,26 106,8 118,2 
                 C 130,-4 146,8 135,25 
                 C 129,34 124,39 120,38 Z"
              fill="url(#mascotSkinGrad)"
              stroke="#b76bf7"
              strokeWidth="1.2"
            />
            {/* Tuft Highlight */}
            <path
              d="M 117,8 C 114,13 118,21 123,24 C 120,19 121,11 124,6 C 120,5 118,6 117,8 Z"
              fill="#ffffff"
              opacity="0.5"
            />

            {/* Full 3D Rounded Purple Head */}
            <path
              d="M 120,32 
                 C 172,32 196,62 196,102 
                 C 196,130 168,144 120,144 
                 C 72,144 44,130 44,102 
                 C 44,62 68,32 120,32 Z"
              fill="url(#mascotSkinGrad)"
              stroke="#9333ea"
              strokeWidth="2"
            />

            {/* Head Top Gloss Reflection */}
            <path
              d="M 80,44 C 100,36 140,36 160,44 C 174,52 184,64 186,80 C 174,60 152,50 120,50 C 88,50 66,60 54,80 C 56,64 66,52 80,44 Z"
              fill="#ffffff"
              opacity="0.25"
            />

            {/* 🤍 PORCELAIN WHITE FACE VISOR */}
            <g>
              {/* Visor Inset */}
              <path
                d="M 120,52 
                   C 156,52 170,62 170,86 
                   C 170,108 154,118 120,118 
                   C 86,118 70,108 70,86 
                   C 70,62 84,52 120,52 Z"
                fill="url(#mascotFaceVisorGrad)"
                stroke="#e9d5ff"
                strokeWidth="1.6"
              />

              {/* Visor Upper Glare */}
              <path
                d="M 84,58 C 98,54 142,54 156,58 C 164,63 166,70 162,76 C 154,67 138,62 120,62 C 102,62 86,67 78,76 C 75,70 77,63 84,58 Z"
                fill="#ffffff"
                opacity="0.8"
              />

              {/* Rosy Pink Cheek Blushes (وەک وێنەیێ تە ڕێک) */}
              <ellipse cx="78" cy="98" rx="9.5" ry="5.5" fill="#f472b6" opacity="0.75" />
              <ellipse cx="162" cy="98" rx="9.5" ry="5.5" fill="#f472b6" opacity="0.75" />

              {/* 👀 SHINY ANIME EYES WITH BLINKING (Exact Match to User Close-Up Image & Blinking Animation) */}
              <g id="teacherEyes">
                {!isBlinking ? (
                  /* ✨ OPEN SHINY OVAL EYES (Exact Match to User Image 2) */
                  <g>
                    {/* Left Eye: Dark Purple/Navy Oval Pupil */}
                    <ellipse cx="98" cy="86" rx="7.5" ry="10" fill="#240c47" />
                    {/* Left Eye: White Shiny Catchlight */}
                    <circle cx="95.2" cy="82.4" r="3.2" fill="#ffffff" />

                    {/* Right Eye: Dark Purple/Navy Oval Pupil */}
                    <ellipse cx="142" cy="86" rx="7.5" ry="10" fill="#240c47" />
                    {/* Right Eye: White Shiny Catchlight */}
                    <circle cx="139.2" cy="82.4" r="3.2" fill="#ffffff" />
                  </g>
                ) : (
                  /* 😊 BLINKING / CLOSED HAPPY SMILE EYES */
                  <g>
                    {/* Left Eye: Closed Curve */}
                    <path
                      d="M 90,87 C 90,80 106,80 106,87"
                      fill="none"
                      stroke="#240c47"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    {/* Right Eye: Closed Curve */}
                    <path
                      d="M 134,87 C 134,80 150,80 150,87"
                      fill="none"
                      stroke="#240c47"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </g>
                )}
              </g>

              {/* 👓 ROUND BLACK GLASSES (چەڤیلکێن بازنەیی وەک وێنەی) */}
              <g>
                <circle
                  cx="98"
                  cy="86"
                  r="14.5"
                  fill="rgba(255, 255, 255, 0.2)"
                  stroke="#16171e"
                  strokeWidth="3.6"
                />
                <circle
                  cx="142"
                  cy="86"
                  r="14.5"
                  fill="rgba(255, 255, 255, 0.2)"
                  stroke="#16171e"
                  strokeWidth="3.6"
                />
                {/* Bridge */}
                <path
                  d="M 112.5,84.5 C 115,81 125,81 127.5,84.5"
                  fill="none"
                  stroke="#16171e"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                />
                {/* Left & Right Temples */}
                <path d="M 83.5,85.5 Q 75,83 70,87" fill="none" stroke="#16171e" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M 156.5,85.5 Q 165,83 170,87" fill="none" stroke="#16171e" strokeWidth="2.8" strokeLinecap="round" />
                {/* Glass Glare */}
                <path d="M 90,79 Q 96,75 102,77" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.85" />
                <path d="M 134,79 Q 140,75 146,77" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.85" />
              </g>

              {/* 😊 CUTE JOYFUL OPEN SMILING MOUTH (دەڤێ ڤەکری وەک وێنەی) */}
              <g transform="translate(120, 105)">
                <path
                  d="M -7.5,-2 Q 0,-2.5 7.5,-2 C 7.5,6.5 -7.5,6.5 -7.5,-2 Z"
                  fill="#16171e"
                  stroke="#16171e"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </g>
            </g>
          </g>

          {/* 5. 📖 LEFT HAND HOLDING TEACHER BOOK */}
          <g>
            {/* Left Blazer Sleeve */}
            <path
              d="M 72,142 
                 C 54,148 42,160 44,178 
                 C 46,186 58,190 68,184 
                 C 74,176 80,164 76,148 Z"
              fill="url(#mascotBlazerGrad)"
              stroke="#151722"
              strokeWidth="1.2"
            />

            {/* White Shirt Cuff */}
            <ellipse cx="48" cy="180" rx="4.5" ry="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" transform="rotate(18 48 180)" />

            {/* 📚 Brown Leather Teacher Book */}
            <g transform="translate(26, 164) rotate(12)">
              <rect x="0" y="0" width="28" height="34" rx="3.5" fill="#451a03" stroke="#2c1002" strokeWidth="0.8" />
              <rect x="2" y="2" width="24" height="30" rx="2" fill="#fefce8" stroke="#cbd5e1" strokeWidth="0.6" />
              <rect x="0" y="0" width="26" height="34" rx="2.5" fill="#78350f" stroke="#2c1002" strokeWidth="0.8" />
              <line x1="4" y1="2" x2="4" y2="32" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
              <polygon points="12,32 17,32 19,39 14.5,36.5 10,39" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="0.5" />
            </g>

            {/* Purple Mitten Hand Gripping Book */}
            <ellipse
              cx="52"
              cy="178"
              rx="7.5"
              ry="6.5"
              fill="url(#mascotSkinGrad)"
              stroke="#7e22ce"
              strokeWidth="1.2"
            />
          </g>

          {/* 6. 🪄 🌟 RIGHT ARM + GOLDEN STAR MAGIC WAND */}
          <g>
            {/* Right Blazer Sleeve */}
            <path
              d="M 168,142 
                 C 186,148 198,160 202,174 
                 C 204,184 194,188 184,184 
                 C 176,178 168,166 164,150 Z"
              fill="url(#mascotBlazerGrad)"
              stroke="#151722"
              strokeWidth="1.2"
            />

            {/* White Shirt Cuff */}
            <ellipse cx="192" cy="176" rx="4.5" ry="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" transform="rotate(-20 192 176)" />

            {/* Purple Mitten Hand */}
            <ellipse
              cx="196"
              cy="172"
              rx="8"
              ry="7"
              fill="url(#mascotSkinGrad)"
              stroke="#7e22ce"
              strokeWidth="1.2"
            />

            {/* 🌟 MAGIC POINTER WAND */}
            <g>
              <polygon
                points="192,176 222,54 225,56 195,180"
                fill="#ca8a04"
                stroke="#78350f"
                strokeWidth="0.8"
              />

              <line x1="200" y1="144" x2="203" y2="146" stroke="#fde047" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="210" y1="104" x2="213" y2="106" stroke="#fde047" strokeWidth="1.8" strokeLinecap="round" />

              {/* ✨ 3D Puffy Golden Star */}
              <g transform="translate(224, 55)">
                <circle cx="0" cy="0" r="14" fill="#fbbf24" opacity="0.35" filter="url(#mascotStarGlow)" />
                <circle cx="0" cy="0" r="6" fill="#ffffff" opacity="0.6" />

                <path
                  d="M 0,-15 
                     L 4,-4 
                     L 15,-2 
                     L 7,6 
                     L 10,17 
                     L 0,11 
                     L -10,17 
                     L -7,6 
                     L -15,-2 
                     L -4,-4 Z"
                  fill="url(#mascotStarGold)"
                  stroke="#ffffff"
                  strokeWidth="1"
                  filter="url(#mascotStarGlow)"
                />
                <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
              </g>

              {/* Gentle Sparkles */}
              <circle cx="236" cy="42" r="1.8" fill="#fef08a" opacity="0.9" />
              <circle cx="214" cy="38" r="1.4" fill="#fde047" opacity="0.8" />
            </g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
};
