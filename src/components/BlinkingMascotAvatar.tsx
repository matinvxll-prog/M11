import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export type MascotState =
  | 'auto'
  | 'focusTime'
  | 'focusCountdown'
  | 'shortBreak'
  | 'longBreak'
  | 'timerEnd'
  | 'paused'
  | 'warning'
  | 'taskComplete'
  | 'lowEnergy'
  | 'motivation';

interface BlinkingMascotAvatarProps {
  className?: string;
  size?: number;
  isTimerRunning?: boolean;
  isPaused?: boolean;
  timerSeconds?: number;
  initialSeconds?: number;
  timerMode?: 'work' | 'pomodoro' | 'shortBreak' | 'longBreak' | 'custom';
  language?: string;
  showSpeechBubble?: boolean;
  forcedState?: MascotState;
  showStateSelector?: boolean;
  onStateChange?: (state: MascotState) => void;
}

export const BlinkingMascotAvatar: React.FC<BlinkingMascotAvatarProps> = ({
  className = '',
  size = 180,
  isTimerRunning = false,
  isPaused = false,
  timerSeconds = 1500,
  initialSeconds = 1500,
  timerMode = 'pomodoro',
  language = 'ku',
  showSpeechBubble = true,
  forcedState = 'auto',
  showStateSelector = false,
  onStateChange,
}) => {
  const [selectedState, setSelectedState] = useState<MascotState>(forcedState);
  const isBadini = language === 'badini' || language === 'ku';

  // Sync forcedState prop
  useEffect(() => {
    setSelectedState(forcedState);
  }, [forcedState]);

  // Compute active state automatically if set to 'auto'
  const computedState = (): MascotState => {
    if (selectedState !== 'auto') return selectedState;

    if (timerSeconds === 0) return 'timerEnd';
    if (isPaused) return 'paused';
    if (timerMode === 'shortBreak') return 'shortBreak';
    if (timerMode === 'longBreak') return 'longBreak';

    if (isTimerRunning) {
      if (timerSeconds <= 180) return 'warning'; // under 3 min
      if (timerSeconds <= 600) return 'focusCountdown'; // under 10 min
      return 'focusTime';
    }

    return 'motivation';
  };

  const activeState = computedState();

  // Speech bubble text for each state
  const getSpeechMessage = () => {
    switch (activeState) {
      case 'focusTime':
        return isBadini ? "خویندن و تەرکیزا تەمام 💻" : "Concentrated & happy studying 💻";
      case 'focusCountdown':
        return isBadini ? "چاوەڕێیا بڕینەڤەیا دەمی ⏳" : "Determined countdown running ⏳";
      case 'shortBreak':
        return isBadini ? "ئارام ببوون، تامکرنا فنجانەکا قەهویێ ☕" : "Relaxed & calm, enjoying break ☕";
      case 'longBreak':
        return isBadini ? "پشووا درێژ، دەمێ وەرگرتنا نوو بوونا وزێ 🍕" : "Very relaxed, time to recharge 🍕";
      case 'timerEnd':
        return isBadini ? "پیرۆزە! پمودۆرۆ ب سەرکەفتن ب دوماهی هات 🎉" : "Pomodoro complete, celebrating! 🎉";
      case 'paused':
        return isBadini ? "تایمەر هاتە راگرتن، چاوەڕێیا بەردەوامیێ ⏸️" : "Timer paused, waiting to continue ⏸️";
      case 'warning':
        return isBadini ? "کەم دەم مایە! بەردەوام بە ⚠️" : "Almost time's up, stay focused! ⚠️";
      case 'taskComplete':
        return isBadini ? "ئەرک ب دوماهی هات، دەستخۆش! ✅" : "Task completed, great job! ✅";
      case 'lowEnergy':
        return isBadini ? "مەاندی بووی، نێزیکە پشوویەکێ وەربگری 🪫" : "Feeling tired, take a break soon 🪫";
      case 'motivation':
        return isBadini ? "بەرخودانێ بکە! تۆ دشێی بکەی 👍⭐" : "Stay strong! You can do it! 👍⭐";
      default:
        return isBadini ? "ئامادەی بۆ دەستپێکرنا تایمەری؟ 🚀" : "Ready to launch your timer? 🚀";
    }
  };

  // Format countdown string
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* MOTIVATIONAL SPEECH BUBBLE ABOVE MASCOT */}
      {showSpeechBubble && size > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeState}
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="absolute -top-16 sm:-top-20 z-30 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-2xl bg-slate-900/95 border border-purple-400/50 text-purple-100 font-bold text-[10px] sm:text-xs shadow-2xl shadow-purple-950/80 whitespace-nowrap backdrop-blur-md flex items-center gap-1.5 pointer-events-auto"
          >
            <span>{getSpeechMessage()}</span>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-b border-r border-purple-400/50 rotate-45" />
          </motion.div>
        </AnimatePresence>
      )}

      {/* MASCOT ANIMATED CONTAINER */}
      {size > 0 && (
        <motion.div
          style={{ width: size, height: size }}
          animate={{
            y: activeState === 'timerEnd' ? [-6, 6, -6] : activeState === 'shortBreak' || activeState === 'longBreak' ? [-2, 2, -2] : isTimerRunning ? [-4, 4, -4] : [-2, 2, -2],
            scale: activeState === 'timerEnd' ? [1, 1.06, 1] : activeState === 'warning' ? [0.98, 1.03, 0.98] : [1, 1, 1],
            rotate: activeState === 'timerEnd' ? [-2, 2, -2] : activeState === 'lowEnergy' ? [0, -1, 0] : 0,
          }}
          transition={{
            duration: activeState === 'timerEnd' ? 1.2 : activeState === 'warning' ? 1.0 : 3.0,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative flex items-center justify-center"
        >
        {/* BACKGROUND GLOW RAYS FOR TIMER END / MOTIVATION */}
        {(activeState === 'timerEnd' || activeState === 'taskComplete') && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/30 via-purple-500/30 to-emerald-400/30 blur-2xl animate-pulse" />
        )}

        {/* 3D SVG MASCOT CHARACTER */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_12px_32px_rgba(124,58,237,0.5)]"
        >
          <defs>
            {/* Main Body 3D Purple Gradient */}
            <linearGradient id="bodyGradient" x1="40" y1="20" x2="160" y2="210" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="40%" stopColor="#9333ea" />
              <stop offset="85%" stopColor="#7e22ce" />
              <stop offset="100%" stopColor="#581c87" />
            </linearGradient>

            {/* Break Teal/Blue Body */}
            <linearGradient id="breakBodyGrad" x1="40" y1="20" x2="160" y2="210" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>

            {/* Antenna Bulb Gradient */}
            <linearGradient id="antennaGradient" x1="90" y1="10" x2="110" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={activeState === 'timerEnd' ? '#fef08a' : '#d8b4fe'} />
              <stop offset="100%" stopColor={activeState === 'timerEnd' ? '#eab308' : '#9333ea'} />
            </linearGradient>

            {/* Face Visor Gradient */}
            <linearGradient id="faceGradient" x1="60" y1="65" x2="140" y2="135" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f5f3ff" />
              <stop offset="100%" stopColor="#ddd6fe" />
            </linearGradient>

            {/* Body Gloss */}
            <linearGradient id="glossHighlight" x1="70" y1="25" x2="130" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Arms Gradients */}
            <linearGradient id="leftArmGrad" x1="20" y1="110" x2="50" y2="170" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={activeState === 'shortBreak' || activeState === 'longBreak' ? '#38bdf8' : '#a855f7'} />
              <stop offset="100%" stopColor={activeState === 'shortBreak' || activeState === 'longBreak' ? '#0369a1' : '#6b21a8'} />
            </linearGradient>

            <linearGradient id="rightArmGrad" x1="150" y1="110" x2="180" y2="170" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={activeState === 'shortBreak' || activeState === 'longBreak' ? '#38bdf8' : '#a855f7'} />
              <stop offset="100%" stopColor={activeState === 'shortBreak' || activeState === 'longBreak' ? '#0369a1' : '#6b21a8'} />
            </linearGradient>

            <linearGradient id="haloGrad" x1="0" y1="0" x2="200" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(255,255,255,0.75)" />
              <stop offset="50%" stopColor="rgba(192,132,252,0.6)" />
              <stop offset="100%" stopColor="rgba(124,58,237,0.3)" />
            </linearGradient>
          </defs>

          {/* OUTSIDE GLOWING HALO CIRCULAR RING */}
          <circle
            cx="100"
            cy="115"
            r="92"
            stroke="url(#haloGrad)"
            strokeWidth={isTimerRunning ? "3" : "2"}
            strokeDasharray={isTimerRunning ? "6 4" : "none"}
            fill="none"
            opacity={0.65}
            className={isTimerRunning ? "animate-spin-slow" : ""}
          />

          {/* Ground Shadow */}
          <ellipse cx="100" cy="208" rx="44" ry="8" fill="#3b0764" fillOpacity="0.35" filter="blur(3px)" />

          {/* --- STATE 4: LONG BREAK BEANBAG CUSHION --- */}
          {activeState === 'longBreak' && (
            <g id="beanbag">
              <path
                d="M 25 150 Q 100 135 175 150 C 198 185 165 212 100 212 C 35 212 2 185 25 150 Z"
                fill="#4c1d95"
                stroke="#6d28d9"
                strokeWidth="3"
              />
              <path
                d="M 40 162 Q 100 148 160 162"
                stroke="#8b5cf6"
                strokeWidth="2.5"
                fill="none"
                opacity="0.6"
              />
            </g>
          )}

          {/* TOP ANTENNA SPROUT */}
          <path
            d="M96 35 C94 22 96 14 104 12 C110 10 112 18 102 33 Z"
            fill="url(#antennaGradient)"
          />

          {/* ANTENNA BULB */}
          <circle
            cx="105"
            cy="13"
            r={isTimerRunning ? "8" : "7"}
            fill={activeState === 'timerEnd' ? '#fde047' : activeState === 'warning' ? '#f97316' : '#c084fc'}
            className={isTimerRunning ? 'animate-pulse' : ''}
          />

          {/* --- STATE 5: TIMER END CELEBRATION ARMS & CONFETTI --- */}
          {activeState === 'timerEnd' && (
            <g id="confetti">
              <rect x="25" y="25" width="6" height="12" rx="1" fill="#facc15" transform="rotate(20 25 25)" />
              <rect x="170" y="30" width="8" height="8" rx="1" fill="#38bdf8" transform="rotate(-30 170 30)" />
              <rect x="35" y="65" width="7" height="7" rx="1" fill="#f43f5e" transform="rotate(45 35 65)" />
              <rect x="160" y="70" width="6" height="10" rx="1" fill="#4ade80" transform="rotate(15 160 70)" />
              <circle cx="20" cy="45" r="3" fill="#c084fc" />
              <circle cx="180" cy="55" r="4" fill="#fef08a" />
            </g>
          )}

          {/* --- ARMS RENDERING BASED ON STATE --- */}
          {activeState === 'timerEnd' ? (
            /* Celebrating Arms raised up */
            <>
              <path d="M 48 115 C 22 75 12 52 32 40 C 42 35 50 50 48 70 Z" fill="url(#leftArmGrad)" />
              <path d="M 152 115 C 178 75 188 52 168 40 C 158 35 150 50 152 70 Z" fill="url(#rightArmGrad)" />
            </>
          ) : activeState === 'shortBreak' ? (
            /* Arms holding coffee mug in center */
            <>
              <path d="M 48 115 C 32 125 55 142 85 138 Z" fill="url(#leftArmGrad)" />
              <path d="M 152 115 C 168 125 145 142 115 138 Z" fill="url(#rightArmGrad)" />
            </>
          ) : activeState === 'longBreak' ? (
            /* Relaxed arms holding pizza slice */
            <>
              <path d="M 48 118 C 30 128 55 145 90 142 Z" fill="url(#leftArmGrad)" />
              <path d="M 152 118 C 170 128 145 145 110 142 Z" fill="url(#rightArmGrad)" />
            </>
          ) : activeState === 'focusTime' ? (
            /* Hands on laptop keyboard */
            <>
              <path d="M 48 115 C 38 135 48 168 66 172 Z" fill="url(#leftArmGrad)" />
              <path d="M 152 115 C 162 135 152 168 134 172 Z" fill="url(#rightArmGrad)" />
            </>
          ) : (
            /* Standard Arms */
            <>
              <path d="M48 115 C30 125 22 145 28 165 C34 178 46 172 52 155 Z" fill="url(#leftArmGrad)" />
              <path d="M152 115 C170 125 178 145 172 165 C166 178 154 172 148 155 Z" fill="url(#rightArmGrad)" />
            </>
          )}

          {/* MAIN TEARDROP 3D BODY */}
          <path
            d="M100 28 C152 28 172 65 170 120 C168 170 135 200 100 206 C65 200 32 170 30 120 C28 65 48 28 100 28 Z"
            fill={activeState === 'shortBreak' || activeState === 'longBreak' ? "url(#breakBodyGrad)" : "url(#bodyGradient)"}
          />

          {/* 3D GLOSS HIGHLIGHT */}
          <path
            d="M100 32 C135 32 150 55 152 88 C135 55 105 45 70 52 C78 38 89 32 100 32 Z"
            fill="url(#glossHighlight)"
          />

          {/* FACE SCREEN / MASK INNER RIM */}
          <path
            d="M100 60 C132 60 144 74 142 106 C140 132 125 142 100 142 C75 142 60 132 58 106 C56 74 68 60 100 60 Z"
            fill={activeState === 'shortBreak' || activeState === 'longBreak' ? "#0369a1" : "#581c87"}
          />

          {/* FACE SCREEN / CREME MASK */}
          <path
            d="M100 63 C130 63 140 76 138 105 C136 129 123 138 100 138 C77 138 64 129 62 105 C60 76 70 63 100 63 Z"
            fill="url(#faceGradient)"
          />

          {/* --- EYEBROWS RENDERING --- */}
          {activeState === 'focusCountdown' ? (
            /* Determined slanted eyebrows */
            <g id="eyebrows">
              <path d="M 70 82 L 92 88" stroke="#3b0764" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 130 82 L 108 88" stroke="#3b0764" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          ) : activeState === 'paused' || activeState === 'warning' || activeState === 'lowEnergy' ? (
            /* Worried / Sad angled eyebrows */
            <g id="eyebrows">
              <path d="M 72 86 L 92 80" stroke="#3b0764" strokeWidth="3" strokeLinecap="round" />
              <path d="M 128 86 L 108 80" stroke="#3b0764" strokeWidth="3" strokeLinecap="round" />
            </g>
          ) : null}

          {/* --- EYES RENDERING BASED ON STATE (Smiling Eyes ^ ^) --- */}
          <g id="eyesGroup">
            {activeState === 'shortBreak' || activeState === 'longBreak' ? (
              /* Peaceful closed arc eyes ^ ^ */
              <>
                <path d="M76 96 Q84 104 92 96" stroke="#1e1b4b" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                <path d="M108 96 Q116 104 124 96" stroke="#1e1b4b" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              </>
            ) : activeState === 'lowEnergy' ? (
              /* Sleepy flat line eyes -- -- */
              <>
                <line x1="75" y1="96" x2="93" y2="96" stroke="#3b0764" strokeWidth="4" strokeLinecap="round" />
                <line x1="107" y1="96" x2="125" y2="96" stroke="#3b0764" strokeWidth="4" strokeLinecap="round" />
              </>
            ) : activeState === 'motivation' ? (
              /* Left star/happy eye, Right winking eye */
              <>
                <path d="M77 98 Q85 86 93 98" stroke="#2e1065" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M107 98 L123 98" stroke="#2e1065" strokeWidth="4.5" strokeLinecap="round" />
              </>
            ) : activeState === 'timerEnd' || activeState === 'taskComplete' ? (
              /* Star happy eyes */
              <>
                <path d="M84 90 L86 94 L90 95 L87 98 L88 102 L84 100 L80 102 L81 98 L78 95 L82 94 Z" fill="#7c3aed" />
                <path d="M116 90 L118 94 L122 95 L119 98 L120 102 L116 100 L112 102 L113 98 L110 95 L114 94 Z" fill="#7c3aed" />
              </>
            ) : (
              /* Signature cute smiling arch eyes (^ ^) - چاڤێن ب گرنژین بێ گرتن و ڤەکرن */
              <>
                <path d="M77 98 Q85 86 93 98" stroke="#2e1065" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M107 98 Q115 86 123 98" stroke="#2e1065" strokeWidth="5" strokeLinecap="round" fill="none" />
              </>
            )}
          </g>

          {/* --- DYNAMIC MOUTH --- */}
          {activeState === 'timerEnd' || activeState === 'taskComplete' ? (
            /* Open joyful mouth with tongue */
            <g id="openMouth">
              <path d="M90 108 Q100 128 110 108 Z" fill="#2e1065" />
              <path d="M94 118 Q100 127 106 118 Z" fill="#f43f5e" />
            </g>
          ) : activeState === 'warning' ? (
            /* Small worried 'o' mouth */
            <circle cx="100" cy="114" r="4.5" fill="#2e1065" />
          ) : activeState === 'paused' || activeState === 'lowEnergy' ? (
            /* Pouting sad curve mouth */
            <path d="M94 116 Q100 110 106 116" stroke="#2e1065" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          ) : activeState === 'focusCountdown' ? (
            /* Focused straight line mouth */
            <path d="M94 113 L106 113" stroke="#2e1065" strokeWidth="3.5" strokeLinecap="round" />
          ) : (
            /* Standard open joyful smile matching user image */
            <path
              d="M 92,108 Q 100,107 108,108 C 108,119 92,119 92,108 Z"
              fill="#2e1065"
              stroke="#2e1065"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          )}

          {/* CHEEK BLUSH */}
          <ellipse cx="73" cy="106" rx="5" ry="3" fill="#f472b6" fillOpacity={activeState === 'focusCountdown' ? "0.4" : "0.7"} />
          <ellipse cx="127" cy="106" rx="5" ry="3" fill="#f472b6" fillOpacity={activeState === 'focusCountdown' ? "0.4" : "0.7"} />

          {/* --- STATE 1: FOCUS TIME LAPTOP ON DESK --- */}
          {activeState === 'focusTime' && (
            <g id="laptopDesk">
              {/* Desk surface */}
              <rect x="25" y="172" width="150" height="12" rx="4" fill="#334155" stroke="#1e293b" strokeWidth="2" />
              {/* Open Laptop screen */}
              <path d="M 68 172 L 74 138 L 126 138 L 132 172 Z" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
              <rect x="76" y="142" width="48" height="26" rx="2" fill="#a855f7" opacity="0.85" />
              <path d="M 80 152 L 96 152" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              <path d="M 80 158 L 110 158" stroke="#e9d5ff" strokeWidth="1.5" strokeLinecap="round" />
              {/* Keyboard base */}
              <path d="M 62 172 L 65 178 L 135 178 L 138 172 Z" fill="#64748b" />
            </g>
          )}

          {/* --- STATE 2: FOCUS COUNTDOWN FLOATING TIMER BADGE --- */}
          {activeState === 'focusCountdown' && (
            <g id="countdownBadge">
              <rect x="132" y="28" width="62" height="26" rx="13" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
              <text x="163" y="45" textAnchor="middle" fill="#c7d2fe" fontSize="12" fontWeight="800" fontFamily="sans-serif">
                {formatTime(timerSeconds)}
              </text>
            </g>
          )}

          {/* --- STATE 3: SHORT BREAK COFFEE CUP & MUSIC NOTES --- */}
          {activeState === 'shortBreak' && (
            <g id="coffeeAndMusic">
              {/* Coffee Cup */}
              <rect x="88" y="125" width="24" height="22" rx="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
              <path d="M 112 130 C 120 130 120 142 112 142" stroke="#0284c7" strokeWidth="2.5" fill="none" />
              {/* Steam */}
              <path d="M 94 120 C 92 112 96 110 94 104" stroke="#e0f2fe" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 104 120 C 102 112 106 110 104 104" stroke="#e0f2fe" strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Music notes */}
              <text x="25" y="60" fill="#38bdf8" fontSize="18" fontWeight="bold">🎵</text>
              <text x="160" y="50" fill="#38bdf8" fontSize="18" fontWeight="bold">🎶</text>
            </g>
          )}

          {/* --- STATE 4: LONG BREAK PIZZA SLICE --- */}
          {activeState === 'longBreak' && (
            <g id="pizzaSlice">
              <path d="M 108 126 L 138 138 L 116 156 Z" fill="#facc15" stroke="#eab308" strokeWidth="1.5" />
              <path d="M 108 126 L 138 138" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
              <circle cx="120" cy="138" r="2.5" fill="#ef4444" />
              <circle cx="126" cy="145" r="2.5" fill="#ef4444" />
            </g>
          )}

          {/* --- STATE 6: PAUSED FLOATING PAUSE BADGE --- */}
          {activeState === 'paused' && (
            <g id="pauseBadge">
              <circle cx="160" cy="50" r="16" fill="#f59e0b" stroke="#fef08a" strokeWidth="2.5" />
              <rect x="152" y="43" width="4" height="14" rx="2" fill="#78350f" />
              <rect x="164" y="43" width="4" height="14" rx="2" fill="#78350f" />
            </g>
          )}

          {/* --- STATE 7: WARNING FLOATING EXCLAMATION BADGE --- */}
          {activeState === 'warning' && (
            <g id="warningBadge">
              <path d="M 160 32 L 178 64 L 142 64 Z" fill="#f97316" stroke="#ffedd5" strokeWidth="2" />
              <text x="160" y="58" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="900">!</text>
            </g>
          )}

          {/* --- STATE 8: TASK COMPLETE CHECKMARK BADGE --- */}
          {activeState === 'taskComplete' && (
            <g id="completeBadge">
              <circle cx="100" cy="156" r="20" fill="#22c55e" stroke="#dcfce7" strokeWidth="3" />
              <path d="M 91 156 L 97 162 L 110 148" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <text x="25" y="70" fill="#facc15" fontSize="16">✦</text>
              <text x="165" y="65" fill="#facc15" fontSize="16">✦</text>
            </g>
          )}

          {/* --- STATE 9: LOW ENERGY FLOATING BATTERY BADGE --- */}
          {activeState === 'lowEnergy' && (
            <g id="batteryBadge">
              <rect x="140" y="38" width="32" height="18" rx="3" fill="#1e1b4b" stroke="#ef4444" strokeWidth="2" />
              <rect x="172" y="43" width="3" height="8" rx="1" fill="#ef4444" />
              <rect x="144" y="42" width="7" height="10" rx="1" fill="#ef4444" />
            </g>
          )}

          {/* --- STATE 10: MOTIVATION THUMBS UP & STAR --- */}
          {activeState === 'motivation' && (
            <g id="motivationAddons">
              {/* Thumbs up hand */}
              <path d="M 152 120 C 165 110 170 95 162 88 C 158 84 150 92 152 105" stroke="#a855f7" strokeWidth="8" strokeLinecap="round" fill="none" />
              {/* Golden Star */}
              <path d="M 165 28 L 168 35 L 175 36 L 170 41 L 171 48 L 165 44 L 159 48 L 160 41 L 155 36 L 162 35 Z" fill="#facc15" stroke="#eab308" strokeWidth="1" />
            </g>
          )}
        </svg>
      </motion.div>
      )}

      {/* OPTIONAL CHARACTER STATE SELECTOR BAR */}
      {showStateSelector && (
        <div className="mt-4 max-w-full overflow-x-auto p-1.5 rounded-2xl bg-slate-900/90 border border-purple-500/30 flex items-center gap-1 sm:gap-1.5 backdrop-blur-md shadow-xl text-xs">
          <button
            type="button"
            onClick={() => { setSelectedState('auto'); onStateChange?.('auto'); }}
            className={`px-2.5 py-1 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
              selectedState === 'auto' ? 'bg-purple-600 text-white' : 'text-purple-300 hover:bg-white/10'
            }`}
          >
            {isBadini ? "ئۆتۆماتیکی (Auto)" : "Auto"}
          </button>
          {[
            { id: 'focusTime' as MascotState, label: isBadini ? "1. خویندن 💻" : "1. Focus Time 💻" },
            { id: 'focusCountdown' as MascotState, label: isBadini ? "2. ژمارن ⏳" : "2. Countdown ⏳" },
            { id: 'shortBreak' as MascotState, label: isBadini ? "3. پشووا کورت ☕" : "3. Short Break ☕" },
            { id: 'longBreak' as MascotState, label: isBadini ? "4. پشووا درێژ 🍕" : "4. Long Break 🍕" },
            { id: 'timerEnd' as MascotState, label: isBadini ? "5. سەرکەفتن 🎉" : "5. Timer End 🎉" },
            { id: 'paused' as MascotState, label: isBadini ? "6. وه‌ستان ⏸️" : "6. Paused ⏸️" },
            { id: 'warning' as MascotState, label: isBadini ? "7. ئاگاداری ⚠️" : "7. Warning ⚠️" },
            { id: 'taskComplete' as MascotState, label: isBadini ? "8. تەواوبوون ✅" : "8. Complete ✅" },
            { id: 'lowEnergy' as MascotState, label: isBadini ? "9. بێ وزە 🪫" : "9. Low Energy 🪫" },
            { id: 'motivation' as MascotState, label: isBadini ? "10. بەرهەڤی 👍" : "10. Motivation 👍" },
          ].map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => { setSelectedState(st.id); onStateChange?.(st.id); }}
              className={`px-2.5 py-1 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
                selectedState === st.id ? 'bg-purple-600 text-white' : 'text-purple-300 hover:bg-white/10'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


