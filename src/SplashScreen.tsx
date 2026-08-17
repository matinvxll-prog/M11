import React, { useState, useEffect } from "react";
import logoImg from "./logo.png.png";
import { AppLogoSvg } from "./components/AppLogo";

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [glowState, setGlowState] = useState<"initial" | "sweeping" | "settled">("initial");

  useEffect(() => {
    // 1. At 1.5s (1500ms), start the golden light sweep effect across logo (matches video 00:02)
    const sweepTimer = setTimeout(() => {
      setGlowState("sweeping");
    }, 1500);

    // 2. At 3.0s (3000ms), settle the glow
    const settleTimer = setTimeout(() => {
      setGlowState("settled");
    }, 3000);

    // 3. At 4.5s (4500ms), when video duration finishes, trigger circular bottom-left reveal exit
    const exitTimer = setTimeout(() => {
      triggerExit();
    }, 4500);

    return () => {
      clearTimeout(sweepTimer);
      clearTimeout(settleTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  const triggerExit = () => {
    if (isExiting) return;
    setIsExiting(true);
    // 1000ms smooth circular clip-path transition shrinking into bottom-left corner
    setTimeout(() => {
      onFinish();
    }, 1000);
  };

  return (
    <div
      dir="rtl"
      className={`fixed inset-0 z-[9999] min-h-screen w-full bg-white flex flex-col items-center justify-center px-6 select-none overflow-hidden transition-all duration-1000 ease-in-out ${
        isExiting
          ? "[clip-path:circle(0%_at_0%_100%)] opacity-0 pointer-events-none"
          : "[clip-path:circle(150%_at_0%_100%)] opacity-100"
      }`}
    >
      {/* Pure White Background */}
      <div className="absolute inset-0 bg-white" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-sm w-full text-center">
        {/* Logo Wrapper */}
        <div className="relative flex items-center justify-center">
          {/* Light flare glow behind owl logo when sweeping */}
          <div
            className={`absolute -inset-8 bg-amber-300/40 rounded-full blur-3xl transition-opacity duration-1000 ${
              glowState === "sweeping" ? "opacity-100 scale-110" : "opacity-0 scale-95"
            }`}
          />

          {/* Purple Owl Logo Card Container */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center rounded-3xl overflow-hidden p-2">
            {!imgError ? (
              <img
                src={logoImg}
                alt="دگەل قوتابی"
                onError={() => setImgError(true)}
                className="w-full h-full object-contain drop-shadow-xl"
              />
            ) : (
              <AppLogoSvg className="w-full h-full drop-shadow-xl" />
            )}

            {/* Light Sweep Flare overlay (golden beam like in video frame 00:02) */}
            <div
              className={`absolute inset-0 bg-gradient-to-tr from-transparent via-amber-200/70 to-pink-300/70 transform -rotate-45 transition-transform duration-1200 ease-out pointer-events-none ${
                glowState === "sweeping" || glowState === "settled"
                  ? "translate-x-full translate-y-full opacity-100"
                  : "-translate-x-full -translate-y-full opacity-0"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
