import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize GoogleGenAI client to prevent startup failure if key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Configure it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. API: Study chat proxy using state-of-the-art gemini-3.5-flash
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { contents, subjectContext } = req.body;
    
    if (!contents || !Array.isArray(contents)) {
      return res.status(400).json({ error: "Missing or invalid contents array in request body." });
    }

    const ai = getGeminiClient();

    // Map the user contents into format suitable for @google/genai
    // Structure: { role: "user" | "model", parts: [{ text: string }] }
    const formattedContents = contents.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.text }]
    }));

    const subjectText = subjectContext ? `The student is currently asking about ${subjectContext}. Match your answers to this subject's scope.` : "";

    const systemInstruction = `You are LIRAVEN, an interactive, highly supportive, futuristic AI Study Assistant tailored specifically for Class 10 students. 
Your tone is encouraging, inspiring (incorporating a touch of futuristic/sci-fi style), and highly clear. 
Key Directives:
1. Simplify complex scientific, mathematical, poetic, grammatical, and historical concepts using real-life examples, analogies, and step-by-step logic.
2. Support BOTH English and Hindi. If the student asks a question in English, reply in English. If they ask in Hindi, reply in Hindi. If they use Hinglish, write clear explanations in a blended Hinglish/English style.
3. Be structured. Use bullet points and bold headers for readability. Keep answers clear without over-complicating.
4. ${subjectText}
Always keep student morale high and end with a quick, motivating sign-off!`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I apologize, but I couldn't formulate a response right now. Let's try rephrasing!";
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: error.message || "An error occurred while communicating with LIRAVEN AI." 
    });
  }
});

// 2. Setup Vite / Static Asset Hosting Middleware
async function configureApp() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in Development mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in Production mode with static assets from /dist...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`LIRAVEN Educational Server running on port ${PORT}`);
  });
}

configureApp().catch((err) => {
  console.error("Failed to start LIRAVEN server:", err);
});
