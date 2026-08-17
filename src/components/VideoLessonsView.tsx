import React, { useState } from "react";
import { Video, Play, Volume2, Bookmark, CheckCircle2, Sparkles, Search, Filter, X } from "lucide-react";
import { Language, SubjectId, VideoLesson } from "../types";
import { mockVideos, subjectsList } from "../data/mockData";
import { getLocalizedText } from "../utils/i18n";

interface VideoLessonsViewProps {
  language: Language;
}

export const VideoLessonsView: React.FC<VideoLessonsViewProps> = ({ language }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVideo, setActiveVideo] = useState<VideoLesson | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const filteredVideos = mockVideos.filter((v) => {
    const matchSubject = selectedSubject === "all" || v.subjectId === selectedSubject;
    const matchSearch =
      v.titleKu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.teacherName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubject && matchSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 border border-purple-800/40 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold">
            <Video className="w-3.5 h-3.5" />
            <span>
              {language === "badini"
                ? "ڤیدیۆیێن وانان ب کوالیتییا HD"
                : language === "ku"
                ? "ڤیدیۆی وانەکان بە کوالێتیی HD"
                : "Grade 12 High Quality Video Lessons"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {language === "badini"
              ? "وانەیێن ڤیدیۆیی یێن هەمی بابەتێن وزاری"
              : language === "ku"
              ? "وانە ڤیدیۆییەکانی هەموو بابەتە وزارییەکان"
              : "Ministerial Video Course Hub"}
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80">
            {language === "badini"
              ? "باشترین مامۆستایێن کوردستانێ شیکارکرنا بابەت و پرسیارێن وزاری ل ڤێرێ ب کەسیرکەتن"
              : language === "ku"
              ? "بەرزترین کوالێتیی فێرکاری بە دەستی بەتواناترین مامۆستایانی کوردستان"
              : "Learn from Kurdistan's top Grade 12 educators with step-by-step topic breakdowns."}
          </p>
        </div>
      </div>

      {/* Sleek Modern Control Center */}
      <div className="bg-[#16182e]/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-purple-500/30 shadow-2xl space-y-4">
        {/* Top Row: Title / Stats & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-black shadow-sm">
              <Video className="w-3.5 h-3.5 text-purple-400" />
              <span>
                {language === "badini"
                  ? `${filteredVideos.length} وانە بەردەستن`
                  : language === "ku"
                  ? `${filteredVideos.length} وانە بەردەستە`
                  : `${filteredVideos.length} Videos Available`}
              </span>
            </span>
          </div>

          {/* Smart Search Bar */}
          <div className="relative flex items-center bg-[#101222] border border-indigo-900/50 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20 rounded-2xl px-3.5 py-2.5 transition-all shadow-inner w-full sm:w-80">
            <Search className="w-4 h-4 text-purple-400 shrink-0 opacity-80" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === "badini"
                  ? "لگەڕیان بۆ وانە یان مامۆستای..."
                  : language === "ku"
                  ? "گەڕان بۆ وانە یان مامۆستا..."
                  : "Search video title or teacher..."
              }
              className="w-full bg-transparent border-none text-xs text-white placeholder-slate-500 focus:outline-none px-3 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-slate-400 hover:text-white transition p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Bottom Row: Segmented Subject Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <button
            onClick={() => setSelectedSubject("all")}
            className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
              selectedSubject === "all"
                ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-lg shadow-purple-600/30 scale-[1.02]"
                : "bg-[#101222]/90 border border-indigo-900/40 text-slate-300 hover:text-white hover:bg-white/5 hover:border-purple-500/40"
            }`}
          >
            {language === "badini" ? "✨ هەمی بابەت" : language === "ku" ? "✨ هەموو بابەتەکان" : "✨ All Subjects"}
          </button>
          {subjectsList.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSubject(s.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                selectedSubject === s.id
                  ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-lg shadow-purple-600/30 scale-[1.02]"
                  : "bg-[#101222]/90 border border-indigo-900/40 text-slate-300 hover:text-white hover:bg-white/5 hover:border-purple-500/40"
              }`}
            >
              <span>{s.iconSymbol}</span>
              <span>{getLocalizedText(s, "name", language)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-[#16182e] border border-indigo-900/30 hover:border-purple-500/50 rounded-2xl overflow-hidden shadow-xl transition group flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img
                  src={video.thumbnailUrl}
                  alt={video.titleKu}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                  <button
                    onClick={() => setActiveVideo(video)}
                    className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/50 group-hover:scale-110 transition"
                  >
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </button>
                </div>

                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-mono text-white">
                  {video.duration}
                </span>

                {video.isPremium && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[10px] font-extrabold shadow">
                    VIP 👑
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-purple-400 font-semibold">
                  <span>{getLocalizedText(video, "chapter", language)}</span>
                  <span>{video.views.toLocaleString()} {language === "badini" ? "بینین" : language === "ku" ? "بینەر" : "views"}</span>
                </div>

                <h3 className="text-sm font-bold text-white line-clamp-2 hover:text-purple-300 transition cursor-pointer" onClick={() => setActiveVideo(video)}>
                  {getLocalizedText(video, "title", language)}
                </h3>

                <span className="text-xs text-slate-400 block font-medium">
                  {video.teacherName}
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 pt-0 flex items-center justify-between border-t border-indigo-900/20 mt-3">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="flex items-center gap-1.5 text-xs text-purple-300 hover:text-purple-200 font-semibold"
              >
                <Volume2 className={`w-4 h-4 ${isPlayingAudio ? "animate-bounce text-amber-400" : ""}`} />
                <span>{isPlayingAudio ? (language === "badini" ? "پشتبەستن ب دەنگی..." : "پەخشکرنی دەنگ...") : (language === "badini" ? "ڕوونکردنا دەنگی" : "ڕوونکردنەوەی دەنگی")}</span>
              </button>

              <button
                onClick={() => setActiveVideo(video)}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition"
              >
                {language === "badini" ? "سەیربکە" : language === "ku" ? "سەیرکردن" : "Watch"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#111326] border border-purple-500/30 rounded-3xl p-6 text-slate-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-900/30 pb-3">
              <h2 className="text-base font-extrabold text-white truncate pr-4">
                {getLocalizedText(activeVideo, "title", language)}
              </h2>
              <button
                onClick={() => setActiveVideo(null)}
                className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500 transition"
              >
                داخستن
              </button>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-purple-500/20">
              <iframe
                src={activeVideo.videoUrl}
                title={activeVideo.titleKu}
                className="w-full h-full"
                allowFullScreen
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>{activeVideo.teacherName}</span>
              <span className="text-purple-400 font-bold">{getLocalizedText(activeVideo, "chapter", language)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
