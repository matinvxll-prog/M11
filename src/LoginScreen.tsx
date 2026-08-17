import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { User, Lock, Eye, EyeOff, Mail, AlertCircle, CheckCircle2, School, MapPin, KeyRound, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

const KURDISTAN_CITIES = [
  "دهۆک (Duhok)",
  "هەولێر (Erbil)",
  "سلێمانی (Sulaymaniyah)",
  "زاخۆ (Zakho)",
  "ئاکرێ (Akre)",
  "هەڵەبجە (Halabja)",
  "کەرکووک (Kirkuk)",
  "ئامێدی (Amedi)",
  "بەردەڕەش (Bardarash)",
  "کۆیە (Koya)",
  "گەرمیان / کەلار (Kalar)",
  "شارەکا دی (Other)"
];

type AuthView = "login" | "signup" | "forgot" | "verify_code" | "reset";

interface LoginScreenProps {
  onReplaySplash?: () => void;
  isRecoveryInitial?: boolean;
  onRecoveryComplete?: () => void;
}

export default function LoginScreen({
  onReplaySplash,
  isRecoveryInitial = false,
  onRecoveryComplete
}: LoginScreenProps) {
  const [view, setView] = useState<AuthView>(isRecoveryInitial ? "reset" : "login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [city, setCity] = useState("دهۆک (Duhok)");

  useEffect(() => {
    if (isRecoveryInitial) {
      setView("reset");
    }
  }, [isRecoveryInitial]);

  // Helper to translate Supabase / Auth error messages into clear Kurdish Badini
  const translateError = (msg: string) => {
    const lower = msg.toLowerCase();
    if (lower.includes("email not confirmed") || lower.includes("unconfirmed")) {
      return "ئیمەیڵێ تە هێشتا نەهاتییە کونفێرمکرن. هیڤییە سەرەدانا ئیمەیڵێ خۆ بکە و کرتێ ل سەر لینکێ پشتڕاستکرنێ بکە.";
    }
    if (lower.includes("invalid login credentials") || lower.includes("invalid_credentials")) {
      return "ئیمەیڵ یان وشەیا نهێنی خەلەتە. ئەگەر تە ئیمەیڵێ خۆ کونفێرم نەکرپیت، سەحکە ئیمەیڵێ خۆ.";
    }
    if (lower.includes("user already registered") || lower.includes("already_exists")) {
      return "ئەڤ ئیمەیڵە پێشتر هاتییە تۆمارکرن. دشیێ ئێکسەر بچییە ژوور.";
    }
    if (lower.includes("password should be at least")) {
      return "پێدڤییە وشەیا نهێنی کێمتری ٦ پیت یان ژمارە نەبیت.";
    }
    if (lower.includes("email rate limit exceeded")) {
      return "گەلەک جار تاقیکرن هاتەکرن. هیڤییە کێمەکێ چاڤەڕێ بە.";
    }
    if (lower.includes("otp_expired") || lower.includes("token has expired") || lower.includes("expired")) {
      return "کۆد یان لینکێ زڤڕاندنێ بەسەرچوویە. هیڤییە دووبارە داواکاریا کۆدەکێ نوو بکه.";
    }
    if (lower.includes("invalid token") || lower.includes("otp_invalid") || lower.includes("token is invalid")) {
      return "کۆدێ ٦ ڕەقەمی خەلەتە. هیڤییە پشتڕاست ببە ژ کۆدێ د ئیمەیڵێ تە دا هاتی.";
    }
    if (lower.includes("same password")) {
      return "پێدڤییە وشەیا نهێنی یا نوو جیاواز بیت ژ یا بەرێ.";
    }
    return msg || "خەلەتییەک د ئەنجامدانا کردارێ دا چێبوو.";
  };

  const clearMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    const trimmedEmail = email.trim();

    // Email validation for views that need email
    if (view === "login" || view === "signup" || view === "forgot" || view === "verify_code") {
      if (!trimmedEmail) {
        setErrorMessage("هیڤییە ناڤنیشانێ ئیمەیڵی بنڤێسە.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        setErrorMessage("هیڤییە ئیمەیڵەکێ دروست بنڤێسە (نموونە: example@gmail.com)");
        return;
      }
    }

    // Sign Up validation
    if (view === "signup") {
      if (!username.trim()) {
        setErrorMessage("هیڤییە ناڤێ سیانی یان بەکارهێنەری بنڤێسە.");
        return;
      }
      if (!schoolName.trim()) {
        setErrorMessage("هیڤییە ناڤێ قوتابخانێ بنڤێسە.");
        return;
      }
      if (!city) {
        setErrorMessage("هیڤییە باژێرێ خۆ هەڵبژێرە.");
        return;
      }
      if (!password || password.length < 6) {
        setErrorMessage("پێدڤییە وشەیا نهێنی کێمتری ٦ پیت یان ژمارە نەبیت.");
        return;
      }
    }

    // Login validation
    if (view === "login") {
      if (!password) {
        setErrorMessage("هیڤییە وشەیا نهێنی بنڤێسە.");
        return;
      }
    }

    // Verify OTP validation
    if (view === "verify_code") {
      if (!otpCode.trim()) {
        setErrorMessage("هیڤییە کۆدێ ٦ ڕەقەمی یێ ئیمەیڵی بنڤێسە.");
        return;
      }
      if (!newPassword || newPassword.length < 6) {
        setErrorMessage("پێدڤییە وشەیا نهێنی یا نوو کێمتری ٦ پیت یان ژمارە نەبیت.");
        return;
      }
    }

    // Reset password validation (when already logged in via recovery link)
    if (view === "reset") {
      if (!newPassword || newPassword.length < 6) {
        setErrorMessage("پێدڤییە وشەیا نهێنی یا نوو کێمتری ٦ پیت یان ژمارە نەبیت.");
        return;
      }
    }

    setLoading(true);

    try {
      if (view === "signup") {
        const { error } = await supabase.auth.signUp({
          email: trimmedEmail,
          password: password,
          options: {
            emailRedirectTo: window.location.href,
            data: { 
              full_name: username.trim(),
              school_name: schoolName.trim(),
              city: city.trim()
            }
          }
        });

        if (error) {
          setErrorMessage(translateError(error.message));
        } else {
          setSuccessMessage(
            "تۆمارکرن ب سەرکەفتن هاتە ئەنجامدان! 📩 ئیمەیڵەکێ کونفێرمکرنێ (Confirm Email) بۆ تە هاتە هنارتن. سەرەدانا ئیمەیڵێ خۆ بکه و کرتێ ل سەر لینکێ پشتڕاستکرنێ بکە."
          );
          setView("login");
          setPassword("");
        }
      } else if (view === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password: password,
        });

        if (error) {
          setErrorMessage(translateError(error.message));
        }
      } else if (view === "forgot") {
        // Send reset code / link to email
        const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
          redirectTo: window.location.href,
        });

        if (error) {
          setErrorMessage(translateError(error.message));
        } else {
          setSuccessMessage(
            "📩 ئیمەیڵێ زڤڕاندنێ ب سەرکەفتن هاتە هنارتن! نوکە کۆدێ ٦ ڕەقەمی یێ ناڤ ئیمەیڵێ خۆ ل خوارێ بنڤێسە دگەل وشەیا نهێنی یا نوو."
          );
          setView("verify_code");
        }
      } else if (view === "verify_code") {
        const rawInput = otpCode.trim();
        
        // If user pasted a full URL, link from email, or token parameters
        if (
          rawInput.includes("http://") || 
          rawInput.includes("https://") || 
          rawInput.includes("access_token=") || 
          rawInput.includes("token=")
        ) {
          try {
            let urlObj: URL | null = null;
            try {
              urlObj = new URL(rawInput);
            } catch {
              // Ignore if not standard full URL
            }

            const searchParams = urlObj ? urlObj.searchParams : new URLSearchParams(rawInput.includes("?") ? rawInput.split("?")[1] : rawInput);
            const hashParams = urlObj && urlObj.hash ? new URLSearchParams(urlObj.hash.substring(1)) : new URLSearchParams(rawInput.includes("#") ? rawInput.split("#")[1] : "");

            const accessToken = hashParams.get("access_token") || searchParams.get("access_token");
            const refreshToken = hashParams.get("refresh_token") || searchParams.get("refresh_token");
            const tokenHash = searchParams.get("token") || searchParams.get("token_hash") || hashParams.get("token");

            if (accessToken && refreshToken) {
              const { error: sessionErr } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              });

              if (sessionErr) {
                setErrorMessage(translateError(sessionErr.message));
                setLoading(false);
                return;
              }
            } else if (tokenHash) {
              const { error: otpErr } = await supabase.auth.verifyOtp({
                token_hash: tokenHash,
                type: "recovery",
              });

              if (otpErr) {
                const { error: otpErr2 } = await supabase.auth.verifyOtp({
                  email: trimmedEmail,
                  token: tokenHash,
                  type: "recovery",
                });
                if (otpErr2) {
                  setErrorMessage(translateError(otpErr2.message));
                  setLoading(false);
                  return;
                }
              }
            }
          } catch (e) {
            console.error("Error parsing link token", e);
          }
        } else if (rawInput.length > 0) {
          // Standard OTP code verification
          const { error: otpErr } = await supabase.auth.verifyOtp({
            email: trimmedEmail,
            token: rawInput,
            type: "recovery",
          });

          if (otpErr) {
            setErrorMessage(translateError(otpErr.message));
            setLoading(false);
            return;
          }
        }

        // Update password with active recovery session
        const { error: updateErr } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (updateErr) {
          setErrorMessage(translateError(updateErr.message));
        } else {
          setSuccessMessage("وشەیا نهێنی ب سەرکەفتن هاتە گوهورین! نوکە دشیێ ب وشەیا نهێنی یا نوو بچییە ژوور.");
          if (onRecoveryComplete) onRecoveryComplete();
          setView("login");
          setOtpCode("");
          setNewPassword("");
        }
      } else if (view === "reset") {
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (error) {
          setErrorMessage(translateError(error.message));
        } else {
          setSuccessMessage("وشەیا نهێنی ب سەرکەفتن هاتە گوهورین! نوکە دشیێ ب وشەیا نهێنی یا نوو بچییە ژوور.");
          if (onRecoveryComplete) onRecoveryComplete();
          setView("login");
          setNewPassword("");
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage("خەلەتییەک د پەیوەندیێ دا چێبوو. هیڤییە تورێ هێڵێ تاقیبکەوە.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen w-full bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-900 flex flex-col items-center justify-center p-6 text-white relative select-none">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl flex flex-col items-center relative z-10">
        
        {/* Title */}
        <h1 className="text-3xl font-extrabold mb-1 bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent">
          دگەل قوتابی
        </h1>
        <p className="text-xs text-purple-300/80 mb-6 font-medium text-center leading-relaxed">
          {view === "signup" && "دروستکرنا هەژمارەکا نوو (پێدڤییە ئیمەیڵ بێتە کونفێرمکرن)"}
          {view === "login" && "رێکا تە یا ئاسان بۆ فێربوونێ - چوونا ژوورەڤە"}
          {view === "forgot" && "داواکرنا کۆدێ زڤڕاندنا وشەیا نهێنی"}
          {view === "verify_code" && "تێکرنا کۆدێ ٦ ڕەقەمی و دیارکرنا وشەیا نهێنی یا نوو"}
          {view === "reset" && "تۆمارکرنا وشەیا نهێنی یا نوو"}
        </p>

        {/* Custom Badini Error Alert Card */}
        {errorMessage ? (
          <div className="w-full mb-5 p-3.5 rounded-2xl bg-red-500/20 border border-red-400/40 text-red-100 text-xs text-right font-medium flex items-start gap-2.5 animate-shake">
            <AlertCircle className="w-5 h-5 text-red-300 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        ) : null}

        {/* Custom Badini Success Alert Card */}
        {successMessage ? (
          <div className="w-full mb-5 p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-100 text-xs text-right font-medium flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{successMessage}</span>
          </div>
        ) : null}

        {/* Form */}
        <form onSubmit={handleAuth} noValidate className="w-full flex flex-col gap-3.5">
          
          {/* SIGN UP FIELDS */}
          {view === "signup" && (
            <>
              {/* Full Name / Username */}
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="ناڤێ سیانی یان ناڤێ بەکارهێنەری"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  className="w-full py-3.5 px-11 bg-white/5 rounded-2xl border border-white/20 text-white placeholder-purple-200/50 outline-none focus:border-purple-400 focus:bg-white/10 transition-all text-sm"
                />
                <User className="absolute right-4 w-5 h-5 text-purple-300/70" />
              </div>

              {/* School Name Field */}
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="ناڤێ قوتابخانێ (نموونە: ئامادەییا زاخۆ / دهۆک)"
                  value={schoolName}
                  onChange={(e) => {
                    setSchoolName(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  className="w-full py-3.5 px-11 bg-white/5 rounded-2xl border border-white/20 text-white placeholder-purple-200/50 outline-none focus:border-purple-400 focus:bg-white/10 transition-all text-sm"
                />
                <School className="absolute right-4 w-5 h-5 text-purple-300/70" />
              </div>

              {/* City in Kurdistan Dropdown */}
              <div className="relative flex items-center">
                <select
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  className="w-full py-3.5 px-11 bg-[#1a1235] rounded-2xl border border-white/20 text-white outline-none focus:border-purple-400 transition-all text-sm appearance-none cursor-pointer"
                >
                  {KURDISTAN_CITIES.map((c) => (
                    <option key={c} value={c} className="bg-[#1e133d] text-white">
                      {c}
                    </option>
                  ))}
                </select>
                <MapPin className="absolute right-4 w-5 h-5 text-purple-300/70 pointer-events-none" />
                <span className="absolute left-4 text-xs text-purple-300/60 pointer-events-none">▼</span>
              </div>
            </>
          )}

          {/* EMAIL FIELD (Used in Login, SignUp, Forgot, VerifyCode) */}
          {view !== "reset" && (
            <div className="relative flex items-center">
              <input
                type="email"
                placeholder="ئیمەیل (نموونە: example@gmail.com)"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage("");
                }}
                className="w-full py-3.5 px-11 bg-white/5 rounded-2xl border border-white/20 text-white placeholder-purple-200/50 outline-none focus:border-purple-400 focus:bg-white/10 transition-all text-sm"
              />
              <Mail className="absolute right-4 w-5 h-5 text-purple-300/70" />
            </div>
          )}

          {/* OTP / 6-DIGIT CODE OR LINK FIELD (Used in verify_code) */}
          {view === "verify_code" && (
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="کۆدێ ٦ ڕەقەمی یان لینکێ ئیمەیڵی پەیست بکه"
                value={otpCode}
                onChange={(e) => {
                  setOtpCode(e.target.value);
                  if (errorMessage) setErrorMessage("");
                }}
                className="w-full py-3.5 px-11 bg-white/5 rounded-2xl border border-amber-400/50 text-white placeholder-purple-200/50 outline-none focus:border-amber-400 focus:bg-white/10 transition-all text-xs font-mono text-center"
              />
              <ShieldCheck className="absolute right-4 w-5 h-5 text-amber-300" />
            </div>
          )}

          {/* PASSWORD FIELD (Used in Login, SignUp) */}
          {(view === "login" || view === "signup") && (
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="وشەیا نهێنی"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage("");
                }}
                className="w-full py-3.5 px-11 bg-white/5 rounded-2xl border border-white/20 text-white placeholder-purple-200/50 outline-none focus:border-purple-400 focus:bg-white/10 transition-all text-sm"
              />
              <Lock className="absolute right-4 w-5 h-5 text-purple-300/70" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 text-purple-300/70 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          )}

          {/* NEW PASSWORD FIELD (Used in verify_code & reset) */}
          {(view === "verify_code" || view === "reset") && (
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="وشەیا نهێنی یا نوو"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (errorMessage) setErrorMessage("");
                }}
                className="w-full py-3.5 px-11 bg-white/5 rounded-2xl border border-white/20 text-white placeholder-purple-200/50 outline-none focus:border-purple-400 focus:bg-white/10 transition-all text-sm"
              />
              <KeyRound className="absolute right-4 w-5 h-5 text-purple-300/70" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 text-purple-300/70 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          )}

          {/* FORGOT PASSWORD LINK IN LOGIN MODE */}
          {view === "login" && (
            <div className="flex justify-between items-center -mt-1 text-xs">
              <button
                type="button"
                onClick={() => {
                  clearMessages();
                  setView("verify_code");
                }}
                className="text-purple-300/80 hover:text-white hover:underline transition-colors"
              >
                کۆدێ ٦ ڕەقەمی هەیە؟
              </button>
              <button
                type="button"
                onClick={() => {
                  clearMessages();
                  setView("forgot");
                }}
                className="text-purple-300/90 hover:text-white hover:underline transition-colors font-semibold"
              >
                وشەیا نهێنی تە ژبیرکرییە؟
              </button>
            </div>
          )}

          {/* HELPFUL NOTE ON FORGOT OR VERIFY VIEW */}
          {(view === "forgot" || view === "verify_code") && (
            <div className="p-3 bg-purple-900/40 rounded-xl border border-purple-400/20 text-[11px] text-purple-200/90 leading-relaxed flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" />
              <span>
                تێبینی: ئەگەر لینکا ڕیسێتکرنێ د ئیمەیڵی دا «localhost» بوو و ڤەنەبوو، وێ لینکێ بکۆپینە (Copy Link) و ل سەری بپەیستە دگەل وشەیا نهێنی یا نوو.
              </span>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-2xl font-bold text-base shadow-lg shadow-purple-600/30 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                چاڤەڕێ بە...
              </span>
            ) : view === "signup" ? (
              "خۆ تۆمارکرن"
            ) : view === "login" ? (
              "چوونا ژوورەڤە"
            ) : view === "forgot" ? (
              "هنارتنا کۆدێ زڤڕاندنێ بۆ ئیمەیڵی"
            ) : view === "verify_code" ? (
              "گۆڕینا وشەیا نهێنی ب کۆدی"
            ) : (
              "نووکرنا وشەیا نهێنی"
            )}
          </button>
        </form>

        {/* TOGGLE / BACK BUTTONS */}
        <div className="mt-6 text-xs text-purple-200/80 flex items-center justify-center">
          {view === "login" && (
            <div className="flex items-center gap-1.5">
              <span>تە هەژمار نینە؟</span>
              <button
                type="button"
                onClick={() => {
                  clearMessages();
                  setView("signup");
                }}
                className="font-bold text-purple-300 hover:text-white hover:underline transition-colors"
              >
                خۆ تۆمار بکه
              </button>
            </div>
          )}

          {view === "signup" && (
            <div className="flex items-center gap-1.5">
              <span>هەژمارا تە هەیە؟</span>
              <button
                type="button"
                onClick={() => {
                  clearMessages();
                  setView("login");
                }}
                className="font-bold text-purple-300 hover:text-white hover:underline transition-colors"
              >
                چوونا ژوورەڤە
              </button>
            </div>
          )}

          {(view === "forgot" || view === "verify_code" || view === "reset") && (
            <button
              type="button"
              onClick={() => {
                clearMessages();
                setView("login");
              }}
              className="flex items-center gap-1 text-purple-300 hover:text-white hover:underline transition-colors font-medium"
            >
              <ArrowRight className="w-4 h-4" />
              زڤڕین بۆ چوونا ژوورەڤە
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
