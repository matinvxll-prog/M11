import React from "react";

export const AppLogoSvg = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Rounded Card Background */}
    <rect width="200" height="200" rx="44" fill="url(#purple_grad)" />

    {/* Light spark top-right */}
    <path
      d="M145 35L150 25M158 45L168 43M140 48L130 52"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* Owl Body Outer Ears */}
    <path
      d="M50 75C50 48 70 38 100 38C130 38 150 48 150 75V110C150 135 128 150 100 150C72 150 50 135 50 110V75Z"
      fill="#8B5CF6"
    />

    {/* Owl White Face Patch */}
    <path
      d="M62 82C62 65 78 55 100 70C122 55 138 65 138 82C138 102 122 118 100 118C78 118 62 102 62 82Z"
      fill="white"
    />

    {/* Eyes */}
    <circle cx="82" cy="84" r="9" fill="#1E1B4B" />
    <circle cx="118" cy="84" r="9" fill="#1E1B4B" />
    <circle cx="85" cy="81" r="3" fill="white" />
    <circle cx="121" cy="81" r="3" fill="white" />

    {/* Beak */}
    <path
      d="M93 92C93 92 100 106 107 92H93Z"
      fill="#F59E0B"
      stroke="#D97706"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Wings holding book */}
    <path
      d="M48 105C48 105 60 120 75 115L68 132C52 130 48 105 48 105Z"
      fill="#7C3AED"
    />
    <path
      d="M152 105C152 105 140 120 125 115L132 132C148 130 152 105 152 105Z"
      fill="#7C3AED"
    />

    {/* Open Book */}
    <path
      d="M68 112L100 124L132 112V145L100 155L68 145V112Z"
      fill="#F8FAFC"
      stroke="#C084FC"
      strokeWidth="3"
    />
    <path d="M100 124V155" stroke="#8B5CF6" strokeWidth="3" />

    <defs>
      <linearGradient
        id="purple_grad"
        x1="0"
        y1="0"
        x2="200"
        y2="200"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9333EA" />
        <stop offset="1" stopColor="#6B21A8" />
      </linearGradient>
    </defs>
  </svg>
);

export const AppLogoWithText = ({ className = "h-16" }: { className?: string }) => (
  <div className={`flex flex-col items-center justify-center ${className}`}>
    <AppLogoSvg className="w-14 h-14 shadow-lg rounded-2xl" />
    <span
      className="text-purple-900 font-extrabold text-sm mt-1"
      style={{ letterSpacing: "normal" }}
    >
      دگەڵ قوتابی
    </span>
    <div className="w-10 h-0.5 bg-purple-600 rounded-full mt-0.5" />
  </div>
);
