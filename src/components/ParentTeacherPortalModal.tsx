import React, { useState } from "react";
import {
  X,
  Users,
  ShieldCheck,
  CreditCard,
  Building,
  UserCheck,
  FileCheck2,
  TrendingUp,
  Lock,
  Smartphone,
  Mail,
  CheckCircle2,
  Plus
} from "lucide-react";
import { Language } from "../types";

interface ParentTeacherPortalModalProps {
  language: Language;
  onClose: () => void;
}

export const ParentTeacherPortalModal: React.FC<ParentTeacherPortalModalProps> = ({
  language,
  onClose
}) => {
  const isBadini = language === "badini";
  const [portalType, setPortalType] = useState<"teacher" | "parent" | "payment" | "security">("teacher");

  // Security state
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#121427] border border-indigo-900/60 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-indigo-900/40 flex items-center justify-between bg-[#171933]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-white">
                {isBadini ? "پۆرتالا مامۆستا، دایباب، پارەدان و پاراستن" : "پۆرتالی مامۆستا و دایبابان"}
              </h2>
              <p className="text-xs text-slate-400">مامۆستا، دایباب، شێوازێن پارەدانێ و پاراستنا هەژمارێ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="p-3 bg-[#0d0e1b] border-b border-indigo-900/40 flex overflow-x-auto gap-2">
          <button
            onClick={() => setPortalType("teacher")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              portalType === "teacher" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>بۆ مامۆستایان (Teacher)</span>
          </button>
          <button
            onClick={() => setPortalType("parent")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              portalType === "parent" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>بۆ دایبابان (Parent)</span>
          </button>
          <button
            onClick={() => setPortalType("payment")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              portalType === "payment" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>پارەدان (Payments)</span>
          </button>
          <button
            onClick={() => setPortalType("security")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              portalType === "security" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>پاراستن (Security & 2FA)</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TEACHER PORTAL */}
          {portalType === "teacher" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#171933] border border-indigo-900/30 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-sm text-white">دروسکرنا تاقیکردنەوەیا نوی (Create Exam)</h4>
                  <p className="text-xs text-slate-400">پرسیارێن دروست ب هەڵبژاردن بۆ قوتابییان زێدە بکە.</p>
                </div>
                <button
                  onClick={() => alert("فۆڕما دروستکرنا تاقیکردنەوەیێ ڤەبوو!")}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>زیادکرن</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#171933] border border-indigo-900/30 space-y-2">
                <h4 className="font-bold text-sm text-white">ئەنجامێن قوتابییان (Student Results)</h4>
                <p className="text-xs text-slate-400">بینینی نمرەکانی قوتابییانی پۆلەکەت لە تاقیکردنەوەکاندا.</p>
                <div className="p-3 rounded-xl bg-[#0e1021] text-xs text-amber-300 font-mono">
                  48 قوتابی بەشدارییان کردووە - تێکڕای نمرە: 87.5%
                </div>
              </div>
            </div>
          )}

          {/* PARENT PORTAL */}
          {portalType === "parent" && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#171933] border border-indigo-900/30 space-y-3">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>ڕاپۆرتی هەفتانەی منداڵەکەت (Weekly Report)</span>
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#0e1021] border border-indigo-900/20">
                    <span className="text-slate-400 block">کاتژمێری خوێندن</span>
                    <span className="font-bold text-white text-sm">14 کاتژمێر</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0e1021] border border-indigo-900/20">
                    <span className="text-slate-400 block">تێکڕای نمرە</span>
                    <span className="font-bold text-emerald-400 text-sm">92%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PAYMENT METHODS */}
          {portalType === "payment" && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-white">شێوازێن وەرگرتنا پارەی و ئابوونەیێن بەهێز</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["FastPay", "ZainCash", "Qi Card", "Visa / Master"].map((pay, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#171933] border border-indigo-900/40 text-center space-y-2">
                    <CreditCard className="w-6 h-6 text-purple-400 mx-auto" />
                    <span className="font-bold text-xs text-white block">{pay}</span>
                    <span className="text-[10px] text-emerald-400 font-bold block">Active</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECURITY & 2FA */}
          {portalType === "security" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#171933] border border-indigo-900/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-amber-400" />
                  <div>
                    <h4 className="font-bold text-sm text-white">Two-Factor Authentication (2FA)</h4>
                    <p className="text-xs text-slate-400">پشتڕاستکردنەوەی دوو قۆناغی ب کۆدێ مۆبایلێ.</p>
                  </div>
                </div>
                <button
                  onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold ${
                    is2FAEnabled ? "bg-emerald-600 text-white" : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {is2FAEnabled ? "چالاکە (Active)" : "ناچالاکە"}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#171933] border border-indigo-900/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <div>
                    <h4 className="font-bold text-sm text-white">Email Verification</h4>
                    <p className="text-xs text-slate-400">ئیمەیڵەکەت پشتڕاستکراوەتەوە.</p>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
