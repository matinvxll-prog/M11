import React from "react";
import { Award, CheckCircle, Crown, ExternalLink } from "lucide-react";
import { Language, UserProfile } from "../types";

interface CertificatesWidgetProps {
  language: Language;
  user: UserProfile;
  onOpenCertificate: () => void;
}

export const CertificatesWidget: React.FC<CertificatesWidgetProps> = ({
  language,
  user,
  onOpenCertificate
}) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";

  return (
    <div className="bg-[#121427] border border-indigo-900/40 rounded-3xl p-5 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <h3 className="font-extrabold text-base text-white">
            {isBadini ? "بڕوانامێن دەستکەوتی (Certificates)" : isKu ? "بڕوانامەکان" : "Certificates"}
          </h3>
        </div>
        <button
          onClick={onOpenCertificate}
          className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
        >
          <span>{isBadini ? "هەمی بینە" : "بینینی هەمووی"}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Mini Certificate Card Replica */}
      <div
        onClick={onOpenCertificate}
        className="cursor-pointer group p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 hover:border-amber-400 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-44 shadow-lg"
      >
        <div className="absolute top-2 right-2 p-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
          <Crown className="w-5 h-5" />
        </div>

        <div>
          <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">
            Certificate of Achievement
          </span>
          <h4 className="text-sm font-extrabold text-white mt-1 group-hover:text-amber-300 transition-colors">
            {user.name}
          </h4>
          <p className="text-[11px] text-slate-300 mt-0.5">
            {isBadini
              ? "ژ بۆ سەرکەفتنا نایاب د خولا فیزیا پۆلا ۱۲ زانستی"
              : "بۆ بەدەستهێنانی پلەی نایاب لە خولی فیزیا"}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-amber-500/20 pt-2 text-[10px] text-amber-300/80 font-mono">
          <span>Course: Physics Fundamentals</span>
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <CheckCircle className="w-3 h-3" /> Verified
          </span>
        </div>
      </div>
    </div>
  );
};
