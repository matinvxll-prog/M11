import React, { useState } from "react";
import { motion } from "motion/react";
import {
  X,
  User,
  Shield,
  Trophy,
  Key,
  School,
  MapPin,
  CheckCircle2,
  Sparkles,
  Award,
  Coins,
  Flame,
  BarChart2,
  Lock,
  LogOut,
  Edit3,
  Camera
} from "lucide-react";
import { Language, UserProfile } from "../types";
import { supabase } from "../supabaseClient";

interface ProfileModalProps {
  user: UserProfile;
  language: Language;
  onClose: () => void;
  onUpdateUser: (updatedUser: Partial<UserProfile>) => void;
}

const AVATAR_OPTIONS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
];

const CITIES = ["دەهۆک", "هەولێر", "سلێمانی", "کەرکووک", "هەڵەبجە", "زاخۆ", "ئاکرێ", "سۆران"];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  user,
  language,
  onClose,
  onUpdateUser
}) => {
  const [activeTab, setActiveTab] = useState<"info" | "password" | "achievements">("info");
  
  // Info Edit Form
  const [name, setName] = useState(user.name);
  const [schoolName, setSchoolName] = useState(user.schoolName);
  const [city, setCity] = useState(user.city);
  const [avatar, setAvatar] = useState(user.avatar);
  const [infoSaved, setInfoSaved] = useState(false);

  // Password Form
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const accuracy = user.questionsAnswered > 0
    ? Math.round((user.correctAnswers / user.questionsAnswered) * 100)
    : 100;

  const handleSaveInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ name, schoolName, city, avatar });
    setInfoSaved(true);
    setTimeout(() => setInfoSaved(false), 3000);

    // Also update Supabase metadata if logged in
    try {
      await supabase.auth.updateUser({
        data: { full_name: name, school_name: schoolName, city }
      });
    } catch (err) {
      console.log("Supabase metadata update note:", err);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword.length < 6) {
      setPasswordMsg({
        text: language === "badini" ? "پاشوور دڤێت ل کێمتری ٦ پیت یان ژمارە بیت." : "پاسوۆرد دەبێت لانی کەم ٦ پیت یان ژمارە بێت.",
        type: "error"
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({
        text: language === "badini" ? "پاشوور و دووبارەکرنا وێ وەکی ئێک نینن." : "پاسوۆرد و دووبارەکردنەوەی وەک یەک نین.",
        type: "error"
      });
      return;
    }

    setPasswordLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setPasswordMsg({ text: error.message, type: "error" });
      } else {
        setPasswordMsg({
          text: language === "badini"
            ? "پاشوورێ تە ب سەرکەفتن هاتە گوهۆڕین!"
            : "پاسوۆردەکەت بە سەرکەوتوویی گۆڕدرا!",
          type: "success"
        });
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err: any) {
      setPasswordMsg({ text: err.message || "خەلەتییەک چێبوو", type: "error" });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (confirm(language === "badini" ? "تە دڤێت لۆگ ئاوت بکەی؟" : "دەتەوێت دەربچیت؟")) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.log("Supabase signout note:", err);
      }
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-2xl bg-[#0f1123] border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-6 border-b border-purple-500/20">
          <button
            onClick={onClose}
            className="absolute left-4 top-4 p-2 rounded-xl bg-black/40 text-slate-300 hover:text-white hover:bg-black/60 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-right">
            <div className="relative group">
              <img
                src={avatar}
                alt={user.name}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-purple-500/50 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-purple-600 p-1.5 rounded-xl border border-white/20 text-white shadow">
                <Camera className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-extrabold text-white">{user.name}</h2>
                {user.isPremium && (
                  <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-[10px] font-black uppercase">
                    VIP
                  </span>
                )}
              </div>
              <p className="text-xs text-purple-200/80 mt-1 flex items-center justify-center sm:justify-start gap-1">
                <School className="w-3.5 h-3.5 text-purple-400" />
                <span>{schoolName || "قوتابخانا ئامادەیی"}</span> •
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{city || "دەهۆک"}</span>
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                <span className="px-2.5 py-1 rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-bold">
                  ئاستی (Level {user.level})
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  {user.coins.toLocaleString()} کۆین
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  {user.dailyStreak} ڕۆژ
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-4 bg-[#14172f] border-b border-purple-500/20 text-center">
          <div className="p-2.5 rounded-2xl bg-[#1b1f3e] border border-purple-500/20">
            <span className="text-[10px] text-slate-400 block mb-0.5">سەرجەمی XP</span>
            <span className="text-sm font-extrabold text-purple-400">{user.totalXp.toLocaleString()}</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-[#1b1f3e] border border-purple-500/20">
            <span className="text-[10px] text-slate-400 block mb-0.5">پرسیارێن بەرسڤدایی</span>
            <span className="text-sm font-extrabold text-cyan-400">{user.questionsAnswered}</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-[#1b1f3e] border border-purple-500/20">
            <span className="text-[10px] text-slate-400 block mb-0.5">ڕێژەیا دروستییێ</span>
            <span className="text-sm font-extrabold text-emerald-400">{accuracy}%</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-[#1b1f3e] border border-purple-500/20 hidden sm:block">
            <span className="text-[10px] text-slate-400 block mb-0.5">ڕیزبەندا گشتی</span>
            <span className="text-sm font-extrabold text-amber-400">#{user.rankGlobal}</span>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-purple-500/20 bg-[#121429]">
          <button
            onClick={() => setActiveTab("info")}
            className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-1.5 transition border-b-2 ${
              activeTab === "info"
                ? "border-purple-500 text-purple-400 bg-purple-500/10"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <User className="w-4 h-4" />
            <span>{language === "badini" ? "زانیاریێن کەسی" : "زانیارییە کەسییەکان"}</span>
          </button>

          <button
            onClick={() => setActiveTab("password")}
            className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-1.5 transition border-b-2 ${
              activeTab === "password"
                ? "border-purple-500 text-purple-400 bg-purple-500/10"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Key className="w-4 h-4" />
            <span>{language === "badini" ? "گوهۆڕینا پاشووری" : "گۆڕینی پاسوۆرد"}</span>
          </button>

          <button
            onClick={() => setActiveTab("achievements")}
            className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-1.5 transition border-b-2 ${
              activeTab === "achievements"
                ? "border-purple-500 text-purple-400 bg-purple-500/10"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>{language === "badini" ? "دەستکەفت و نیشان" : "دەستکەوتەکان"}</span>
          </button>
        </div>

        {/* Tab Contents Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* TAB 1: EDIT PERSONAL INFO */}
          {activeTab === "info" && (
            <form onSubmit={handleSaveInfo} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  {language === "badini" ? "ئەڤاتار / وێنێ پرۆفایلی" : "ئەڤاتاری پرۆفایل"}
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {AVATAR_OPTIONS.map((imgUrl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setAvatar(imgUrl)}
                      className={`relative shrink-0 rounded-2xl overflow-hidden ring-2 transition ${
                        avatar === imgUrl ? "ring-purple-500 scale-105" : "ring-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={imgUrl} alt="Avatar" className="w-12 h-12 object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {language === "badini" ? "ناڤێ تە یێ تەمام" : "ناوی تەواوت"}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-purple-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-[#171a36] border border-purple-500/30 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    {language === "badini" ? "ناڤێ قوتابخانێ" : "ناوی قوتابخانە"}
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-purple-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="قوتابخانا ژیار یا ئامادەیی"
                      className="w-full bg-[#171a36] border border-purple-500/30 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    {language === "badini" ? "باژێر / دەڤەر" : "شار / ناوچە"}
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-purple-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#171a36] border border-purple-500/30 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c} className="bg-[#0f1123]">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {infoSaved && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === "badini"
                      ? "زانیاریێن تە ب سەرکەفتن هاتنە تۆمارکرن!"
                      : "زانیارییەکانت بە سەرکەوتوویی پاشەکەوت کران!"}
                  </span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/30 transition"
              >
                {language === "badini" ? "پاشەکەوتکرنا گوهۆڕینان" : "پاشەکەوتکردنی گۆڕانکارییەکان"}
              </button>
            </form>
          )}

          {/* TAB 2: UPDATE PASSWORD */}
          {activeTab === "password" && (
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="p-3 bg-purple-950/40 border border-purple-500/20 rounded-xl text-xs text-purple-200 leading-relaxed">
                <Lock className="w-4 h-4 text-purple-400 inline ml-1.5" />
                <span>
                  {language === "badini"
                    ? "لێرە دشیێ پاشوورێ خۆ یێ نوو تۆمار بکەی دا کۆ هەژمارا تە هەردەم پاراستی بیت."
                    : "لێرە دەتوانی پاسوۆردی نوێ تۆمار بکەیت تا هەژمارەکەت پارێزراو بێت."}
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {language === "badini" ? "پاشوورێ نوو (New Password)" : "پاسوۆردی نوێ"}
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-purple-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#171a36] border border-purple-500/30 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {language === "badini" ? "دووبارەکرنا پاشوورێ نوو" : "دووبارەکردنەوەی پاسوۆرد"}
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-purple-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#171a36] border border-purple-500/30 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {passwordMsg && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 border ${
                    passwordMsg.type === "success"
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                      : "bg-rose-500/20 border-rose-500/40 text-rose-300"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{passwordMsg.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={passwordLoading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/30 transition flex items-center justify-center gap-2"
              >
                {passwordLoading && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                <span>{language === "badini" ? "گوهۆڕینا پاشووری" : "گۆڕینی پاسوۆرد"}</span>
              </button>
            </form>
          )}

          {/* TAB 3: ACHIEVEMENTS & BADGES */}
          {activeTab === "achievements" && (
            <div className="space-y-3">
              <div className="p-3 bg-purple-950/30 border border-purple-500/20 rounded-xl text-xs text-purple-200">
                <Trophy className="w-4 h-4 text-amber-400 inline ml-1.5" />
                <span>
                  {language === "badini"
                    ? "نیشانێن تە یێن خویندنێ و دەستکەفتێن وزاری:"
                    : "نیشانەکانی خوێندن و دەستکەوتەکانی بەدەستهاتوو:"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-[#171a36] border border-purple-500/20 rounded-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">قارەمانێ ڕۆژانە</h4>
                    <p className="text-[10px] text-slate-400">۷ ڕۆژێن خویندنا بەردەوام</p>
                  </div>
                </div>

                <div className="p-3 bg-[#171a36] border border-purple-500/20 rounded-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">وەستایێ بیرکاریێ</h4>
                    <p className="text-[10px] text-slate-400">بەرسڤدانا ۱۰۰ پرسیارێن بەشێ ۱</p>
                  </div>
                </div>

                <div className="p-3 bg-[#171a36] border border-purple-500/20 rounded-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">پشکنەرێ دەنگی</h4>
                    <p className="text-[10px] text-slate-400">تۆمارکرنا ۱۰ ئەزموونێن دەنگی</p>
                  </div>
                </div>

                <div className="p-3 bg-[#171a36] border border-purple-500/20 rounded-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">ئەزموونا وزاری</h4>
                    <p className="text-[10px] text-slate-400">دەرچوون ل ۳ تاقیکرنێن کامل</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#0d0e1c] border-t border-purple-500/20 flex items-center justify-between">
          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>{language === "badini" ? "دەربازبوون (Log Out)" : "چوونەدەرەوە"}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
          >
            {language === "badini" ? "داخستن" : "داخستن"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
