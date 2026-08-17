import React from "react";
import {
  FilePlus,
  Video,
  FileText,
  Users,
  Bell,
  BarChart3,
  ShieldCheck
} from "lucide-react";
import { Language } from "../types";

interface AdminPanelWidgetProps {
  language: Language;
  onOpenAdmin: () => void;
}

export const AdminPanelWidget: React.FC<AdminPanelWidgetProps> = ({
  language,
  onOpenAdmin
}) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";

  const actions = [
    {
      id: "q",
      titleBadini: "زێدەکرنا پرسیاران",
      titleKu: "زیادکردنی پرسیار",
      titleEn: "Add Questions",
      subBadini: "بڕێڤەبرنا پرسیاران",
      subKu: "بەڕێوەبردنی پرسیارەکان",
      subEn: "Manage Questions",
      icon: FilePlus,
      color: "from-purple-600/30 to-indigo-600/30 text-purple-300 border-purple-500/40"
    },
    {
      id: "v",
      titleBadini: "زێدەکرنا ڤیدیۆیان",
      titleKu: "زیادکردنی ڤیدیۆ",
      titleEn: "Add Video",
      subBadini: "بارکرنا ڤیدیۆیێن نوی",
      subKu: "بارکردنی ڤیدیۆکان",
      subEn: "Upload Videos",
      icon: Video,
      color: "from-pink-600/30 to-rose-600/30 text-pink-300 border-pink-500/40"
    },
    {
      id: "p",
      titleBadini: "زێدەکرنا مەلزەمان",
      titleKu: "زیادکردنی مەلزەمە",
      titleEn: "Add PDF",
      subBadini: "بارکرنا مەلزەمێن PDF",
      subKu: "بارکردنی مەلزەمەکان",
      subEn: "Upload PDFs",
      icon: FileText,
      color: "from-indigo-600/30 to-blue-600/30 text-indigo-300 border-indigo-500/40"
    },
    {
      id: "u",
      titleBadini: "بڕێڤەبرنا بەکارهێنەران",
      titleKu: "بەڕێوەبردنی بەکارهێنەران",
      titleEn: "Manage Users",
      subBadini: "بینینا هەمی بەکارهێنەران",
      subKu: "بینی هەموو بەکارهێنەران",
      subEn: "View all users",
      icon: Users,
      color: "from-amber-600/30 to-yellow-600/30 text-amber-300 border-amber-500/40"
    },
    {
      id: "n",
      titleBadini: "ناردنا ئاگەهداریان",
      titleKu: "ناردنی ئاگاداری",
      titleEn: "Send Notification",
      subBadini: "ئاگەهدارکرنا قوتابییان",
      subKu: "ئاگادارکردنەوەی قوتابییان",
      subEn: "Notify users",
      icon: Bell,
      color: "from-emerald-600/30 to-teal-600/30 text-emerald-300 border-emerald-500/40"
    },
    {
      id: "a",
      titleBadini: "ئامارێن گشتی",
      titleKu: "ئامارە گشتییەکان",
      titleEn: "View Analytics",
      subBadini: "ئامارێن پلاتفۆڕمێ",
      subKu: "ئامارەکانی پلاتفۆڕم",
      subEn: "Platform Stats",
      icon: BarChart3,
      color: "from-cyan-600/30 to-blue-600/30 text-cyan-300 border-cyan-500/40"
    }
  ];

  return (
    <div className="bg-[#121427] border border-indigo-900/40 rounded-3xl p-5 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <h3 className="font-extrabold text-base text-white">
            {isBadini ? "پانێڵێ بڕێڤەبەری (Admin Panel)" : isKu ? "پانێڵی بەڕێوەبەر" : "Admin Panel"}
          </h3>
        </div>
        <button
          onClick={onOpenAdmin}
          className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors"
        >
          {isBadini ? "ڤەکرنا پانێڵێ بەرفراوان" : "کردنەوەی پانێڵ"}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {actions.map((act) => {
          const Icon = act.icon;
          const title = isBadini ? act.titleBadini : isKu ? act.titleKu : act.titleEn;
          const sub = isBadini ? act.subBadini : isKu ? act.subKu : act.subEn;

          return (
            <button
              key={act.id}
              onClick={onOpenAdmin}
              className="p-3 rounded-2xl bg-[#171933] border border-indigo-900/30 hover:border-purple-500/50 hover:bg-[#1f2244] transition-all duration-200 text-left flex flex-col items-start gap-1.5"
            >
              <div
                className={`p-2 rounded-xl bg-gradient-to-br ${act.color} border`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs text-white block truncate w-full">
                {title}
              </span>
              <span className="text-[10px] text-slate-400 block truncate w-full">
                {sub}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
