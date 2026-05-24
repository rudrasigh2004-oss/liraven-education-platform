import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, Bot, Sparkles, Languages, Check, HelpCircle } from "lucide-react";
import { auth, db, handleFirestoreError, OperationType } from "../firebase/setup";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

interface AIChatbotProps {
  key?: string | number;
  initialSubject?: string;
  onNewActivityRegistered?: () => void;
}

export default function AIChatbot({ initialSubject, onNewActivityRegistered }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subjectContext, setSubjectContext] = useState(initialSubject || "");
  const [languageMode, setLanguageMode] = useState<"en" | "hi">("en");
  
  const threadEndRef = useRef<HTMLDivElement | null>(null);

  // Sync initial subject if passed
  useEffect(() => {
    if (initialSubject) {
      setSubjectContext(initialSubject);
    }
  }, [initialSubject]);

  // Handle auto-scroll on messages change
  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Insert initial system/greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "greet_1",
          role: "assistant",
          text: "Greetings, cadet! I am **LIRAVEN AI**, your quantum study co-pilot. I can explain Class 10 Science, Maths, Social Science, Hindi, and English concepts. Ask me anything!"
        }
      ]);
    }
  }, [messages]);

  const detectLanguage = (text: string): "en" | "hi" => {
    const hindiRegex = /[\u0900-\u097F]/;
    return hindiRegex.test(text) ? "hi" : "en";
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: "usr_" + Date.now(),
      role: "user",
      text: textToSend
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    if (!customText) setInput("");

    // Detect language of question
    const detectedLang = detectLanguage(textToSend);
    setLanguageMode(detectedLang);

    try {
      // Proxy request to Express server-side Gemini API route
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [...messages, userMsg],
          subjectContext: subjectContext
        })
      });

      if (!response.ok) {
        throw new Error("Failure processing chat request through educational node.");
      }

      const data = await response.json();
      const assistantText = data.reply;

      const assistantMsg: ChatMessage = {
        id: "ai_" + Date.now(),
        role: "assistant",
        text: assistantText
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // Secure Relational Synchronization with Firestore (if user is authenticated)
      if (auth.currentUser) {
        const queryId = "q_" + Date.now();
        try {
          // Write record obeying ABAC firestore.rules validation
          await setDoc(doc(db, "queries", queryId), {
            queryId,
            userId: auth.currentUser.uid,
            subject: subjectContext || "General Board Prep",
            question: textToSend,
            answer: assistantText,
            language: detectedLang,
            createdAt: serverTimestamp() // Required by rule timestamp integrity
          });
          
          if (onNewActivityRegistered) {
            onNewActivityRegistered();
          }
        } catch (dbErr) {
          handleFirestoreError(dbErr, OperationType.CREATE, `queries/${queryId}`);
        }
      }

    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: "err_" + Date.now(),
          role: "assistant",
          text: "⚡ **Quantum Bridge Dropped:** I am unable to resolve this concept due to a communication grid interruption. Ensure GEMINI_API_KEY is configured."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Pre-configured board-exam quick inquiries
  const quickQuestions = [
    { text: "What is Ohm's Law?", label: "Ohm's Law" },
    { text: "explain photosynthesis in Hindi", label: "प्रकाश संश्लेषण" },
    { text: "Trigonometry identity proofs shortcut", label: "Trig Identities" },
    { text: "Jallianwala Bagh massacre summary", label: "Nationalism India" }
  ];

  return (
    <>
      {/* Floating Sparking Logo Trigger Button */}
      <motion.button
        id="liraven_ai_float_trigger"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#0F172A] text-white p-4.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all outline-none border border-white/10 flex items-center justify-center cursor-pointer"
        whileHover={{ rotate: [0, -5, 5, 0] }}
      >
        <Bot className="h-6 w-6 text-cyan-400" />
        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
        </span>
      </motion.button>

      {/* Futuristic Glassmorphic Panel Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="liraven_assistant_panel"
            initial={{ opacity: 0, x: 200, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 25 }}
            className="fixed inset-y-0 right-0 z-50 w-full sm:w-115 bg-[#0F172A]/98 border-l border-white/10 shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden"
          >
            {/* Header with neon lights */}
            <div className="p-5 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/5 p-2.5 rounded-2xl border border-white/10">
                  <Bot className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-white text-base tracking-tight flex items-center gap-1.5 font-display">
                    Liraven AI Tutor
                    <Sparkles className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
                  </h3>
                  <p className="text-xs text-slate-400 font-light">Class 10 Learning Companion</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white bg-white/5 transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Sub-header Context Banner */}
            <div className="px-5 py-2.5 bg-white/5 border-b border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-light">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Subject Context: <strong className="text-white font-medium capitalize font-display">{subjectContext || "General Study"}</strong>
              </span>
              <span className="flex items-center gap-1 hover:text-white transition cursor-pointer underline text-[10px]" onClick={() => setSubjectContext("")}>
                Reset
              </span>
            </div>

            {/* Chat Messages Section */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 font-sans text-sm messages-container">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 px-4 shadow-sm text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-white/10 text-white rounded-tr-none border border-white/15"
                        : "bg-white/5 text-slate-200 rounded-tl-none border border-white/5 backdrop-blur-sm font-light leading-relaxed"
                    }`}
                  >
                    {/* Mark down or helper styling */}
                    <div className="whitespace-pre-line">
                      {/* Bold handling helper */}
                      {msg.text.split("**").map((chunk, idx) => 
                        idx % 2 === 1 ? <strong key={idx} className="text-cyan-400 font-semibold">{chunk}</strong> : chunk
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 text-slate-400 rounded-2xl rounded-tl-none p-3 px-4 border border-white/5 flex items-center gap-2">
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                    <span className="text-[10px] font-light">Analyzing syllabus...</span>
                  </div>
                </div>
              )}
              <div ref={threadEndRef} />
            </div>

            {/* Language and Board Exam Quick Queries */}
            {messages.length < 5 && (
              <div className="px-5 py-3.5 bg-white/5 border-t border-white/5">
                <p className="text-[11px] text-slate-400 mb-2 flex items-center gap-1 font-light">
                  <HelpCircle className="h-3.5 w-3.5 text-purple-400" /> Click to ask immediately:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {quickQuestions.map((qq, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(qq.text)}
                      className="text-[10px] bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white p-2 py-1.5 rounded-full border border-white/10 transition cursor-pointer font-light"
                    >
                      {qq.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Form input */}
            <div className="p-5 bg-white/5 border-t border-white/10 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[10px] px-1 text-slate-500 font-light font-sans">
                <span className="flex items-center gap-1">
                  <Languages className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
                  Type in English, Hindi/हिंदी or Hinglish
                </span>
                <span className="text-[9px] text-cyan-400 font-display uppercase">
                  ACTIVE REGION: {languageMode === "hi" ? "HINDI CO-CORE" : "ENGLISH CO-CORE"}
                </span>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-white/5 text-white p-3 px-4 rounded-full border border-white/10 focus:border-cyan-400/50 focus:outline-none transition text-xs leading-none"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-white hover:bg-cyan-50 text-[#0F172A] p-2.5 rounded-full shadow-lg active:scale-95 transition disabled:opacity-40 disabled:scale-100 flex items-center justify-center cursor-pointer w-9 h-9 shrink-0"
                >
                  <Send className="h-3.5 w-3.5 text-[#0F172A]" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
