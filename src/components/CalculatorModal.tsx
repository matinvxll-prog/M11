import React, { useState } from "react";
import { X, Info, Sparkles, History, RotateCcw } from "lucide-react";
import { Language } from "../types";

interface CalculatorModalProps {
  language: Language;
  onClose: () => void;
  isOpen?: boolean;
}

export const CalculatorModal: React.FC<CalculatorModalProps> = ({
  language,
  onClose,
}) => {
  const [display, setDisplay] = useState<string>("0");
  const [formula, setFormula] = useState<string>("");
  const [ans, setAns] = useState<number>(0);
  const [memory, setMemory] = useState<number>(0);
  const [angleMode, setAngleMode] = useState<"DEG" | "RAD" | "GRAD">("DEG");
  const [isShift, setIsShift] = useState<boolean>(false);
  const [isAlpha, setIsAlpha] = useState<boolean>(false);
  const [historyList, setHistoryList] = useState<{ expr: string; res: string }[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const isKu = language === "ku";
  const isBadini = language === "badini";

  const factorial = (n: number): number => {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    let r = 1;
    for (let i = 2; i <= Math.min(n, 170); i++) r *= i;
    return r;
  };

  const handleInput = (val: string) => {
    if (isError) {
      setIsError(false);
      setDisplay("0");
      setFormula("");
    }

    if (val === "AC") {
      setDisplay("0");
      setFormula("");
      setIsShift(false);
      setIsAlpha(false);
      return;
    }

    if (val === "DEL") {
      if (display.length > 1 && display !== "0") {
        setDisplay(display.slice(0, -1));
      } else {
        setDisplay("0");
      }
      return;
    }

    if (val === "MODE") {
      setAngleMode((prev) => (prev === "DEG" ? "RAD" : prev === "RAD" ? "GRAD" : "DEG"));
      return;
    }

    if (val === "SHIFT") {
      setIsShift(!isShift);
      setIsAlpha(false);
      return;
    }

    if (val === "ALPHA") {
      setIsAlpha(!isAlpha);
      setIsShift(false);
      return;
    }

    if (val === "M+") {
      const num = parseFloat(display) || 0;
      setMemory((prev) => prev + num);
      setIsShift(false);
      return;
    }

    if (val === "M-") {
      const num = parseFloat(display) || 0;
      setMemory((prev) => prev - num);
      setIsShift(false);
      return;
    }

    if (val === "MR" || val === "RCL") {
      setDisplay(memory.toString());
      setIsShift(false);
      return;
    }

    if (val === "=") {
      evaluate();
      return;
    }

    let actualVal = val;
    if (isShift) {
      const shiftMap: Record<string, string> = {
        sin: "asin(",
        cos: "acos(",
        tan: "atan(",
        log: "10^",
        ln: "e^",
        "√": "³√(",
        "x²": "x³",
        nCr: "nPr",
        EXP: "π",
      };
      if (shiftMap[val]) actualVal = shiftMap[val];
      setIsShift(false);
    } else if (isAlpha) {
      setIsAlpha(false);
    }

    if (display === "0" && !isNaN(Number(actualVal))) {
      setDisplay(actualVal);
    } else {
      setDisplay((prev) => (prev === "0" ? actualVal : prev + actualVal));
    }
  };

  const evaluate = () => {
    try {
      let expr = display;
      const raw = expr;

      expr = expr.replace(/Ans/g, ans.toString());
      expr = expr.replace(/π/g, `(${Math.PI})`);
      expr = expr.replace(/e/g, `(${Math.E})`);
      expr = expr.replace(/×/g, "*").replace(/÷/g, "/");
      expr = expr.replace(/EXP/g, "*10^");
      expr = expr.replace(/(\d+)!!?/g, (_, num) => factorial(parseInt(num)).toString());
      expr = expr.replace(/(\d+(?:\.\d+)?|\([^)]+\))\s*\^\s*(\d+(?:\.\d+)?|\([^)]+\))/g, "Math.pow($1,$2)");
      expr = expr.replace(/(\d+(?:\.\d+)?|\([^)]+\))\s*x²/g, "Math.pow($1,2)");
      expr = expr.replace(/(\d+(?:\.\d+)?|\([^)]+\))\s*x³/g, "Math.pow($1,3)");
      expr = expr.replace(/³√\(([^)]+)\)/g, "Math.cbrt($1)");
      expr = expr.replace(/³√(\d+(?:\.\d+)?)/g, "Math.cbrt($1)");
      expr = expr.replace(/√\(([^)]+)\)/g, "Math.sqrt($1)");
      expr = expr.replace(/√(\d+(?:\.\d+)?)/g, "Math.sqrt($1)");

      expr = expr.replace(/(\d+)\s*nPr\s*(\d+)/g, (_, n, r) => {
        const N = parseInt(n), R = parseInt(r);
        return (factorial(N) / factorial(N - R)).toString();
      });
      expr = expr.replace(/(\d+)\s*nCr\s*(\d+)/g, (_, n, r) => {
        const N = parseInt(n), R = parseInt(r);
        return (factorial(N) / (factorial(R) * factorial(N - R))).toString();
      });

      const toRad = (v: number) => (angleMode === "DEG" ? (v * Math.PI) / 180 : angleMode === "GRAD" ? (v * Math.PI) / 200 : v);
      const fromRad = (v: number) => (angleMode === "DEG" ? (v * 180) / Math.PI : angleMode === "GRAD" ? (v * 200) / Math.PI : v);

      expr = expr.replace(/asin\(([^)]+)\)/g, (_, v) => fromRad(Math.asin(eval(v))).toString());
      expr = expr.replace(/acos\(([^)]+)\)/g, (_, v) => fromRad(Math.acos(eval(v))).toString());
      expr = expr.replace(/atan\(([^)]+)\)/g, (_, v) => fromRad(Math.atan(eval(v))).toString());
      expr = expr.replace(/sin\(([^)]+)\)/g, (_, v) => Math.sin(toRad(eval(v))).toString());
      expr = expr.replace(/cos\(([^)]+)\)/g, (_, v) => Math.cos(toRad(eval(v))).toString());
      expr = expr.replace(/tan\(([^)]+)\)/g, (_, v) => Math.tan(toRad(eval(v))).toString());
      expr = expr.replace(/log\(([^)]+)\)/g, "Math.log10($1)");
      expr = expr.replace(/ln\(([^)]+)\)/g, "Math.log($1)");
      expr = expr.replace(/10\^(\d+(?:\.\d+)?|\([^)]+\))/g, "Math.pow(10,$1)");
      expr = expr.replace(/e\^(\d+(?:\.\d+)?|\([^)]+\))/g, "Math.pow(Math.E,$1)");

      // eslint-disable-next-line no-new-func
      const res = new Function(`return ${expr}`)();
      if (res === undefined || isNaN(res) || !isFinite(res)) throw new Error("Err");

      const formatted = Number.isInteger(res) ? res.toString() : parseFloat(res.toFixed(8)).toString();
      setFormula(`${raw} =`);
      setDisplay(formatted);
      setAns(res);
      setHistoryList((prev) => [{ expr: raw, res: formatted }, ...prev.slice(0, 9)]);
    } catch {
      setIsError(true);
      setDisplay("Syntax ERROR");
      setFormula(display);
    }
  };

  const sciButtons = [
    { label: "x!", top: "x⁻¹", action: "x!" },
    { label: "nCr", top: "nPr", action: "nCr" },
    { label: "√", top: "³√", action: "√(" },
    { label: "x²", top: "x³", action: "x²" },
    { label: "^", top: "xʸ", action: "^" },
    { label: "log", top: "10ˣ", action: "log(" },
    { label: "ln", top: "eˣ", action: "ln(" },
    { label: "sin", top: "sin⁻¹", action: "sin(" },
    { label: "cos", top: "cos⁻¹", action: "cos(" },
    { label: "tan", top: "tan⁻¹", action: "tan(" },
  ];

  const mainButtons = [
    { label: "7", color: "num" },
    { label: "8", color: "num" },
    { label: "9", color: "num" },
    { label: "DEL", color: "del" },
    { label: "AC", color: "ac" },
    { label: "4", color: "num" },
    { label: "5", color: "num" },
    { label: "6", color: "num" },
    { label: "×", color: "op" },
    { label: "÷", color: "op" },
    { label: "1", color: "num" },
    { label: "2", color: "num" },
    { label: "3", color: "num" },
    { label: "+", color: "op" },
    { label: "-", color: "op" },
    { label: "0", color: "num" },
    { label: ".", color: "num" },
    { label: "EXP", color: "sci", top: "π" },
    { label: "Ans", color: "sci" },
    { label: "=", color: "eq" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      {/* Compact Calculator Box - fits strictly on any screen without overflowing */}
      <div className="w-full max-w-[440px] max-h-[94vh] rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-[#2a2c30] via-[#1d1f22] to-[#141517] border-[3px] border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col text-white relative overflow-hidden">
        
        {/* Compact Branding Header */}
        <div className="px-4 py-2 flex items-center justify-between gap-2 border-b border-slate-800/80 bg-[#1f2124] shrink-0">
          <div className="flex items-center gap-2">
            <img
              src="/src/assets/images/degel_qutabi_owl_mascot_1785171720218.jpg"
              alt="DEGEL QUTABI Mascot"
              className="w-7 h-7 rounded-full border-2 border-amber-400/80 object-cover shadow-sm"
            />
            <div className="flex flex-col">
              <span className="font-serif font-black tracking-wider text-sm sm:text-base text-amber-400 leading-none">
                DEGEL QUTABI
              </span>
              <span className="font-bold text-[10px] text-amber-300/80 mt-0.5 font-sans">
                {isBadini ? "دەگەل قوتابی - پۆلا ١٢" : isKu ? "دەگەل قوتابی - پۆلی ١٢" : "Grade 12 Calculator"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => { setShowTips(!showTips); setShowHistory(false); }}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition border flex items-center gap-1 ${
                showTips
                  ? "bg-indigo-500 text-white border-indigo-400"
                  : "bg-indigo-500/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/30"
              }`}
            >
              <Info className="w-3 h-3 text-indigo-400" />
              <span>{isBadini ? "ڕێنمایی" : isKu ? "ڕێنمایی" : "Tips"}</span>
            </button>
            <button
              onClick={() => { setShowHistory(!showHistory); setShowTips(false); }}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition border flex items-center gap-1 ${
                showHistory
                  ? "bg-amber-500 text-slate-950 border-amber-400"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
              }`}
            >
              <History className="w-3 h-3 text-amber-400" />
              <span>{historyList.length}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition"
              title={isBadini ? "دابخە" : isKu ? "داخستن" : "Close"}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Body - scrollable ONLY if screen is extremely short, but normally fits 100% */}
        <div className="p-3 sm:p-4 space-y-2.5 overflow-y-auto flex-1 flex flex-col justify-between">
          
          {/* LCD Display */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-[#c5d1c0] border-[3px] border-slate-700 shadow-inner text-[#1a221a] font-mono relative shrink-0">
            <div className="flex items-center justify-between text-[10px] font-black tracking-wider pb-1 border-b border-[#aab6a5]/60 mb-0.5 select-none">
              <div className="flex items-center gap-1.5">
                {isShift && <span className="px-1 py-0.2 rounded bg-[#2c382c] text-[#f4fff0] text-[9px] animate-pulse">SHIFT</span>}
                {isAlpha && <span className="px-1 py-0.2 rounded bg-[#8c222c] text-white text-[9px] animate-pulse">ALPHA</span>}
                <span className="font-extrabold px-1 rounded border border-[#2c382c]/40 text-[10px]">{angleMode}</span>
                {memory !== 0 && <span className="font-bold px-1 rounded bg-[#2c382c]/10 text-[9px]">M={memory}</span>}
              </div>
            </div>
            <div className="h-4 text-xs font-extrabold tracking-wide overflow-x-auto whitespace-nowrap text-[#333e33] flex items-center justify-end">
              {formula || (isShift ? "SHIFT MODE..." : isAlpha ? "ALPHA MODE..." : "READY")}
            </div>
            <div className="text-xl sm:text-2xl font-black tracking-widest text-[#151c15] overflow-x-auto whitespace-nowrap text-right">
              {display}
            </div>
          </div>

          {/* Overlay Popover for Tips (So it never pushes buttons off screen!) */}
          {showTips && (
            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-950 to-purple-950 border border-indigo-500/50 text-xs text-indigo-200 space-y-1.5 shrink-0 shadow-lg animate-fadeIn">
              <div className="flex items-center justify-between font-black text-amber-400 border-b border-indigo-800/60 pb-1">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isBadini ? "ڕاز و فێڵێن حاسیبا دەگەل قوتابی" : isKu ? "ڕاز و فێڵەکانی حاسیبەی دەگەل قوتابی" : "Degel Qutabi Exam Tips"}
                </span>
                <button onClick={() => setShowTips(false)} className="text-slate-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <ul className="space-y-1 text-[11px] list-disc pl-3.5 leading-snug">
                <li><strong className="text-white">DEG / RAD:</strong> {isBadini ? "بۆ پرسیارێن فیزیا دڤێت حاسیبە ل سەر DEG یان RAD بیت بەپێی یاسایێ." : isKu ? "بۆ پرسیاری فیزیا دڵنیابە لەسەر DEG یان RAD ە بەپێی یاساکە." : "Ensure angle mode matches physics/math formula."}</li>
                <li><strong className="text-amber-300">SHIFT + دوگمە:</strong> {isBadini ? "کلیک ل SHIFT بکە بۆ sin⁻¹، cos⁻¹، tan⁻¹ یان ³√." : isKu ? "کلیک لە SHIFT بکە بۆ sin⁻¹، cos⁻¹، tan⁻¹ یان ڕەگی سێجا." : "Press SHIFT first for inverse trig or roots."}</li>
                <li><strong className="text-rose-300">nPr و nCr:</strong> {isBadini ? "بۆ ئەگەری، ژمارا یەکەم بنڤیسە پاشان کلیک ل nPr یان nCr بکە." : isKu ? "بۆ ئەگەرەکان، یەکەم ژمارە بنووسە پاشان nPr یان nCr." : "Enter N first, then click nPr/nCr, then R."}</li>
              </ul>
            </div>
          )}

          {/* Overlay Popover for History */}
          {showHistory && (
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1.5 shrink-0 max-h-36 overflow-y-auto shadow-lg animate-fadeIn">
              <div className="flex items-center justify-between font-black text-amber-400 border-b border-slate-800 pb-1">
                <span>{isBadini ? "مێژوویێ حسابکردنان" : isKu ? "مێژووی حسابکردنەکان" : "History"}</span>
                <button onClick={() => setHistoryList([])} className="text-rose-400 hover:text-rose-300 text-[10px] font-bold flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" />
                  {isBadini ? "پاقژکردن" : isKu ? "سڕینەوە" : "Clear"}
                </button>
              </div>
              {historyList.length === 0 ? (
                <p className="text-slate-500 text-center py-2 text-[11px]">{isBadini ? "هیچ حسابکردنەک نەهاتیە تۆمارکردن" : isKu ? "هیچ حسابکردنێک نییە" : "No history yet"}</p>
              ) : (
                <div className="space-y-1">
                  {historyList.map((item, idx) => (
                    <div key={idx} onClick={() => { setDisplay(item.res); setShowHistory(false); }} className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 cursor-pointer flex items-center justify-between transition text-[11px]">
                      <span className="text-slate-400 font-mono truncate max-w-[180px]">{item.expr} =</span>
                      <span className="font-mono font-bold text-amber-400">{item.res}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Top System & Replay Row */}
          <div className="grid grid-cols-5 gap-1.5 items-center select-none shrink-0">
            <button onClick={() => handleInput("SHIFT")} className={`py-1.5 px-1 rounded-lg text-[10px] font-extrabold border shadow-sm transition ${isShift ? "bg-amber-500 text-slate-950 border-amber-400 ring-2 ring-amber-400" : "bg-[#383b40] text-amber-400 border-slate-600 hover:bg-[#454950]"}`}>SHIFT</button>
            <button onClick={() => handleInput("ALPHA")} className={`py-1.5 px-1 rounded-lg text-[10px] font-extrabold border shadow-sm transition ${isAlpha ? "bg-rose-500 text-white border-rose-400 ring-2 ring-rose-400" : "bg-[#383b40] text-rose-400 border-slate-600 hover:bg-[#454950]"}`}>ALPHA</button>
            <div className="col-span-1 flex items-center justify-center">
              <button onClick={() => setShowHistory(!showHistory)} className="w-10 h-8 rounded-full bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 text-slate-900 font-black text-[8px] border-2 border-slate-400 shadow hover:scale-105 active:scale-95 transition tracking-tighter">REPLAY</button>
            </div>
            <button onClick={() => handleInput("MODE")} className="py-1.5 px-1 rounded-lg bg-[#383b40] hover:bg-[#454950] text-slate-200 font-extrabold text-[10px] border border-slate-600 transition shadow-sm">MODE</button>
            <button onClick={() => handleInput("AC")} className="py-1.5 px-1 rounded-lg bg-gradient-to-b from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-black text-[11px] border border-rose-500 shadow transition">ON/AC</button>
          </div>

          {/* Scientific Buttons Grid - Compact with superscript labels inside/above button cleanly */}
          <div className="grid grid-cols-5 gap-1.5 select-none shrink-0">
            {sciButtons.map((btn, i) => (
              <button
                key={i}
                onClick={() => handleInput(btn.action)}
                className="relative py-2 rounded-lg bg-[#2e3136] hover:bg-[#3a3e44] text-slate-200 font-bold text-xs border border-slate-700/80 transition flex flex-col items-center justify-center group"
              >
                {btn.top && (
                  <span className="absolute -top-1.5 right-1 text-[8px] text-amber-400/90 font-mono font-black group-hover:text-amber-300">
                    {btn.top}
                  </span>
                )}
                <span>{btn.label}</span>
              </button>
            ))}
          </div>

          {/* Memory Row - Compact */}
          <div className="grid grid-cols-5 gap-1.5 select-none pt-0.5 shrink-0 border-t border-slate-800/60">
            <button onClick={() => handleInput("M+")} className="py-1.5 rounded-lg bg-[#2a2d32] hover:bg-[#35393f] text-amber-400 font-bold text-[11px] border border-slate-700/60">M+</button>
            <button onClick={() => handleInput("M-")} className="py-1.5 rounded-lg bg-[#2a2d32] hover:bg-[#35393f] text-amber-400 font-bold text-[11px] border border-slate-700/60">M-</button>
            <button onClick={() => handleInput("MR")} className="py-1.5 rounded-lg bg-[#2a2d32] hover:bg-[#35393f] text-amber-400 font-bold text-[11px] border border-slate-700/60">MR</button>
            <button onClick={() => handleInput("(")} className="py-1.5 rounded-lg bg-[#2a2d32] hover:bg-[#35393f] text-indigo-300 font-bold text-[11px] border border-slate-700/60">(</button>
            <button onClick={() => handleInput(")")} className="py-1.5 rounded-lg bg-[#2a2d32] hover:bg-[#35393f] text-indigo-300 font-bold text-[11px] border border-slate-700/60">)</button>
          </div>

          {/* Main Keypad Grid - Ultra Compact & Responsive */}
          <div className="grid grid-cols-5 gap-1.5 select-none shrink-0">
            {mainButtons.map((btn, i) => {
              let bg = "bg-[#25282e] hover:bg-[#30343c] text-white border-slate-700/80";
              if (btn.color === "del") bg = "bg-amber-600/30 hover:bg-amber-600/40 text-amber-300 border-amber-500/40";
              if (btn.color === "ac") bg = "bg-rose-600/30 hover:bg-rose-600/40 text-rose-300 border-rose-500/40";
              if (btn.color === "op") bg = "bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 border-indigo-500/40 font-black text-sm";
              if (btn.color === "sci") bg = "bg-[#2e3136] hover:bg-[#3a3e44] text-slate-300 border-slate-700";
              if (btn.color === "eq") bg = "bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-base shadow-md shadow-purple-600/30";

              return (
                <button
                  key={i}
                  onClick={() => handleInput(btn.label)}
                  className={`relative py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm border transition shadow-sm flex items-center justify-center ${bg}`}
                >
                  {btn.top && (
                    <span className="absolute -top-1.5 right-1 text-[8px] text-amber-400/90 font-mono font-black">
                      {btn.top}
                    </span>
                  )}
                  <span>{btn.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
