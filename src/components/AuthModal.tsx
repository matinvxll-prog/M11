import React, { useState } from "react";
import { X, User, Lock, Mail, School, BookOpen } from "lucide-react";
import { Language, UserProfile } from "../types";
import { uiTranslations } from "../utils/i18n";

interface AuthModalProps {
  language: Language;
  onClose: () => void;
  onLoginSuccess: (updatedUser: Partial<UserProfile>) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  language,
  onClose,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<"login" | "register">("register");
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [city, setCity] = useState("Erbil");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      name: name || "Mateen Student",
      schoolName: school || "Kurdistan Grade 12 High School",
      city
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#121426] border border-indigo-900/40 rounded-3xl shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-indigo-900/40"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-purple-600/30">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-white">
            {mode === "login"
              ? uiTranslations.login[language]
              : uiTranslations.register[language]}
          </h2>
          <p className="text-xs text-purple-300">
            {language === "badini"
              ? "گەهشتن ب هەمی خال، ڕێزبەند و پرسیارێن وزاری"
              : language === "ku"
              ? "گەیشتن بە هەموو خاڵ، ڕێزبەند و پرسیارە وزارییەکان"
              : "Sync your XP, leaderboard rankings, and Grade 12 quiz progress!"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                {language === "badini"
                  ? "ناڤێ سیانی یێ قوتابی"
                  : language === "ku"
                  ? "ناوی سیانی قوتابی"
                  : "Student Full Name"}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Mateen Kardo"
                  className="w-full bg-[#181a33] text-white text-xs pl-10 pr-3 py-2.5 rounded-xl border border-indigo-900/30 focus:outline-none focus:border-purple-500 placeholder-slate-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              {language === "badini"
                ? "ئیمەیڵ یان کۆدێ قوتابی"
                : language === "ku"
                ? "ئیمەیڵ یان کۆدی قوتابی"
                : "Email or Student Code"}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="student@school.edu.krd"
                className="w-full bg-[#181a33] text-white text-xs pl-10 pr-3 py-2.5 rounded-xl border border-indigo-900/30 focus:outline-none focus:border-purple-500 placeholder-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              {language === "badini"
                ? "پەیڤا نهێنی (Password)"
                : language === "ku"
                ? "وشەی نهێنی (Password)"
                : "Password"}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-[#181a33] text-white text-xs pl-10 pr-3 py-2.5 rounded-xl border border-indigo-900/30 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {mode === "register" && (
            <>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  {language === "badini"
                    ? "ناڤێ قوتابخانێ"
                    : language === "ku"
                    ? "ناوی قوتابخانە"
                    : "School Name"}
                </label>
                <div className="relative">
                  <School className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="e.g., Kurdistan High School"
                    className="w-full bg-[#181a33] text-white text-xs pl-10 pr-3 py-2.5 rounded-xl border border-indigo-900/30 focus:outline-none focus:border-purple-500 placeholder-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  {language === "badini"
                    ? "باژێر / پارێزگە"
                    : language === "ku"
                    ? "شار / پارێزگا"
                    : "City"}
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#181a33] text-white text-xs px-3 py-2.5 rounded-xl border border-indigo-900/30 focus:outline-none focus:border-purple-500"
                >
                  <option value="Erbil">Erbil / هەولێر</option>
                  <option value="Sulaymaniyah">Sulaymaniyah / سلێمانی</option>
                  <option value="Duhok">Duhok / دهۆک</option>
                  <option value="Halabja">Halabja / هەڵەبجە</option>
                  <option value="Kirkuk">Kirkuk / کەرکووک</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-xl shadow-purple-600/30 transition mt-2"
          >
            {mode === "login"
              ? uiTranslations.login[language]
              : uiTranslations.register[language]}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-xs text-purple-400 hover:underline font-semibold"
          >
            {mode === "login"
              ? language === "badini"
                ? "تە هەژمار نینە؟ دروست بکە"
                : language === "ku"
                ? "هەژمارت نییە؟ دروستی بکە"
                : "Don't have an account? Register"
              : language === "badini"
              ? "پێشتر هەژمارا تە هەیە؟ بچە ژوورڤە"
              : language === "ku"
              ? "پێشتر هەژمارت هەیە؟ بچۆ ژوورەوە"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

