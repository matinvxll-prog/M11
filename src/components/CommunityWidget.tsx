import React from "react";
import { Users, MessageSquare, MessageCircle, UserPlus, ArrowRight, Sparkles, Heart, MessageSquareText } from "lucide-react";
import { Language } from "../types";

interface CommunityWidgetProps {
  posts?: any[];
  language: Language;
  isDarkMode?: boolean;
  onViewAll?: () => void;
  onOpenCommunity?: () => void;
  onOpenFriends?: () => void;
}

export const CommunityWidget: React.FC<CommunityWidgetProps> = ({
  posts = [],
  language,
  isDarkMode = true,
  onViewAll,
  onOpenCommunity,
  onOpenFriends
}) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";

  const handleViewAll = () => {
    if (onViewAll) onViewAll();
    else if (onOpenCommunity) onOpenCommunity();
  };

  const communityItems = [
    {
      id: "groups",
      titleBadini: "گروپێن خویندنێ",
      titleKu: "گرووپەکانی خوێندن",
      titleEn: "Study Groups",
      subBadini: "پێکڤە بێژن و گروپان چێکەن",
      subKu: "بەشداری بکە لە گرووپەکان",
      subEn: "Join or create study groups",
      icon: Users,
      color: "from-cyan-500 to-blue-600 text-white shadow-cyan-500/20",
      action: onOpenCommunity
    },
    {
      id: "chat",
      titleBadini: "چات و بەحسکرن",
      titleKu: "چات لەگەڵ هاوڕێیان",
      titleEn: "Chat",
      subBadini: "گۆتوبێژ دگەل هەڤالان بکە",
      subKu: "قسە لەگەڵ هاوڕێیان بکە",
      subEn: "Chat with friends",
      icon: MessageSquare,
      color: "from-purple-500 to-indigo-600 text-white shadow-purple-500/20",
      action: onOpenFriends
    },
    {
      id: "forums",
      titleBadini: "فۆڕوم و پرسیار",
      titleKu: "فۆڕومی پرسیار و وەڵام",
      titleEn: "Forums",
      subBadini: "پسیاران بکە و زانیاریان بهۆڕنەوە",
      subKu: "پرسیار بپرسیارە و زانیاری هاوبەش بکە",
      subEn: "Ask questions & share knowledge",
      icon: MessageCircle,
      color: "from-indigo-500 to-violet-600 text-white shadow-indigo-500/20",
      action: onOpenCommunity
    },
    {
      id: "friends",
      titleBadini: "هەڤالێن من",
      titleKu: "هاوڕێیان",
      titleEn: "Friends",
      subBadini: "هەڤالان زێدە بکە و بڕێڤەببە",
      subKu: "هاوڕێی نوێ زیاد بکە",
      subEn: "Add and manage friends",
      icon: UserPlus,
      color: "from-amber-500 to-orange-600 text-white shadow-amber-500/20",
      action: onOpenFriends
    }
  ];

  return (
    <div
      className={`border rounded-3xl p-5 sm:p-6 shadow-xl transition-all duration-300 flex flex-col justify-between ${
        isDarkMode
          ? "bg-[#111326]/95 border-indigo-900/40 text-white shadow-indigo-950/50"
          : "bg-white border-purple-100 text-slate-900 shadow-purple-900/5"
      }`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-tight">
                {isBadini ? "جڤاک (Community)" : isKu ? "کۆمەڵگە" : "Community Hub"}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <p className={`text-[11px] font-semibold ${isDarkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                  {isBadini ? "١,٤٢٠ قوتابی ئانلاینن" : isKu ? "١,٤٢٠ قوتابی ئانلاینن" : "1,420 Students Online"}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleViewAll}
            className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl transition ${
              isDarkMode
                ? "bg-purple-500/15 text-purple-300 hover:bg-purple-500/25"
                : "bg-purple-50 text-purple-700 hover:bg-purple-100"
            }`}
          >
            <span>{isBadini ? "هەمی بینە" : "بینینی هەمووی"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2x2 Grid of Community Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
          {communityItems.map((item) => {
            const Icon = item.icon;
            const title = isBadini ? item.titleBadini : isKu ? item.titleKu : item.titleEn;
            const sub = isBadini ? item.subBadini : isKu ? item.subKu : item.subEn;

            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`p-3.5 rounded-2xl border transition-all duration-200 text-left flex items-start gap-3 group hover:scale-[1.02] ${
                  isDarkMode
                    ? "bg-[#16182e]/80 hover:bg-[#1d203e] border-indigo-900/30 hover:border-purple-500/40"
                    : "bg-slate-50 hover:bg-purple-50/60 border-slate-200/80 hover:border-purple-300 shadow-sm"
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl bg-gradient-to-br ${item.color} shadow-md shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="overflow-hidden min-w-0">
                  <h4 className={`font-black text-xs sm:text-sm truncate group-hover:text-purple-400 transition-colors ${
                    isDarkMode ? "text-white" : "text-slate-800"
                  }`}>
                    {title}
                  </h4>
                  <p className={`text-[11px] truncate mt-0.5 font-semibold ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}>
                    {sub}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Recent Hot Forum Topic Snippet */}
        {posts && posts.length > 0 && (
          <div className={`p-3.5 rounded-2xl border mb-4 ${
            isDarkMode ? "bg-[#16182e]/60 border-indigo-900/20" : "bg-purple-50/50 border-purple-100"
          }`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>{isBadini ? "بشارەترین پۆستا جڤاکی 🔥" : isKu ? "گەرمترین پۆستی فۆڕوم 🔥" : "Hot Discussion 🔥"}</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400">{posts[0].timeAgo || "ئێستا"}</span>
            </div>

            <p className={`text-xs font-extrabold line-clamp-1 ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
              {posts[0].content || posts[0].title || "چۆن بتوانین لە ماوەی مانگێکدا پێداچوونەوە بۆ بیرکاری پۆلی ١٢ بکەین؟"}
            </p>

            <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-indigo-900/10 dark:border-indigo-900/20 text-[11px] font-bold text-slate-400">
              <div className="flex items-center gap-1.5">
                <img src={posts[0].authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"} alt="author" className="w-4 h-4 rounded-full object-cover" />
                <span>{posts[0].authorName || "ئاریان ئەحمەد"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-rose-400"><Heart className="w-3 h-3 fill-rose-400" /> {posts[0].likes || 24}</span>
                <span className="flex items-center gap-1 text-purple-400"><MessageSquareText className="w-3 h-3" /> {posts[0].comments || 8}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Join Forum Button */}
      <button
        onClick={handleViewAll}
        className="w-full mt-2 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 group hover:scale-[1.01]"
      >
        <MessageCircle className="w-4 h-4 text-purple-200 group-hover:rotate-12 transition-transform" />
        <span>
          {isBadini ? "بەشداریێ د فۆڕوما جڤاکی دا بکە 💬" : isKu ? "بەشداری لە فۆڕومی کۆمەڵگە بکە 💬" : "Join Community Forum 💬"}
        </span>
      </button>
    </div>
  );
};
