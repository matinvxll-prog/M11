import React, { useState } from "react";
import { X, Book, Search, Volume2, Bookmark, Sparkles } from "lucide-react";
import { Language } from "../types";

interface DictionaryModalProps {
  language: Language;
  onClose: () => void;
}

interface DictionaryTerm {
  id: string;
  termEn: string;
  termBadini: string;
  termKu: string;
  termArabic: string;
  subject: string;
  definitionBadini: string;
  definitionEn: string;
  example: string;
}

const termsData: DictionaryTerm[] = [
  {
    id: "1",
    termEn: "Photosynthesis",
    termBadini: "پێکهاتنا ڕووناکی (فۆتۆسنتێز)",
    termKu: "ڕۆشنەپێکهاتن",
    termArabic: "البناء الضوئي",
    subject: "Biology / زیندەوەرناسی",
    definitionBadini: "پرۆسەیەکە تێدا ڕووەک ڕووناهیا ڕۆژێ، ئاڤێ و دووئۆکسیدا کاربۆنێ دگۆڕیت بۆ شەکر و ئۆکسیجین.",
    definitionEn: "Process used by plants to convert light energy into chemical energy (glucose).",
    example: "Photosynthesis happens in chloroplasts inside plant leaves."
  },
  {
    id: "2",
    termEn: "Acceleration",
    termBadini: "تاودان (تاسیر)",
    termKu: "تاودان",
    termArabic: "التسارع",
    subject: "Physics / فیزیا",
    definitionBadini: "ڕێژەیا گۆڕینا لەزاتیێ د یەکا دەمیدا. یەکا وێ (m/s²) یە.",
    definitionEn: "The rate of change of velocity per unit time.",
    example: "a = (v_final - v_initial) / t"
  },
  {
    id: "3",
    termEn: "Electronegativity",
    termBadini: "کارەبا نەرێنی",
    termKu: "کارەبانەرێنی",
    termArabic: "السالبية الكهربائية",
    subject: "Chemistry / کیمیا",
    definitionBadini: "شیانا گەردیلەیێ بۆ کێشانا جووتا ئەلیکترۆنان د بەندا کیمیاییدا بۆ لایێ خۆ.",
    definitionEn: "A measure of the tendency of an atom to attract a bonding pair of electrons.",
    example: "Fluorine has the highest electronegativity value (4.0)."
  },
  {
    id: "4",
    termEn: "Derivative",
    termBadini: "دەرهاویشتە (مشتقە)",
    termKu: "داڕژاو",
    termArabic: "المشتقة",
    subject: "Mathematics / بیرکاری",
    definitionBadini: "دەرهاویشتا نەخشەیەکێ ئاستێ گۆڕینا وێ نیشان ددەت د خاڵەکا دیاریکریدا (f'(x)).",
    definitionEn: "The rate of change of a function with respect to a variable.",
    example: "The derivative of x² is 2x."
  },
  {
    id: "5",
    termEn: "Mitochondria",
    termBadini: "مایتۆکۆندریا (خانووکا وزێ)",
    termKu: "مایتۆکۆندریا",
    termArabic: "المايتوكندريا",
    subject: "Biology / زیندەوەرناسی",
    definitionBadini: "ئەندامۆکەکە د خانەیێدا کو بەرپرسیارە ژ بەرهەمهێنانا وزەیێ ل سەر شێوێ ATP.",
    definitionEn: "Organelle that generates most of the chemical energy needed to power the cell (ATP).",
    example: "Known as the powerhouse of the cell."
  },
  {
    id: "6",
    termEn: "Ohm's Law",
    termBadini: "یاسایا ئۆمی",
    termKu: "یاسای ئۆم",
    termArabic: "قانون أوم",
    subject: "Physics / فیزیا",
    definitionBadini: "تەوژمێ کارەبایی د گەیەنەرەکیدا هەڤڕێژەیە دگەل جیاوازیا پەستانێ (V = I × R).",
    definitionEn: "Current through a conductor is proportional to potential difference.",
    example: "V = I × R where V is voltage, I is current, R is resistance."
  },
  {
    id: "7",
    termEn: "Conditional Clause (If)",
    termBadini: "ڕستەیا مەرجی (ئەگەر)",
    termKu: "ڕستەی مەرجی (ئەگەر)",
    termArabic: "الجملة الشرطية",
    subject: "English / ئینگلیزی",
    definitionBadini: "ڕستەیەکا گرامەرییە کو ئەنجامێ کارەکی گرێددەت ب ڕوودانا مەرجەکێ دیاریکری (Zero, 1st, 2nd, 3rd).",
    definitionEn: "A clause introduced by 'if' expressing a condition required for the main clause to occur.",
    example: "If I had studied harder, I would have passed the ministerial exam."
  },
  {
    id: "8",
    termEn: "Passive Voice",
    termBadini: "ڕستەیا نادیار (بەرکار)",
    termKu: "ڕستەی نادیار",
    termArabic: "المبني للمجهول",
    subject: "English / ئینگلیزی",
    definitionBadini: "پێکهاتەکا ڕێزمانییە دەمێ گرنگی دکەڤیتە سەر کار یان بەرکاری ل شوونا بکەری.",
    definitionEn: "Grammatical construction where the subject is the recipient of the action.",
    example: "The English ministerial exam papers were graded carefully."
  },
  {
    id: "9",
    termEn: "Metaphor & Simile",
    termBadini: "خواستن و لێکچواندن د ئێپسوداندا",
    termKu: "خواستن و لێکچواندن لە ئێپسودەکان",
    termArabic: "الاستعارة والتشبيه",
    subject: "English / ئینگلیزی",
    definitionBadini: "ئامرازێن ئەدەبینە بۆ هەڤبەرکرنا دوو تشتێن جیاواز د چیرۆکا پۆلا ١٢ دا.",
    definitionEn: "Figures of speech used in literature and Grade 12 episodes for imaginative comparisons.",
    example: "His determination was a rock amidst the stormy challenges."
  }
];

export const DictionaryModal: React.FC<DictionaryModalProps> = ({
  language,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [activeTerm, setActiveTerm] = useState<DictionaryTerm>(termsData[0]);
  const [speaking, setSpeaking] = useState(false);

  const title =
    language === "badini"
      ? "فەرهەنگا زانستی و فەرهەنگۆکا پۆلا ۱۲"
      : language === "ku"
      ? "فەرهەنگی زانستی و زاراوەکانی پۆلی ۱۲"
      : "Grade 12 Academic Dictionary";

  const filteredTerms = termsData.filter((t) => {
    const matchesSearch =
      t.termEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.termBadini.includes(searchTerm) ||
      t.termKu.includes(searchTerm) ||
      t.termArabic.includes(searchTerm);
    const matchesSubject =
      selectedSubject === "all" || t.subject.toLowerCase().includes(selectedSubject.toLowerCase());
    return matchesSearch && matchesSubject;
  });

  const handleSpeech = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0f1123] border border-indigo-900/40 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col h-[85vh] text-slate-100">
        {/* Header */}
        <div className="p-4 border-b border-indigo-900/40 flex items-center justify-between bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-purple-900/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-400">
              <Book className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">{title}</h3>
              <p className="text-xs text-purple-300">
                {language === "badini"
                  ? "زاراڤێن زیندەوەرناسی، فیزیا، کیمیا و بیرکاری"
                  : "زاراوەکانی زانستەکانی پۆلی ۱۲"}
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

        {/* Search & Subject Filters */}
        <div className="p-4 border-b border-indigo-900/30 bg-[#121429] flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 flex items-center bg-[#1a1c38] border border-indigo-900/40 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20 rounded-xl px-3.5 py-2 transition-all shadow-inner w-full">
            <Search className="w-4 h-4 text-purple-400 shrink-0 opacity-80" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                language === "badini"
                  ? "لیرە بگەڕێ... (Photosynthesis, تاودان)"
                  : "گەڕان بەدوای زاراوەدا..."
              }
              className="w-full bg-transparent border-none text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none px-3 font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-slate-400 hover:text-white transition p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-[#1a1c38] border border-indigo-900/40 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500 font-bold shadow-sm"
          >
            <option value="all">✨ هەمی بابەت (All Subjects)</option>
            <option value="biology">🧬 زیندەوەرناسی (Biology)</option>
            <option value="physics">⚛️ فیزیا (Physics)</option>
            <option value="chemistry">🧪 کیمیا (Chemistry)</option>
            <option value="mathematics">📐 بیرکاری (Math)</option>
          </select>
        </div>

        {/* Main Content Layout */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 overflow-hidden">
          {/* Terms List Sidebar */}
          <div className="border-b md:border-b-0 md:border-r border-indigo-900/30 p-3 overflow-y-auto space-y-2 bg-[#0c0d1c]">
            {filteredTerms.map((t) => {
              const isSelected = activeTerm.id === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTerm(t)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-purple-600/20 border-purple-500/50 text-white"
                      : "bg-[#14162e] border-indigo-900/20 text-slate-300 hover:bg-[#1c1e3d]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-purple-300">
                      {t.termEn}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                      {t.subject.split("/")[0]}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 mt-1 font-medium">{t.termBadini}</p>
                </button>
              );
            })}
          </div>

          {/* Active Term Detailed Card */}
          <div className="md:col-span-2 p-5 overflow-y-auto bg-[#0f1123] space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-900/30 pb-3">
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wide">
                  {activeTerm.subject}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  {activeTerm.termEn}
                </h2>
              </div>
              <button
                onClick={() => handleSpeech(activeTerm.termEn)}
                className={`p-3 rounded-2xl border transition-all ${
                  speaking
                    ? "bg-purple-600 text-white border-purple-400 animate-pulse"
                    : "bg-indigo-950/80 border-indigo-800/40 text-purple-300 hover:bg-indigo-900"
                }`}
                title="دەنگێ ئینگلیزی ببیستە"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Translation Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#16182e] border border-indigo-900/30">
                <span className="text-[10px] text-slate-400 block font-bold">بادینی</span>
                <span className="text-sm font-bold text-purple-200">{activeTerm.termBadini}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#16182e] border border-indigo-900/30">
                <span className="text-[10px] text-slate-400 block font-bold">سۆرانی</span>
                <span className="text-sm font-bold text-indigo-200">{activeTerm.termKu}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#16182e] border border-indigo-900/30">
                <span className="text-[10px] text-slate-400 block font-bold">عەرەبی</span>
                <span className="text-sm font-bold text-emerald-300">{activeTerm.termArabic}</span>
              </div>
            </div>

            {/* Definition Badini */}
            <div className="p-4 rounded-2xl bg-[#16182e] border border-indigo-900/30 space-y-1">
              <span className="text-xs font-bold text-purple-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> ڕوونکردنا زانستی (بادینی):
              </span>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {activeTerm.definitionBadini}
              </p>
            </div>

            {/* Definition English */}
            <div className="p-4 rounded-2xl bg-[#16182e] border border-indigo-900/30 space-y-1">
              <span className="text-xs font-bold text-indigo-400">English Definition:</span>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                {activeTerm.definitionEn}
              </p>
            </div>

            {/* Example */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-purple-950/40 border border-purple-800/30 space-y-1">
              <span className="text-xs font-bold text-amber-400">میناک و یاسا (Example / Formula):</span>
              <p className="text-xs sm:text-sm text-amber-200 font-mono">
                {activeTerm.example}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
