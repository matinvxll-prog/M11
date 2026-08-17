import React, { useState } from "react";
import { X, Sparkles, Send, Bot, User } from "lucide-react";
import { Language, SubjectId } from "../types";
import { uiTranslations } from "../utils/i18n";

interface AITutorModalProps {
  language: Language;
  onClose: () => void;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({ language, onClose }) => {
  const [subject, setSubject] = useState<SubjectId>("math");
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; text: string; timestamp: string }[]
  >([
    {
      sender: "ai",
      text:
        language === "badini"
          ? "سڵاو! ئەز مامۆستایێ ژیری یێ پۆلا ۱۲ـەمە 👨‍🏫. هەر پرسیارەکا بیرکاری، فیزیا، کیمیا، زیندەوەر یان زمانان هەبیت ژ من بپرسە، ئەز دێ ب هەنگاو بۆ تە ڕوون کەمەڤە!"
          : language === "ku"
          ? "سڵاو! من مامۆستای ژیری پۆلی ۱۲ـەم 👨‍🏫. هه‌ر پرسیارێکی بیرکاری، فیزیا، کیمیا، زیندەوەر یان زمانت هەیە لێم بپرسە، من بە هەنگاو بە هەنگاو بۆت ڕوون دەکەمەوە!"
          : "Hello! I am your AI Grade 12 Tutor 👨‍🏫. Ask me any question in Math, Physics, Chemistry, Biology, or Languages, and I will explain step-by-step!",
      timestamp: "Just now"
    }
  ]);

  const handleSend = async () => {
    if (!inputQuery.trim() || loading) return;

    const userMsg = inputQuery;
    setInputQuery("");
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMsg, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);

    setLoading(true);

    try {
      const response = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userMsg,
          subject,
          language
        })
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            data.answer ||
            (language === "badini"
              ? "ئاریشەیەک چێبوو د پەیوەندیکرنێ دگەل مامۆستای."
              : language === "ku"
              ? "کێشەیەک ڕوویدا لە پەیوەندیکردن بە مامۆستا."
              : "Error getting answer."),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            language === "badini"
              ? "پەیوەندیا ئەنتەرنێتێ پچڕیا یان ئاریشەیەک چێبوو. دووبارە هەوڵبدە."
              : language === "ku"
              ? "پەیوەندی ئەنتەرنێت بپچڕا یان کێشەیەک دروست بوو. هەوڵبدەرەوە."
              : "Connection issue. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4" dir="rtl">
      <div className="w-full max-w-2xl bg-[#121426] border border-indigo-900/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[85vh]">
        
        {/* Header */}
        <div className="px-5 py-4 bg-[#181a33] border-b border-indigo-900/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-1.5">
                <span>{uiTranslations.aiTutorTitle[language]}</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </h2>
              <span className="text-[11px] text-purple-400">
                {language === "badini"
                  ? "پشتیڤانیکری ب ژیرییا دەستکردیا Gemini 2.5"
                  : language === "ku"
                  ? "پشتیوانیکراو بە ژیری دەستکردی Gemini 2.5"
                  : "Powered by Gemini 2.5 AI"}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-indigo-900/40 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subject Select Pill Row */}
        <div className="px-5 py-2.5 bg-[#15172d] border-b border-indigo-900/20 flex items-center gap-2 overflow-x-auto text-xs">
          {[
            { id: "math", nameKu: "بیرکاری", nameBadini: "بیرکاری", nameEn: "Math" },
            { id: "physics", nameKu: "فیزیا", nameBadini: "فیزیا", nameEn: "Physics" },
            { id: "chemistry", nameKu: "کیمیا", nameBadini: "کیمیا", nameEn: "Chemistry" },
            { id: "biology", nameKu: "زیندەوەر", nameBadini: "زیندەوەر", nameEn: "Biology" },
            { id: "english", nameKu: "ئینگلیزی", nameBadini: "ئینگلیزی", nameEn: "English" },
            { id: "arabic", nameKu: "عەرەبی", nameBadini: "عەرەبی", nameEn: "Arabic" },
            { id: "kurdish", nameKu: "کوردی", nameBadini: "کوردی", nameEn: "Kurdish" }
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setSubject(s.id as SubjectId)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition text-[11px] font-bold cursor-pointer ${
                subject === s.id
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-indigo-950/60 text-slate-400 hover:text-white"
              }`}
            >
              {language === "badini" ? s.nameBadini : language === "ku" ? s.nameKu : s.nameEn}
            </button>
          ))}
        </div>

        {/* QUICK SUGGESTION CHIPS */}
        <div className="px-4 py-2 bg-[#181a33]/60 border-b border-indigo-900/20 flex items-center gap-2 overflow-x-auto text-[11px]">
          {[
            language === "badini" ? "بابەتەکێ گران بۆ من شڕۆڤە بکە" : "بابەتێکی قورس شیکار بکه",
            language === "badini" ? "پرسیارێن تاقیکردنەوێ بۆ من بەرهەڤ بکە" : "پرسیاری تاقیکردنەوەم بۆ ئامادە بکه",
            language === "badini" ? "یاسایێن سەکەرەکیا مادتێ بگوترە" : "یاسا سەرەکییەکانم پێ بڵێ"
          ].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => setInputQuery(chip)}
              className="px-3 py-1 rounded-full bg-indigo-900/40 hover:bg-indigo-800 text-purple-200 border border-indigo-700/30 whitespace-nowrap transition cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white ${
                  m.sender === "user" ? "bg-indigo-600" : "bg-purple-600"
                }`}
              >
                {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  m.sender === "user"
                    ? "bg-purple-600 text-white rounded-tr-none"
                    : "bg-[#181a33] border border-indigo-900/30 text-slate-200 rounded-tl-none shadow-md"
                }`}
              >
                {m.text}
                <span className="block text-[9px] text-slate-400 mt-2 text-right opacity-70">
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold p-3 bg-[#181a33] rounded-2xl w-fit">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>
                {language === "badini"
                  ? "مامۆستا مژویلی وەڵامدانێیە..."
                  : language === "ku"
                  ? "مامۆستا خەریکی وەڵامدانەوەیە..."
                  : "AI Tutor is typing..."}
              </span>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-[#181a33] border-t border-indigo-900/30 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={
              language === "badini"
                ? "پرسیارا خۆ بنڤێسە..."
                : language === "ku"
                ? "پرسیارەکەت بنووسە (بۆ نموونە: یاسای هاندانی فارادای بگوترێ...)"
                : "Type your Grade 12 question..."
            }
            className="flex-1 bg-[#121426] text-white text-xs sm:text-sm px-4 py-3 rounded-xl border border-indigo-900/30 focus:outline-none focus:border-purple-500 placeholder-slate-500"
          />

          <button
            onClick={handleSend}
            disabled={!inputQuery.trim() || loading}
            className={`p-3 rounded-xl text-white font-bold transition cursor-pointer ${
              inputQuery.trim() && !loading
                ? "bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/30"
                : "bg-indigo-950 text-slate-600 cursor-not-allowed"
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
