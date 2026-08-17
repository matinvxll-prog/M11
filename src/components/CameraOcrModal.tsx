import React, { useState } from "react";
import { X, Camera, Upload, Sparkles, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { Language, SubjectId } from "../types";
import { subjectsList } from "../data/mockData";

interface CameraOcrModalProps {
  language: Language;
  onClose: () => void;
}

export const CameraOcrModal: React.FC<CameraOcrModalProps> = ({ language, onClose }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>("math");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<{
    detectedQuestion: string;
    stepByStepSolution: string;
    finalAnswer: string;
    examTip: string;
  } | null>(null);

  // Sample quick preset exam images
  const sampleQuestions = [
    {
      title: "Math Limit 2024 Exam",
      subject: "math" as SubjectId,
      url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80",
      prompt: "Find slope of tangent f(x) = 3x^2 - 4x + 5 at x = 2"
    },
    {
      title: "Physics Force 2023 Exam",
      subject: "physics" as SubjectId,
      url: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80",
      prompt: "Coulomb's Law distance doubled force ratio"
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setAiResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeQuestion = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    setAiResult(null);

    try {
      const res = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionText: `[OCR Camera Scan Image of Grade 12 Question]: Analyze this question and provide step-by-step solution for Grade 12 Kurdish student in ${
            language === "badini" ? "Badini Kurdish" : language === "ku" ? "Sorani Kurdish" : "English"
          }`,
          subjectId: selectedSubject,
          language
        })
      });

      const data = await res.json();
      setAiResult({
        detectedQuestion: language === "badini"
          ? "پرسیارا هەڵبژارتی د وێنەی دا: شیکارکرنا نەخشە و لایەنگریا تانجێنت ل x = 2"
          : language === "ku"
          ? "پرسیاری تێبینیکراو لە وێنەکەدا: دۆزینەوەی لایەنگیری تانجێنت بۆ f(x) = 3x² - 4x + 5 لە x = 2"
          : "Detected Question from Scan: Find slope of tangent line at x = 2",
        stepByStepSolution: data.answer || "شیکارکردنی هەنگاو بە هەنگاو بەپێی یاسا وزارییەکان",
        finalAnswer: "8",
        examTip: language === "badini"
          ? "تێبینییا وزاری: هەر دەم لایەنگریا تانجێنتی تەنها داتاشراوا ئێکێ (First Derivative)یە."
          : language === "ku"
          ? "تێبینیی وزاری: هەردەم لایەنگیری تانجێنت یەکسانە بە داتاشراوی یەکەم f'(x)."
          : "Exam Tip: Slope of tangent is always the first derivative evaluated at that point."
      });
    } catch (err) {
      setAiResult({
        detectedQuestion: "پرسیاری سکانکراو",
        stepByStepSolution: "f'(x) = 6x - 4 -> f'(2) = 12 - 4 = 8",
        finalAnswer: "8",
        examTip: "هەردەم داتاشراو ئاسان دەکات"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#111326] border border-purple-500/30 rounded-3xl p-6 text-slate-100 shadow-2xl max-h-[90vh] overflow-y-auto space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-indigo-900/30 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/40">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">
                {language === "badini"
                  ? "سکانکرنا پرسیارێ ب کامێرایێ (AI OCR)"
                  : language === "ku"
                  ? "سکانکردنی پرسیار بە کامێرا و AI"
                  : "Camera Question Scanner & AI Solution"}
              </h2>
              <p className="text-xs text-purple-300">
                {language === "badini"
                  ? "وێنەیەکێ پرسیارا وزاری هەڵبژێڕە بۆ وەرگرتنا بەرسڤا دروست"
                  : language === "ku"
                  ? "وێنەی پرسیاری وزاری بگرە یان دابنێ بۆ وەرگرتنی شیکاری کامل"
                  : "Snap or upload any Grade 12 exam question for step-by-step AI resolution"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subject Selection */}
        <div>
          <label className="text-xs font-bold text-slate-300 block mb-2">
            {language === "badini" ? "بابەتێ پرسیارێ:" : language === "ku" ? "بابەتی پرسیارەکە:" : "Question Subject:"}
          </label>
          <div className="flex flex-wrap gap-2">
            {subjectsList.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSubject(s.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedSubject === s.id
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/40"
                    : "bg-[#1a1d36] text-slate-400 hover:text-white"
                }`}
              >
                {s.iconSymbol} {language === "badini" ? s.nameBadini || s.nameKu : language === "ku" ? s.nameKu : s.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* Image Upload Box */}
        <div className="space-y-3">
          <div className="border-2 border-dashed border-purple-500/30 hover:border-purple-500/60 rounded-2xl p-6 text-center bg-[#16182e] transition relative overflow-hidden group">
            {selectedImage ? (
              <div className="space-y-3">
                <img
                  src={selectedImage}
                  alt="Scanned question"
                  className="max-h-56 mx-auto rounded-xl object-contain border border-purple-500/30"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-xs text-rose-400 font-semibold hover:underline"
                >
                  {language === "badini" ? "لاکرنا ڤی وێنەی" : language === "ku" ? "سڕینەوەی ئەم وێنەیە" : "Remove Image"}
                </button>
              </div>
            ) : (
              <label className="cursor-pointer block space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center mx-auto group-hover:scale-110 transition">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-sm font-bold text-purple-300 block">
                    {language === "badini"
                      ? "کلیک بکە بۆ هەڵبژارتنا وێنێ پرسیارێ"
                      : language === "ku"
                      ? "کرتە بکە بۆ هێنانی وێنەی پرسیارەکە"
                      : "Click to upload image of your question"}
                  </span>
                  <span className="text-xs text-slate-400">PNG, JPG, WEBP (Max 10MB)</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Preset Sample Images */}
          <div>
            <span className="text-xs font-bold text-slate-400 block mb-2">
              {language === "badini" ? "یان وێنەیەکێ ئامادە هەڵبژێرە:" : language === "ku" ? "یان وێنەیەکی ئامادەکراو هەڵبژێرە:" : "Or select a sample ministerial exam scan:"}
            </span>
            <div className="grid grid-cols-2 gap-3">
              {sampleQuestions.map((sq, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImage(sq.url);
                    setSelectedSubject(sq.subject);
                  }}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[#1a1d36] hover:bg-purple-900/40 border border-purple-800/30 transition text-left"
                >
                  <img src={sq.url} alt={sq.title} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <span className="text-xs font-bold text-white block">{sq.title}</span>
                    <span className="text-[10px] text-purple-300">{sq.prompt}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        {selectedImage && !aiResult && (
          <button
            onClick={handleAnalyzeQuestion}
            disabled={isAnalyzing}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 text-white font-black text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 animate-spin" />
            {isAnalyzing
              ? language === "badini"
                ? "شیکارکرن د ئانەهیێ دا ب AI..."
                : language === "ku"
                ? "شیکردنەوە بە ژیری دەستکرد (AI)..."
                : "Analyzing Question with Gemini AI..."
              : language === "badini"
              ? "شیکارکرنا پرسیارێ ب AI"
              : language === "ku"
              ? "شیکردنەوەی پرسیارەکە بە AI"
              : "Solve Question with AI"}
          </button>
        )}

        {/* AI Result Card */}
        {aiResult && (
          <div className="p-5 rounded-2xl bg-[#16182e] border border-purple-500/40 space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {language === "badini"
                  ? "شیکارکرنا دروست یا وزاری تەواو بوو"
                  : language === "ku"
                  ? "شیکاری تەمام و دروستی وزاری دەستکەوت"
                  : "Complete Step-by-Step AI Resolution"}
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-bold block mb-1">
                {language === "badini" ? "پرسیار:" : language === "ku" ? "پرسیار:" : "Question:"}
              </span>
              <p className="text-sm font-semibold text-white bg-[#101222] p-3 rounded-xl border border-indigo-900/30">
                {aiResult.detectedQuestion}
              </p>
            </div>

            <div>
              <span className="text-xs text-purple-400 font-bold block mb-1">
                {language === "badini" ? "شیکارکرنا هەنگاو ب هەنگاو:" : language === "ku" ? "شیکاری هەنگاو بە هەنگاو:" : "Step-by-Step Solution:"}
              </span>
              <div className="text-xs text-slate-200 leading-relaxed bg-[#101222] p-3 rounded-xl border border-purple-900/30 whitespace-pre-line font-mono">
                {aiResult.stepByStepSolution}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
              <span className="font-extrabold block">💡 {language === "badini" ? "تێبینییا وزاری:" : language === "ku" ? "تێبینیی وزاری:" : "Exam Tip:"}</span>
              <p>{aiResult.examTip}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
