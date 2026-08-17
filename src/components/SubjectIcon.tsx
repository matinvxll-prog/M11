import React from "react";

interface SubjectIconProps {
  subjectId: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const SubjectIcon: React.FC<SubjectIconProps> = ({ subjectId, size = "md", className = "" }) => {
  const sizeMap = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const dim = sizeMap[size] || sizeMap.md;

  // Render high quality pastel SVG illustration with sparkles matching user image style
  const renderSvg = () => {
    switch (subjectId) {
      case "biology":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Background Pastel Pill */}
            <rect x="6" y="6" width="52" height="52" rx="16" fill="url(#bio-bg)" />
            <defs>
              <linearGradient id="bio-bg" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FEE2E2" />
                <stop offset="1" stopColor="#E0F2FE" />
              </linearGradient>
            </defs>

            {/* DNA Strand & Cell / Plant */}
            <path d="M22 18C28 26 36 38 42 46" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M42 18C36 26 28 38 22 46" stroke="#3B82F6" strokeWidth="4.5" strokeLinecap="round" />
            {/* Cross Rungs */}
            <line x1="26" y1="23" x2="38" y2="23" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <line x1="29" y1="32" x2="35" y2="32" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="26" y1="41" x2="38" y2="41" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" />

            {/* Cute Plant Leaf badge at bottom right */}
            <path d="M40 42C40 42 46 36 50 42C50 48 42 50 40 42Z" fill="#34D399" />

            {/* Sparkles */}
            <path d="M12 16L13.5 12L15 16L19 17.5L15 19L13.5 23L12 19L8 17.5L12 16Z" fill="#F472B6" />
            <path d="M48 14L49 11L50 14L53 15L50 16L49 19L48 16L45 15L48 14Z" fill="#60A5FA" />
            <path d="M14 46L15 43L16 46L19 47L16 48L15 51L14 48L11 47L14 46Z" fill="#FBBF24" />
          </svg>
        );

      case "math":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Background Pastel Pill */}
            <rect x="6" y="6" width="52" height="52" rx="16" fill="url(#math-bg)" />
            <defs>
              <linearGradient id="math-bg" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
                <stop stopColor="#CCFBF1" />
                <stop offset="1" stopColor="#FEF3C7" />
              </linearGradient>
            </defs>

            {/* Geometry Triangle Ruler */}
            <path d="M16 46L46 46L16 16V46Z" fill="#14B8A6" stroke="#0D9488" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M22 40L36 40L22 26V40Z" fill="#FFFFFF" />

            {/* Ruler Ticks */}
            <line x1="20" y1="46" x2="20" y2="43" stroke="#0D9488" strokeWidth="2" />
            <line x1="25" y1="46" x2="25" y2="42" stroke="#0D9488" strokeWidth="2" />
            <line x1="30" y1="46" x2="30" y2="43" stroke="#0D9488" strokeWidth="2" />
            <line x1="35" y1="46" x2="35" y2="42" stroke="#0D9488" strokeWidth="2" />
            <line x1="40" y1="46" x2="40" y2="43" stroke="#0D9488" strokeWidth="2" />

            {/* Cute Calculator / Compass detail */}
            <rect x="36" y="16" width="16" height="20" rx="4" fill="#F472B6" />
            <rect x="39" y="19" width="10" height="5" rx="1" fill="#FEF08A" />
            <circle cx="40" cy="28" r="1.5" fill="#FFFFFF" />
            <circle cx="44" cy="28" r="1.5" fill="#FFFFFF" />
            <circle cx="48" cy="28" r="1.5" fill="#FFFFFF" />
            <circle cx="40" cy="32" r="1.5" fill="#FFFFFF" />
            <circle cx="44" cy="32" r="1.5" fill="#FFFFFF" />
            <circle cx="48" cy="32" r="1.5" fill="#FFFFFF" />

            {/* Sparkles */}
            <path d="M11 15L12.5 11L14 15L18 16.5L14 18L12.5 22L11 18L7 16.5L11 15Z" fill="#F472B6" />
            <path d="M48 44L49 41L50 44L53 45L50 46L49 49L48 46L45 45L48 44Z" fill="#2DD4BF" />
          </svg>
        );

      case "physics":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Background Pastel Pill */}
            <rect x="6" y="6" width="52" height="52" rx="16" fill="url(#phys-bg)" />
            <defs>
              <linearGradient id="phys-bg" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
                <stop stopColor="#DBEAFE" />
                <stop offset="1" stopColor="#E0E7FF" />
              </linearGradient>
            </defs>

            {/* Orbit rings */}
            <ellipse cx="32" cy="32" rx="22" ry="9" transform="rotate(-30 32 32)" stroke="#818CF8" strokeWidth="3" strokeDasharray="40 0" />
            <ellipse cx="32" cy="32" rx="22" ry="9" transform="rotate(30 32 32)" stroke="#C084FC" strokeWidth="3" />

            {/* Central glowing core / sun */}
            <circle cx="32" cy="32" r="7" fill="#FBBF24" />
            <circle cx="32" cy="32" r="4" fill="#FEF08A" />

            {/* Electrons */}
            <circle cx="16" cy="23" r="3.5" fill="#38BDF8" />
            <circle cx="48" cy="41" r="3.5" fill="#F472B6" />

            {/* Lightning bolt */}
            <path d="M38 12L28 28H35L26 48L42 26H34L38 12Z" fill="#F59E0B" opacity="0.25" />

            {/* Sparkles */}
            <path d="M12 12L13.5 8L15 12L19 13.5L15 15L13.5 19L12 15L8 13.5L12 12Z" fill="#F472B6" />
            <path d="M50 16L51 13L52 16L55 17L52 18L51 21L50 18L47 17L50 16Z" fill="#FBBF24" />
            <path d="M12 48L13.5 44L15 48L19 49.5L15 51L13.5 55L12 51L8 49.5L12 48Z" fill="#38BDF8" />
          </svg>
        );

      case "chemistry":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Background Pastel Pill */}
            <rect x="6" y="6" width="52" height="52" rx="16" fill="url(#chem-bg)" />
            <defs>
              <linearGradient id="chem-bg" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F3E8FF" />
                <stop offset="1" stopColor="#D1FAE5" />
              </linearGradient>
            </defs>

            {/* Conical Flask */}
            <path d="M28 16H36V24L46 44C47.5 47 45 50 41 50H23C19 50 16.5 47 18 44L28 24V16Z" fill="#34D399" stroke="#059669" strokeWidth="3" strokeLinejoin="round" />
            <path d="M22 36L42 36L44 43C45 46 43 48 40 48H24C21 48 19 46 20 43L22 36Z" fill="#A7F3D0" />

            {/* Liquid & Bubbles */}
            <circle cx="32" cy="30" r="2.5" fill="#10B981" />
            <circle cx="28" cy="24" r="2" fill="#34D399" />
            <circle cx="35" cy="20" r="1.5" fill="#6EE7B7" />

            {/* Flask top rim */}
            <rect x="26" y="13" width="12" height="4" rx="2" fill="#059669" />

            {/* Cute Test tube next to flask */}
            <rect x="44" y="22" width="6" height="20" rx="3" fill="#F472B6" />
            <path d="M44 32H50V39C50 40.5 48.5 42 47 42C45.5 42 44 40.5 44 39V32Z" fill="#FBCFE8" />

            {/* Sparkles */}
            <path d="M11 16L12.5 12L14 16L18 17.5L14 19L12.5 23L11 19L7 17.5L11 16Z" fill="#F472B6" />
            <path d="M50 10L51 7L52 10L55 11L52 12L51 15L50 12L47 11L50 10Z" fill="#FBBF24" />
            <path d="M12 45L13 42L14 45L17 46L14 47L13 50L12 47L9 46L12 45Z" fill="#38BDF8" />
          </svg>
        );

      case "english":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Background Pastel Pill */}
            <rect x="6" y="6" width="52" height="52" rx="16" fill="url(#eng-bg)" />
            <defs>
              <linearGradient id="eng-bg" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E0F2FE" />
                <stop offset="1" stopColor="#FAE8FF" />
              </linearGradient>
            </defs>

            {/* Book Cover */}
            <rect x="18" y="14" width="30" height="38" rx="4" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2.5" />
            <rect x="22" y="14" width="22" height="38" fill="#60A5FA" />
            {/* Book Spine */}
            <path d="M18 14C18 14 15 14 15 18V48C15 51 18 52 18 52" stroke="#1D4ED8" strokeWidth="3.5" fill="#2563EB" />

            {/* Book Bookmark / Ribbon */}
            <path d="M34 14V28L38 25L42 28V14H34Z" fill="#EF4444" />

            {/* Text 'A-Z' or Lines */}
            <rect x="25" y="32" width="16" height="3" rx="1.5" fill="#FFFFFF" />
            <rect x="25" y="38" width="12" height="3" rx="1.5" fill="#FEF08A" />

            {/* Colorful Page Index Tabs on side */}
            <rect x="48" y="20" width="4" height="5" rx="1" fill="#F472B6" />
            <rect x="48" y="27" width="4" height="5" rx="1" fill="#FBBF24" />
            <rect x="48" y="34" width="4" height="5" rx="1" fill="#34D399" />

            {/* Sparkles */}
            <path d="M10 14L11.5 10L13 14L17 15.5L13 17L11.5 21L10 17L6 15.5L10 14Z" fill="#F472B6" />
            <path d="M48 46L49 43L50 46L53 47L50 48L49 51L48 48L45 47L48 46Z" fill="#FBBF24" />
          </svg>
        );

      case "kurdish":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Background Pastel Pill */}
            <rect x="6" y="6" width="52" height="52" rx="16" fill="url(#kurd-bg)" />
            <defs>
              <linearGradient id="kurd-bg" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFE4E6" />
                <stop offset="1" stopColor="#FEF3C7" />
              </linearGradient>
            </defs>

            {/* Open Book */}
            <path d="M14 42C20 40 28 41 32 44C36 41 44 40 50 42V22C44 20 36 21 32 24C28 21 20 20 14 22V42Z" fill="#FFFFFF" stroke="#E11D48" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M32 24V44" stroke="#E11D48" strokeWidth="2.5" />

            {/* Kurdish Golden Sun above book */}
            <circle cx="32" cy="18" r="6" fill="#F59E0B" />
            <circle cx="32" cy="18" r="4" fill="#FEF08A" />
            {/* Rays */}
            <line x1="32" y1="8" x2="32" y2="10" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            <line x1="32" y1="26" x2="32" y2="28" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            <line x1="22" y1="18" x2="24" y2="18" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            <line x1="40" y1="18" x2="42" y2="18" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            <line x1="25" y1="11" x2="26.5" y2="12.5" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            <line x1="37.5" y1="23.5" x2="39" y2="25" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            <line x1="25" y1="25" x2="26.5" y2="23.5" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            <line x1="37.5" y1="12.5" x2="39" y2="11" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

            {/* Quill pen / Feather */}
            <path d="M42 46L49 28C50 25 46 24 44 26L39 40L42 46Z" fill="#F43F5E" />

            {/* Sparkles */}
            <path d="M10 14L11.5 10L13 14L17 15.5L13 17L11.5 21L10 17L6 15.5L10 14Z" fill="#F472B6" />
            <path d="M50 44L51 41L52 44L55 45L52 46L51 49L50 46L47 45L50 44Z" fill="#10B981" />
          </svg>
        );

      case "arabic":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Background Pastel Pill */}
            <rect x="6" y="6" width="52" height="52" rx="16" fill="url(#arab-bg)" />
            <defs>
              <linearGradient id="arab-bg" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FEF3C7" />
                <stop offset="1" stopColor="#FDE68A" />
              </linearGradient>
            </defs>

            {/* Parchment Scroll / Classic Arabic Book */}
            <rect x="18" y="14" width="28" height="38" rx="4" fill="#D97706" stroke="#B45309" strokeWidth="2.5" />
            <rect x="21" y="17" width="22" height="32" rx="2" fill="#FFFBEB" />

            {/* Arabic Calligraphy Decorative Shape / Crescent motif */}
            <path d="M32 22C28 22 25 25 25 29C25 33 28 36 32 36C35 36 37.5 34 38.5 31.5C37 32 35 32 33.5 31C32 30 31.5 28 32 26.5C32.5 25 34 24 36 24C35 22.8 33.5 22 32 22Z" fill="#D97706" />

            {/* Gold Seal at bottom */}
            <circle cx="32" cy="41" r="5" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
            <path d="M30 46L32 52L34 46H30Z" fill="#D97706" />

            {/* Sparkles */}
            <path d="M10 14L11.5 10L13 14L17 15.5L13 17L11.5 21L10 17L6 15.5L10 14Z" fill="#F59E0B" />
            <path d="M48 12L49 9L50 12L53 13L50 14L49 17L48 14L45 13L48 12Z" fill="#10B981" />
            <path d="M48 44L49 41L50 44L53 45L50 46L49 49L48 46L45 45L48 44Z" fill="#EC4899" />
          </svg>
        );

      case "religion":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Background Pastel Pill */}
            <rect x="6" y="6" width="52" height="52" rx="16" fill="url(#rel-bg)" />
            <defs>
              <linearGradient id="rel-bg" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
                <stop stopColor="#CCFBF1" />
                <stop offset="1" stopColor="#E0E7FF" />
              </linearGradient>
            </defs>

            {/* Mosque Dome */}
            <path d="M32 16C24 22 22 28 22 36H42C42 28 40 22 32 16Z" fill="#0D9488" />
            <path d="M18 36H46V48H18V36Z" fill="#14B8A6" />
            {/* Arch door */}
            <path d="M28 48V42C28 39.8 29.8 38 32 38C34.2 38 36 39.8 36 42V48H28Z" fill="#FEF08A" />

            {/* Crescent Star on Top */}
            <path d="M32 10C30.5 10 29.2 11.2 29.2 12.8C29.2 14.4 30.5 15.6 32 15.6C33.2 15.6 34.2 14.8 34.6 13.8C34 14 33.2 14 32.6 13.6C32 13.2 31.8 12.4 32 11.8C32.2 11.2 32.8 10.8 33.6 10.8C33.1 10.3 32.6 10 32 10Z" fill="#F59E0B" />

            {/* Minaret on side */}
            <rect x="46" y="24" width="6" height="24" rx="1" fill="#0D9488" />
            <path d="M46 24L49 18L52 24H46Z" fill="#F59E0B" />

            {/* Sparkles */}
            <path d="M10 14L11.5 10L13 14L17 15.5L13 17L11.5 21L10 17L6 15.5L10 14Z" fill="#F472B6" />
            <path d="M14 44L15 41L16 44L19 45L16 46L15 49L14 46L11 45L14 44Z" fill="#FBBF24" />
          </svg>
        );

      default:
        return (
          <div className="w-full h-full rounded-2xl bg-indigo-500 flex items-center justify-center text-white font-black text-xl">
            📚
          </div>
        );
    }
  };

  return (
    <div className={`inline-flex items-center justify-center shrink-0 ${dim} ${className}`}>
      {renderSvg()}
    </div>
  );
};
