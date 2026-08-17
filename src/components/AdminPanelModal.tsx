import React, { useState } from "react";
import { ShieldCheck, Plus, Video, FileText, Send, Users, BarChart, CheckCircle2, X } from "lucide-react";
import { Language, SubjectId } from "../types";
import { subjectsList } from "../data/mockData";

interface AdminPanelModalProps {
  language: Language;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ language, onClose }) => {
  const [activeTab, setActiveTab] = useState<"questions" | "content" | "notifications" | "analytics">("questions");

  // New Question form state
  const [qSubject, setQSubject] = useState<SubjectId>("math");
  const [qText, setQText] = useState("");
  const [qOpt0, setQOpt0] = useState("");
  const [qOpt1, setQOpt1] = useState("");
  const [qOpt2, setQOpt2] = useState("");
  const [qOpt3, setQOpt3] = useState("");
  const [qCorrect, setQCorrect] = useState(0);
  const [qSuccess, setQSuccess] = useState(false);

  // Notification form state
  const [notifText, setNotifText] = useState("");
  const [notifSuccess, setNotifSuccess] = useState(false);

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim()) return;
    setQSuccess(true);
    setTimeout(() => {
      setQText("");
      setQOpt0("");
      setQOpt1("");
      setQOpt2("");
      setQOpt3("");
      setQSuccess(false);
    }, 2000);
  };

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifText.trim()) return;
    setNotifSuccess(true);
    setTimeout(() => {
      setNotifText("");
      setNotifSuccess(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#111326] border border-purple-500/40 rounded-3xl p-6 text-slate-100 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-indigo-900/30 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">
              {language === "badini" ? "پانێڵێ بڕێڤەبەری (Admin Dashboard)" : language === "ku" ? "پانێڵی بەڕێوەبەری سیستەم (Admin Panel)" : "System Admin Dashboard"}
            </h2>
            <p className="text-xs text-purple-300">
              {language === "badini"
                ? "بەڕێوەبرنا پرسیارێن وزاری، ڤیدیۆ، PDF و ناردنا ئاگادارییان"
                : language === "ku"
                ? "زیادکردنی پرسیاری وزاری، ڤیدیۆ، PDF و بەڕێوەبردنی بەکارهێنەران"
                : "Manage ministerial questions, courses, PDFs, and student notifications"}
            </p>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="flex items-center gap-2 border-b border-indigo-900/30 pb-2">
          <button
            onClick={() => setActiveTab("questions")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "questions"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>{language === "badini" ? "زیادکرنا پرسیاران" : language === "ku" ? "زیادکردنی پرسیار" : "Add Questions"}</span>
          </button>

          <button
            onClick={() => setActiveTab("notifications")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "notifications"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Send className="w-4 h-4" />
            <span>{language === "badini" ? "ناردنا ئاگادارییان" : language === "ku" ? "ناردنی ئاگادارکردنەوە" : "Send Push Alert"}</span>
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "analytics"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BarChart className="w-4 h-4" />
            <span>{language === "badini" ? "ئامارێن سیستەمی" : language === "ku" ? "ئامارەکانی سیستەم" : "Platform Stats"}</span>
          </button>
        </div>

        {/* Tab 1: Add Questions */}
        {activeTab === "questions" && (
          <form onSubmit={handleAddQuestion} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                {language === "badini" ? "بابەت:" : language === "ku" ? "بابەت:" : "Subject:"}
              </label>
              <select
                value={qSubject}
                onChange={(e) => setQSubject(e.target.value as SubjectId)}
                className="w-full px-3 py-2 rounded-xl bg-[#16182e] border border-indigo-900/40 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                {subjectsList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nameKu} ({s.nameEn})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                {language === "badini" ? "دەقێ پرسیاری وزاری:" : language === "ku" ? "دەقی پرسیاری وزاری:" : "Ministerial Question Text:"}
              </label>
              <textarea
                value={qText}
                onChange={(e) => setQText(e.target.value)}
                placeholder="پرسیارەکە بنووسە لێرە..."
                className="w-full h-24 p-3 rounded-xl bg-[#16182e] border border-indigo-900/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[qOpt0, qOpt1, qOpt2, qOpt3].map((opt, idx) => (
                <div key={idx}>
                  <label className="text-[11px] font-semibold text-purple-300 block mb-1">
                    هەڵبژاردنی {idx + 1}:
                  </label>
                  <input
                    type="text"
                    value={idx === 0 ? qOpt0 : idx === 1 ? qOpt1 : idx === 2 ? qOpt2 : qOpt3}
                    onChange={(e) => {
                      if (idx === 0) setQOpt0(e.target.value);
                      if (idx === 1) setQOpt1(e.target.value);
                      if (idx === 2) setQOpt2(e.target.value);
                      if (idx === 3) setQOpt3(e.target.value);
                    }}
                    placeholder={`هەڵبژاردنی ${idx + 1}`}
                    className="w-full px-3 py-2 rounded-xl bg-[#16182e] border border-indigo-900/40 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                {language === "badini" ? "وەڵامی دروست:" : language === "ku" ? "وەڵامی دروست:" : "Correct Option Index:"}
              </label>
              <select
                value={qCorrect}
                onChange={(e) => setQCorrect(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#16182e] border border-indigo-900/40 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value={0}>هەڵبژاردنی ۱</option>
                <option value={1}>هەڵبژاردنی ۲</option>
                <option value={2}>هەڵبژاردنی ۳</option>
                <option value={3}>هەڵبژاردنی ۴</option>
              </select>
            </div>

            {qSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>پرسیار بە سەرکەوتوویی لە بنکەی دراوە (Database) تۆمار کرا!</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition"
            >
              پاشەکەوتکردن لە داتابەیس (Save Question)
            </button>
          </form>
        )}

        {/* Tab 2: Push Notifications */}
        {activeTab === "notifications" && (
          <form onSubmit={handleSendNotification} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                {language === "badini" ? "دەقێ ئاگادارییێ بۆ هەمی قوتابییان:" : language === "ku" ? "دەقی ئاگادارکردنەوە بۆ سەرجەم قوتابییان:" : "Broadcast Notification Message:"}
              </label>
              <textarea
                value={notifText}
                onChange={(e) => setNotifText(e.target.value)}
                placeholder="دەقی ئاگاداری بنووسە..."
                className="w-full h-28 p-3 rounded-xl bg-[#16182e] border border-indigo-900/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            {notifSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>ئاگاداری بۆ سەرجەم بەکارهێنەران بنێردرێت!</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>ناردنی ڕاستەوخۆ (Broadcast Now)</span>
            </button>
          </form>
        )}

        {/* Tab 3: Analytics */}
        {activeTab === "analytics" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#16182e] border border-indigo-900/30 space-y-1">
              <span className="text-[11px] text-slate-400 block font-semibold">کۆی قوتابییانی چالاک</span>
              <span className="text-xl font-black text-white">42,850</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#16182e] border border-indigo-900/30 space-y-1">
              <span className="text-[11px] text-slate-400 block font-semibold">پرسیارە وەڵامدراوەکان</span>
              <span className="text-xl font-black text-purple-400">1,240,000</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#16182e] border border-indigo-900/30 space-y-1">
              <span className="text-[11px] text-slate-400 block font-semibold">بەکارهێنەرانی VIP</span>
              <span className="text-xl font-black text-amber-400">3,420</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
