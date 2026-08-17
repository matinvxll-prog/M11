import React, { useState } from "react";
import { MessageSquare, ThumbsUp, Send, CheckCircle2, HelpCircle, Upload, Plus, FileSpreadsheet } from "lucide-react";
import { CommunityPost, Language, UserProfile, Question, SubjectId } from "../types";
import { uiTranslations } from "../utils/i18n";

interface CommunityViewProps {
  posts: CommunityPost[];
  user: UserProfile;
  language: Language;
  onAddPost: (questionText: string, subjectId: any) => void;
  onLikePost: (postId: string) => void;
  onAddBookmark?: (question: Question) => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  posts,
  user,
  language,
  onAddPost,
  onLikePost,
  onAddBookmark
}) => {
  const isBadini = language === "badini";
  const [newQuestionText, setNewQuestionText] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("math");

  // Import / Add New Question Modal State inside Community
  const [showImportForm, setShowImportForm] = useState(false);
  const [importQuestionText, setImportQuestionText] = useState("");
  const [importSubject, setImportSubject] = useState<SubjectId>("physics");
  const [optA, setOptA] = useState("");
  const [optB, setOptB] = useState("");
  const [optC, setOptC] = useState("");
  const [optD, setOptD] = useState("");
  const [correctIdx, setCorrectIdx] = useState<number>(0);
  const [explanation, setExplanation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    onAddPost(newQuestionText, selectedSubject);
    setNewQuestionText("");
  };

  // Handle manual question creation
  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importQuestionText.trim() || !optA || !optB) {
      alert(isBadini ? "تکایە دەقێ پرسیارێ و هەڵبژاردنان بنڤیسە" : "تکایە پرسیار و هەڵبژاردنەکان بنووسە");
      return;
    }

    const createdQ: Question = {
      id: "imported_" + Date.now(),
      subjectId: importSubject,
      chapterKu: "پرسیارێن جڤاکی",
      chapterBadini: "پرسیارێن جڤاکی",
      chapterEn: "Community Questions",
      year: "2026",
      questionKu: importQuestionText,
      questionBadini: importQuestionText,
      questionEn: importQuestionText,
      optionsKu: [optA, optB, optC || "C", optD || "D"],
      optionsBadini: [optA, optB, optC || "C", optD || "D"],
      optionsEn: [optA, optB, optC || "C", optD || "D"],
      correctIndex: correctIdx,
      explanationKu: explanation || "ئەم پرسیارە لەلایەن قوتابییەوە لە جڤاکدا هاتیە زێدەکرن.",
      explanationBadini: explanation || "ئەڤ پرسیارە ژ لایێ قوتابی ڤە د جڤاکێ دا هاتیە زێدەکرن.",
      explanationEn: explanation || "User added question in community.",
      xp: 20
    };

    // 1. Post to Community
    const fullText = `[${importSubject.toUpperCase()}] ${importQuestionText}\n\n• A: ${optA}\n• B: ${optB}\n• C: ${optC || "-"}\n• D: ${optD || "-"}\n\n✅ بەرسڤا دروست: Option ${["A", "B", "C", "D"][correctIdx]}`;
    onAddPost(fullText, importSubject);

    // 2. Add to bookmarks if handler provided
    if (onAddBookmark) {
      onAddBookmark(createdQ);
    }

    alert(isBadini ? "پرسیار ب سەرکەفتن هاتە بەلاڤکرن و زێدەکرن د لیستا پاراستی دا!" : "پرسیارەکە بە سەرکەوتوویی بڵاوکرایەوە و بۆ پرسیارە پارێزراوەکان زیادرکرا!");

    setShowImportForm(false);
    setImportQuestionText("");
    setOptA("");
    setOptB("");
    setOptC("");
    setOptD("");
    setExplanation("");
  };

  // Handle File Upload JSON import
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          let count = 0;
          parsed.forEach((q: any) => {
            if (q.questionKu || q.questionBadini) {
              const qText = q.questionKu || q.questionBadini || "";
              const imported: Question = {
                id: q.id || "imp_" + Math.random().toString(36).substr(2, 9),
                subjectId: q.subjectId || "physics",
                chapterKu: q.chapterKu || "هاوردەکراو",
                chapterBadini: q.chapterBadini || "هاوردەکراو",
                chapterEn: q.chapterEn || "Imported",
                questionKu: qText,
                questionBadini: qText,
                questionEn: q.questionEn || qText,
                optionsKu: q.optionsKu || ["A", "B", "C", "D"],
                optionsBadini: q.optionsBadini || ["A", "B", "C", "D"],
                optionsEn: q.optionsEn || ["A", "B", "C", "D"],
                correctIndex: q.correctIndex ?? 0,
                explanationKu: q.explanationKu || "",
                explanationBadini: q.explanationBadini || "",
                explanationEn: q.explanationEn || "",
                xp: 20
              };

              onAddPost(`[هاوردەکراوی JSON] ${qText}`, q.subjectId || "physics");
              if (onAddBookmark) onAddBookmark(imported);
              count++;
            }
          });
          alert(isBadini ? `${count} پرسیار ژ فایلا JSON ب سەرکەفتن هاتنە داخلکرن!` : `${count} پرسیار لە فایلی JSON هاوردە کران!`);
        }
      } catch (err) {
        alert(isBadini ? "شەنگەستەیا فایلێ نەدرستە (JSON Valid)" : "فایلەکە هەڵەیە، تکایە فایلی JSON بەکاربهێنە");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 border border-purple-800/40 shadow-2xl">
        <h1 className="text-xl sm:text-2xl font-black text-white">
          {uiTranslations.communityTitle[language]}
        </h1>
        <p className="text-xs text-purple-200/80 mt-1">
          {language === "badini"
            ? "پرسیارێن خۆ یێن گومانلێکری بپرسە و دگەل مامۆستا و قوتابییان گفتوگۆیێ بکە"
            : language === "ku"
            ? "پرسیارە گومانلێکراوەکانت بپرسە و لەگەڵ مامۆستایان و قوتابییان گفتوگۆ بکە"
            : "Ask questions, share explanations, and connect with Grade 12 students across Kurdistan."}
        </p>
      </div>

      {/* IMPORT & ADD NEW QUESTION CARD */}
      <div className="p-5 rounded-3xl bg-[#16182e] border border-purple-500/30 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {isBadini ? "داخلکرن و زێدەکرنا پرسیارێن نوی" : "هاوردەکردن و زیادکردنی پرسیار"}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isBadini
                  ? "پرسیارێن نوی بنڤیسە یان فایلا JSON باربکە بۆ تەواویا کۆمەڵگایێ"
                  : "پرسیاری نوێ بنووسە یان فایلی JSON باربکە بۆ تەواوی کۆمەڵگە"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowImportForm(!showImportForm)}
              className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>{isBadini ? "زێدەکرن" : "زیادکردن"}</span>
            </button>

            <label className="px-3 py-2 rounded-xl bg-[#202347] hover:bg-[#282d5a] border border-indigo-800/40 cursor-pointer text-xs font-bold text-slate-200 transition flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>{isBadini ? "JSON هاوردەکرنا فایلا" : "هاوردەکردنی فایلی JSON"}</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Manual Question Form inside Community */}
        {showImportForm && (
          <form onSubmit={handleCreateQuestion} className="space-y-3 pt-3 border-t border-indigo-900/40 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">بابەت (Subject)</label>
                <select
                  value={importSubject}
                  onChange={(e) => setImportSubject(e.target.value as SubjectId)}
                  className="w-full p-2.5 rounded-xl bg-[#121426] border border-indigo-900/40 text-xs text-white"
                >
                  <option value="physics">فیزیا (Physics)</option>
                  <option value="math">بیرکاری (Mathematics)</option>
                  <option value="chemistry">کیمیا (Chemistry)</option>
                  <option value="biology">زیندەوەرناسی (Biology)</option>
                  <option value="english">ئینگلیزی (English)</option>
                  <option value="kurdish">کوردی (Kurdish)</option>
                  <option value="arabic">عەرەبی (Arabic)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">بەرسڤا دروست (Correct Choice)</label>
                <select
                  value={correctIdx}
                  onChange={(e) => setCorrectIdx(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-[#121426] border border-indigo-900/40 text-xs text-white"
                >
                  <option value={0}>A (هەڵبژاردنی یەکەم)</option>
                  <option value={1}>B (هەڵبژاردنی دووەم)</option>
                  <option value={2}>C (هەڵبژاردنی سێیەم)</option>
                  <option value={3}>D (هەڵبژاردنی چوارەم)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">پرسیار (Question Text)</label>
              <textarea
                rows={2}
                value={importQuestionText}
                onChange={(e) => setImportQuestionText(e.target.value)}
                placeholder="دەقێ پرسیارێ ل ڤێرێ بنڤیسە..."
                className="w-full p-2.5 rounded-xl bg-[#121426] border border-indigo-900/40 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="هەڵبژاردنی A"
                value={optA}
                onChange={(e) => setOptA(e.target.value)}
                className="p-2.5 rounded-xl bg-[#121426] border border-indigo-900/40 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="هەڵبژاردنی B"
                value={optB}
                onChange={(e) => setOptB(e.target.value)}
                className="p-2.5 rounded-xl bg-[#121426] border border-indigo-900/40 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="هەڵبژاردنی C"
                value={optC}
                onChange={(e) => setOptC(e.target.value)}
                className="p-2.5 rounded-xl bg-[#121426] border border-indigo-900/40 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="هەڵبژاردنی D"
                value={optD}
                onChange={(e) => setOptD(e.target.value)}
                className="p-2.5 rounded-xl bg-[#121426] border border-indigo-900/40 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">شیکار / روونکردنەوە (Explanation)</label>
              <input
                type="text"
                placeholder="روونکردنەوە بۆ وەڵامی درست بنووسە..."
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#121426] border border-indigo-900/40 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 transition"
            >
              {isBadini ? "تۆمارکرن و بەلاڤکرن د جڤاکێ دا" : "تۆمارکردن و بڵاوکردنەوە لە کۆمەڵگە"}
            </button>
          </form>
        )}
      </div>

      {/* Post New Question Form */}
      <form
        onSubmit={handleSubmit}
        className="p-5 rounded-3xl bg-[#16182e] border border-indigo-900/30 shadow-xl space-y-4"
      >
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-purple-400" />
          <span>
            {language === "badini"
              ? "پرسیارەکێ ئاڕاستەی جڤاکی بکە"
              : language === "ku"
              ? "پرسیارێک ئاڕاستەی کۆمەڵگە بکە"
              : "Ask a question"}
          </span>
        </h3>

        <textarea
          value={newQuestionText}
          onChange={(e) => setNewQuestionText(e.target.value)}
          placeholder={
            language === "badini"
              ? "پرسیارا خۆ یان ئاریشەیا خۆ د تاقیکرنا وزاری دا بنڤێسە..."
              : language === "ku"
              ? "پرسیارەکەت یان کێشەکەت لە تاقیکردنەوەی وزاری بنووسە..."
              : "Ask your question or topic regarding ministerial exam..."
          }
          className="w-full bg-[#121426] text-white text-xs sm:text-sm p-4 rounded-2xl border border-indigo-900/30 focus:outline-none focus:border-purple-500 min-h-[90px] placeholder-slate-500"
        />

        <div className="flex items-center justify-between gap-3">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-[#121426] text-slate-300 text-xs px-3 py-2 rounded-xl border border-indigo-900/30 focus:outline-none focus:border-purple-500"
          >
            <option value="math">Math / بیرکاری</option>
            <option value="physics">Physics / فیزیا</option>
            <option value="chemistry">Chemistry / کیمیا</option>
            <option value="biology">Biology / زیندەوەر</option>
            <option value="english">English / ئینگلیزی</option>
            <option value="kurdish">Kurdish / کوردی</option>
            <option value="arabic">Arabic / عەرەبی</option>
          </select>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>
              {language === "badini"
                ? "بەلاڤکرن"
                : language === "ku"
                ? "بڵاوکردنەوە"
                : "Post Question"}
            </span>
          </button>
        </div>
      </form>

      {/* Feed Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-5 rounded-3xl bg-[#16182e] border border-indigo-900/30 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-purple-500/30"
                />
                <div>
                  <span className="text-xs font-bold text-white block">{post.authorName}</span>
                  <span className="text-[10px] text-purple-400 block">{post.authorCity}</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500">{post.createdAt}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
              {post.questionText}
            </p>

            {/* Answers */}
            {post.answers.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-indigo-900/20">
                {post.answers.map((ans) => (
                  <div
                    key={ans.id}
                    className="p-3 rounded-2xl bg-[#121426] border border-indigo-900/20 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white">{ans.authorName}</span>
                        {ans.isVerifiedTeacher && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Teacher
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed mt-1">{ans.text}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 pt-2 border-t border-indigo-900/20 text-xs text-slate-400">
              <button
                onClick={() => onLikePost(post.id)}
                className="flex items-center gap-1.5 hover:text-purple-300 transition"
              >
                <ThumbsUp className={`w-4 h-4 ${post.isLiked ? "text-purple-400 fill-purple-400" : ""}`} />
                <span>{post.likesCount}</span>
              </button>

              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                <span>
                  {post.commentsCount}{" "}
                  {language === "badini"
                    ? "بەرسڤ"
                    : language === "ku"
                    ? "وەڵام"
                    : "Answers"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

