import React, { useState } from "react";
import { X, Headphones, Play, Pause, SkipForward, SkipBack, Volume2, Sparkles } from "lucide-react";
import { Language } from "../types";

interface AudioLessonsModalProps {
  language: Language;
  onClose: () => void;
}

interface AudioTrack {
  id: string;
  titleBadini: string;
  titleKu: string;
  titleEn: string;
  subject: string;
  duration: string;
  teacher: string;
}

const tracks: AudioTrack[] = [
  {
    id: "1",
    titleBadini: "پێکهاتنا ڕووناکی و ژوانگەیێن کلۆرۆپلاست",
    titleKu: "ڕۆشنەپێکهاتن و کلۆرۆپلاستەکان",
    titleEn: "Photosynthesis & Chloroplasts",
    subject: "Biology / زیندەوەرناسی",
    duration: "12:45",
    teacher: "م. ئەحمەد هەولێری"
  },
  {
    id: "2",
    titleBadini: "یاسا و تێبینیێن تاودانێ د فیزیا پۆلا ۱۲دا",
    titleKu: "یاساکانی تاودان لە فیزیا",
    titleEn: "Acceleration & Motion Laws",
    subject: "Physics / فیزیا",
    duration: "18:20",
    teacher: "م. ڕێبین زاخۆیی"
  },
  {
    id: "3",
    titleBadini: "شیکارکرنا بەندێن کیمیایی و کێشانا ئەلیکترۆنی",
    titleKu: "شیکاری بەندە کیمیاییەکان",
    titleEn: "Chemical Bonding Deep Dive",
    subject: "Chemistry / کیمیا",
    duration: "15:10",
    teacher: "م. هێمن دۆسکی"
  },
  {
    id: "4",
    titleBadini: "ڕێزمانی کوردی: بەیان و خواستن د ئەدەبدا",
    titleKu: "ڕێزمانی کوردی: خواستن",
    titleEn: "Kurdish Grammar & Literature",
    subject: "Kurdish / ئەدەبی کوردی",
    duration: "10:30",
    teacher: "م. بڵند ئاکرەیی"
  },
  {
    id: "5",
    titleBadini: "ڕێزمانی یونتی ١ و ٢: ئامۆژگاری، پێشنیار، و دەمەکان د وزاری دا",
    titleKu: "ڕێزمانی یونتی ١ و ٢: ئامۆژگاری، پێشنیار و دەمەکان",
    titleEn: "Unit 1 & 2 Grammar: Advice, Suggestions & Tenses",
    subject: "English / ئینگلیزی",
    duration: "16:45",
    teacher: "م. کامەران سلێمانی"
  },
  {
    id: "6",
    titleBadini: "ڕێزمانی یونتی ٣، ٥ و ٦: Active/Passive، مەرجییەکان و Relative Clauses",
    titleKu: "ڕێزمانی یونتی ٣، ٥ و ٦: نادیار، مەرجییەکان و ڕستە پەیوەندییەکان",
    titleEn: "Unit 3, 5 & 6: Active/Passive, Conditionals & Relative Clauses",
    subject: "English / ئینگلیزی",
    duration: "19:20",
    teacher: "م. دیار زاخۆیی"
  },
  {
    id: "7",
    titleBadini: "شیکاریا ٧ ئێپسودێن کامل و وشە وزارییێن گرنگ د رێدینگ دا",
    titleKu: "شیکاری ٧ ئێپسودی تەواو و وشە وزارییە گرنگەکان لە ڕیدینگ دا",
    titleEn: "All 7 Episodes Story Analysis & Ministerial Vocabulary",
    subject: "English / ئینگلیزی",
    duration: "24:10",
    teacher: "م. شێرزاد هەولێری"
  }
];

export const AudioLessonsModal: React.FC<AudioLessonsModalProps> = ({
  language,
  onClose
}) => {
  const [activeTrack, setActiveTrack] = useState<AudioTrack>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  const title =
    language === "badini"
      ? "دەنگی ڕوونکردنەوەیێن وانان (Audio Lessons)"
      : language === "ku"
      ? "وانی دەنگییەکانی پۆلی ۱۲"
      : "Audio Lessons & Explanations";

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0f1123] border border-indigo-900/40 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100">
        {/* Header */}
        <div className="p-4 border-b border-indigo-900/40 flex items-center justify-between bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-purple-900/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-400">
              <Headphones className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">{title}</h3>
              <p className="text-xs text-purple-300">
                {language === "badini"
                  ? "سەحکە گوێگرتنا دەنگی بۆ هەمی بابەتان د ڕێگایێدا"
                  : "گوێگرتن لە وانە دەنگییەکان"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Player Player Hero Box */}
        <div className="p-6 bg-gradient-to-br from-[#13152d] via-[#1a1c3b] to-[#121428] border-b border-indigo-900/30 flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-0.5 shadow-xl shadow-purple-600/30 flex items-center justify-center">
            <div className="w-full h-full rounded-2xl bg-[#0f1123] flex items-center justify-center text-purple-400">
              <Volume2 className="w-8 h-8" />
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase">
              {activeTrack.subject} • {activeTrack.teacher}
            </span>
            <h4 className="text-base sm:text-lg font-extrabold text-white mt-1">
              {language === "badini"
                ? activeTrack.titleBadini
                : language === "ku"
                ? activeTrack.titleKu
                : activeTrack.titleEn}
            </h4>
          </div>

          {/* Progress Bar */}
          <div className="w-full space-y-1">
            <div className="w-full bg-indigo-950 rounded-full h-2 overflow-hidden cursor-pointer">
              <div
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>04:15</span>
              <span>{activeTrack.duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6">
            <button className="p-2 rounded-full text-slate-400 hover:text-white transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={togglePlay}
              className="p-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-600/40 hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
            <button className="p-2 rounded-full text-slate-400 hover:text-white transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tracks List */}
        <div className="p-4 space-y-2 max-h-60 overflow-y-auto bg-[#0a0b16]">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> لیستا وانێن دەنگی (Audio Playlist)
          </span>

          {tracks.map((t) => {
            const isSelected = activeTrack.id === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTrack(t);
                  setIsPlaying(true);
                }}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  isSelected
                    ? "bg-purple-600/20 border-purple-500/50 text-white"
                    : "bg-[#14162e] border-indigo-900/20 text-slate-300 hover:bg-[#1c1e3d]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isSelected ? "bg-purple-600 text-white" : "bg-indigo-950 text-indigo-300"
                    }`}
                  >
                    <Play className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-white">
                      {language === "badini"
                        ? t.titleBadini
                        : language === "ku"
                        ? t.titleKu
                        : t.titleEn}
                    </h5>
                    <span className="text-[10px] text-slate-400">
                      {t.subject} • {t.teacher}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-mono text-purple-300">{t.duration}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
