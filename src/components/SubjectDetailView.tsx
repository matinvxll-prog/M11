import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Flame,
  Gem,
  Trophy,
  Star,
  Lock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Home,
  Map,
  Gamepad2,
  User,
  CheckCircle2,
  Play,
  FileText,
  Calendar,
  Clock,
  Filter,
  Search,
  Award,
  BookCheck,
  HelpCircle,
  Video,
  Volume2,
  X,
  PlayCircle,
  Maximize2,
  Minimize2
} from "lucide-react";
import { Language, Subject, UserProfile } from "../types";
import { getLocalizedText } from "../utils/i18n";

import mathMascot from "../assets/images/math_mascot_1785970327866.jpg";
import chemMascot from "../assets/images/chemistry_mascot_1785970339483.jpg";
import phyMascot from "../assets/images/physics_mascot_1785970349601.jpg";
import bioMascot from "../assets/images/biology_mascot_1785970360815.jpg";
import kurMascot from "../assets/images/kurdish_mascot_1785970374665.jpg";
import engMascot from "../assets/images/english_mascot_1785970385553.jpg";
import araMascot from "../assets/images/arabic_mascot_1785970395130.jpg";
import relMascot from "../assets/images/religion_mascot_1785970406533.jpg";
import islandBg from "../assets/images/ISLAND.png";
import islandKurdBg from "../assets/images/ISLAND KURD.png";
import scrollIslandImg from "../assets/images/gamified_scroll_quill_1786053985886.jpg";
import purpleMascotImg from "../assets/images/purple_mascot_1785415026355.jpg";
import studentOwlImg from "../assets/images/degel_qutabi_owl_mascot_1785171720218.jpg";
import { WoodenArchBridge } from "./WoodenArchBridge";

// Purple Gift Box SVG with Orange Ribbon & Bow matching the user image
const PurpleGiftBoxSVG: React.FC<{ size?: number; isOpen?: boolean }> = ({ size = 64, isOpen = false }) => {
  return (
    <div className="relative flex items-center justify-center">
      {isOpen && (
        <div className="absolute -top-12 inset-x-0 flex justify-center items-center pointer-events-none z-30">
          <span className="animate-ping text-xl absolute -top-4 -left-4">✨</span>
          <span className="animate-bounce text-2xl absolute -top-10 left-2">🌟</span>
          <span className="animate-ping text-xl absolute -top-6 right-2">🎉</span>
          <span className="animate-pulse text-xl absolute -top-2 -right-4">💎</span>
        </div>
      )}
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl filter">
        <defs>
          <linearGradient id="boxBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
          <linearGradient id="boxLidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
          <linearGradient id="ribbonOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="ribbonYellowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Box Shadow on ground */}
        <ellipse cx="50" cy="92" rx="36" ry="7" fill="#000000" opacity="0.25" className="blur-xs" />

        {/* Interior Light Beam when opened */}
        {isOpen && (
          <ellipse cx="50" cy="42" rx="25" ry="10" fill="#fde047" className="blur-sm opacity-90 animate-pulse" />
        )}

        {/* Main Purple Box Body */}
        <rect x="20" y="42" width="60" height="46" rx="8" fill="url(#boxBodyGrad)" stroke="#581c87" strokeWidth="2" />

        {/* Vertical Orange Ribbon on Box Body */}
        <rect x="42" y="42" width="16" height="46" fill="url(#ribbonOrangeGrad)" />
        <rect x="47" y="42" width="6" height="46" fill="url(#ribbonYellowGrad)" opacity="0.6" />

        {/* Animated Lid & Ribbon Bow */}
        <g className={`transition-all duration-500 origin-bottom-right ${isOpen ? "-translate-y-10 -rotate-25 scale-105" : ""}`}>
          {/* Box Lid */}
          <rect x="16" y="32" width="68" height="14" rx="4" fill="url(#boxLidGrad)" stroke="#581c87" strokeWidth="2" />
          <rect x="42" y="32" width="16" height="14" fill="url(#ribbonOrangeGrad)" />

          {/* Ribbon Bow Loops on top */}
          <path d="M 50 32 C 35 10, 18 18, 36 32 Z" fill="url(#ribbonOrangeGrad)" stroke="#c2410c" strokeWidth="1.5" />
          <path d="M 48 30 C 38 16, 26 21, 38 30 Z" fill="url(#ribbonYellowGrad)" opacity="0.7" />

          <path d="M 50 32 C 65 10, 82 18, 64 32 Z" fill="url(#ribbonOrangeGrad)" stroke="#c2410c" strokeWidth="1.5" />
          <path d="M 52 30 C 62 16, 74 21, 62 30 Z" fill="url(#ribbonYellowGrad)" opacity="0.7" />

          {/* Bow Center Knot */}
          <rect x="44" y="27" width="12" height="8" rx="3" fill="url(#ribbonYellowGrad)" stroke="#c2410c" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
};

// Pure Code SVG Avatar for Teacher Mascot (3D Purple Hooded Mascot)
export const PureTeacherCharacter: React.FC<{ size?: number; isWaving?: boolean }> = ({ size = 64, isWaving = false }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-xl filter"
    >
      <defs>
        <radialGradient id="teacherBodyGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </radialGradient>
        <linearGradient id="teacherMaskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f3e8ff" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="50" cy="92" rx="28" ry="6" fill="#000000" opacity="0.25" className="blur-xs" />

      {/* Antenna */}
      <path d="M 50 25 Q 50 12, 50 8" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="7" r="5" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" />

      {/* Left Arm */}
      <ellipse cx="20" cy="56" rx="8" ry="14" fill="#7c3aed" transform="rotate(-25 20 56)" />

      {/* Right Arm */}
      <ellipse
        cx="80"
        cy={isWaving ? "46" : "56"}
        rx="8"
        ry="14"
        fill="#7c3aed"
        transform={isWaving ? "rotate(45 80 46)" : "rotate(25 80 56)"}
      />

      {/* Body */}
      <ellipse cx="50" cy="58" rx="32" ry="34" fill="url(#teacherBodyGrad)" />

      {/* Feet */}
      <ellipse cx="38" cy="88" rx="8" ry="6" fill="#581c87" />
      <ellipse cx="62" cy="88" rx="8" ry="6" fill="#581c87" />

      {/* Face Mask */}
      <ellipse cx="50" cy="52" rx="22" ry="17" fill="url(#teacherMaskGrad)" stroke="#d8b4fe" strokeWidth="1" />

      {/* Happy Eyes */}
      <path d="M 39 50 Q 43 43, 47 50" stroke="#3b0764" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 53 50 Q 57 43, 61 50" stroke="#3b0764" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Rosy Cheeks */}
      <circle cx="36" cy="55" r="3.5" fill="#f472b6" opacity="0.8" />
      <circle cx="64" cy="55" r="3.5" fill="#f472b6" opacity="0.8" />

      {/* Smile */}
      <path d="M 45 56 Q 50 60, 55 56" stroke="#3b0764" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
};

// Pure Code SVG Avatar for Student Mascot (3D Emerald Green Mascot with Graduation Cap)
export const PureStudentCharacter: React.FC<{ size?: number }> = ({ size = 64 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-xl filter"
    >
      <defs>
        <radialGradient id="studentBodyGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </radialGradient>
        <linearGradient id="studentMaskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ecfdf5" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="50" cy="92" rx="26" ry="6" fill="#000000" opacity="0.25" className="blur-xs" />

      {/* Emerald Body */}
      <ellipse cx="50" cy="60" rx="30" ry="30" fill="url(#studentBodyGrad)" />

      {/* Feet */}
      <ellipse cx="38" cy="88" rx="8" ry="5" fill="#064e3b" />
      <ellipse cx="62" cy="88" rx="8" ry="5" fill="#064e3b" />

      {/* Face Mask */}
      <ellipse cx="50" cy="54" rx="20" ry="15" fill="url(#studentMaskGrad)" stroke="#a7f3d0" strokeWidth="1" />

      {/* Eyes */}
      <circle cx="42" cy="52" r="4.5" fill="#064e3b" />
      <circle cx="58" cy="52" r="4.5" fill="#064e3b" />
      <circle cx="43.5" cy="50.5" r="1.5" fill="#ffffff" />
      <circle cx="59.5" cy="50.5" r="1.5" fill="#ffffff" />

      {/* Cheeks */}
      <circle cx="36" cy="56" r="3" fill="#f43f5e" opacity="0.6" />
      <circle cx="64" cy="56" r="3" fill="#f43f5e" opacity="0.6" />

      {/* Smile */}
      <path d="M 44 56 Q 50 62, 56 56" stroke="#064e3b" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Graduation Cap */}
      <path d="M 36 26 Q 50 22, 64 26 L 62 32 Q 50 35, 38 32 Z" fill="#1e1b4b" stroke="#312e81" strokeWidth="1" />
      <polygon points="50,12 78,20 50,28 22,20" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="2" />
      <circle cx="50" cy="20" r="2" fill="#fbbf24" />
      <path d="M 50 20 Q 62 21, 72 28 L 74 36" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      <circle cx="74" cy="37" r="2.5" fill="#f59e0b" />
    </svg>
  );
};

// Interactive Bouncing Mascot Animation with Squash & Stretch physics
export const BouncingMascot: React.FC<{
  type?: "teacher" | "student";
  size?: number;
  className?: string;
  isWaving?: boolean;
  interactive?: boolean;
  autoBounce?: boolean;
}> = ({ type = "teacher", size = 110, className = "", isWaving = true, interactive = true, autoBounce = true }) => {
  const [isTapped, setIsTapped] = useState(false);

  const handleTap = () => {
    if (!interactive || isTapped) return;
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 800);
  };

  return (
    <div
      onClick={handleTap}
      className={`relative inline-flex flex-col items-center justify-center cursor-pointer select-none ${className}`}
    >
      {/* Bouncing Mascot Wrapper with Squash & Stretch */}
      <motion.div
        animate={
          isTapped
            ? {
                y: [0, -60, 5, -25, 0],
                scaleY: [1, 1.35, 0.75, 1.15, 0.9, 1],
                scaleX: [1, 0.75, 1.3, 0.88, 1.08, 1],
                rotate: [0, -8, 8, -4, 0],
              }
            : autoBounce
            ? {
                y: [0, -32, 0, -12, 0],
                scaleY: [1, 1.22, 0.82, 1.08, 0.94, 1],
                scaleX: [1, 0.82, 1.2, 0.94, 1.05, 1],
              }
            : {}
        }
        transition={{
          repeat: autoBounce && !isTapped ? Infinity : 0,
          repeatDelay: 0.3,
          duration: isTapped ? 0.75 : 1.6,
          ease: "easeInOut",
        }}
        className="relative z-10 filter drop-shadow-[0_16px_24px_rgba(124,58,237,0.45)]"
      >
        {type === "teacher" ? (
          <PureTeacherCharacter size={size} isWaving={isWaving} />
        ) : (
          <PureStudentCharacter size={size} />
        )}

        {/* Tap Sparkles */}
        {isTapped && (
          <>
            <motion.span
              initial={{ scale: 0, opacity: 1, y: 0 }}
              animate={{ scale: 1.5, opacity: 0, y: -40, x: -25 }}
              transition={{ duration: 0.6 }}
              className="absolute -top-4 left-0 text-2xl"
            >
              ✨
            </motion.span>
            <motion.span
              initial={{ scale: 0, opacity: 1, y: 0 }}
              animate={{ scale: 1.5, opacity: 0, y: -45, x: 25 }}
              transition={{ duration: 0.6 }}
              className="absolute -top-4 right-0 text-2xl"
            >
              🌟
            </motion.span>
          </>
        )}
      </motion.div>

      {/* Dynamic Ground Shadow that expands & shrinks during bounce */}
      <motion.div
        animate={
          isTapped
            ? {
                scaleX: [1, 0.4, 1.4, 0.7, 1],
                opacity: [0.35, 0.1, 0.5, 0.25, 0.35],
              }
            : autoBounce
            ? {
                scaleX: [1, 0.5, 1.25, 0.75, 1],
                opacity: [0.35, 0.12, 0.45, 0.2, 0.35],
              }
            : {}
        }
        transition={{
          repeat: autoBounce && !isTapped ? Infinity : 0,
          repeatDelay: 0.3,
          duration: isTapped ? 0.75 : 1.6,
          ease: "easeInOut",
        }}
        style={{ width: size * 0.7, height: 12 }}
        className="bg-purple-950/40 rounded-full blur-xs -mt-2 z-0"
      />
    </div>
  );
};

export const HoldingHandsDuoCode: React.FC<{
  size?: "sm" | "md" | "lg";
  walking?: boolean;
  userName?: string;
}> = ({ size = "md", walking = false, userName }) => {
  const teacherSize = size === "sm" ? 46 : size === "lg" ? 80 : 64;
  const studentSize = size === "sm" ? 46 : size === "lg" ? 80 : 64;

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        animate={
          walking
            ? {
                x: [-4, 4, -4],
                y: [0, -6, 0],
                rotate: [-2, 2, -2],
              }
            : {
                y: [0, -4, 0],
              }
        }
        transition={{
          duration: walking ? 0.4 : 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`flex items-center justify-center relative ${
          size === "sm" ? "gap-3 sm:gap-4" : "gap-5 sm:gap-7"
        }`}
      >
        {/* Teacher Mascot */}
        <div className="relative z-10 flex flex-col items-center">
          <PureTeacherCharacter size={teacherSize} isWaving={walking} />
          <span className="text-[10px] sm:text-[11px] font-black text-purple-200 mt-1 bg-purple-950/80 px-2 py-0.5 rounded-full border border-purple-400/40 shadow-sm whitespace-nowrap">
            مامۆستا 💜
          </span>
        </div>

        {/* Green Student Mascot */}
        <div className="relative z-10 flex flex-col items-center">
          <PureStudentCharacter size={studentSize} />
          <span className="text-[10px] sm:text-[11px] font-black text-emerald-200 mt-1 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-400/40 shadow-sm whitespace-nowrap">
            {userName || "متین"} 🎓
          </span>
        </div>
      </motion.div>
    </div>
  );
};

// Pure Code SVG Grass Patch Component (Static Grass & Flowers)
const PureSvgGrassPatch: React.FC<{ size?: "sm" | "md" | "lg" }> = ({ size = "md" }) => {
  const scale = size === "sm" ? 0.75 : size === "lg" ? 1.25 : 1.0;
  return (
    <div
      className="relative flex items-center justify-center select-none pointer-events-none opacity-90"
      style={{ transform: `scale(${scale})` }}
    >
      <svg width="60" height="32" viewBox="0 0 60 32" className="overflow-visible">
        {/* Soft Shadow Ground */}
        <ellipse cx="30" cy="26" rx="26" ry="5" fill="#15803d" opacity="0.3" />
        
        {/* Grass Blades */}
        <path d="M 6 26 Q 2 12, 0 4 Q 10 14, 14 26 Z" fill="#22c55e" />
        <path d="M 12 26 Q 16 8, 20 2 Q 22 12, 24 26 Z" fill="#4ade80" />
        <path d="M 22 26 Q 28 6, 30 0 Q 34 10, 36 26 Z" fill="#16a34a" />
        <path d="M 32 26 Q 38 8, 42 3 Q 44 14, 46 26 Z" fill="#22c55e" />
        <path d="M 44 26 Q 52 10, 58 6 Q 54 18, 52 26 Z" fill="#15803d" />

        {/* Small Wild Flowers */}
        <circle cx="20" cy="10" r="2.5" fill="#fef08a" />
        <circle cx="20" cy="10" r="1.2" fill="#eab308" />
        <circle cx="42" cy="12" r="2.5" fill="#f43f5e" />
        <circle cx="42" cy="12" r="1.2" fill="#fef08a" />
      </svg>
    </div>
  );
};

// Pure Code SVG Nature Tree Component (Static, Non-moving, Varied Types)
const PureSvgNatureTree: React.FC<{
  variant?: "tree" | "flower-bush" | "apple-tree" | "autumn-tree" | "pine-tree" | "pink-blossom";
}> = ({ variant = "tree" }) => {
  return (
    <div
      className="relative flex flex-col items-center justify-end select-none pointer-events-none drop-shadow-lg"
    >
      {variant === "flower-bush" ? (
        <svg width="84" height="64" viewBox="0 0 84 64" className="overflow-visible">
          <defs>
            <linearGradient id="bushGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <radialGradient id="flowerCoreYellow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#eab308" />
            </radialGradient>
          </defs>

          {/* Grass Base */}
          <path d="M 8 56 Q 18 38, 22 56 Q 30 35, 38 56 Q 50 38, 56 56 Q 66 40, 74 56 Z" fill="#10b981" />
          
          {/* Bush Spheres */}
          <circle cx="28" cy="40" r="18" fill="url(#bushGrad1)" />
          <circle cx="54" cy="38" r="20" fill="url(#bushGrad1)" />
          <circle cx="41" cy="28" r="20" fill="#10b981" />

          {/* Code SVG Pink Flower 1 */}
          <g transform="translate(32, 24)">
            <circle cx="-4" cy="0" r="3.5" fill="#f472b6" />
            <circle cx="4" cy="0" r="3.5" fill="#f472b6" />
            <circle cx="0" cy="-4" r="3.5" fill="#f472b6" />
            <circle cx="0" cy="4" r="3.5" fill="#f472b6" />
            <circle cx="0" cy="0" r="3" fill="url(#flowerCoreYellow)" />
          </g>

          {/* Code SVG Rose Flower 2 */}
          <g transform="translate(54, 30)">
            <circle cx="-4" cy="0" r="3.5" fill="#fb7185" />
            <circle cx="4" cy="0" r="3.5" fill="#fb7185" />
            <circle cx="0" cy="-4" r="3.5" fill="#fb7185" />
            <circle cx="0" cy="4" r="3.5" fill="#fb7185" />
            <circle cx="0" cy="0" r="3" fill="url(#flowerCoreYellow)" />
          </g>
        </svg>
      ) : variant === "apple-tree" ? (
        <svg width="96" height="116" viewBox="0 0 96 116" className="overflow-visible">
          <defs>
            <radialGradient id="appleLeafGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="50%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#14532d" />
            </radialGradient>
          </defs>
          <ellipse cx="48" cy="106" rx="38" ry="8" fill="#15803d" opacity="0.4" />
          <path d="M 40 64 Q 38 86, 32 106 L 64 106 Q 58 86, 56 64 Z" fill="#78350f" />
          <circle cx="28" cy="48" r="24" fill="url(#appleLeafGrad)" />
          <circle cx="68" cy="48" r="24" fill="url(#appleLeafGrad)" />
          <circle cx="48" cy="30" r="28" fill="url(#appleLeafGrad)" />
          {/* Red Apples */}
          <circle cx="32" cy="28" r="5" fill="#ef4444" stroke="#991b1b" strokeWidth="0.8" />
          <circle cx="33" cy="27" r="1.5" fill="#fca5a5" />
          <circle cx="64" cy="36" r="5" fill="#ef4444" stroke="#991b1b" strokeWidth="0.8" />
          <circle cx="65" cy="35" r="1.5" fill="#fca5a5" />
          <circle cx="46" cy="46" r="5" fill="#ef4444" stroke="#991b1b" strokeWidth="0.8" />
          <circle cx="47" cy="45" r="1.5" fill="#fca5a5" />
          <circle cx="28" cy="56" r="4.5" fill="#ef4444" stroke="#991b1b" strokeWidth="0.8" />
        </svg>
      ) : variant === "autumn-tree" ? (
        <svg width="96" height="116" viewBox="0 0 96 116" className="overflow-visible">
          <defs>
            <radialGradient id="autumnLeafGrad1" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </radialGradient>
            <radialGradient id="autumnLeafGrad2" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fca5a5" />
              <stop offset="50%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#9a3412" />
            </radialGradient>
          </defs>
          <ellipse cx="48" cy="106" rx="38" ry="8" fill="#b45309" opacity="0.35" />
          <path d="M 40 64 Q 38 86, 32 106 L 64 106 Q 58 86, 56 64 Z" fill="#451a03" />
          <circle cx="28" cy="48" r="24" fill="url(#autumnLeafGrad2)" />
          <circle cx="68" cy="48" r="24" fill="url(#autumnLeafGrad2)" />
          <circle cx="48" cy="30" r="28" fill="url(#autumnLeafGrad1)" />
        </svg>
      ) : variant === "pine-tree" ? (
        <svg width="90" height="120" viewBox="0 0 90 120" className="overflow-visible">
          <defs>
            <linearGradient id="pineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#064e3b" />
            </linearGradient>
          </defs>
          <ellipse cx="45" cy="112" rx="32" ry="7" fill="#064e3b" opacity="0.4" />
          <rect x="39" y="80" width="12" height="32" rx="2" fill="#451a03" />
          {/* Pine Layers */}
          <polygon points="45,12 80,52 10,52" fill="url(#pineGrad)" />
          <polygon points="45,36 84,76 6,76" fill="url(#pineGrad)" />
          <polygon points="45,58 88,96 2,96" fill="url(#pineGrad)" />
        </svg>
      ) : variant === "pink-blossom" ? (
        <svg width="96" height="116" viewBox="0 0 96 116" className="overflow-visible">
          <defs>
            <radialGradient id="pinkBlossomGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fbcfe8" />
              <stop offset="50%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#be185d" />
            </radialGradient>
          </defs>
          <ellipse cx="48" cy="106" rx="38" ry="8" fill="#be185d" opacity="0.3" />
          <path d="M 40 64 Q 38 86, 32 106 L 64 106 Q 58 86, 56 64 Z" fill="#581c87" />
          <circle cx="28" cy="48" r="24" fill="url(#pinkBlossomGrad)" />
          <circle cx="68" cy="48" r="24" fill="url(#pinkBlossomGrad)" />
          <circle cx="48" cy="30" r="28" fill="url(#pinkBlossomGrad)" />
          {/* Floating Petal Accents */}
          <circle cx="34" cy="28" r="3" fill="#ffffff" opacity="0.8" />
          <circle cx="62" cy="38" r="3" fill="#ffffff" opacity="0.8" />
          <circle cx="48" cy="48" r="3" fill="#fde047" opacity="0.9" />
        </svg>
      ) : (
        <svg width="96" height="116" viewBox="0 0 96 116" className="overflow-visible">
          <defs>
            <linearGradient id="treeTrunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="50%" stopColor="#a16207" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
            <radialGradient id="treeLeafGrad1" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#a7f3d0" />
              <stop offset="40%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </radialGradient>
            <radialGradient id="treeLeafGrad2" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#064e3b" />
            </radialGradient>
            <radialGradient id="flowerCoreYellow2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#eab308" />
            </radialGradient>
          </defs>

          {/* Grass Base Ground */}
          <ellipse cx="48" cy="106" rx="38" ry="8" fill="#059669" opacity="0.4" />
          <path d="M 16 106 Q 24 92, 28 106 Q 38 88, 44 106 Q 56 90, 60 106 Q 72 92, 78 106 Z" fill="#10b981" />

          {/* Tree Trunk */}
          <path d="M 40 64 Q 38 86, 32 106 L 64 106 Q 58 86, 56 64 Z" fill="url(#treeTrunkGrad)" />
          {/* Trunk Branch */}
          <path d="M 42 70 Q 30 54, 24 48 M 54 70 Q 66 54, 72 48" stroke="#78350f" strokeWidth="4.5" strokeLinecap="round" />

          {/* Multi-layered Leaf Foliage */}
          <circle cx="30" cy="48" r="24" fill="url(#treeLeafGrad2)" />
          <circle cx="66" cy="48" r="24" fill="url(#treeLeafGrad2)" />
          <circle cx="48" cy="32" r="28" fill="url(#treeLeafGrad1)" />

          {/* Code Flowers on Canopy */}
          <g transform="translate(34, 28)">
            <circle cx="-3.5" cy="0" r="3" fill="#f472b6" />
            <circle cx="3.5" cy="0" r="3" fill="#f472b6" />
            <circle cx="0" cy="-3.5" r="3" fill="#f472b6" />
            <circle cx="0" cy="3.5" r="3" fill="#f472b6" />
            <circle cx="0" cy="0" r="2.5" fill="url(#flowerCoreYellow2)" />
          </g>
          <g transform="translate(60, 36)">
            <circle cx="-3.5" cy="0" r="3" fill="#fb7185" />
            <circle cx="3.5" cy="0" r="3" fill="#fb7185" />
            <circle cx="0" cy="-3.5" r="3" fill="#fb7185" />
            <circle cx="0" cy="3.5" r="3" fill="#fb7185" />
            <circle cx="0" cy="0" r="2.5" fill="url(#flowerCoreYellow2)" />
          </g>
        </svg>
      )}
    </div>
  );
};

// Pure Code Fluttering Animated Butterfly
const AnimatedButterfly: React.FC<{ color?: string }> = ({ color = "#ec4899" }) => (
  <motion.div
    animate={{
      x: [0, 8, -6, 0],
      y: [0, -10, -4, 0],
      rotate: [-5, 10, -8, -5],
    }}
    transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
    className="select-none pointer-events-none drop-shadow-sm"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" className="overflow-visible">
      {/* Left Wing */}
      <motion.path
        animate={{ scaleX: [1, 0.2, 1] }}
        transition={{ repeat: Infinity, duration: 0.35, ease: "easeInOut" }}
        d="M 12 12 C 4 2, 0 10, 12 14 C 2 16, 6 22, 12 15 Z"
        fill={color}
        opacity="0.9"
      />
      {/* Right Wing */}
      <motion.path
        animate={{ scaleX: [1, 0.2, 1] }}
        transition={{ repeat: Infinity, duration: 0.35, ease: "easeInOut" }}
        d="M 12 12 C 20 2, 24 10, 12 14 C 22 16, 18 22, 12 15 Z"
        fill={color}
        opacity="0.9"
      />
      {/* Body */}
      <line x1="12" y1="8" x2="12" y2="17" stroke="#1e1b4b" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="7" r="1" fill="#1e1b4b" />
    </svg>
  </motion.div>
);

// Pure Code Isometric 3D Letter Cube Component
const Pure3DLetterCube: React.FC<{
  letter: string;
  colorScheme?: "purple" | "pink" | "blue" | "emerald" | "amber";
  size?: number;
}> = ({ letter, colorScheme = "purple", size = 56 }) => {
  const colors = {
    purple: { top: "#c084fc", front: "#9333ea", side: "#6b21a8", border: "#f3e8ff", highlight: "#e9d5ff" },
    pink: { top: "#f472b6", front: "#db2777", side: "#9d174d", border: "#fce7f3", highlight: "#fbcfe8" },
    blue: { top: "#38bdf8", front: "#0284c7", side: "#075985", border: "#e0f2fe", highlight: "#bae6fd" },
    emerald: { top: "#34d399", front: "#059669", side: "#064e3b", border: "#ecfdf5", highlight: "#a7f3d0" },
    amber: { top: "#fbbf24", front: "#d97706", side: "#78350f", border: "#fffbeb", highlight: "#fef08a" },
  }[colorScheme];

  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 100 115" className="drop-shadow-2xl overflow-visible select-none">
      {/* 3D Isometric Cube Top Face */}
      <polygon
        points="50,10 90,30 50,50 10,30"
        fill={colors.top}
        stroke={colors.border}
        strokeWidth="2.5"
      />

      {/* Top Face Inner Inset Highlight */}
      <polygon
        points="50,15 82,31 50,47 18,31"
        fill="none"
        stroke={colors.highlight}
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* 3D Isometric Cube Front/Left Face */}
      <polygon
        points="10,30 50,50 50,100 10,80"
        fill={colors.front}
        stroke={colors.border}
        strokeWidth="2.5"
      />

      {/* 3D Isometric Cube Side/Right Face */}
      <polygon
        points="50,50 90,30 90,80 50,100"
        fill={colors.side}
        stroke={colors.border}
        strokeWidth="2.5"
      />

      {/* Authentic Kurdish Letter Printed Crisp in Pure White on Front Face */}
      <text
        x="30"
        y="70"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ffffff"
        fontSize="28"
        fontWeight="900"
        style={{ fontFamily: "Noto Sans Arabic, sans-serif" }}
        filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.5))"
      >
        {letter}
      </text>

      {/* Kurdish Letter Printed on Side Face for 3D Perspective Depth */}
      <text
        x="70"
        y="68"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ffffff"
        fontSize="22"
        fontWeight="900"
        opacity="0.85"
        style={{ fontFamily: "Noto Sans Arabic, sans-serif" }}
      >
        {letter}
      </text>
    </svg>
  );
};

// Pure Code Stacked 3D Kurdish Letter Blocks Pyramid
const Pure3DLetterCubePyramid: React.FC<{
  letters: [string, string, string];
}> = ({ letters }) => {
  return (
    <div className="relative flex items-center justify-center select-none drop-shadow-xl">
      {/* 3D Stacked Cubes Pyramid */}
      <div className="relative flex flex-col items-center">
        {/* Top Cube */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="z-20 -mb-6"
        >
          <Pure3DLetterCube letter={letters[2]} colorScheme="purple" size={50} />
        </motion.div>

        {/* Bottom 2 Cubes Side-by-Side */}
        <div className="flex items-center -space-x-2 z-10">
          <Pure3DLetterCube letter={letters[0]} colorScheme="blue" size={46} />
          <Pure3DLetterCube letter={letters[1]} colorScheme="pink" size={46} />
        </div>
      </div>
    </div>
  );
};

// Pure Code 3D Gift Box Component with Golden Bow, Ribbons, Sparkles, and Unlocking State
const PureCodedGiftBox: React.FC<{
  isUnlocked?: boolean;
  size?: number;
}> = ({ isUnlocked = false, size = 68 }) => {
  return (
    <div className="relative flex flex-col items-center justify-center select-none drop-shadow-2xl">
      <svg width={size} height={size * 1.1} viewBox="0 0 100 110" className="overflow-visible">
        <defs>
          <linearGradient id="giftBoxFrontGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isUnlocked ? "#f59e0b" : "#dc2626"} />
            <stop offset="100%" stopColor={isUnlocked ? "#b45309" : "#991b1b"} />
          </linearGradient>
          <linearGradient id="giftBoxSideGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isUnlocked ? "#d97706" : "#b91c1c"} />
            <stop offset="100%" stopColor={isUnlocked ? "#78350f" : "#7f1d1d"} />
          </linearGradient>
          <linearGradient id="giftBoxTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isUnlocked ? "#fef08a" : "#fca5a5"} />
            <stop offset="100%" stopColor={isUnlocked ? "#f59e0b" : "#ef4444"} />
          </linearGradient>
          <linearGradient id="goldRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* Shadow Under Gift Box */}
        <ellipse cx="50" cy="102" rx="36" ry="7" fill="#0f172a" opacity="0.35" />

        {/* 3D Box Base - Left Front Face */}
        <polygon points="12,50 50,70 50,98 12,78" fill="url(#giftBoxFrontGrad)" stroke="#fef08a" strokeWidth="1.5" />

        {/* 3D Box Base - Right Side Face */}
        <polygon points="50,70 88,50 88,78 50,98" fill="url(#giftBoxSideGrad)" stroke="#fef08a" strokeWidth="1.5" />

        {/* Vertical Ribbon Front */}
        <polygon points="28,58 34,61 34,89 28,86" fill="url(#goldRibbonGrad)" />
        {/* Vertical Ribbon Side */}
        <polygon points="66,58 72,55 72,83 66,86" fill="url(#goldRibbonGrad)" opacity="0.85" />

        {/* 3D Top Lid */}
        <g className={isUnlocked ? "animate-bounce" : ""} style={{ animationDuration: "2s" }}>
          {/* Lid Left Front */}
          <polygon points="8,40 50,62 50,71 8,49" fill="url(#giftBoxFrontGrad)" stroke="#fff" strokeWidth="1.5" />
          {/* Lid Right Side */}
          <polygon points="50,62 92,40 92,49 50,71" fill="url(#giftBoxSideGrad)" stroke="#fff" strokeWidth="1.5" />
          {/* Lid Top Face */}
          <polygon points="50,22 92,40 50,62 8,40" fill="url(#giftBoxTopGrad)" stroke="#fff" strokeWidth="2" />

          {/* Cross Ribbons on Top Lid */}
          <polygon points="26,31 32,34 74,15 68,12" fill="url(#goldRibbonGrad)" />
          <polygon points="29,49 35,52 71,16 65,13" fill="url(#goldRibbonGrad)" />

          {/* 3D Golden Ribbon Bow Loops */}
          <path d="M 50 32 C 32 16, 22 28, 46 33 Z" fill="url(#goldRibbonGrad)" stroke="#78350f" strokeWidth="1" />
          <path d="M 50 32 C 68 16, 78 28, 54 33 Z" fill="url(#goldRibbonGrad)" stroke="#78350f" strokeWidth="1" />
          <path d="M 50 32 C 38 8, 50 4, 50 30 Z" fill="url(#goldRibbonGrad)" stroke="#78350f" strokeWidth="1" />
          <path d="M 50 32 C 62 8, 50 4, 50 30 Z" fill="url(#goldRibbonGrad)" stroke="#78350f" strokeWidth="1" />
          <circle cx="50" cy="32" r="5" fill="#fef08a" stroke="#d97706" strokeWidth="1.5" />
        </g>

        {/* Lock or Unlock Badge */}
        {!isUnlocked ? (
          <g transform="translate(50, 60)">
            <circle cx="0" cy="0" r="12" fill="#0f172a" opacity="0.9" stroke="#fbbf24" strokeWidth="1.5" />
            <path d="M -4 -1 L -4 -4 C -4 -7, 4 -7, 4 -4 L 4 -1 M -5 -1 L 5 -1 L 5 5 L -5 5 Z" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
          </g>
        ) : (
          <g transform="translate(82, 20)">
            <circle cx="0" cy="0" r="11" fill="#10b981" stroke="#fff" strokeWidth="2" />
            <path d="M -4 0 L -1 3 L 5 -3" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </svg>
    </div>
  );
};

// Pure Code Animated Calligraphy Scroll with Quill Pen
const KurdishScrollQuill: React.FC = () => (
  <motion.div
    animate={{ y: [0, -6, 0] }}
    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    className="relative flex flex-col items-center select-none pointer-events-none drop-shadow-xl"
  >
    <svg width="104" height="84" viewBox="0 0 104 84" className="overflow-visible">
      <defs>
        {/* Parchment Gradient */}
        <linearGradient id="scrollPaperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="60%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
        {/* Roll Handle Wood Gradient */}
        <linearGradient id="woodHandleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="50%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
        {/* Feather Quill Gradient */}
        <linearGradient id="quillFeatherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        {/* Ink Pot Glass Gradient */}
        <linearGradient id="inkPotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#312e81" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="52" cy="78" rx="42" ry="5" fill="#000000" opacity="0.14" />

      {/* Left Wooden Roller Handle */}
      <rect x="8" y="12" width="8" height="56" rx="4" fill="url(#woodHandleGrad)" stroke="#451a03" strokeWidth="1" />
      <circle cx="12" cy="10" r="5" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
      <circle cx="12" cy="70" r="5" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />

      {/* Right Wooden Roller Handle */}
      <rect x="88" y="12" width="8" height="56" rx="4" fill="url(#woodHandleGrad)" stroke="#451a03" strokeWidth="1" />
      <circle cx="92" cy="10" r="5" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
      <circle cx="92" cy="70" r="5" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />

      {/* Main Parchment Paper */}
      <rect x="14" y="16" width="76" height="48" rx="4" fill="url(#scrollPaperGrad)" stroke="#d97706" strokeWidth="1.5" />

      {/* Rolled paper ends for 3D depth */}
      <path d="M 14 16 Q 22 12, 14 64 Z" fill="#fde047" opacity="0.6" />
      <path d="M 90 16 Q 82 12, 90 64 Z" fill="#fde047" opacity="0.6" />

      {/* Corner Gold Ornament Dots */}
      <circle cx="20" cy="22" r="1.5" fill="#b45309" />
      <circle cx="84" cy="22" r="1.5" fill="#b45309" />
      <circle cx="20" cy="58" r="1.5" fill="#b45309" />
      <circle cx="84" cy="58" r="1.5" fill="#b45309" />

      {/* Kurdish Calligraphy Text (Clean, Centered & Unobstructed!) */}
      <text
        x="52"
        y="42"
        textAnchor="middle"
        fontSize="12"
        fontWeight="900"
        fill="#78350f"
        style={{ fontFamily: "Noto Sans Arabic, sans-serif" }}
      >
        زمانێ دایکێ
      </text>

      {/* Flourish underline */}
      <path d="M 38 48 Q 52 52, 66 48" fill="none" stroke="#d97706" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="52" cy="50" r="1.5" fill="#b45309" />

      {/* Ink Pot at bottom right */}
      <path d="M 74 54 L 84 54 L 86 64 L 72 64 Z" fill="url(#inkPotGrad)" stroke="#4338ca" strokeWidth="1" />
      <rect x="76" y="52" width="6" height="3" fill="#f59e0b" />

      {/* Animated Feather Quill Pen positioned safely to the side */}
      <motion.g
        animate={{ rotate: [0, 5, 0, -3, 0], y: [0, -2, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        style={{ transformOrigin: "78px 52px" }}
      >
        {/* Feather Spine */}
        <path d="M 94 8 Q 88 30, 77 53" fill="none" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
        {/* Feather Vane */}
        <path
          d="M 94 8 C 102 20, 88 36, 79 46 C 82 34, 90 22, 94 8 Z"
          fill="url(#quillFeatherGrad)"
          stroke="#b45309"
          strokeWidth="0.8"
        />
        {/* Pen Nib Tip */}
        <polygon points="77,53 75,57 78,55" fill="#1e293b" />
        {/* Golden Sparkle near nib */}
        <circle cx="73" cy="52" r="1.5" fill="#fbbf24" />
      </motion.g>
    </svg>
  </motion.div>
);

// Pure Code Kurdish Sun Emblem Stand with Rotating Rays
const KurdishSunEmblem: React.FC = () => (
  <div className="relative flex flex-col items-center select-none pointer-events-none drop-shadow-lg">
    <svg width="74" height="74" viewBox="0 0 74 74" className="overflow-visible">
      {/* Pedestal Base */}
      <ellipse cx="37" cy="66" rx="26" ry="6" fill="#047857" opacity="0.4" />
      <rect x="27" y="52" width="20" height="12" rx="3" fill="#15803d" stroke="#86efac" strokeWidth="1.5" />
      {/* Sun Core */}
      <circle cx="37" cy="30" r="16" fill="#f59e0b" stroke="#fef08a" strokeWidth="2" />
      {/* 21 Rotating Sun Rays */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        style={{ transformOrigin: "37px 30px" }}
      >
        {[...Array(21)].map((_, i) => {
          const angle = (i * 360) / 21;
          const rad = (angle * Math.PI) / 180;
          const x1 = 37 + 17 * Math.cos(rad);
          const y1 = 30 + 17 * Math.sin(rad);
          const x2 = 37 + 25 * Math.cos(rad);
          const y2 = 30 + 25 * Math.sin(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />;
        })}
      </motion.g>
    </svg>
  </div>
);

// Pure Code Kurdish Mountain Peak Component
const KurdishMountainPeak: React.FC = () => (
  <motion.div
    animate={{ y: [0, -3, 0] }}
    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
    className="relative flex flex-col items-center select-none pointer-events-none drop-shadow-md"
  >
    <svg width="84" height="68" viewBox="0 0 84 68" className="overflow-visible">
      <defs>
        <linearGradient id="mountGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>
      {/* Base Grass */}
      <ellipse cx="42" cy="62" rx="36" ry="6" fill="#10b981" opacity="0.5" />
      {/* Back Mountain */}
      <polygon points="56,60 76,26 84,60" fill="#334155" />
      <polygon points="76,26 80,36 72,36" fill="#f8fafc" />
      {/* Main Mountain */}
      <polygon points="12,60 42,12 72,60" fill="url(#mountGrad)" />
      {/* Snow Cap */}
      <polygon points="42,12 50,26 44,24 42,28 38,24 34,26" fill="#ffffff" />
      {/* Golden Sun rising behind Peak */}
      <motion.circle
        animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        cx="24"
        cy="20"
        r="10"
        fill="#fbbf24"
      />
    </svg>
  </motion.div>
);

// Pure Code Book & Golden Star Trophy Component
const KurdishOpenBookTrophy: React.FC = () => (
  <motion.div
    animate={{ y: [0, -6, 0] }}
    transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
    className="relative flex flex-col items-center select-none pointer-events-none drop-shadow-xl"
  >
    <svg width="90" height="84" viewBox="0 0 90 84" className="overflow-visible">
      <defs>
        <linearGradient id="bookCoverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="50%" stopColor="#312e81" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
        <linearGradient id="pageGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="pageGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fef08a" />
        </linearGradient>
        <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="goldStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Book Soft Shadow */}
      <ellipse cx="45" cy="78" rx="36" ry="6" fill="#000000" opacity="0.15" />

      {/* Outer Hardcover Base */}
      <path
        d="M 6 48 Q 26 40, 45 45 Q 64 40, 84 48 L 84 66 Q 64 58, 45 63 Q 26 58, 6 66 Z"
        fill="url(#bookCoverGrad)"
        stroke="#f59e0b"
        strokeWidth="1.5"
      />

      {/* Left Page Thickness Stack */}
      <path d="M 9 46 Q 26 39, 45 43 L 45 61 Q 26 57, 9 64 Z" fill="#fef9c3" opacity="0.7" />
      {/* Right Page Thickness Stack */}
      <path d="M 81 46 Q 64 39, 45 43 L 45 61 Q 64 57, 81 64 Z" fill="#fef9c3" opacity="0.7" />

      {/* Main Top Open Pages */}
      {/* Left Page */}
      <path d="M 11 44 Q 27 36, 45 42 L 45 59 Q 27 53, 11 61 Z" fill="url(#pageGradLeft)" stroke="#e2e8f0" strokeWidth="1" />
      {/* Right Page */}
      <path d="M 79 44 Q 63 36, 45 42 L 45 59 Q 63 53, 79 61 Z" fill="url(#pageGradRight)" stroke="#e2e8f0" strokeWidth="1" />

      {/* Spine Center Fold Line */}
      <line x1="45" y1="42" x2="45" y2="60" stroke="#cbd5e1" strokeWidth="2" />

      {/* Kurdish Calligraphy Lines on Pages */}
      <line x1="18" y1="48" x2="38" y2="45" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="52" x2="36" y2="49" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="52" y1="45" x2="72" y2="48" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="54" y1="49" x2="74" y2="52" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />

      {/* Red Ribbon Bookmark Hanging Down */}
      <path d="M 45 44 Q 48 56, 43 68 L 47 66 L 51 70 L 48 56 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="0.8" />

      {/* Floating Golden Star Trophy aura glow */}
      <circle cx="45" cy="22" r="18" fill="url(#starGlow)" />

      {/* Sparkle Dots around Star */}
      <circle cx="24" cy="16" r="2" fill="#fbbf24" />
      <circle cx="66" cy="14" r="1.5" fill="#fde047" />
      <circle cx="28" cy="28" r="1.5" fill="#ffffff" />
      <circle cx="62" cy="28" r="2" fill="#fbbf24" />

      {/* Golden Star Trophy floating above book spine */}
      <motion.g
        animate={{ rotate: [0, 6, 0, -6, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
        style={{ transformOrigin: "45px 22px" }}
      >
        <polygon
          points="45,6 49.5,16.5 61,18 52.5,25.5 55.5,37 45,30 34.5,37 37.5,25.5 29,18 40.5,16.5"
          fill="url(#goldStarGrad)"
          stroke="#b45309"
          strokeWidth="1.5"
        />
        {/* Star Inner Highlight */}
        <polygon
          points="45,10 48,17 56,18 50,23 52,31 45,26 38,31 40,23 34,18 42,17"
          fill="#ffffff"
          opacity="0.3"
        />
      </motion.g>
    </svg>
  </motion.div>
);

interface SubjectDetailViewProps {
  subject: Subject;
  language: Language;
  userName?: string;
  onBack: () => void;
  onStartQuiz: (chapterTitle: string) => void;
  user?: UserProfile;
  onOpenAiTutor?: () => void;
}

interface MapNode {
  id: number;
  number: number;
  titleKu: string;
  titleBadini: string;
  titleEn: string;
  status: "completed" | "current" | "locked";
  stars: number; // 0 to 3
  icon?: string;
  xOffset: string; // for S-curve positioning
  subtopicsKu?: string[];
  subtopicsBadini?: string[];
  subtopicsEn?: string[];
}

export const SubjectDetailView: React.FC<SubjectDetailViewProps> = ({
  subject,
  language,
  userName,
  onBack,
  onStartQuiz,
  user,
  onOpenAiTutor
}) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => setIsFullscreen(true));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => setIsFullscreen(false));
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const [activeSeason, setActiveSeason] = useState<1 | 2>(1);
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
  const [duoNodeId, setDuoNodeId] = useState<number>(2);
  const [isDuoWalking, setIsDuoWalking] = useState<boolean>(false);
  const [showGiftModal, setShowGiftModal] = useState<boolean>(false);
  const [isGiftOpening, setIsGiftOpening] = useState<boolean>(false);
  const [showBridgeLockNotice, setShowBridgeLockNotice] = useState<boolean>(false);
  const [giftClaimed, setGiftClaimed] = useState<boolean>(false);
  const [examViewTab, setExamViewTab] = useState<"years" | "chapters" | "quick">("years");
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>("all");
  const [mainViewMode, setMainViewMode] = useState<"explanations" | "map">("explanations");
  const [selectedVideoLesson, setSelectedVideoLesson] = useState<{
    title: string;
    chapterTitle: string;
    teacher: string;
    duration: string;
    videoUrl?: string;
  } | null>(null);
  const [selectedSummaryLesson, setSelectedSummaryLesson] = useState<{
    title: string;
    chapterTitle: string;
    summaryPoints: string[];
  } | null>(null);
  const [activeAudioLesson, setActiveAudioLesson] = useState<string | null>(null);

  const handleOpenRoadGift = () => {
    setIsGiftOpening(true);
    setTimeout(() => {
      setShowGiftModal(true);
      setIsGiftOpening(false);
    }, 500);
  };

  const level1Ref = useRef<HTMLDivElement>(null);

  // Instantly start at Level 1 (قوناخا ئێکێ) at the bottom on load or season change without sliding animation
  useLayoutEffect(() => {
    const scrollToLevel1 = () => {
      if (level1Ref.current) {
        level1Ref.current.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "center" });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" as ScrollBehavior });
      }
    };
    scrollToLevel1();
    // Re-verify after frame render to guarantee instant positioning
    const raf = requestAnimationFrame(scrollToLevel1);
    return () => cancelAnimationFrame(raf);
  }, [subject.id, activeSeason]);

  const handleMoveDuo = (targetNodeId: number) => {
    setIsDuoWalking(true);
    setDuoNodeId(targetNodeId);
    setTimeout(() => {
      setIsDuoWalking(false);
    }, 800);
  };

  // Helper mapping for subject metadata & mascots
  const getSubjectConfig = (id: string, season: 1 | 2 = 1) => {
    switch (id) {
      case "chemistry":
        return {
          mascot: chemMascot,
          titleKu: "کیمیا",
          titleEn: "Chemistry",
          roleTitle: "Chemist",
          level: "Lv.10",
          icon: "🧪",
          speech: "Let's explore Chemistry! ✨",
          nodes: [
            {
              id: 1,
              number: 1,
              titleKu: "پێشەکی",
              titleBadini: "پێشەکی",
              titleEn: "Introduction to Chemistry",
              status: "completed",
              stars: 1,
              xOffset: "0%",
              subtopicsKu: ["تایبەتمەندیێن ماددەیی", "پێکهاتەی ئەتۆمی", "کۆمەڵێن کیمیایی", "یاسایا پاراستنا بارستەیی"]
            },
            {
              id: 2,
              number: 2,
              titleKu: "ماددە و تایبەتمەندیەکانی",
              titleBadini: "ماددە و تایبەتمەندیەکانی",
              titleEn: "Matter and its Properties",
              status: "completed",
              stars: 3,
              xOffset: "22%",
              subtopicsKu: ["باری فیزیکی ماددەی", "تێکەڵە و ئاوێتە", "یاسایا بەربەستبوونی", "تڕانزستۆر و باری شل"]
            },
            {
              id: 3,
              number: 3,
              titleKu: "تائکتیبلی کیمیایی",
              titleBadini: "تائکتیبلی کیمیایی",
              titleEn: "Chemical Compounds",
              status: "current",
              stars: 2,
              xOffset: "-18%",
              subtopicsKu: ["بەستەرا ئایۆنی", "بەستەرا هەڤپشک", "بۆندێن هایدرۆجینی", "جیاوازی ئەلیکترۆنی"]
            },
            {
              id: 4,
              number: 4,
              titleKu: "ڕیاکشن و هاوسەنگی",
              titleBadini: "ڕیاکشن و هاوسەنگی",
              titleEn: "Chemical Reactions",
              status: "locked",
              stars: 0,
              xOffset: "20%",
              subtopicsKu: ["ڕیاکشنا هەلوەشینێ", "ڕیاکشنا یەکبوونی", "هاوسەنگیا کیمیایی", "کاتالیست و خێرایی"]
            },
            {
              id: 5,
              number: 5,
              titleKu: "کینتیک و ئێنێرژی",
              titleBadini: "کینتیک و ئێنێرژی",
              titleEn: "Kinetics and Energy",
              status: "locked",
              stars: 0,
              xOffset: "-20%",
              subtopicsKu: ["ئێنتاڵپی و گەرمی", "یاسای هەس (Hess)", "تێکچوونا بزووتنێ", "ڕێژەیا کارلێکێ"]
            },
            {
              id: 6,
              number: 6,
              titleKu: "کیمیای تەواوی",
              titleBadini: "کیمیای تەواوی",
              titleEn: "Organic Chemistry",
              status: "locked",
              stars: 0,
              xOffset: "0%",
              subtopicsKu: ["هایدرۆکاربۆنێن تێرکری", "ئالکان و ئالکین", "کۆمەڵێن کاراکەر", "بەرهەمێن ئەندامی"]
            }
          ]
        };
      case "math":
        return {
          mascot: mathMascot,
          titleKu: "بیرکاری",
          titleEn: "Mathematics",
          roleTitle: "Math Wizard",
          level: "Lv.12",
          icon: "📐",
          speech: "Solve equations with power! ✨",
          nodes: [
            {
              id: 1,
              number: 1,
              titleKu: "نەخشە و ڕووبەر",
              titleBadini: "نەخشە و دەورە",
              titleEn: "Functions & Limits",
              status: "completed",
              stars: 3,
              xOffset: "0%",
              subtopicsKu: ["نەخشێن بەرانبەر و ڕاستەقینە", "سنوور و داتاشراوی ئاستی", "بەردەوامییا نەخشەی", "هاوکێشێن نەخشەیی"]
            },
            {
              id: 2,
              number: 2,
              titleKu: "داتاشراو و یاساکان",
              titleBadini: "داتاشراو و یاسا",
              titleEn: "Derivatives & Rules",
              status: "completed",
              stars: 3,
              xOffset: "20%",
              subtopicsKu: ["یاسایا زۆربوون و دابەشبوونی", "یاسایا زنجیرەیی (Chain Rule)", "داتاشراوا نەخشێن سێگۆشەیی", "داتاشراوا ئاستی دووێ"]
            },
            {
              id: 3,
              number: 3,
              titleKu: "جێبەجێکرنا داتاشراوی",
              titleBadini: "کۆمەڵا داتاشراوی",
              titleEn: "Applications of Derivatives",
              status: "current",
              stars: 2,
              xOffset: "-20%",
              subtopicsKu: ["خاڵێن بڵندترین و نزمترین", "لێژیا هێلا لێکەوت", "داتاشراو بۆ ڕووبەران", "کێشانا هێلکاری نەخشەی"]
            },
            {
              id: 4,
              number: 4,
              titleKu: "تەواوکاری نەدیار",
              titleBadini: "تەواوکاری نەدیار",
              titleEn: "Indefinite Integration",
              status: "locked",
              stars: 0,
              xOffset: "18%",
              subtopicsKu: ["قانونێن بنەڕەتیێن تەواوکاریێ", "تەواوکاری بە جێگرتن", "تەواوکاری نەخشێن لۆگاریتمی", "تەواوکاری بەش بە بەش"]
            },
            {
              id: 5,
              number: 5,
              titleKu: "تەواوکاری دیارکری",
              titleBadini: "تەواوکاری دیارکری",
              titleEn: "Definite Integration",
              status: "locked",
              stars: 0,
              xOffset: "-18%",
              subtopicsKu: ["حیسابکرنا ڕووبەرێ ژێر کێشێ", "قەبارەی بڕگەیا خولاوە", "یاسایا بنەڕەتی یا تەواوکاریێ", "جێبەجێکرنێن فیزیکی"]
            },
            {
              id: 6,
              number: 6,
              titleKu: "هاوکێشێن جیاوازی",
              titleBadini: "هاوکێشێن جیاوازی",
              titleEn: "Differential Equations",
              status: "locked",
              stars: 0,
              xOffset: "0%",
              subtopicsKu: ["هاوکێشێن پلە یەک", "جیاکرنەوەیا گۆڕاوەکان", "جێبەجێکرنا هاوکێشێن جیاوازی", "شیکارکرنا وێستگەکان"]
            }
          ]
        };
      case "physics":
        return {
          mascot: phyMascot,
          titleKu: "فیزیا",
          titleEn: "Physics",
          roleTitle: "Physicist",
          level: "Lv.11",
          icon: "⚛️",
          speech: "Master the laws of nature! ⚡",
          nodes: [
            {
              id: 1,
              number: 1,
              titleKu: "جوولە و هێز",
              titleBadini: "جوولە و هێز",
              titleEn: "Motion & Forces",
              status: "completed",
              stars: 3,
              xOffset: "0%",
              subtopicsKu: ["یاساکان نیوتن بۆ جوولێ", "مۆمێنتەم و پاراستنا وێ", "کار و ئێنێرژییا کیتیکی", "هێزا کێشکرنا گەردوونی"]
            },
            {
              id: 2,
              number: 2,
              titleKu: "کارهەبا و مەگناتیس",
              titleBadini: "کارهەبا و مەگناتیس",
              titleEn: "Electricity & Magnetism",
              status: "completed",
              stars: 3,
              xOffset: "22%",
              subtopicsKu: ["یاسایا کۆلۆمب و بڕی بارگێ", "بواری کارەبایی و پۆتێنشیال", "یاسایا ئۆم و بەرگری", "بواری مەگناتیسی و هێز"]
            },
            {
              id: 3,
              number: 3,
              titleKu: "پەپکێن کارەبایی",
              titleBadini: "بازنێن کارەبایی",
              titleEn: "Electric Circuits",
              status: "current",
              stars: 2,
              xOffset: "-18%",
              subtopicsKu: ["بەستنا زنجیرەیی و تەریب", "یاساکان کیرشۆف (Kirchhoff)", "توانایا کارەبایی و خەرجی", "مەسرەف و سەرچاوەیێن تەزوو"]
            },
            {
              id: 4,
              number: 4,
              titleKu: "شەپۆل و تیشک",
              titleBadini: "شەپۆل و ڕۆشنایی",
              titleEn: "Waves & Optics",
              status: "locked",
              stars: 0,
              xOffset: "20%",
              subtopicsKu: ["جۆرێن شەپۆلان و تایبەتمەندی", "شکاندن و دانەدانەوەیا ڕووناهیێ", "هاوێنەکان و ئاوێنەکان", "دیاریدەی دەستێوەردانێ"]
            },
            {
              id: 5,
              number: 5,
              titleKu: "فیزیا ناووکی",
              titleBadini: "فیزیا ناووکی",
              titleEn: "Nuclear Physics",
              status: "locked",
              stars: 0,
              xOffset: "-20%",
              subtopicsKu: ["پێکهاتەیا ناووکا ئەتۆمی", "تیشکدانەوەیا سروشتی (Alpha, Beta)", "لەتبوونی ناووکی (Nuclear Fission)", "یەکگرتنا ناووکی (Nuclear Fusion)"]
            },
            {
              id: 6,
              number: 6,
              titleKu: "تیۆرا کوانتەم",
              titleBadini: "تیۆرا کوانتەم",
              titleEn: "Quantum Physics",
              status: "locked",
              stars: 0,
              xOffset: "0%",
              subtopicsKu: ["کاریگەرییا فۆتۆئەلیکترۆنی", "مۆدێلا ئەتۆمییا بۆر (Bohr)", "دوو لایەنیا شەپۆل و گەردک", "دیاریدەی تیشکدانا لاشەی ڕەش"]
            }
          ]
        };
      case "biology":
        return {
          mascot: bioMascot,
          titleKu: "زیندەوەر",
          titleEn: "Biology",
          roleTitle: "Biologist",
          level: "Lv.9",
          icon: "🧬",
          speech: "Discover the secret of life! 🌿",
          nodes: [
            {
              id: 1,
              number: 1,
              titleKu: "شانە و خانە",
              titleBadini: "شانە و خانە",
              titleEn: "Cells & Tissues",
              status: "completed",
              stars: 3,
              xOffset: "0%",
              subtopicsKu: ["پێکهاتەیا پەردەیا خانەیێ", "ئەندامۆچکێن ناو خانەیێ", "بەشبوونی راستەوخۆ و ناڕاستەوخۆ", "جۆرێن شانەیێن گیانلەوەران"]
            },
            {
              id: 2,
              number: 2,
              titleKu: "کۆئەندامی دەمار",
              titleBadini: "سستەمێ دەمارخانەیی",
              titleEn: "Nervous System",
              status: "completed",
              stars: 3,
              xOffset: "20%",
              subtopicsKu: ["پێکهاتەیا دەمارخانەیێ (Neuron)", "کۆئەندامی دەماری ناوەندی", "گواستنەوەیا پەیاما دەماری", "پەرچە کردارەکان (Reflexes)"]
            },
            {
              id: 3,
              number: 3,
              titleKu: "سستەمێ بەرگریێ",
              titleBadini: "سستەمێ بەرگریێ",
              titleEn: "Immune System",
              status: "current",
              stars: 2,
              xOffset: "-20%",
              subtopicsKu: ["بەرگرییا سروشتی و نەدیاریکراو", "خۆێنە سپییەکان و ئەنتی بادی", "خوێن پێدان و جۆرێن خوێنێ", "ڤاکسین و پاراستنا لەش"]
            },
            {
              id: 4,
              number: 4,
              titleKu: "زۆربوون و گەشە",
              titleBadini: "زۆربوون و گەشە",
              titleEn: "Reproduction & Growth",
              status: "locked",
              stars: 0,
              xOffset: "18%",
              subtopicsKu: ["کۆئەندامی زۆربوونی نێر و مێ", "پێکهاتنا کۆرپەلەی", "گەشە و گوڕانکارییەکانی لەش", "هۆرمۆنەکانی کۆنترۆڵکردن"]
            },
            {
              id: 5,
              number: 5,
              titleKu: "پێتڤیێن ژینگەهی",
              titleBadini: "ژینگەه و بۆماوە",
              titleEn: "Ecology & Genetics",
              status: "locked",
              stars: 0,
              xOffset: "-18%",
              subtopicsKu: ["تۆڕی خۆراک و زەنجیرەی خۆراکی", "سوڕی کاربۆن و ئۆکسجین", "یاساکان بۆماوەیی مەندەل", "بازدانی بۆماوەیی (Mutation)"]
            },
            {
              id: 6,
              number: 6,
              titleKu: "کۆدێن بۆماوەیی DNA",
              titleBadini: "کۆدێن بۆماوەیی DNA",
              titleEn: "DNA & Molecular Genetics",
              status: "locked",
              stars: 0,
              xOffset: "0%",
              subtopicsKu: ["پێکهاتەیا دوو ڕیشاڵی DNA", "دوانەبوونی DNA (Replication)", "دروستکردنی پروپین (Translation)", "ئەندازیاری بۆماوەیی"]
            }
          ]
        };
      case "kurdish":
        if (season === 1) {
          return {
            mascot: kurMascot,
            titleKu: "کوردی",
            titleEn: "Kurdish",
            roleTitle: "Kurdish Scholar",
            level: "Lv.8",
            icon: "📖",
            speech: "پێشوازی ل ز زمانێ کوردی بکە! ✨",
            nodes: [
              {
                id: 1,
                number: 1,
                titleKu: "شێوازی ڕاگەهاندنێ",
                titleBadini: "شێوازی ڕاگەهاندنێ (ڕاگەهاندن)",
                titleEn: "Indicative Mood",
                status: "completed",
                stars: 1,
                xOffset: "0%",
                subtopicsKu: [
                  "پێناسە و ئەرکێ ڕاگەهاندنێ د کاردا",
                  "دۆخێن ڕابردوو و ڕاهاتوو د ڕاگەهاندنێدا",
                  "نیشانێن شێوازی ڕاگەهاندنێ"
                ]
              },
              {
                id: 2,
                number: 2,
                titleKu: "شێوازی دانانی",
                titleBadini: "شێوازی دانانی (دانانی)",
                titleEn: "Subjunctive Mood",
                status: "completed",
                stars: 3,
                xOffset: "20%",
                subtopicsKu: [
                  "پێناسە و ئەرکێ شێوازی دانانی",
                  "نیشانە و پاشگرێن شێوازی دانانی د کاردا",
                  "بەکارهێنانا (بـ) د شێوازی دانانی دا"
                ]
              },
              {
                id: 3,
                number: 3,
                titleKu: "شێوازی داخوازی",
                titleBadini: "شێوازی داخوازی (داخوازی)",
                titleEn: "Imperative Mood",
                status: "completed",
                stars: 3,
                xOffset: "-20%",
                subtopicsKu: [
                  "پێناسە و دروستکرنا شێوازی داخوازی",
                  "ئەمر و نەهی د کارێ داخوازی دا",
                  "نیشانێن جێناڤێن لکاو د داخوازی دا"
                ]
              },
              {
                id: 4,
                number: 4,
                titleKu: "شێوازی مەرجی",
                titleBadini: "شێوازی مەرجی (رستەیا ئاویته یا مەرجی)",
                titleEn: "Conditional Mood",
                status: "current",
                stars: 2,
                xOffset: "18%",
                subtopicsKu: [
                  "پێناسەیا شێوازی مەرجی و ئاویته",
                  "ئامرازێن مەرجی د کوردی دا (ئەگەر، هەگەر)",
                  "پێکهاتنا ڕستەیا مەرجی و بەرسڤا مەرجی"
                ]
              },
              {
                id: 5,
                number: 5,
                titleKu: "کاری چاوگێ (بوون)",
                titleBadini: "کاری چاوگێ (بوون)",
                titleEn: "Auxiliary Verb (Bûn)",
                status: "locked",
                stars: 0,
                xOffset: "-18%",
                subtopicsKu: [
                  "کارێن ناتەواو د ڕێزمانا کوردی دا",
                  "شێوازێن دەربڕینا (بوون)",
                  "دۆخێن ڕابردوو و ڕاهاتوو"
                ]
              },
              {
                id: 6,
                number: 6,
                titleKu: "ئەرکێ (هـ) د ڕێزمانا کوردی",
                titleBadini: "ئەرکێ (هـ) د ڕێزمانا کوردی",
                titleEn: "Role of (H) in Kurdish Grammar",
                status: "locked",
                stars: 0,
                xOffset: "0%",
                subtopicsKu: [
                  "ئەرکێن سەربەخۆ یێن پیت / پاشگر",
                  "دیارکرنا نەناسراوی و نیشاندان",
                  "بەراوردکرنا ئەرکێن جیاواز د ڕستەیێدا"
                ]
              },
              {
                id: 7,
                number: 7,
                titleKu: "جهناڤێن لکاو: أ- وەکی بکەر",
                titleBadini: "ئەڕکێن جهناڤێن کەسی ئێن لکاو: أ- وەکی بکەر",
                titleEn: "Attached Pronouns: a- As Subject",
                status: "locked",
                stars: 0,
                xOffset: "18%",
                subtopicsKu: [
                  "پێناسە و نیشانێن جهناڤێن لکاو د ڕستەیێ دا",
                  "لکاندنا جهناڤی ب کاری ڤە (دۆخێ بکەر)",
                  "نموونە و ڕستەیێن ڕێزمانی یێن وزاری"
                ]
              },
              {
                id: 8,
                number: 8,
                titleKu: "جهناڤێن لکاو: ب- وەکی بەرکار",
                titleBadini: "ئەڕکێن جهناڤێن کەسی ئێن لکاو: ب- وەکی بەرکار",
                titleEn: "Attached Pronouns: b- As Object",
                status: "locked",
                stars: 0,
                xOffset: "-18%",
                subtopicsKu: [
                  "جهناڤێن لکاو وەکی بەرکارێ ڕاستەوخۆ",
                  "جیاوازیا دیارکرنا بکەر و بەرکار د کارێن تێپەڕ دا",
                  "پرسیارێن وزاری و شیکارکرنا ڕستەیان"
                ]
              },
              {
                id: 9,
                number: 9,
                titleKu: "جهناڤێن لکاو: ت- وەکی تەماکەرێ بەریاری",
                titleBadini: "ئەڕکێن جهناڤێن کەسی ئێن لکاو: ت- وەکی تەماکەرێ بەریاری",
                titleEn: "Attached Pronouns: c- As Prepositional Complement",
                status: "locked",
                stars: 0,
                xOffset: "0%",
                subtopicsKu: [
                  "لکاندنا جهناڤان ب ئامرازێن پەیوەندی و بەریاری ڤە",
                  "ئەرکێ تەماکەر د ڕستەیێن ئاڵۆز دا",
                  "تێبینیێن فێرکاری و نمرێن زێدە بۆ وزاری"
                ]
              }
            ]
          };
        } else {
          return {
            mascot: kurMascot,
            titleKu: "کوردی",
            titleEn: "Kurdish",
            roleTitle: "Kurdish Scholar",
            level: "Lv.8",
            icon: "📖",
            speech: "بەردەوام بە د وەرزێ دووێ دا! ✨",
            nodes: [
              {
                id: 1,
                number: 1,
                titleKu: "هەڤالناڤ ژ لایێ پێکهاتنێڤە",
                titleBadini: "هەڤالناڤ ژ لایێ پێکهاتنێڤە",
                titleEn: "Adjectives Structure",
                status: "completed",
                stars: 1,
                xOffset: "0%",
                subtopicsKu: [
                  "هەڤالناڤێ سادە",
                  "هەڤالناڤێ لێکدراو",
                  "هەڤالناڤێ دارێژراو"
                ]
              },
              {
                id: 2,
                number: 2,
                titleKu: "هەڤالکار ژ لایێ پێکهاتنێڤە",
                titleBadini: "هەڤالکار ژ لایێ پێکهاتنێڤە",
                titleEn: "Adverbs Structure",
                status: "completed",
                stars: 3,
                xOffset: "20%",
                subtopicsKu: [
                  "هەڤالکارێ سادە",
                  "هەڤالکارێ لێکدراو",
                  "هەڤالکارێ دارێژراو"
                ]
              },
              {
                id: 3,
                number: 3,
                titleKu: "ڕادە",
                titleBadini: "ڕادە",
                titleEn: "Degree in Grammar",
                status: "current",
                stars: 2,
                xOffset: "-20%",
                subtopicsKu: [
                  "نیشانێن ڕادەی د ڕستەیێدا",
                  "پلەکانی بەراوردکرن",
                  "شێوازێن بەکارهێنانی ڕادە"
                ]
              },
              {
                id: 4,
                number: 4,
                titleKu: "دیارکەرێن ناڤی",
                titleBadini: "دیارکەرێن ناڤی",
                titleEn: "Noun Determiners",
                status: "locked",
                stars: 0,
                xOffset: "18%",
                subtopicsKu: [
                  "ئەرکێ ناڤی د ڕستەیێدا وەکی دیارکەرێ ناڤی",
                  "ئەرکێ هەڤالناڤی د ڕستەیێدا وەکی دیارکەرێ ناڤی",
                  "ئەرکێ جێناڤێن کەسی یێن جودا د ڕستەیێدا وەکی دیارکەرێ ناڤی",
                  "ئەرکێ جێناڤێن کەسی یێن لکاو د ڕستەیێدا وەکی دیارکەرێ ناڤی"
                ]
              }
            ]
          };
        }
      case "english":
        return {
          mascot: engMascot,
          titleKu: "ئینگلیزی",
          titleEn: "English",
          roleTitle: "English Master",
          level: "Lv.10",
          icon: "🇬🇧",
          speech: "Welcome to English Sunrise! ☀️",
          nodes: [
            {
              id: 1,
              number: 1,
              titleKu: "Grammar & Tenses",
              titleBadini: "Grammar & Tenses",
              titleEn: "Grammar & Tenses",
              status: "completed",
              stars: 1,
              xOffset: "0%",
              subtopicsKu: ["Present Simple & Continuous", "Past Simple & Perfect Tenses", "Future Forms & Conditionals", "Modal Verbs & Passive Voice"]
            },
            {
              id: 2,
              number: 2,
              titleKu: "Reading Passage",
              titleBadini: "Reading Passage",
              titleEn: "Reading Passage",
              status: "completed",
              stars: 3,
              xOffset: "20%",
              subtopicsKu: ["Main Idea & Context Clues", "Vocabulary in Passage Context", "Inference & Author Intent", "Speed Reading Techniques"]
            },
            {
              id: 3,
              number: 3,
              titleKu: "Vocabulary & Idioms",
              titleBadini: "Vocabulary & Idioms",
              titleEn: "Vocabulary & Idioms",
              status: "current",
              stars: 2,
              xOffset: "-20%",
              subtopicsKu: ["Academic Word List (AWL)", "Common Phrasal Verbs", "Essential Idiomatic Expressions", "Synonyms Practice"]
            },
            {
              id: 4,
              number: 4,
              titleKu: "Literature & Stories",
              titleBadini: "Literature & Stories",
              titleEn: "Literature & Stories",
              status: "locked",
              stars: 0,
              xOffset: "18%",
              subtopicsKu: ["The Treasure Island Chapter 1", "Character Analysis & Plot", "Themes & Moral Lessons", "Literary Devices & Imagery"]
            },
            {
              id: 5,
              number: 5,
              titleKu: "Writing & Essay",
              titleBadini: "Writing & Essay",
              titleEn: "Writing & Essay",
              status: "locked",
              stars: 0,
              xOffset: "-18%",
              subtopicsKu: ["Paragraph Structure & Topic Sentences", "Opinion & Argumentative Essays", "Linking Words & Transition Phrases", "Proofreading & Grammar Check"]
            },
            {
              id: 6,
              number: 6,
              titleKu: "Ministerial Practice",
              titleBadini: "Ministerial Practice",
              titleEn: "Ministerial Practice",
              status: "locked",
              stars: 0,
              xOffset: "0%",
              subtopicsKu: ["Previous Exam Papers Review", "Time Management in Exams", "Multiple Choice Strategies", "Final Exam Simulation"]
            }
          ]
        };
      case "arabic":
        return {
          mascot: araMascot,
          titleKu: "عەرەبی",
          titleEn: "Arabic",
          roleTitle: "Arabic Linguist",
          level: "Lv.7",
          icon: "🕌",
          speech: "استكشف لغة الضاد الممتعة! ✨",
          nodes: [
            { id: 1, number: 1, titleKu: "القواعد والنحو", titleBadini: "القواعد والنحو", titleEn: "Arabic Grammar", status: "completed", stars: 1, xOffset: "0%" },
            { id: 2, number: 2, titleKu: "الأدب والنصوص", titleBadini: "الأدب والنصوص", titleEn: "Literature & Texts", status: "completed", stars: 3, xOffset: "20%" },
            { id: 3, number: 3, titleKu: "البلاغة والنقد", titleBadini: "البلاغة والنقد", titleEn: "Rhetoric & Criticism", status: "current", stars: 2, xOffset: "-20%" },
            { id: 4, number: 4, titleKu: "الإملاء والإنشاء", titleBadini: "الإملاء والإنشاء", titleEn: "Spelling & Composition", status: "locked", stars: 0, xOffset: "18%" },
            { id: 5, number: 5, titleKu: "أسئلة وزارية", titleBadini: "أسئلة وزارية", titleEn: "Ministerial Exercises", status: "locked", stars: 0, xOffset: "-18%" },
            { id: 6, number: 6, titleKu: "الاختبار الشامل", titleBadini: "الاختبار الشامل", titleEn: "Final Comprehensive Test", status: "locked", stars: 0, xOffset: "0%" }
          ]
        };
      default:
        return {
          mascot: relMascot,
          titleKu: "ئایینی ئیسلام",
          titleEn: "Islamic Religion",
          roleTitle: "Islamic Scholar",
          level: "Lv.8",
          icon: "🌙",
          speech: "زانست و ڕەوشت تێکەڵ بکە! ✨",
          nodes: [
            { id: 1, number: 1, titleKu: "سوورەتێن پیرۆز", titleBadini: "سوورەتێن پیرۆز", titleEn: "Holy Quran & Surahs", status: "completed", stars: 1, xOffset: "0%" },
            { id: 2, number: 2, titleKu: "فەرموودێن پێغەمبەری", titleBadini: "فەرموودێن پێغەمبەری", titleEn: "Prophetic Hadiths", status: "completed", stars: 3, xOffset: "20%" },
            { id: 3, number: 3, titleKu: "بیروباوەر و فقه", titleBadini: "بیروباوەر و فقه", titleEn: "Islamic Jurisprudence", status: "current", stars: 2, xOffset: "-20%" },
            { id: 4, number: 4, titleKu: "ڕەوشت و ئاداب", titleBadini: "ڕەوشت و ئاداب", titleEn: "Islamic Ethics", status: "locked", stars: 0, xOffset: "18%" },
            { id: 5, number: 5, titleKu: "مێژووا ئیسلامی", titleBadini: "مێژووا ئیسلامی", titleEn: "Islamic History", status: "locked", stars: 0, xOffset: "-18%" },
            { id: 6, number: 6, titleKu: "پرسیارێن وزاری", titleBadini: "پرسیارێن وزاری", titleEn: "Ministerial Exams", status: "locked", stars: 0, xOffset: "0%" }
          ]
        };
    }
  };

  const config = getSubjectConfig(subject.id, activeSeason);
  const localizedSubjectName = getLocalizedText(subject, "name", language);

  return (
    <div dir={language === "badini" || language === "ku" ? "rtl" : "ltr"} className="w-full min-h-screen bg-slate-50 text-slate-800 p-0 font-sans select-none relative overflow-x-clip flex flex-col">
      {/* Light Soft Background with Subtle Ambient Glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-purple-50/30 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[550px] h-[550px] bg-amber-200/30 rounded-full blur-[180px] pointer-events-none" />

      {/* Floating Subtle Sparkles Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-12 w-1.5 h-1.5 bg-purple-500 rounded-full blur-[0.5px] animate-ping" />
        <div className="absolute top-1/3 right-20 w-2 h-2 bg-amber-500 rounded-full blur-[0.5px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-indigo-500 rounded-full blur-[0.5px]" />
        <Star className="absolute top-24 right-1/3 w-3 h-3 text-purple-600 opacity-60 animate-spin" style={{ animationDuration: "14s" }} />
      </div>

      <div className="relative z-10 flex flex-col w-full min-h-screen">
        {/* ==================================================================== */}
        {/* STICKY TOP HEADER BAR & SEASONS STRIP */}
        {/* ==================================================================== */}
        <div className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-purple-100 shadow-md">
          {/* Main Top Bar */}
          <header className="flex flex-wrap md:flex-nowrap items-center justify-between gap-2.5 sm:gap-4 px-3 sm:px-6 py-2 sm:py-2.5 w-full text-slate-800">
            {/* Left Side: Back button + Subject Icon & Name */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
              <button
                onClick={onBack}
                className="p-2 sm:p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 transition-all shadow-sm active:scale-95 shrink-0 group"
                title="گەڕانەوە"
              >
                <ArrowLeft className={`w-5 h-5 text-purple-700 transition-transform ${language === "badini" || language === "ku" ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1"}`} />
              </button>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 p-0.5 shadow-md shadow-purple-500/20 flex items-center justify-center shrink-0">
                  <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-lg sm:text-2xl">
                    {config.icon}
                  </div>
                </div>
                <div>
                  <h1 className="text-base sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                    <span>{language === "badini" || language === "ku" ? config.titleKu : config.titleEn}</span>
                    <span className="text-purple-600 text-xs sm:text-sm font-bold">({language === "badini" || language === "ku" ? config.titleEn : config.titleKu})</span>
                  </h1>
                  <p className="text-[10px] sm:text-[11px] font-semibold text-purple-600">
                    {language === "badini" ? "شرۆڤەکرنا هویر یا وانەیان و تاقیکرنێن وزاری" : "شرۆڤەکردنی وردی وانەکان و تاقیکردنەوەی وزاری"}
                  </p>
                </div>
              </div>
            </div>

            {/* Middle: Overall Progress Card */}
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-purple-50/80 border border-purple-200/80 flex flex-col justify-center min-w-[150px] sm:min-w-[200px] flex-1 max-w-xs shadow-inner">
              <div className="flex items-center justify-between text-xs font-black text-purple-900 mb-1">
                <span>{language === "badini" ? "پێشکەوتنا گشتی" : language === "ku" ? "پێشکەوتنی گشتی" : "Overall Progress"}</span>
                <span className="text-indigo-600 text-xs font-mono font-bold">60%</span>
              </div>
              <div className="w-full bg-purple-200/60 h-2 rounded-full overflow-hidden p-0.5 border border-purple-300/40">
                <div className="h-full bg-gradient-to-r from-purple-500 via-indigo-600 to-purple-600 rounded-full shadow-md w-[60%]" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 mt-0.5 block text-right">
                {language === "badini" ? "٢٢ ژ ٣٧ وانەیان تەواوبووینە" : language === "ku" ? "٢٢ لە ٣٧ وانە تەواوبوون" : "22 of 37 Lessons Completed"}
              </span>
            </div>

            {/* Right Side: Day Streak & Gems Stat Pills */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Day Streak */}
              <div className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-amber-50 border border-amber-300 flex items-center gap-1.5 sm:gap-2 shadow-sm">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-black text-slate-900 leading-none">18</span>
                  <span className="text-[9px] font-bold text-amber-700 leading-tight">
                    {language === "badini" ? "رۆژێن بەردەوام" : language === "ku" ? "ڕۆژانی بەردەوام" : "Day Streak"}
                  </span>
                </div>
              </div>

              {/* Gems */}
              <div className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-cyan-50 border border-cyan-300 flex items-center gap-1.5 sm:gap-2 shadow-sm">
                <Gem className="w-4 h-4 text-cyan-600 fill-cyan-500" />
                <span className="text-xs sm:text-sm font-black text-slate-900 font-mono">320</span>
                <span className="text-[10px] font-black text-cyan-700 bg-cyan-100 px-1 py-0.2 rounded border border-cyan-300">+</span>
              </div>

              {/* Fullscreen Toggle Button */}
              <button
                onClick={toggleFullscreen}
                className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 flex items-center gap-1.5 shadow-sm transition active:scale-95 text-xs font-black"
                title={language === "badini" ? "کامل شاشە" : language === "ku" ? "تەواوی شاشە" : "Fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4 text-purple-600" /> : <Maximize2 className="w-4 h-4 text-purple-600" />}
                <span className="hidden sm:inline">
                  {isFullscreen
                    ? (language === "badini" ? "شاشا ئاسایی" : "ئاسایی")
                    : (language === "badini" ? "کامل شاشە" : language === "ku" ? "تەواوی شاشە" : "Fullscreen")}
                </span>
              </button>
            </div>
          </header>

          {/* Mode Switcher & Seasons Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 px-3 sm:px-6 py-2 bg-slate-50/90 border-t border-purple-100/60 w-full">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-purple-100/70 p-1 rounded-2xl border border-purple-200/60">
              <button
                onClick={() => setMainViewMode("explanations")}
                className={`px-3 sm:px-4 py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 ${
                  mainViewMode === "explanations"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>{language === "badini" ? "شرۆڤەکرنا وانەیان 🎬" : language === "ku" ? "شرۆڤەی وانەکان 🎬" : "Lesson Explanations 🎬"}</span>
              </button>
              <button
                onClick={() => setMainViewMode("map")}
                className={`px-3 sm:px-4 py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 ${
                  mainViewMode === "map"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>{language === "badini" ? "ڕێکا فێربوونێ 🗺️" : language === "ku" ? "ڕێگەی فێربوون 🗺️" : "Learning Map 🗺️"}</span>
              </button>
            </div>

            {/* Seasons Strip */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSeason(1)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-xl font-black text-xs transition-all duration-300 shadow-sm active:scale-95 flex items-center gap-1.5 shrink-0 ${
                  activeSeason === 1
                    ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white border border-purple-400/50 shadow-purple-600/30"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                <span>{language === "badini" ? "وەرزێ ١" : language === "ku" ? "وەرزێ ١" : "Season 1"}</span>
                <span className="text-[10px] opacity-80 font-normal">
                  ({language === "badini" ? "٢٢ وانە" : language === "ku" ? "٢٢ وانە" : "22 Lessons"})
                </span>
              </button>

              <button
                onClick={() => setActiveSeason(2)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-xl font-black text-xs transition-all duration-300 shadow-sm active:scale-95 flex items-center gap-1.5 shrink-0 ${
                  activeSeason === 2
                    ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white border border-purple-400/50 shadow-purple-600/30"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span>{language === "badini" ? "وەرزێ ٢" : language === "ku" ? "وەرزێ ٢" : "Season 2"}</span>
                <span className="text-[10px] opacity-80 font-normal">
                  ({language === "badini" ? "١٥ وانە" : language === "ku" ? "١٥ وانە" : "15 Lessons"})
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* LESSON EXPLANATIONS VIEW (شرۆڤەکرنا هویر یا وانەیان) */}
        {/* ==================================================================== */}
        {mainViewMode === "explanations" && (
          <div className="relative flex-1 w-full bg-slate-50/70 p-3 sm:p-6 lg:p-8 min-h-[750px] flex flex-col gap-6">
            <div className="w-full max-w-7xl 2xl:max-w-[1550px] mx-auto space-y-6">
              {/* Hero Banner for Lesson Explanations */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-[28px] sm:rounded-[32px] bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 shadow-xl shadow-purple-900/15 overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 border border-purple-400/30"
              >
                {/* Sparkle background effects */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-4 left-1/4 w-2 h-2 bg-white/60 rounded-full blur-[0.5px] animate-pulse" />
                  <div className="absolute top-1/2 left-1/3 text-white/30 text-sm">✦</div>
                  <div className="absolute bottom-6 right-1/4 w-2.5 h-2.5 bg-purple-200/50 rounded-full blur-[1px]" />
                  <div className="absolute -right-16 -top-16 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />
                </div>

                {/* Right text in RTL */}
                <div className="relative z-10 flex flex-col items-start text-right flex-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-purple-100 text-xs font-black mb-2.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>
                      {language === "badini"
                        ? `پۆلا ۱۲ • وەرزێ ${activeSeason} • شرۆڤەکرنا هویر یا وانەیان`
                        : language === "ku"
                        ? `پۆلی ۱۲ • وەرزی ${activeSeason} • شرۆڤەی وردی وانەکان`
                        : `Grade 12 • Season ${activeSeason} • Lesson Explanations`}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {language === "badini"
                      ? `شرۆڤەکرنا هویر یا وانەیێن ${config.titleKu}`
                      : language === "ku"
                      ? `شرۆڤەکردنی وردی وانەکانی ${config.titleKu}`
                      : `${config.titleEn} Lesson Explanations`}
                  </h2>

                  <p className="text-xs sm:text-sm text-purple-100/90 mt-2 max-w-xl leading-relaxed font-medium">
                    {language === "badini"
                      ? "هەمی وانە، بەش و یاسایێن گرنگ ب شێوازەکێ هویر و ئاسان هاتینە شرۆڤەکرن دگەل شیکارکرنا پرسیارێن وزاری یێن سالێن ٢٠١٥-٢٠٢٤."
                      : language === "ku"
                      ? "هەموو وانە، بەش و یاسا گرنگەکان بە شێوازێکی ورد و ئاسان شرۆڤەکراون لەگەڵ شیکارکردنی پرسیارە وزارییەکانی ٢٠١٥-٢٠٢٤."
                      : "All chapters, lessons, and essential formulas broken down clearly with solved ministerial past paper questions."}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-900/40 border border-purple-300/30 text-xs font-bold">
                      <Video className="w-3.5 h-3.5 text-purple-300" />
                      <span>{config.nodes.length} {language === "badini" || language === "ku" ? "بەشێن سەرەکی" : "Main Chapters"}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-900/40 border border-purple-300/30 text-xs font-bold">
                      <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                      <span>
                        {config.nodes.map(n => (n.subtopicsKu ? n.subtopicsKu.length : 3)).reduce((a, b) => a + b, 0)} {language === "badini" || language === "ku" ? "وانەیێن شرۆڤەکری" : "Lessons"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-900/40 border border-purple-300/30 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                      <span>{language === "badini" || language === "ku" ? "شیکارییا پرسیارێن وزاری" : "Ministerial Solved"}</span>
                    </div>
                  </div>
                </div>

                {/* Left mascot illustration */}
                <div className="relative z-10 flex-shrink-0 flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white/10 p-2 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center">
                      <img
                        src={config.mascot}
                        alt={config.titleKu}
                        className="w-full h-full object-contain rounded-2xl drop-shadow-md"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Active Audio Lesson Bar (if audio explanation is playing) */}
              {activeAudioLesson && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl p-3.5 sm:p-4 bg-gradient-to-r from-purple-900 to-indigo-900 text-white border border-purple-400/40 flex items-center justify-between gap-3 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/30 border border-purple-400/40 flex items-center justify-center text-purple-200 animate-pulse">
                      <Volume2 className="w-5 h-5 text-amber-300" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-amber-300">
                          {language === "badini" ? "دەنگێ شرۆڤەکرنا وانەیێ چالاکە" : "دەنگی شرۆڤەی وانە چالاکە"}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      </div>
                      <p className="text-xs text-purple-200 mt-0.5">
                        {language === "badini"
                          ? "گوێگرتن لە مامۆستایێ بسپۆر و دووبارەکرنا یاسایێن گرنگ"
                          : "گوێگرتن لە مامۆستای پسپۆڕ و دووبارەکردنەوەی یاسا گرنگەکان"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-1">
                      <span className="w-1 h-3 bg-purple-300 rounded-full animate-pulse" />
                      <span className="w-1 h-5 bg-amber-300 rounded-full animate-pulse delay-75" />
                      <span className="w-1 h-2 bg-purple-300 rounded-full animate-pulse delay-150" />
                      <span className="w-1 h-6 bg-emerald-300 rounded-full animate-pulse delay-100" />
                      <span className="w-1 h-4 bg-purple-300 rounded-full animate-pulse delay-200" />
                    </div>
                    <button
                      onClick={() => setActiveAudioLesson(null)}
                      className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-black text-white transition active:scale-95"
                    >
                      {language === "badini" || language === "ku" ? "ڕاگرتن" : "Stop"}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Chapters & Lessons List */}
              <div className="space-y-6">
                {config.nodes.map((node, cIndex) => {
                  const subtopics = node.subtopicsKu || [
                    "تایبەتمەندیێن بنەڕەتی و یاسا",
                    "ڕێگەی شیكاركردنی پرسیارەكان",
                    "شیکارکردنی تاقیکردنەوە وزارییەکان"
                  ];

                  return (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: cIndex * 0.05, duration: 0.35 }}
                      className="rounded-[24px] sm:rounded-[28px] bg-white border border-purple-100/80 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      {/* Chapter Card Header */}
                      <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-50/70 via-indigo-50/40 to-white border-b border-purple-100 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3 text-right">
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-sm sm:text-base shadow-sm shrink-0">
                            {node.number}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                                {language === "badini" ? node.titleBadini || node.titleKu : node.titleKu}
                              </h3>
                              <span className="text-xs font-bold text-purple-600 font-mono hidden sm:inline">
                                ({node.titleEn})
                              </span>
                            </div>
                            <span className="text-[11px] sm:text-xs font-bold text-slate-500">
                              {subtopics.length} {language === "badini" || language === "ku" ? "وانەیێن شرۆڤەکری" : "Lessons"} • {node.status === "completed" ? (language === "badini" || language === "ku" ? "تەواوبوو ✅" : "Completed") : (language === "badini" || language === "ku" ? "بەردەوامە" : "In Progress")}
                            </span>
                          </div>
                        </div>

                        {/* Chapter Quick Quiz Callout */}
                        <button
                          onClick={() => onStartQuiz(subject.id)}
                          className="px-3.5 py-1.5 sm:py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs transition active:scale-95 flex items-center gap-1.5 shadow-sm shadow-purple-600/20"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{language === "badini" ? "تاقیکرنا ڤی بەشی" : language === "ku" ? "تاقیکردنەوەی ئەم بەشە" : "Chapter Quiz"}</span>
                        </button>
                      </div>

                      {/* Subtopics / Lessons under this Chapter */}
                      <div className="divide-y divide-slate-100 p-2 sm:p-3">
                        {subtopics.map((subtopic, lIndex) => {
                          const durationStr = `${16 + lIndex * 4}:00 خۆلەک`;
                          const isAudioActive = activeAudioLesson === `${node.id}-${lIndex}`;

                          return (
                            <div
                              key={lIndex}
                              className="p-3 sm:p-4 rounded-2xl hover:bg-purple-50/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3.5 text-right"
                            >
                              {/* Left in RTL: Lesson details */}
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                                  {lIndex + 1}
                                </div>
                                <div className="space-y-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h4 className="text-sm sm:text-base font-black text-slate-900">
                                      {subtopic}
                                    </h4>
                                    <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 text-[10px] font-bold">
                                      {durationStr}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                    {language === "badini"
                                      ? "شرۆڤەکرنا یاسا و چەمکێن وانەیێ دگەل ڕاهێنان و پرسیارێن تاقیکرنا وزاری."
                                      : language === "ku"
                                      ? "شرۆڤەکردنی یاسا و چەمکەکانی وانە لەگەڵ ڕاهێنان و پرسیاری وزاری."
                                      : "Detailed walkthrough of laws and concepts with solved past exam items."}
                                  </p>
                                </div>
                              </div>

                              {/* Right in RTL: Action Buttons (Watch Video, Listen Audio, Summary Notes, Quiz) */}
                              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 self-end md:self-center shrink-0">
                                {/* Watch Video Button */}
                                <button
                                  onClick={() =>
                                    setSelectedVideoLesson({
                                      title: subtopic,
                                      chapterTitle: node.titleKu || node.titleBadini,
                                      teacher: language === "badini" || language === "ku" ? "مامۆستایێ بسپۆرێ پۆلا ۱۲" : "Grade 12 Master Teacher",
                                      duration: durationStr,
                                      videoUrl: "/public/bhez.webm"
                                    })
                                  }
                                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs flex items-center gap-1.5 transition active:scale-95 shadow-sm shadow-purple-600/20"
                                >
                                  <Video className="w-3.5 h-3.5" />
                                  <span>{language === "badini" || language === "ku" ? "تەماشاکرنا ڤیدیۆیێ" : "Watch Video"}</span>
                                </button>

                                {/* Audio Explanation Button */}
                                <button
                                  onClick={() =>
                                    setActiveAudioLesson(isAudioActive ? null : `${node.id}-${lIndex}`)
                                  }
                                  className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition active:scale-95 border ${
                                    isAudioActive
                                      ? "bg-amber-500 text-slate-950 border-amber-400 shadow-sm"
                                      : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"
                                  }`}
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                  <span>
                                    {isAudioActive
                                      ? (language === "badini" || language === "ku" ? "دەنگ لێدەدات..." : "Playing...")
                                      : (language === "badini" || language === "ku" ? "شرۆڤەیا دەنگی" : "Audio")}
                                  </span>
                                </button>

                                {/* Summary & Formula Sheet Button */}
                                <button
                                  onClick={() =>
                                    setSelectedSummaryLesson({
                                      title: subtopic,
                                      chapterTitle: node.titleKu || node.titleBadini,
                                      summaryPoints: [
                                        `پوختە و ناساندنی گرنگترین چەمکەکانی وانەی (${subtopic})`,
                                        "یاسا بیرکارییەکان و هاوکێشەکان کە پێویستە لەبەر بکرێن",
                                        "تێبینی و فێڵە باوەکانی تاقیکردنەوەی وزاری بۆ ئەم وانەیە",
                                        "خاڵەکانی وەرگرتنی نمرەی تەواو لە پرسیارەکانی ئەم بەشەدا"
                                      ]
                                    })
                                  }
                                  className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 font-black text-xs flex items-center gap-1.5 transition active:scale-95"
                                  title="پوختەی وانە و یاساکان"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  <span>{language === "badini" || language === "ku" ? "پوختە" : "Notes"}</span>
                                </button>

                                {/* Ministerial Quiz for this lesson */}
                                <button
                                  onClick={() => onStartQuiz(subject.id)}
                                  className="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition active:scale-95"
                                  title="شیکارکرنا پرسیارێن وزاری"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Quick Exam Card */}
              <div className="rounded-[28px] p-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-amber-500/15">
                <div className="text-right">
                  <h3 className="text-xl font-black">
                    {language === "badini"
                      ? "ئامادەی بۆ تاقیکرنا گشتی یا وزاری؟ 🎯"
                      : "ئامادەیت بۆ تاقیکردنەوەی گشتی وزاری؟ 🎯"}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-slate-900/80 mt-1">
                    {language === "badini"
                      ? "هەمی پرسیارێن سالێن پێشتر تاقیبکە دا نمرەیا خۆ بزانی."
                      : "هەموو پرسیارەکانی ساڵانی پێشوو تاقیبکەرەوە تا نمرەی خۆت بزانیت."}
                  </p>
                </div>
                <button
                  onClick={() => onStartQuiz(subject.id)}
                  className="px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-black text-sm shadow-lg transition active:scale-95 shrink-0"
                >
                  {language === "badini" || language === "ku" ? "دەستپێکرنا تاقیکرنێ ⚡" : "Start Full Exam"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* GAMIFIED MAP LEARNING PATHWAY & WIDGETS */}
        {/* ==================================================================== */}
        {mainViewMode === "map" && (
        <div className="relative flex-1 w-full bg-white p-4 sm:p-8 overflow-x-hidden min-h-[750px] flex flex-col justify-between">

          {/* Main Container: Centered Learning Pathway */}
          <div className="relative z-10 w-full max-w-5xl 2xl:max-w-6xl mx-auto flex flex-col items-center">
            
            {/* LEARNING PATHWAY */}
            <div className="w-full relative flex flex-col items-center">
              


              {/* S-CURVED WINDING PATHWAY & 3D ISLAND LEVEL NODES */}
              {(() => {
                const nodeCount = config.nodes.length;
                // Generate X and Y positions for all nodes with ascending path (Level 1 at bottom, advancing up)
                const nodePositions = config.nodes.map((_, idx) => {
                  let x = 50;
                  if (idx === 0) {
                    x = 50; // Level 1 starts at bottom center
                  } else if (idx % 2 === 1) {
                    x = 68; // Smooth right curve (stays nicely within mobile viewport margins)
                  } else {
                    x = 32; // Smooth left curve (stays nicely within mobile viewport margins)
                  }
                  
                  // Ascend cleanly from bottom y=90% to top level node at y=18%
                  const step = nodeCount > 1 ? 72 / (nodeCount - 1) : 0;
                  const y = 90 - idx * step;
                  return { x, y };
                });

                // Build SVG path d string in 600 x 3500 coordinate space
                const svgPoints = nodePositions.map((pos) => ({
                  x: (pos.x / 100) * 600,
                  y: (pos.y / 100) * 3500,
                }));

                // Generate continuous SVG path d string connecting all nodes up to the top goal trophy
                let fullRoadPath = `M ${svgPoints[0]?.x || 300} ${svgPoints[0]?.y || 3150}`;
                for (let i = 0; i < svgPoints.length - 1; i++) {
                  const p1 = svgPoints[i];
                  const p2 = svgPoints[i + 1];
                  const midY = (p1.y + p2.y) / 2;
                  fullRoadPath += ` C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
                }
                const lastPoint = svgPoints[svgPoints.length - 1];
                if (lastPoint) {
                  const topGoalX = 300;
                  const topGoalY = 140; // Reaches directly into the trophy badge at top: 4%
                  const midY = (lastPoint.y + topGoalY) / 2;
                  fullRoadPath += ` C ${lastPoint.x} ${midY}, ${topGoalX} ${midY}, ${topGoalX} ${topGoalY}`;
                }

                // Gateway Midpoint Coordinates for HTML placement (Directly between Node 4 and Node 5)
                const pos4 = nodePositions[3] || nodePositions[Math.min(3, nodePositions.length - 1)];
                const pos5 = nodePositions[4] || nodePositions[Math.min(4, nodePositions.length - 1)];
                const bridgeMidX = (pos4.x + pos5.x) / 2; // 50% center
                const bridgeMidY = (pos4.y + pos5.y) / 2; // Exact midpoint between Stage 4 and Stage 5

                // Check if Stage 4 (Node 4) is completed
                const stage4Node = config.nodes[3] || config.nodes[nodeCount - 1];
                const isStage4Done = stage4Node?.status === "completed";

                return (
                  <div className="relative w-full max-w-2xl mx-auto my-6 z-10 h-[3400px] sm:h-[3900px]">
                    {/* SVG Pathway passing cleanly behind node pedestals to the final goal */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-95 overflow-visible" viewBox="0 0 600 3500" preserveAspectRatio="none">
                      <defs>
                        {/* Section Gateway Gradients */}
                        <linearGradient id="gatewayGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="50%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                        <linearGradient id="goldenPillarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#fde047" />
                          <stop offset="50%" stopColor="#d97706" />
                          <stop offset="100%" stopColor="#78350f" />
                        </linearGradient>
                        <linearGradient id="arcGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="50%" stopColor="#fde047" />
                          <stop offset="100%" stopColor="#38bdf8" />
                        </linearGradient>
                        <linearGradient id="stoneBedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#78716c" />
                          <stop offset="50%" stopColor="#57534e" />
                          <stop offset="100%" stopColor="#44403c" />
                        </linearGradient>
                        <linearGradient id="magicRainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ec4899" />
                          <stop offset="25%" stopColor="#8b5cf6" />
                          <stop offset="50%" stopColor="#3b82f6" />
                          <stop offset="75%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                        <linearGradient id="stoneSurfaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#d6d3d1" />
                          <stop offset="50%" stopColor="#a8a29e" />
                          <stop offset="100%" stopColor="#78716c" />
                        </linearGradient>
                      </defs>

                      {/* CONTINUOUS ROYAL ROAD (Connecting Stage 1 through all Stages up to the Final Trophy) */}
                      <g>
                        {/* 1. Golden Outer Glow Aura */}
                        <path
                          d={fullRoadPath}
                          stroke="#fbbf24"
                          strokeWidth="56"
                          strokeLinecap="round"
                          fill="none"
                          className="blur-sm opacity-50"
                        />

                        {/* 2. Outer Purple Glow */}
                        <path
                          d={fullRoadPath}
                          stroke="#a855f7"
                          strokeWidth="48"
                          strokeLinecap="round"
                          fill="none"
                          className="blur-xs opacity-60"
                        />

                        {/* 3. Golden Champion Curb Trims */}
                        <path
                          d={fullRoadPath}
                          stroke="#f59e0b"
                          strokeWidth="38"
                          strokeLinecap="round"
                          fill="none"
                        />

                        {/* 4. Royal Smooth Road Bed Surface */}
                        <path
                          d={fullRoadPath}
                          stroke="#fdf4ff"
                          strokeWidth="30"
                          strokeLinecap="round"
                          fill="none"
                        />

                        {/* 5. Center Purple Dashed Lane Line */}
                        <path
                          d={fullRoadPath}
                          stroke="#8b5cf6"
                          strokeWidth="5"
                          strokeDasharray="14 10"
                          strokeLinecap="round"
                          fill="none"
                        />

                        {/* 6. DECORATIVE GOLDEN STARS & FLOWERS ALONG ALL ROAD EDGES */}
                        {(() => {
                          const segments: Array<{ p0: { x: number; y: number }; p1: { x: number; y: number } }> = [];
                          for (let i = 0; i < svgPoints.length - 1; i++) {
                            segments.push({ p0: svgPoints[i], p1: svgPoints[i + 1] });
                          }
                          const lastPt = svgPoints[svgPoints.length - 1];
                          if (lastPt) {
                            segments.push({ p0: lastPt, p1: { x: 300, y: 70 } });
                          }

                            const items: React.ReactNode[] = [];
                            segments.forEach((seg, segIdx) => {
                              const tValues = [0.25, 0.55, 0.85];
                              const midY = (seg.p0.y + seg.p1.y) / 2;

                              tValues.forEach((t, tIdx) => {
                                const u = 1 - t;
                                const tt = t * t;
                                const uu = u * u;
                                const uuu = uu * u;
                                const ttt = tt * t;

                                const c1 = { x: seg.p0.x, y: midY };
                                const c2 = { x: seg.p1.x, y: midY };

                                const bx = uuu * seg.p0.x + 3 * uu * t * c1.x + 3 * u * tt * c2.x + ttt * seg.p1.x;
                                const bgY = uuu * seg.p0.y + 3 * uu * t * c1.y + 3 * u * tt * c2.y + ttt * seg.p1.y;

                                const dx = 3 * uu * (c1.x - seg.p0.x) + 6 * u * t * (c2.x - c1.x) + 3 * tt * (seg.p1.x - c2.x);
                                const dy = 3 * uu * (c1.y - seg.p0.y) + 6 * u * t * (c2.y - c1.y) + 3 * tt * (seg.p1.y - c2.y);
                                const len = Math.hypot(dx, dy) || 1;
                                const nx = -dy / len;
                                const ny = dx / len;

                                const side = (segIdx + tIdx) % 2 === 0 ? -1 : 1;
                                const dist = 25;
                                const itemX = bx + nx * side * dist;
                                const itemY = bgY + ny * side * dist;

                                const type = (segIdx + tIdx) % 3;

                                if (type === 0) {
                                  // Golden Star Accent
                                  items.push(
                                    <g key={`d5-star-${segIdx}-${tIdx}`} transform={`translate(${itemX}, ${itemY}) scale(0.9)`}>
                                      <circle cx="0" cy="0" r="10" fill="#fef08a" className="blur-xs opacity-80" />
                                      <path
                                        d="M 0 -8 L 2.4 -2.5 L 8 -1.7 L 4 2.2 L 5 7.8 L 0 5 L -5 7.8 L -4 2.2 L -8 -1.7 L -2.4 -2.5 Z"
                                        fill="#f59e0b"
                                        stroke="#d97706"
                                        strokeWidth="1"
                                      />
                                      <circle cx="0" cy="0" r="2" fill="#ffffff" />
                                    </g>
                                  );
                                } else if (type === 1) {
                                  // Vibrant Flower Cluster
                                  const flowerFills = ["#f43f5e", "#a855f7", "#fbbf24", "#06b6d4"];
                                  const fill = flowerFills[(segIdx + tIdx) % flowerFills.length];
                                  items.push(
                                    <g key={`d5-flower-${segIdx}-${tIdx}`} transform={`translate(${itemX}, ${itemY})`}>
                                      <circle cx="-3" cy="2" r="3.5" fill="#22c55e" />
                                      <circle cx="3" cy="2" r="3.5" fill="#16a34a" />
                                      <circle cx="-2" cy="0" r="2.5" fill={fill} />
                                      <circle cx="2" cy="0" r="2.5" fill={fill} />
                                      <circle cx="0" cy="-2" r="2.5" fill={fill} />
                                      <circle cx="0" cy="2" r="2.5" fill={fill} />
                                      <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
                                    </g>
                                  );
                                } else {
                                  // Golden Sparkle Orbs
                                  items.push(
                                    <g key={`d5-sparkle-${segIdx}-${tIdx}`} transform={`translate(${itemX}, ${itemY})`}>
                                      <circle cx="0" cy="0" r="6" fill="#fbbf24" className="blur-xs opacity-75" />
                                      <circle cx="0" cy="0" r="3" fill="#ffffff" />
                                    </g>
                                  );
                                }
                              });
                            });

                            return items;
                          })()}

                          {/* 7. GRAND VICTORY ARCHWAY SPANNING ACROSS ROAD BEFORE THE TOP GOAL */}
                          {(() => {
                            const lastPoint = svgPoints[svgPoints.length - 1] || { x: 300, y: 300 };
                            const topGoal = { x: 300, y: 80 };
                            const midY = (lastPoint.y + topGoal.y) / 2;

                            // Bezier curve from lastPoint to topGoal:
                            // p0 = lastPoint, c1 = (lastPoint.x, midY), c2 = (topGoal.x, midY), p1 = topGoal
                            const t = 0.55;
                            const u = 1 - t;
                            const tt = t * t;
                            const uu = u * u;
                            const uuu = uu * u;
                            const ttt = tt * t;

                            const c1x = lastPoint.x, c1y = midY;
                            const c2x = topGoal.x, c2y = midY;

                            const archX = uuu * lastPoint.x + 3 * uu * t * c1x + 3 * u * tt * c2x + ttt * topGoal.x;
                            const archY = uuu * lastPoint.y + 3 * uu * t * c1y + 3 * u * tt * c2y + ttt * topGoal.y;

                            // Tangent vector
                            const dx = 3 * uu * (c1x - lastPoint.x) + 6 * u * t * (c2x - c1x) + 3 * tt * (topGoal.x - c2x);
                            const dy = 3 * uu * (c1y - lastPoint.y) + 6 * u * t * (c2y - c1y) + 3 * tt * (topGoal.y - c2y);

                            // Tangent angle in degrees
                            const tangentAngle = Math.atan2(dy, dx) * (180 / Math.PI);
                            // Damp angle slightly for a clean 3D gate perspective across the road
                            const archRotation = (tangentAngle + 90) * 0.45;

                            return (
                              <g transform={`translate(${archX}, ${archY}) rotate(${archRotation})`}>
                                {/* Arch Glow */}
                                <ellipse cx="0" cy="-15" rx="55" ry="35" fill="#fde047" className="blur-md opacity-40" />

                                {/* Left Pillar */}
                                <rect x="-52" y="-10" width="12" height="32" rx="3" fill="url(#goldenPillarGrad)" stroke="#78350f" strokeWidth="1" />
                                <rect x="-55" y="-14" width="18" height="6" rx="2" fill="#fde047" stroke="#b45309" strokeWidth="1" />
                                <rect x="-55" y="18" width="18" height="6" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="1" />

                                {/* Right Pillar */}
                                <rect x="40" y="-10" width="12" height="32" rx="3" fill="url(#goldenPillarGrad)" stroke="#78350f" strokeWidth="1" />
                                <rect x="37" y="-14" width="18" height="6" rx="2" fill="#fde047" stroke="#b45309" strokeWidth="1" />
                                <rect x="37" y="18" width="18" height="6" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="1" />

                                {/* Archway Bridge Curve */}
                                <path
                                  d="M -46 -10 C -46 -45, 46 -45, 46 -10"
                                  stroke="url(#goldenPillarGrad)"
                                  strokeWidth="10"
                                  fill="none"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M -46 -10 C -46 -45, 46 -45, 46 -10"
                                  stroke="#fde047"
                                  strokeWidth="4"
                                  fill="none"
                                  strokeLinecap="round"
                                  className="opacity-90"
                                />

                                {/* Center Golden Medallion with Star */}
                                <circle cx="0" cy="-35" r="14" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" className="shadow-md" />
                                <circle cx="0" cy="-35" r="11" fill="url(#goldenPillarGrad)" />
                                <text x="0" y="-31" textAnchor="middle" fontSize="12">⭐</text>

                                {/* Festive Banners on Left & Right Pillars */}
                                <g transform="translate(-62, -2)">
                                  <path d="M 0 0 L -12 -5 L 0 -10 Z" fill="#ef4444" />
                                </g>
                                <g transform="translate(62, -2)">
                                  <path d="M 0 0 L 12 -5 L 0 -10 Z" fill="#3b82f6" />
                                </g>
                              </g>
                            );
                          })()}
                        </g>
                    </svg>



                    {/* TOP FINISH GOAL TROPHY BADGE (HTML for a perfect round circle) */}
                    <div
                      style={{ left: "50%", top: "4%" }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center"
                    >
                      <div className="relative flex items-center justify-center">
                        {/* Glowing backdrop aura */}
                        <div className="absolute -inset-2.5 rounded-full bg-amber-400 blur-md opacity-80 animate-pulse" />
                        
                        {/* Outer Gold Disc Container */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-xl flex items-center justify-center relative z-10 border-4 border-amber-400 ring-4 ring-amber-200">
                          {/* Inner Gradient Circle with Trophy */}
                          <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 shadow-md flex items-center justify-center text-2xl sm:text-3xl text-white">
                            🏆
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-1.5 px-3 py-1 rounded-full bg-amber-500 text-white font-black text-[10px] sm:text-xs shadow-md border border-amber-300 flex items-center gap-1" dir="rtl">
                        <span>کۆتایا قۆناغێ</span>
                        <Sparkles className="w-3 h-3 text-amber-200" />
                      </div>
                    </div>

                    {/* INTERACTIVE GIFT BOX IN THE MIDDLE OF THE ROAD (AT BRIDGEMIDX & BRIDGEMIDY) */}
                    <div
                      style={{ left: `${bridgeMidX}%`, top: `${bridgeMidY}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: [-2, 2, -2, 0] }}
                        whileTap={{ scale: 0.92 }}
                        onClick={handleOpenRoadGift}
                        className="relative cursor-pointer group flex flex-col items-center"
                      >
                        {/* Floating Tag Label above Gift Box */}
                        <div
                          className="mb-1 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 via-amber-500 to-orange-500 text-white font-black text-[10px] sm:text-xs shadow-lg border border-amber-300 flex items-center gap-1.5 animate-bounce whitespace-nowrap"
                          dir="rtl"
                          style={{ animationDuration: "2s" }}
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                          <span>دیاریا ناو ڕێکێ 🎁</span>
                          <span className="text-[9px] bg-white/20 px-1.5 py-0.2 rounded text-amber-100">کلیک بکە</span>
                        </div>

                        {/* Radiant Glow Behind Gift Box */}
                        <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-amber-400 via-purple-500 to-orange-400 blur-md opacity-85 animate-pulse" />

                        {/* Purple Gift Box with Orange Ribbon SVG */}
                        <div className="relative z-10 transition-all duration-300 group-hover:drop-shadow-[0_12px_24px_rgba(168,85,247,0.7)]">
                          <PurpleGiftBoxSVG size={72} isOpen={isGiftOpening || showGiftModal} />
                        </div>

                        {/* Interactive Pulsing Ring on Ground */}
                        <div className="absolute bottom-0 w-16 h-4 bg-amber-400/40 rounded-full blur-xs animate-ping -z-10" />
                      </motion.div>
                    </div>

                    {/* SUBTLE & TASTEFUL DECORATIONS STRICTLY AT OUTER MARGINS (CLEAR OF ROAD & NODE CARDS) */}
                    
                    {/* Top Goal Area (y = 4%) */}
                    <div style={{ left: "2%", top: "4%" }} className="absolute -translate-y-1/2 z-10 pointer-events-none scale-70 sm:scale-85">
                      <PureSvgNatureTree variant="pink-blossom" />
                      <div className="absolute -top-3 -right-3">
                        <AnimatedButterfly color="#38bdf8" />
                      </div>
                    </div>
                    <div style={{ right: "2%", top: "4%" }} className="absolute -translate-y-1/2 z-10 pointer-events-none scale-75 sm:scale-90">
                      <KurdishSunEmblem />
                    </div>

                    {/* Level 6 Area (y = 18% - Node is centered at x = 50%) */}
                    <div style={{ left: "2%", top: "18%" }} className="absolute -translate-y-1/2 z-10 pointer-events-none scale-75 sm:scale-85">
                      <Pure3DLetterCubePyramid letters={["پ", "چ", "ژ"]} />
                    </div>
                    <div style={{ right: "2%", top: "18%" }} className="absolute -translate-y-1/2 z-10 pointer-events-none scale-70 sm:scale-80">
                      <PureSvgNatureTree variant="pine-tree" />
                    </div>

                    {/* Level 5 Area (y = 32% - Node curves LEFT to x = 32%, so decorations go on the RIGHT) */}
                    <div style={{ right: "2%", top: "32%" }} className="absolute -translate-y-1/2 z-10 pointer-events-none scale-75 sm:scale-85">
                      <KurdishMountainPeak />
                    </div>
                    <div style={{ right: "4%", top: "36%" }} className="absolute -translate-y-1/2 z-0 pointer-events-none">
                      <PureSvgGrassPatch size="sm" />
                    </div>

                    {/* Level 4 Area (y = 47% - Node curves RIGHT to x = 68%, so decorations go on the LEFT) */}
                    <div style={{ left: "2%", top: "47%" }} className="absolute -translate-y-1/2 z-10 pointer-events-none scale-75 sm:scale-85">
                      <KurdishScrollQuill />
                    </div>
                    <div style={{ left: "4%", top: "51%" }} className="absolute -translate-y-1/2 z-0 pointer-events-none">
                      <PureSvgGrassPatch size="sm" />
                    </div>

                    {/* Level 3 Area (y = 61% - Node curves LEFT to x = 32%, so decorations go on the RIGHT) */}
                    <div style={{ right: "2%", top: "61%" }} className="absolute -translate-y-1/2 z-10 pointer-events-none scale-70 sm:scale-80">
                      <PureSvgNatureTree variant="autumn-tree" />
                      <div className="absolute -top-3 -right-2">
                        <AnimatedButterfly color="#f472b6" />
                      </div>
                    </div>
                    <div style={{ right: "4%", top: "65%" }} className="absolute -translate-y-1/2 z-0 pointer-events-none">
                      <PureSvgGrassPatch size="sm" />
                    </div>

                    {/* Level 2 Area (y = 76% - Node curves RIGHT to x = 68%, so decorations go on the LEFT) */}
                    <div style={{ left: "2%", top: "76%" }} className="absolute -translate-y-1/2 z-10 pointer-events-none scale-75 sm:scale-85">
                      <KurdishOpenBookTrophy />
                    </div>
                    <div style={{ left: "4%", top: "80%" }} className="absolute -translate-y-1/2 z-0 pointer-events-none">
                      <PureSvgGrassPatch size="sm" />
                    </div>

                    {/* Level 1 Area (y = 90% - Node is centered at x = 50%) */}
                    <div style={{ left: "2%", top: "90%" }} className="absolute -translate-y-1/2 z-10 pointer-events-none scale-75 sm:scale-85">
                      <Pure3DLetterCubePyramid letters={["ڤ", "گ", "ڕ"]} />
                    </div>
                    <div style={{ right: "2%", top: "90%" }} className="absolute -translate-y-1/2 z-10 pointer-events-none scale-70 sm:scale-80">
                      <PureSvgNatureTree variant="pine-tree" />
                    </div>

                    {config.nodes.map((node, index) => {
                      const nodeTitle = language === "badini" ? node.titleBadini : language === "ku" ? node.titleKu : node.titleEn;
                      const isDuoHere = duoNodeId === node.id;
                      const pos = nodePositions[index] || { x: 50, y: 50 };

                      return (
                        <div
                          key={node.id}
                          ref={index === 0 ? level1Ref : null}
                          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                          className="absolute -translate-x-1/2 -translate-y-10 z-10"
                        >
                          <motion.div
                            initial={{ scale: 0.85, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            onClick={() => {
                              handleMoveDuo(node.id);
                              setSelectedNode(node);
                              onStartQuiz(`${config.titleEn} - ${nodeTitle}`);
                            }}
                            className="relative group cursor-pointer flex flex-col items-center w-[170px] xs:w-[195px] sm:w-[230px] active:scale-95 transition-all duration-300"
                          >
                            {/* DUAL CHARACTERS FLOATING DIRECTLY ON NODE */}
                            {isDuoHere && (
                              <motion.div
                                layoutId="duoWalker"
                                initial={{ y: -20, opacity: 0, scale: 0.8 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                                className="absolute -top-24 sm:-top-28 z-40 flex flex-col items-center pointer-events-none"
                              >
                                <div
                                  className="mb-1.5 px-4 py-1.5 rounded-full bg-white text-slate-900 font-black text-[10px] sm:text-xs shadow-md border border-slate-200/90 flex items-center justify-center whitespace-nowrap"
                                  dir="rtl"
                                >
                                  <span>دەست ب دەست، پێکڤە بەرڤ پێش!</span>
                                </div>

                                <div className="scale-80 xs:scale-90 sm:scale-100">
                                  <HoldingHandsDuoCode size="sm" walking={isDuoWalking} userName={userName} />
                                </div>
                              </motion.div>
                            )}

                            {/* NODE CIRCLE BADGE */}
                            <div className="relative z-20 flex flex-col items-center justify-center">
                              {(node.status === "current" || isDuoHere) && (
                                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-300 blur-md opacity-90 animate-pulse z-0" />
                              )}

                              {/* Solid Opaque Base Disc Masking Road Line */}
                              <div
                                className={`w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-white shadow-xl flex items-center justify-center relative z-10 border-4 transition-all duration-300 ${
                                  node.status === "completed"
                                    ? "border-purple-300 ring-4 ring-purple-100"
                                    : node.status === "current" || isDuoHere
                                    ? "border-amber-400 ring-4 ring-amber-200"
                                    : "border-purple-200 ring-4 ring-purple-100"
                                }`}
                              >
                                {/* Inner Node Number Badge */}
                                <div
                                  className={`w-13 h-13 sm:w-16 sm:h-16 rounded-full border-2 border-white shadow-md flex flex-col items-center justify-center relative z-20 transition-all duration-300 ${
                                    node.status === "completed"
                                      ? "bg-gradient-to-tr from-purple-700 via-indigo-600 to-violet-600 text-white group-hover:scale-105"
                                      : node.status === "current" || isDuoHere
                                      ? "bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 text-white scale-105 shadow-[0_0_20px_rgba(245,158,11,0.7)]"
                                      : "bg-gradient-to-tr from-purple-800 via-indigo-600 to-violet-600 text-white"
                                  }`}
                                >
                                  {node.status === "locked" ? (
                                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-slate-200 drop-shadow" />
                                  ) : (
                                    <div className="flex flex-col items-center">
                                      <span className="text-base sm:text-xl font-black text-white leading-none drop-shadow">
                                        {node.number}
                                      </span>
                                      <div className="flex items-center gap-0.5 mt-0.5">
                                        {[1, 2, 3].map((starIdx) => {
                                          const isEarned = starIdx <= node.stars;
                                          return (
                                            <motion.div
                                              key={starIdx}
                                              initial={isEarned ? { scale: 0, rotate: -30 } : { scale: 0.85 }}
                                              animate={isEarned ? { scale: 1, rotate: 0 } : { scale: 0.85 }}
                                              transition={{
                                                delay: 0.08 * starIdx,
                                                type: "spring",
                                                stiffness: 420,
                                                damping: 11
                                              }}
                                              className="relative flex items-center justify-center"
                                            >
                                              <Star
                                                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 transition-all duration-300 ${
                                                  isEarned
                                                    ? "text-amber-300 fill-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,1)] scale-110"
                                                    : "text-white/30 fill-white/10"
                                                }`}
                                              />
                                              {isEarned && (
                                                <motion.span
                                                  initial={{ opacity: 0, scale: 0 }}
                                                  animate={{ opacity: [0, 1, 0], scale: [0.4, 1.6, 0] }}
                                                  transition={{
                                                    delay: 0.08 * starIdx + 0.2,
                                                    duration: 1.1,
                                                    repeat: Infinity,
                                                    repeatDelay: 2
                                                  }}
                                                  className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-white rounded-full blur-[0.2px] pointer-events-none"
                                                />
                                              )}
                                            </motion.div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Topic Card Banner Attached Under Node */}
                            <div className="mt-2.5 w-full p-2.5 sm:p-3.5 rounded-[20px] sm:rounded-[24px] bg-white border-2 border-purple-200/90 group-hover:border-purple-500 shadow-lg transition-all duration-300 z-10 flex flex-col items-center">
                              <div className="flex items-center gap-1.5 sm:gap-2 mb-2 w-full justify-center" dir="rtl">
                                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-purple-600 text-white font-black flex items-center justify-center text-[10px] sm:text-xs shadow-sm shrink-0">
                                  {node.number}
                                </div>
                                <h4 className="text-[11px] sm:text-sm font-black text-slate-900 leading-snug text-center flex-1">
                                  {nodeTitle}
                                </h4>
                              </div>

                              {/* Star Rating Badge with Animated Spring Pops */}
                              {/* Star Rating Badge with Animated Spring Pops & Sparkles */}
                              <div className={`w-fit mx-auto px-3 sm:px-4 py-1.5 rounded-full border transition-all duration-300 flex items-center justify-center gap-2 ${
                                node.stars > 0
                                  ? "bg-gradient-to-r from-amber-50 via-amber-100 to-yellow-100/90 border-amber-300 shadow-[0_2px_12px_rgba(245,158,11,0.3)] ring-2 ring-amber-200/50"
                                  : "bg-purple-50/50 border-purple-100/80"
                              }`}>
                                {[1, 2, 3].map((starIdx) => {
                                  const isEarned = starIdx <= node.stars;
                                  return (
                                    <motion.div
                                      key={starIdx}
                                      initial={isEarned ? { scale: 0, y: 8, rotate: -20 } : { scale: 0.85 }}
                                      animate={isEarned ? { scale: 1, y: 0, rotate: 0 } : { scale: 0.85 }}
                                      transition={{
                                        delay: starIdx * 0.12 + 0.1,
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 12
                                      }}
                                      className="relative flex items-center justify-center"
                                    >
                                      <Star
                                        className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                                          isEarned
                                            ? "text-amber-400 fill-amber-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.85)] scale-105"
                                            : "text-purple-300/60 fill-purple-100/30 opacity-40"
                                        }`}
                                      />
                                      {isEarned && (
                                        <motion.span
                                          initial={{ opacity: 0, scale: 0 }}
                                          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.8, 0] }}
                                          transition={{ delay: starIdx * 0.12 + 0.25, duration: 0.9, repeat: Infinity, repeatDelay: 2.5 }}
                                          className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-amber-200 rounded-full blur-[0.4px]"
                                        />
                                      )}
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}


              </div>
            );
          })()}
            </div>

          </div>



        </div>
        )}

      </div>

      {/* VIDEO LESSON PLAYER MODAL */}
      <AnimatePresence>
        {selectedVideoLesson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl lg:max-w-5xl max-h-[95vh] bg-white dark:bg-slate-900 rounded-[28px] sm:rounded-[32px] border border-purple-200 dark:border-purple-800 shadow-2xl overflow-y-auto flex flex-col text-right my-auto"
              dir="rtl"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-purple-200">
                      {selectedVideoLesson.chapterTitle}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                      {selectedVideoLesson.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedVideoLesson(null)}
                  className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player Box */}
              <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
                <video
                  src={selectedVideoLesson.videoUrl || "/public/bhez.webm"}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  poster={config.mascot}
                />
              </div>

              {/* Lesson Details & Actions */}
              <div className="p-4 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-600" />
                    <span>{selectedVideoLesson.teacher}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>{selectedVideoLesson.duration}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-black text-purple-800 dark:text-purple-300 block mb-1">
                    💡 تێبینیێن سەرەکی یێن ڤێ وانەیێ:
                  </span>
                  ئەم وانەیە تایبەتە بە پێناسە، یاسا بنەڕەتییەکان و شیکارکردنی ئەو پرسیارە وزارییانەی لە ئەزموونە گشتییەکاندا هاتوونەتەوە. پاش تەواوبوونی وانەکە، بەشداربە لە تاقیکردنەوە بۆ دڵنیابوون لە ئاستت.
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setSelectedVideoLesson(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-black text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    داخستن
                  </button>
                  <button
                    onClick={() => {
                      setSelectedVideoLesson(null);
                      onStartQuiz(subject.id);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black shadow-md shadow-purple-600/30 transition active:scale-95 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تاقیکرن لسەر ڤێ وانەیێ 🎯</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUMMARY & FORMULA NOTES MODAL */}
      <AnimatePresence>
        {selectedSummaryLesson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl lg:max-w-3xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-[28px] sm:rounded-[32px] border border-purple-200 dark:border-purple-800 shadow-2xl overflow-y-auto flex flex-col text-right my-auto"
              dir="rtl"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-purple-200">
                      {selectedSummaryLesson.chapterTitle}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                      {selectedSummaryLesson.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSummaryLesson(null)}
                  className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Summary Points List */}
              <div className="p-5 sm:p-6 space-y-3">
                <span className="text-xs font-black text-purple-600 dark:text-purple-400 block">
                  📝 پوختە و یاسایێن گرنگ یێن وزاری:
                </span>

                <div className="space-y-2.5">
                  {selectedSummaryLesson.summaryPoints.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-purple-100 dark:border-purple-800/40 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                        {pIdx + 1}
                      </span>
                      <p className="flex-1 leading-relaxed">{pt}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedSummaryLesson(null)}
                  className="w-full mt-4 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black shadow-md shadow-purple-600/30 transition active:scale-95"
                >
                  دەستخۆش، تێگەهشتم ✨
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showGiftModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              className="relative w-full max-w-md bg-white rounded-[32px] border-4 border-amber-400 p-6 sm:p-8 shadow-[0_25px_60px_rgba(245,158,11,0.4)] flex flex-col items-center text-center overflow-hidden"
            >
              {/* Top Banner Sparkles */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-400 via-purple-500 to-indigo-500" />

              {/* Character Giving Gift Illustration */}
              <div className="relative my-3 flex flex-col items-center">
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-purple-100 via-amber-100 to-orange-100 border-2 border-amber-300 flex items-center justify-center shadow-inner relative overflow-visible">
                  <div className="scale-110 animate-bounce" style={{ animationDuration: "2s" }}>
                    <PurpleGiftBoxSVG size={84} isOpen={true} />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full p-1.5 shadow-md">
                    <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: "6s" }} />
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-center gap-2">
                  <HoldingHandsDuoCode size="sm" walking={false} userName={userName} />
                </div>
              </div>

              {/* Title & Kurdish Greeting */}
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug mb-2" dir="rtl">
                🎁 پیرۆزە {userName}! تە دیاریا ناو ڕێکێ ڤەکر
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-600 leading-relaxed mb-6" dir="rtl">
                دەستخۆش! تە دیاریەکا ب نرخ و تایبەت ل سەر ڕێکا خۆ یا خواندنێ لێگەڕیا و گەهشتێ. هەمی خەڵات هاتنە تۆمارکرن د هەژمارا تە دا!
              </p>

              {/* Gift Rewards Cards Grid */}
              <div className="w-full grid grid-cols-2 gap-3 mb-6" dir="rtl">
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-2.5 text-right">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center text-lg shadow-sm shrink-0">
                    🎓
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-amber-950">بڕوانامە</span>
                    <span className="text-[10px] font-bold text-amber-700">پلەیا باڵا</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center gap-2.5 text-right">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500 text-white flex items-center justify-center text-lg shadow-sm shrink-0">
                    💎
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-cyan-950">+500 ئەلماس</span>
                    <span className="text-[10px] font-bold text-cyan-700">دیاریا خۆڕایی</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 flex items-center gap-2.5 text-right">
                  <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center text-lg shadow-sm shrink-0">
                    🔥
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-purple-950">+100 ژیری</span>
                    <span className="text-[10px] font-bold text-purple-700">ئاستێ بلنتر</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-right">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg shadow-sm shrink-0">
                    🏆
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-emerald-950">کاپا زێڕین</span>
                    <span className="text-[10px] font-bold text-emerald-700">پاڵەوانی وەرزی</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={() => {
                  setGiftClaimed(true);
                  setTimeout(() => {
                    setShowGiftModal(false);
                  }, 1200);
                }}
                disabled={giftClaimed}
                className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm shadow-lg transition active:scale-95 flex items-center justify-center gap-2 ${
                  giftClaimed
                    ? "bg-emerald-600 text-white cursor-default"
                    : "bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 shadow-amber-500/30"
                }`}
                dir="rtl"
              >
                {giftClaimed ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    <span>دیاری هاتە وەرگرتن! 🎈</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-slate-950" />
                    <span>وەرگرتنا دیاریێ 🎁</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowGiftModal(false)}
                className="mt-3 text-xs font-black text-slate-400 hover:text-slate-600 transition"
              >
                داخستن
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
