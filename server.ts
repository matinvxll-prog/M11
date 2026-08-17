import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Endpoint: AI Grade 12 Tutor (مامۆستای ژیر)
app.post("/api/ai/tutor", async (req, res) => {
  try {
    const { question, subject, language = "ku" } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      const isGreeting = /^(سڵاو|سلاڤ|سلام|حه‌ز|سلام علیکم|slav|slaw|hello|hi|hey)/i.test(question.trim());
      if (isGreeting) {
        return res.json({
          answer: language === "badini"
            ? "سلاڤ! بەخێر بێی. چ پرسیارەک یان بابەتەکێ پۆلا ۱۲ هەیە دێ ب خۆشحالی ڤە هاوکارییا تە کەم؟"
            : language === "ku"
            ? "سڵاو! بەخێر بێیت. چ پرسیارێک یان بابەتێکی پۆلی ۱۲ت هەیە، بە خۆشحاڵییەوە هاوکاریت دەکەم؟"
            : "Hello! Welcome. What Grade 12 question or topic can I help you with today?"
        });
      }
      return res.json({
        answer: language === "badini"
          ? `سلاڤ! ئەز مامۆستایێ ژیری یێ پۆلا ۱۲ـەمە 👨‍🏫. بەرسڤا ب هەنگاو بۆ پرسیارا تە: "${question}" د بابەتێ ${subject || 'بیرکاری'}دا.`
          : language === "ku" 
          ? `سڵاو! من مامۆستای ژیری پۆلی ١٢ـەم 👨‍🏫. بۆ شیکردنەوەی پرسیاری "${question}" لە بابەتی ${subject || 'بیرکاری'}.`
          : `Hello! I am your AI Grade 12 Tutor. Step-by-step analysis for "${question}" in ${subject || 'Math'}.`
      });
    }

    const langInstruction = (language === "badini" || language === "ku")
      ? "پێویستە وەڵامەکە بە زمانی کوردی (بادینی/سۆرانی شیاو بۆ پۆلی ۱۲) بنووسیت."
      : "Please answer in clear English appropriate for Grade 12 high school students.";

    const prompt = `You are EduChallenge AI Tutor, an expert, friendly high school tutor for Grade 12 ministerial exams in Kurdistan.
Selected Subject: ${subject || "General Grade 12"}
Student Message: "${question}"

${langInstruction}

CRITICAL INSTRUCTIONS ON RESPONSE LENGTH AND FORMAT:
1. IF the student's message is a greeting, hello, or casual remark (e.g. "Slav", "Slaw", "سڵاو", "سلاڤ", "چۆنی", "باشی", "hi", "hello"):
   - Reply ONLY with a short, polite, warm 1 to 2 sentence greeting in Badini/Kurdish.
   - Ask them what Grade 12 topic or question they need help with today.
   - STRICTLY DO NOT generate any math formulas, long lectures, practice problems, or unrequested examples!

2. IF the student asks an actual question, problem, or topic:
   - Provide a clear, concise, step-by-step solution.
   - Keep it easy to digest without unnecessary fluff.
   - Include relevant formulas and a short exam tip (تێبینیی وزاری) only if relevant.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({ answer: response.text || "No response generated." });
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: error.message || "Failed to call AI Tutor" });
  }
});

// API Endpoint: AI Quiz Generation for specific Grade 12 topic
app.post("/api/ai/generate-quiz", async (req, res) => {
  try {
    const { subject, topic, difficulty = "medium", count = 5, language = "ku" } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        questions: [
          {
            id: "gen_1",
            subject: subject || "Mathematics",
            chapter: topic || "Chapter 1",
            questionKu: "تەواوکاری نەپچڕاوی f(x) = 2x - 3 بریتییە لە:",
            questionEn: "The indefinite integral of f(x) = 2x - 3 is:",
            optionsKu: ["x² - 3x + C", "2x² - 3 + C", "x² + 3x + C", "2x - 3 + C"],
            optionsEn: ["x² - 3x + C", "2x² - 3 + C", "x² + 3x + C", "2x - 3 + C"],
            correctIndex: 0,
            explanationKu: "یاسای تەواوکاری: ∫2x dx = x² و ∫3 dx = 3x ، کەواتە x² - 3x + C",
            explanationEn: "Integration rule: ∫2x dx = x² and ∫3 dx = 3x, yielding x² - 3x + C",
            xp: 150
          }
        ]
      });
    }

    const prompt = `Generate ${count} high quality multiple-choice ministerial exam questions (پرسیاری وزاری) for Kurdistan Grade 12 ${subject} regarding "${topic}".
Difficulty: ${difficulty}.

Return ONLY a valid JSON array of objects with this structure:
[
  {
    "id": "q_1",
    "subject": "${subject}",
    "chapter": "${topic}",
    "questionKu": "Kurdish formulation of the question",
    "questionEn": "English translation",
    "optionsKu": ["Option A", "Option B", "Option C", "Option D"],
    "optionsEn": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanationKu": "Detailed Kurdish explanation of the answer",
    "explanationEn": "Detailed English explanation of the answer",
    "xp": 150
  }
]`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text = response.text || "[]";
    // Strip markdown JSON block formatting if present
    text = text.replace(/```json/gi, "").replace(/```/g, "").trim();

    const questions = JSON.parse(text);
    res.json({ questions });
  } catch (error: any) {
    console.error("Error generating quiz:", error);
    res.status(500).json({ error: error.message || "Failed to generate quiz" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EduChallenge Grade 12 Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
