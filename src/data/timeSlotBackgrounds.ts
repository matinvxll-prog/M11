import spedaBg from "../assets/images/speda_bg_1785268781700.jpg";
import nifroBg from "../assets/images/nifro_bg_1785268796260.jpg";
import evariBg from "../assets/images/evari_bg_1785268810381.jpg";
import shefBg from "../assets/images/shef_bg_1785268825970.jpg";

export interface TimeSlotPreset {
  id: string;
  labelKu: string;
  labelBadini: string;
  labelEn: string;
  start: string;
  end: string;
  range: string;
  icon: string;
  bgImage: string;
  overlayGradient: string;
  activeRing: string;
}

export const timeSlotPresets: TimeSlotPreset[] = [
  {
    id: "speda",
    labelKu: "سپێدە",
    labelBadini: "سپێدە",
    labelEn: "Morning",
    start: "08:00 AM",
    end: "10:00 AM",
    range: "(08:00 - 10:00)",
    icon: "🌅",
    bgImage: spedaBg,
    overlayGradient: "bg-gradient-to-r from-sky-950/60 via-sky-900/40 to-emerald-950/60 hover:from-sky-950/50 hover:to-emerald-950/50",
    activeRing: "ring-4 ring-sky-400 border-white shadow-sky-400/30"
  },
  {
    id: "nifro",
    labelKu: "نیڤڕۆ",
    labelBadini: "نیڤڕۆ",
    labelEn: "Afternoon",
    start: "02:00 PM",
    end: "04:00 PM",
    range: "(02:00 - 04:00)",
    icon: "☀️",
    bgImage: nifroBg,
    overlayGradient: "bg-gradient-to-r from-amber-950/60 via-orange-900/40 to-yellow-950/60 hover:from-amber-950/50 hover:to-yellow-950/50",
    activeRing: "ring-4 ring-amber-400 border-white shadow-amber-400/30"
  },
  {
    id: "evari",
    labelKu: "ئێڤاری",
    labelBadini: "ئێڤاری",
    labelEn: "Evening",
    start: "05:00 PM",
    end: "07:00 PM",
    range: "(05:00 - 07:00)",
    icon: "🌇",
    bgImage: evariBg,
    overlayGradient: "bg-gradient-to-r from-rose-950/60 via-orange-950/40 to-amber-950/60 hover:from-rose-950/50 hover:to-amber-950/50",
    activeRing: "ring-4 ring-rose-400 border-white shadow-rose-400/30"
  },
  {
    id: "shef",
    labelKu: "شەڤ",
    labelBadini: "شەڤ",
    labelEn: "Night",
    start: "08:00 PM",
    end: "10:30 PM",
    range: "(08:00 - 10:30)",
    icon: "🌙",
    bgImage: shefBg,
    overlayGradient: "bg-gradient-to-r from-slate-950/70 via-indigo-950/50 to-blue-950/70 hover:from-slate-950/60 hover:to-blue-950/60",
    activeRing: "ring-4 ring-indigo-400 border-white shadow-indigo-400/30"
  }
];
