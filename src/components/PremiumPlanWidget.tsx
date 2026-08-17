import React from "react";
import { Crown, Check, Sparkles } from "lucide-react";
import { Language } from "../types";

interface PremiumPlanWidgetProps {
  language: Language;
  onOpenPremium: () => void;
}

export const PremiumPlanWidget: React.FC<PremiumPlanWidgetProps> = ({
  language,
  onOpenPremium
}) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";

  const benefits = [
    isBadini ? "ڤیدیۆیێن فول HD بەبێ ریکلام" : "ڤیدیۆی HD بێ ڕیکلام",
    isBadini ? "مەلزەمێن PDF ب شێوێ ڕاستەوخۆ" : "PDF تایبەتەکان",
    isBadini ? "ئاڵنگاریێن تایبەتێن VIP" : "ئاڵنگاریی تایبەت",
    isBadini ? "پشتیوانیا ۲۴ دەمژمێری ژ مۆمیۆزان" : "پشتیوانیی خێرا"
  ];

  return (
    <div className="bg-gradient-to-br from-purple-950/60 via-[#121427] to-indigo-950/60 border border-purple-500/40 rounded-3xl p-5 shadow-xl flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-2 mb-3">
        <Crown className="w-5 h-5 text-amber-400" />
        <h3 className="font-extrabold text-base text-white">
          {isBadini ? "پلانا پریمیۆم (Premium Plan)" : isKu ? "پلانی پریمیۆم" : "Premium Plan"}
        </h3>
      </div>

      <div className="space-y-2 my-2">
        {benefits.map((b, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
            <div className="p-0.5 rounded-full bg-purple-500/30 text-purple-300">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span>{b}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onOpenPremium}
        className="mt-4 w-full py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        <span>{isBadini ? "پلانا خوی نویکە (Go Premium)" : "ئێستا ئەپگرەید بکە"}</span>
      </button>
    </div>
  );
};
