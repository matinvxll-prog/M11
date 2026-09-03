import React from "react";

interface SubjectMascot3DProps {
  subjectId: "math" | "physics" | "chemistry" | "biology" | "religion" | "arabic" | "kurdish" | "english";
  className?: string;
}

export const SubjectMascot3D: React.FC<SubjectMascot3DProps> = ({
  subjectId,
  className = "w-20 h-20 sm:w-24 sm:h-24"
}) => {
  // Unique gradient IDs per subject to avoid SVG namespace collisions
  const uid = subjectId;

  // Shadow color for each subject matching the card tint
  const groundShadowColor = {
    math: "#10b981",
    physics: "#2563eb",
    chemistry: "#9333ea",
    biology: "#ea580c",
    english: "#06b6d4",
    arabic: "#d97706",
    kurdish: "#db2777",
    religion: "#0d9488"
  }[subjectId];

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md overflow-visible"
      >
        <defs>
          {/* Ground Soft Glow Filter */}
          <filter id={`blur-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>

          {/* 3D Purple Mascot Body Gradient */}
          <radialGradient
            id={`bodyGrad-${uid}`}
            cx="40%"
            cy="32%"
            r="65%"
            fx="35%"
            fy="25%"
          >
            <stop offset="0%" stopColor="#ba75ff" />
            <stop offset="25%" stopColor="#9333ea" />
            <stop offset="70%" stopColor="#6b21a8" />
            <stop offset="100%" stopColor="#4a148c" />
          </radialGradient>

          {/* Glossy Specular Highlight on Head */}
          <linearGradient id={`headGleam-${uid}`} x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Arm Gradient */}
          <linearGradient id={`armGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#581c87" />
          </linearGradient>

          {/* Sprout Antenna Gradient */}
          <linearGradient id={`sproutGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#7e22ce" />
          </linearGradient>

          {/* Specific Prop Gradients */}
          {/* Green Multiplication X */}
          <linearGradient id={`greenX-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          {/* Purple Plus Sign */}
          <linearGradient id={`purplePlus-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#581c87" />
          </linearGradient>

          {/* Potion Flask Liquid */}
          <linearGradient id={`potionLiquid-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>

          {/* Glass Flask Reflections */}
          <linearGradient id={`flaskGlass-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#c4b5fd" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
          </linearGradient>

          {/* Gold Arabic Fa */}
          <linearGradient id={`goldFa-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* Pink Kurdish Ye */}
          <linearGradient id={`pinkYe-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbcfe8" />
            <stop offset="40%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#9d174d" />
          </linearGradient>

          {/* Cyan Nishandi Aa */}
          <linearGradient id={`cyanAa-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a5f3fc" />
            <stop offset="40%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0e7490" />
          </linearGradient>

          {/* Book Blue Cover */}
          <linearGradient id={`bookCover-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
        </defs>

        {/* 1. SOFT COLOR-MATCHED GROUND SHADOW */}
        <ellipse
          cx="60"
          cy="104"
          rx="38"
          ry="8"
          fill={groundShadowColor}
          opacity="0.28"
          filter={`url(#blur-${uid})`}
        />
        <ellipse
          cx="60"
          cy="103"
          rx="24"
          ry="5"
          fill="#3b0764"
          opacity="0.25"
          filter={`url(#blur-${uid})`}
        />

        {/* 2. CHUBBY PURPLE 3D MASCOT BODY */}
        {/* Head Antenna / Sprout */}
        <path
          d="M 57 24 C 54 14, 62 8, 66 10 C 69 12, 65 20, 60 25 Z"
          fill={`url(#sproutGrad-${uid})`}
        />
        <circle cx="66" cy="10" r="2.5" fill="#d8b4fe" opacity="0.8" />

        {/* Main Cute Pear Body */}
        <path
          d="M 60 22 
             C 42 22, 28 34, 28 54
             C 28 67, 24 82, 33 94
             C 41 104, 79 104, 87 94
             C 96 82, 92 67, 92 54
             C 92 34, 78 22, 60 22 Z"
          fill={`url(#bodyGrad-${uid})`}
        />

        {/* 3D Specular Highlight on Head / Forehead */}
        <ellipse
          cx="50"
          cy="34"
          rx="16"
          ry="9"
          transform="rotate(-18 50 34)"
          fill={`url(#headGleam-${uid})`}
        />

        {/* 3. KAWAII FACE (Happy smiling curved eyes & open mouth) */}
        {/* Left Curved Smiling Eye */}
        <path
          d="M 44 48 C 47 43, 53 43, 56 48"
          stroke="#1e0b36"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right Curved Smiling Eye */}
        <path
          d="M 66 48 C 69 43, 75 43, 78 48"
          stroke="#1e0b36"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cheeks (Blushing Rosy Circles) */}
        <circle cx="41" cy="54" r="4.5" fill="#f472b6" opacity="0.45" />
        <circle cx="81" cy="54" r="4.5" fill="#f472b6" opacity="0.45" />

        {/* Happy Open Smile */}
        <path
          d="M 57 55 Q 61 63 65 55 Z"
          fill="#be185d"
        />
        <path
          d="M 56 55 Q 61 63 66 55"
          stroke="#1e0b36"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* 4. SUBJECT SPECIFIC 3D INTERACTIVE PROPS & ARMS */}

        {/* === MATH: Holding 3D Purple Plus & Green Multiplication Sign === */}
        {subjectId === "math" && (
          <g>
            {/* Left Hand holding Purple Plus */}
            <path
              d="M 28 66 C 20 70, 18 80, 26 84 C 32 86, 38 78, 36 70 Z"
              fill={`url(#armGrad-${uid})`}
            />
            {/* 3D Purple Plus (+) */}
            <g transform="translate(68, 56)">
              {/* Back 3D extrusion shadow */}
              <rect x="7" y="0" width="8" height="24" rx="3.5" fill="#3b0764" />
              <rect x="-1" y="8" width="24" height="8" rx="3.5" fill="#3b0764" />
              {/* Front glossy Plus face */}
              <rect x="6" y="-1" width="8" height="24" rx="3.5" fill={`url(#purplePlus-${uid})`} />
              <rect x="-2" y="7" width="24" height="8" rx="3.5" fill={`url(#purplePlus-${uid})`} />
              <circle cx="10" cy="3" r="1.5" fill="#ffffff" opacity="0.8" />
            </g>

            {/* Right Hand holding Lime-Green Multiplication Sign (X) */}
            <g transform="translate(70, 75)">
              {/* Back 3D shadow */}
              <g transform="rotate(45 10 10)">
                <rect x="6" y="-3" width="8" height="26" rx="3.5" fill="#14532d" />
                <rect x="-3" y="6" width="26" height="8" rx="3.5" fill="#14532d" />
                {/* Front glossy Green X */}
                <rect x="5" y="-4" width="8" height="26" rx="3.5" fill={`url(#greenX-${uid})`} />
                <rect x="-4" y="5" width="26" height="8" rx="3.5" fill={`url(#greenX-${uid})`} />
                <circle cx="9" cy="0" r="1.8" fill="#ffffff" opacity="0.9" />
              </g>
            </g>
            {/* Right Arm */}
            <path
              d="M 88 64 C 95 68, 98 76, 92 84 C 86 88, 80 82, 82 72 Z"
              fill={`url(#armGrad-${uid})`}
            />
          </g>
        )}

        {/* === PHYSICS: Holding 3D Atom with Glowing Orbiting Rings & Nucleus === */}
        {subjectId === "physics" && (
          <g>
            {/* Both Arms holding Atom */}
            <path d="M 28 68 C 22 74, 25 86, 36 84 C 42 82, 40 72, 35 68 Z" fill={`url(#armGrad-${uid})`} />
            <path d="M 88 68 C 94 74, 91 86, 80 84 C 74 82, 76 72, 81 68 Z" fill={`url(#armGrad-${uid})`} />

            {/* 3D Atom Structure */}
            <g transform="translate(74, 72)">
              {/* Back drop shadow */}
              <circle cx="0" cy="0" r="14" fill="#3b0764" opacity="0.4" />

              {/* Orbital Ring 1 (Vertical) */}
              <ellipse cx="0" cy="0" rx="6" ry="18" stroke="#a855f7" strokeWidth="2.5" fill="none" opacity="0.85" />
              {/* Orbital Ring 2 (Diagonal Left) */}
              <ellipse cx="0" cy="0" rx="6" ry="18" transform="rotate(60)" stroke="#60a5fa" strokeWidth="2.5" fill="none" opacity="0.9" />
              {/* Orbital Ring 3 (Diagonal Right) */}
              <ellipse cx="0" cy="0" rx="6" ry="18" transform="rotate(-60)" stroke="#c084fc" strokeWidth="2.5" fill="none" opacity="0.9" />

              {/* Central Glowing Nucleus Sphere */}
              <circle cx="0" cy="0" r="8" fill="#7c3aed" />
              <circle cx="-2" cy="-2" r="3" fill="#ffffff" opacity="0.85" />

              {/* Orbiting Electron Particles */}
              <circle cx="0" cy="-18" r="2.5" fill="#38bdf8" />
              <circle cx="15" cy="9" r="2.5" fill="#e879f9" />
              <circle cx="-15" cy="9" r="2.5" fill="#4ade80" />
            </g>
          </g>
        )}

        {/* === CHEMISTRY: Holding Erlenmeyer Flask with Glowing Green Potion === */}
        {subjectId === "chemistry" && (
          <g>
            {/* Mascot Right Hand holding neck of flask */}
            <g transform="translate(74, 52)">
              {/* Flask 3D Shadow */}
              <path
                d="M 8 2 L 14 2 L 14 10 L 25 28 C 26 31, 23 35, 19 35 L 3 35 C -1 35, -4 31, -3 28 L 8 10 Z"
                fill="#2e1065"
                opacity="0.35"
                transform="translate(1, 2)"
              />

              {/* Glass Body */}
              <path
                d="M 8 2 L 14 2 L 14 10 L 25 28 C 26 31, 23 35, 19 35 L 3 35 C -1 35, -4 31, -3 28 L 8 10 Z"
                fill="#f3e8ff"
                opacity="0.3"
                stroke="#c084fc"
                strokeWidth="1.5"
              />

              {/* Green Glowing Liquid */}
              <path
                d="M 12 18 L 22 28 C 23 30, 22 34, 18 34 L 4 34 C 0 34, -1 30, 0 28 L 10 18 Z"
                fill={`url(#potionLiquid-${uid})`}
              />

              {/* Liquid Surface Curve */}
              <ellipse cx="11" cy="18" rx="8" ry="2.2" fill="#bbf7d0" />

              {/* Bubbles Floating */}
              <circle cx="8" cy="24" r="1.8" fill="#ffffff" opacity="0.9" />
              <circle cx="14" cy="22" r="1.2" fill="#ffffff" opacity="0.8" />
              <circle cx="11" cy="12" r="1.5" fill="#4ade80" opacity="0.9" />
              <circle cx="16" cy="6" r="1.2" fill="#86efac" opacity="0.8" />

              {/* Glass Specular Reflection Streak */}
              <path
                d="M 1 28 L 8 16"
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.8"
              />
            </g>

            {/* Arm holding flask */}
            <path
              d="M 82 66 C 88 66, 92 72, 88 78 C 84 82, 78 78, 78 72 Z"
              fill={`url(#armGrad-${uid})`}
            />
          </g>
        )}

        {/* === BIOLOGY: Holding Twisted 3D DNA Double Helix === */}
        {subjectId === "biology" && (
          <g>
            {/* Arms holding DNA */}
            <path d="M 28 68 C 22 72, 24 82, 34 82 C 40 82, 38 72, 34 68 Z" fill={`url(#armGrad-${uid})`} />
            <path d="M 88 66 C 94 70, 92 82, 82 82 C 76 82, 78 72, 82 66 Z" fill={`url(#armGrad-${uid})`} />

            {/* 3D DNA Double Helix in Red & Cyan */}
            <g transform="translate(68, 48)">
              {/* Connecting rungs */}
              <line x1="8" y1="12" x2="22" y2="16" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="10" y1="24" x2="20" y2="28" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="6" y1="36" x2="24" y2="40" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />

              {/* Cyan Strand (Left Spiral) */}
              <path
                d="M 6 8 C 18 16, 24 24, 10 32 C -2 40, 14 48, 22 56"
                stroke="#06b6d4"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 6 8 C 18 16, 24 24, 10 32 C -2 40, 14 48, 22 56"
                stroke="#67e8f9"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />

              {/* Coral/Red Strand (Right Spiral) */}
              <path
                d="M 24 8 C 10 16, 4 24, 18 32 C 32 40, 16 48, 8 56"
                stroke="#f43f5e"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 24 8 C 10 16, 4 24, 18 32 C 32 40, 16 48, 8 56"
                stroke="#fda4af"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />

              {/* DNA Node Spheres */}
              <circle cx="6" cy="8" r="3.2" fill="#06b6d4" />
              <circle cx="24" cy="8" r="3.2" fill="#f43f5e" />
              <circle cx="22" cy="56" r="3.2" fill="#06b6d4" />
              <circle cx="8" cy="56" r="3.2" fill="#f43f5e" />
            </g>
          </g>
        )}

        {/* === ENGLISH: Holding 3D Glossy Cyan Letters "Aa" === */}
        {subjectId === "english" && (
          <g>
            {/* Arms holding Letters */}
            <path d="M 28 68 C 22 74, 25 86, 36 84 Z" fill={`url(#armGrad-${uid})`} />
            <path d="M 88 68 C 94 74, 91 86, 80 84 Z" fill={`url(#armGrad-${uid})`} />

            {/* 3D Cyan Letters "Aa" */}
            <g transform="translate(68, 64)">
              {/* Back 3D Shadow */}
              <text
                x="2"
                y="26"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="34"
                fontWeight="900"
                fill="#083344"
                opacity="0.35"
              >
                Aa
              </text>
              {/* Front Glossy Cyan */}
              <text
                x="0"
                y="24"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="34"
                fontWeight="900"
                fill={`url(#cyanAa-${uid})`}
              >
                Aa
              </text>
              {/* Specular White Shine on 'A' */}
              <circle cx="8" cy="6" r="2" fill="#ffffff" opacity="0.9" />
              <circle cx="22" cy="12" r="1.5" fill="#ffffff" opacity="0.9" />
            </g>
          </g>
        )}

        {/* === ARABIC: Holding 3D Glossy Golden Letter "ف" === */}
        {subjectId === "arabic" && (
          <g>
            {/* Arms hugging Golden Letter */}
            <path d="M 28 68 C 22 74, 26 86, 38 84 Z" fill={`url(#armGrad-${uid})`} />
            <path d="M 88 68 C 94 74, 90 86, 78 84 Z" fill={`url(#armGrad-${uid})`} />

            {/* 3D Glossy Golden Arabic Letter Fa (ف) */}
            <g transform="translate(62, 54)">
              {/* Back 3D Shadow */}
              <text
                x="3"
                y="38"
                fontFamily="Noto Sans Arabic, Tahoma, sans-serif"
                fontSize="46"
                fontWeight="bold"
                fill="#78350f"
                opacity="0.35"
              >
                ف
              </text>
              {/* Front Golden Fa */}
              <text
                x="0"
                y="36"
                fontFamily="Noto Sans Arabic, Tahoma, sans-serif"
                fontSize="46"
                fontWeight="bold"
                fill={`url(#goldFa-${uid})`}
              >
                ف
              </text>
              {/* Highlight Gleams */}
              <circle cx="24" cy="8" r="2.2" fill="#ffffff" opacity="0.9" />
              <ellipse cx="14" cy="20" rx="3" ry="1.5" fill="#ffffff" opacity="0.8" />
            </g>
          </g>
        )}

        {/* === KURDISH: Holding 3D Glossy Pink Kurdish Letter "ێ" === */}
        {subjectId === "kurdish" && (
          <g>
            {/* Arms hugging Kurdish Letter */}
            <path d="M 28 68 C 22 74, 26 86, 38 84 Z" fill={`url(#armGrad-${uid})`} />
            <path d="M 88 68 C 94 74, 90 86, 78 84 Z" fill={`url(#armGrad-${uid})`} />

            {/* 3D Glossy Vibrant Pink Kurdish Ye (ێ) */}
            <g transform="translate(64, 52)">
              {/* Back 3D Shadow */}
              <text
                x="3"
                y="40"
                fontFamily="Noto Sans Arabic, Tahoma, sans-serif"
                fontSize="48"
                fontWeight="bold"
                fill="#831843"
                opacity="0.35"
              >
                ێ
              </text>
              {/* Front Pink Kurdish Ye */}
              <text
                x="0"
                y="38"
                fontFamily="Noto Sans Arabic, Tahoma, sans-serif"
                fontSize="48"
                fontWeight="bold"
                fill={`url(#pinkYe-${uid})`}
              >
                ێ
              </text>
              {/* Specular White Gleams on Dots & Curve */}
              <circle cx="20" cy="8" r="2.2" fill="#ffffff" opacity="0.9" />
              <ellipse cx="28" cy="30" rx="3" ry="1.5" fill="#ffffff" opacity="0.8" />
            </g>
          </g>
        )}

        {/* === ISLAMIC STUDIES: Holding Open 3D Hardcover Book === */}
        {subjectId === "religion" && (
          <g>
            {/* Arms holding Open Book */}
            <path d="M 28 66 C 22 72, 24 82, 34 82 Z" fill={`url(#armGrad-${uid})`} />
            <path d="M 88 66 C 94 72, 92 82, 82 82 Z" fill={`url(#armGrad-${uid})`} />

            {/* 3D Open Blue Book */}
            <g transform="translate(42, 65)">
              {/* Blue Cover Backing */}
              <path
                d="M 0 10 Q 18 16 36 10 Q 54 16 72 10 L 70 32 Q 54 38 36 32 Q 18 38 2 32 Z"
                fill={`url(#bookCover-${uid})`}
              />
              {/* White Pages Block */}
              <path
                d="M 2 8 Q 18 14 36 8 Q 54 14 70 8 L 68 28 Q 54 34 36 28 Q 18 34 4 28 Z"
                fill="#ffffff"
              />
              {/* Spine Divider */}
              <line x1="36" y1="8" x2="36" y2="28" stroke="#93c5fd" strokeWidth="2.5" />

              {/* Text Lines on Left Page */}
              <line x1="10" y1="14" x2="28" y2="14" stroke="#bfdbfe" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="10" y1="19" x2="26" y2="19" stroke="#bfdbfe" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="10" y1="24" x2="22" y2="24" stroke="#bfdbfe" strokeWidth="1.8" strokeLinecap="round" />

              {/* Text Lines on Right Page */}
              <line x1="44" y1="14" x2="62" y2="14" stroke="#bfdbfe" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="44" y1="19" x2="60" y2="19" stroke="#bfdbfe" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="44" y1="24" x2="56" y2="24" stroke="#bfdbfe" strokeWidth="1.8" strokeLinecap="round" />

              {/* Cute Bookmark Ribbon */}
              <path d="M 36 8 L 36 34 L 39 31 L 42 34 L 42 8 Z" fill="#ef4444" opacity="0.8" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
