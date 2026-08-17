import React from "react";

interface WoodenArchBridgeProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  animated?: boolean;
}

export const WoodenArchBridge: React.FC<WoodenArchBridgeProps> = ({
  className = "",
  width = "100%",
  height = "auto",
  animated = true,
}) => {
  // Generate plank coordinates along the bridge curve
  const plankCount = 28;
  const planks = Array.from({ length: plankCount }, (_, i) => {
    const t = i / (plankCount - 1); // 0 to 1
    // X coordinates along front and back curves
    const backX = 70 + t * 860;
    const backY = 280 - Math.sin(t * Math.PI) * 160 + (1 - t) * 10;

    const frontX = 30 + t * 930;
    const frontY = 340 - Math.sin(t * Math.PI) * 170 + (1 - t) * 10;

    // Next t for plank polygon
    const tNext = Math.min(1, (i + 0.85) / (plankCount - 1));
    const backXNext = 70 + tNext * 860;
    const backYNext = 280 - Math.sin(tNext * Math.PI) * 160 + (1 - tNext) * 10;

    const frontXNext = 30 + tNext * 930;
    const frontYNext = 340 - Math.sin(tNext * Math.PI) * 170 + (1 - tNext) * 10;

    // Wood tone variations for realistic planks
    const woodColors = [
      "#d97706", // Amber 600
      "#b45309", // Amber 700
      "#c2410c", // Orange 700
      "#a16207", // Yellow 700
      "#92400e", // Amber 800
      "#eab308", // Yellow 500
    ];
    const color = woodColors[i % woodColors.length];

    return {
      id: i,
      path: `M ${backX},${backY} L ${frontX},${frontY} L ${frontXNext},${frontYNext} L ${backXNext},${backYNext} Z`,
      seamPath: `M ${frontX},${frontY} L ${backX},${backY}`,
      highlightPath: `M ${frontX},${frontY - 1} L ${backX},${backY - 1}`,
      color,
    };
  });

  return (
    <div className={`relative inline-block select-none ${className}`}>
      <svg
        viewBox="0 0 1000 420"
        style={{ width, height }}
        className={`drop-shadow-xl ${animated ? "transition-all duration-500" : ""}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Wood Gradients */}
          <linearGradient id="woodLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <linearGradient id="woodMid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          <linearGradient id="woodDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#92400e" />
            <stop offset="60%" stopColor="#451a03" />
            <stop offset="100%" stopColor="#291307" />
          </linearGradient>

          <linearGradient id="woodBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#451a03" />
            <stop offset="15%" stopColor="#b45309" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="85%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#291307" />
          </linearGradient>

          {/* Golden/Warm Egg-Shaped Finial Gradient */}
          <linearGradient id="finialGrad" x1="30%" y1="20%" x2="90%" y2="90%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="75%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          {/* Post Highlight Gradient */}
          <linearGradient id="postGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="35%" stopColor="#d97706" />
            <stop offset="70%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          <filter id="bridgeShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="12" stdDeviation="8" floodColor="#1e1b4b" floodOpacity="0.25" />
          </filter>
        </defs>

        <g filter="url(#bridgeShadow)">
          {/* 1. UNDER-BRIDGE SUPPORT LEGS (Vertical Wooden Pillars in Ground) */}
          {/* Left Leg */}
          <path d="M 220,290 L 220,380 L 250,380 L 250,280 Z" fill="url(#woodDark)" stroke="#1a0901" strokeWidth="2" />
          <path d="M 220,290 L 235,290 L 235,380 L 220,380 Z" fill="#78350f" opacity="0.6" />

          {/* Middle Leg */}
          <path d="M 570,210 L 570,300 L 605,300 L 605,212 Z" fill="url(#woodDark)" stroke="#1a0901" strokeWidth="2" />
          <path d="M 570,210 L 587,210 L 587,300 L 570,300 Z" fill="#78350f" opacity="0.6" />

          {/* Right Leg */}
          <path d="M 890,295 L 890,395 L 925,395 L 925,310 Z" fill="url(#woodDark)" stroke="#1a0901" strokeWidth="2" />
          <path d="M 890,295 L 907,295 L 907,395 L 890,395 Z" fill="#78350f" opacity="0.6" />

          {/* 2. BACK RAILING & POSTS (Background elements behind deck) */}
          {/* Back Top Curved Handrail */}
          <path
            d="M 90,220 Q 500,60 880,190"
            fill="none"
            stroke="#451a03"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M 90,220 Q 500,60 880,190"
            fill="none"
            stroke="url(#woodMid)"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Back Mid Curved Handrail */}
          <path
            d="M 120,245 Q 500,100 860,215"
            fill="none"
            stroke="#451a03"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M 120,245 Q 500,100 860,215"
            fill="none"
            stroke="url(#woodMid)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Back Posts with Finials */}
          {[
            { x: 280, yTop: 110, yBot: 260 },
            { x: 480, yTop: 60, yBot: 215 },
            { x: 670, yTop: 90, yBot: 220 },
            { x: 790, yTop: 135, yBot: 245 },
          ].map((post, idx) => (
            <g key={`back-post-${idx}`}>
              {/* Post Body */}
              <rect
                x={post.x - 10}
                y={post.yTop}
                width={20}
                height={post.yBot - post.yTop}
                fill="url(#woodDark)"
                stroke="#1a0901"
                strokeWidth="1.5"
                rx={2}
              />
              <rect
                x={post.x - 10}
                y={post.yTop}
                width={8}
                height={post.yBot - post.yTop}
                fill="#d97706"
                opacity="0.3"
              />
              {/* Collar Cap */}
              <rect x={post.x - 12} y={post.yTop - 4} width={24} height={6} fill="#291307" rx={1} />
              {/* Finial Oval Bulb */}
              <ellipse
                cx={post.x}
                cy={post.yTop - 14}
                rx={8}
                ry={11}
                fill="url(#finialGrad)"
                stroke="#451a03"
                strokeWidth="1.5"
              />
              <ellipse cx={post.x - 3} cy={post.yTop - 17} rx={3} ry={5} fill="#fff" opacity="0.4" />
            </g>
          ))}

          {/* 3. UNDER-DECK ARCH BEAMS (Dark Foundation Arch under deck) */}
          <path
            d="M 10,345 Q 500,165 990,325 L 970,360 Q 500,205 30,380 Z"
            fill="url(#woodDark)"
            stroke="#1a0901"
            strokeWidth="2"
          />

          {/* 4. MAIN DECK SURFACE (Horizontal Wooden Planks) */}
          {/* Deck Base background */}
          <path
            d="M 70,280 Q 500,120 930,270 L 970,340 Q 500,170 30,340 Z"
            fill="#78350f"
          />

          {/* Render individual planks */}
          {planks.map((p) => (
            <g key={`plank-${p.id}`}>
              <path d={p.path} fill={p.color} stroke="#78350f" strokeWidth="0.8" />
              {/* Plank seam line */}
              <path d={p.seamPath} stroke="#291307" strokeWidth="2.5" opacity="0.85" />
              {/* Plank highlight */}
              <path d={p.highlightPath} stroke="#fef08a" strokeWidth="1" opacity="0.4" />
            </g>
          ))}

          {/* 5. FRONT ARCH RIM & TIMBER BEAM (Thick front edge of bridge) */}
          <path
            d="M 0,335 Q 500,150 990,320 L 975,355 Q 500,188 15,365 Z"
            fill="url(#woodBeamGrad)"
            stroke="#1a0901"
            strokeWidth="2.5"
          />
          {/* Arch Rim Segments / Block Joins */}
          {[0.08, 0.2, 0.33, 0.46, 0.58, 0.71, 0.84, 0.94].map((t, idx) => {
            const x1 = 10 + t * 960;
            const y1 = 338 - Math.sin(t * Math.PI) * 175;
            const x2 = 20 + t * 940;
            const y2 = 363 - Math.sin(t * Math.PI) * 165;
            return (
              <line
                key={`rim-join-${idx}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#1a0901"
                strokeWidth="3"
              />
            );
          })}
          {/* Top highlight along the front rim */}
          <path
            d="M 0,336 Q 500,151 990,321"
            fill="none"
            stroke="#fef08a"
            strokeWidth="2"
            opacity="0.6"
          />

          {/* 6. FRONT RAILING & MAIN POSTS (Foreground elements) */}
          {/* Front Mid Curved Handrail */}
          <path
            d="M 60,285 Q 500,110 930,270"
            fill="none"
            stroke="#291307"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M 60,285 Q 500,110 930,270"
            fill="none"
            stroke="url(#woodMid)"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Front Top Curved Handrail */}
          <path
            d="M 50,250 Q 500,70 940,235"
            fill="none"
            stroke="#1a0901"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M 50,250 Q 500,70 940,235"
            fill="none"
            stroke="url(#postGrad)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Top handrail highlight */}
          <path
            d="M 50,246 Q 500,66 940,231"
            fill="none"
            stroke="#fef08a"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* Front Posts with Finials (6 Main Posts matching reference picture) */}
          {[
            { x: 75, yTop: 145, yBot: 315, w: 38 },
            { x: 285, yTop: 70, yBot: 260, w: 40 },
            { x: 480, yTop: 35, yBot: 220, w: 44 },
            { x: 625, yTop: 45, yBot: 228, w: 42 },
            { x: 800, yTop: 95, yBot: 265, w: 38 },
            { x: 935, yTop: 165, yBot: 320, w: 36 },
          ].map((post, idx) => (
            <g key={`front-post-${idx}`}>
              {/* Post Shadow on deck */}
              <ellipse
                cx={post.x + 8}
                cy={post.yBot + 6}
                rx={post.w * 0.7}
                ry={6}
                fill="#1a0901"
                opacity="0.4"
              />

              {/* Main Post Pillar */}
              <rect
                x={post.x - post.w / 2}
                y={post.yTop}
                width={post.w}
                height={post.yBot - post.yTop}
                fill="url(#postGrad)"
                stroke="#1a0901"
                strokeWidth="2.5"
                rx={3}
              />

              {/* Post 3D Facet / Wood Grain Highlights */}
              <rect
                x={post.x - post.w / 2 + 2}
                y={post.yTop + 2}
                width={post.w * 0.4}
                height={post.yBot - post.yTop - 4}
                fill="#fde047"
                opacity="0.3"
                rx={1}
              />
              <line
                x1={post.x - post.w / 6}
                y1={post.yTop + 5}
                x2={post.x - post.w / 6}
                y2={post.yBot - 5}
                stroke="#451a03"
                strokeWidth="1.5"
                opacity="0.6"
              />

              {/* Post Collar Cap */}
              <rect
                x={post.x - post.w / 2 - 3}
                y={post.yTop - 5}
                width={post.w + 6}
                height={9}
                fill="#291307"
                stroke="#1a0901"
                strokeWidth="1.5"
                rx={2}
              />
              <rect
                x={post.x - post.w / 2 - 1}
                y={post.yTop - 4}
                width={post.w * 0.4}
                height={4}
                fill="#fde047"
                opacity="0.5"
              />

              {/* Decorative Oval / Egg-Shaped Finial */}
              <ellipse
                cx={post.x}
                cy={post.yTop - 22}
                rx={post.w * 0.36}
                ry={post.w * 0.52}
                fill="url(#finialGrad)"
                stroke="#291307"
                strokeWidth="2"
              />
              {/* Finial Highlight */}
              <ellipse
                cx={post.x - post.w * 0.12}
                cy={post.yTop - 26}
                rx={post.w * 0.14}
                ry={post.w * 0.25}
                fill="#ffffff"
                opacity="0.65"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};
