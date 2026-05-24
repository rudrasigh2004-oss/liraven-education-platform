import { useState, useEffect } from "react";
import { onAuthStateChanged, User, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider, testConnection, setCachedAccessToken } from "./firebase/setup";
import { doc, onSnapshot, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Sparkles, BrainCircuit, Rocket, Award, Layout, ShieldAlert, ArrowUpRight, Calendar } from "lucide-react";
import { GoogleAuthProvider } from "firebase/auth";

// Components
import SleekBackground from "./components/SleekBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AIChatbot from "./components/AIChatbot";
import SubjectSection from "./components/SubjectSection";
import NotesSection from "./components/NotesSection";
import DonationSystem from "./components/DonationSystem";
import StudentDashboard from "./components/StudentDashboard";
import SyllabusPlanner from "./components/SyllabusPlanner";

export default function App() {
  const [currentTab, setTab] = useState<string>("home");
  const [user, setUser] = useState<User | null>(null);
  const [calendarToken, setCalendarToken] = useState<string | null>(null);
  const [userSavedNotes, setUserSavedNotes] = useState<string[]>([]);
  const [notesFilter, setNotesFilter] = useState<string>("all");
  const [aiGreetingPayload, setAiGreetingPayload] = useState<{ subject: string; text: string } | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [chatbotTriggerKey, setChatbotTriggerKey] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // 1. Initialize Connection test and Auth State listeners
  useEffect(() => {
    testConnection();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Real-time synchronization of bookmarked notes across devices
        const userDocRef = doc(db, "users", currentUser.uid);
        
        const unsubDoc = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserSavedNotes(data.savedNotes || []);
          } else {
            setUserSavedNotes([]);
          }
        });

        setAuthReady(true);
        return () => unsubDoc();
      } else {
        setUserSavedNotes([]);
        setCalendarToken(null);
        setCachedAccessToken(null);
        setAuthReady(true);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync Google Sign in
  const triggerGoogleAccess = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        setCachedAccessToken(credential.accessToken);
        setCalendarToken(credential.accessToken);
      }
      const userRef = doc(db, "users", result.user.uid);
      const existingSnap = await getDoc(userRef);
      
      if (!existingSnap.exists()) {
        await setDoc(userRef, {
          uid: result.user.uid,
          displayName: result.user.displayName || "Star Scholar",
          email: result.user.email || "",
          photoURL: result.user.photoURL || "",
          savedNotes: [],
          searchHistory: [],
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
    } catch (err) {
      console.error("Popup Sign in handled:", err);
    }
  };

  // Callback to open quantum tutor chatbot with custom contextual topic payload
  const handleOpenAiChat = (subjectName: string, text: string) => {
    setAiGreetingPayload({ subject: subjectName, text: text });
    setChatbotTriggerKey((prev) => prev + 1);
    
    // Simulate a programmatic trigger to fire the chatbot float trigger
    setTimeout(() => {
      const trigger = document.getElementById("liraven_ai_float_trigger");
      if (trigger) {
        trigger.click();
      }
    }, 150);
  };

  // Trigger simulated downloads when clicked inside dashboard
  const handleTriggerDownloadSimFromDashboard = (noteId: string) => {
    setTab("notes");
    setTimeout(() => {
      // Find download card or trigger alert directly
      alert(`Activating LIRAVEN secure compilation nodes to download guide ID: ${noteId}. Download PDF links have been triggered sequentially.`);
    }, 150);
  };

  const handleNewActivityRegistered = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden relative selection:bg-purple-600/50 selection:text-white bg-[#0F172A]">
      {/* Dynamic particles space canvas background */}
      <SleekBackground />

      {/* Ambient glowing blobs */}
      <div className="absolute top-[-10%] left-[-15%] w-[50%] h-[50%] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-15%] w-[50%] h-[50%] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none z-0"></div>

      {/* Header element */}
      <Navbar currentTab={currentTab} setTab={setTab} user={user} onLoginSuccess={handleNewActivityRegistered} />

      {/* Primary interactive screens switcher */}
      <main className="flex-grow z-10 relative">
        <AnimatePresence mode="wait">
          {currentTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="max-w-7xl mx-auto px-6 py-20 sm:py-28 font-sans text-center space-y-12"
            >
              {/* Board Countdown Bullet Notification */}
              <div 
                onClick={() => setTab("syllabus")}
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-300 py-2.5 px-6 rounded-full border border-cyan-500/30 text-[11px] shadow-lg backdrop-blur-md hover:border-cyan-400/50 hover:bg-cyan-500/15 active:scale-95 transition-all cursor-pointer duration-300"
              >
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                <span className="tracking-wide font-medium flex items-center gap-1.5">
                  Bal Mandir Break-Up Syllabus Active • View Monthly School Plan <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>

              {/* Holographic Header Title */}
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-tight font-display select-none">
                  Learn Smarter with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-200 to-purple-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    LIRAVEN
                  </span>
                </h1>
                <p className="text-slate-400 text-sm sm:text-lg max-w-xl mx-auto leading-relaxed font-light">
                  Class 10 Notes, instant AI walkthroughs, and responsive student support dashboard.
                </p>
              </div>

              {/* Call to action links buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <button
                  onClick={() => setTab("subjects")}
                  className="w-full bg-white hover:bg-cyan-50 text-[#0F172A] font-semibold px-8 py-4 rounded-full shadow-lg shadow-white/5 active:scale-95 transition-all duration-300 cursor-pointer text-sm"
                >
                  Start Learning
                </button>
                <button
                  onClick={() => handleOpenAiChat("Global Science", "Explain how Snell's law works in simple terms!")}
                  className="w-full bg-white/5 text-white font-medium px-8 py-4 rounded-full border border-white/10 hover:border-white/30 transition-all duration-300 shadow-sm active:scale-95 cursor-pointer text-sm"
                >
                  Ask AI Tutor
                </button>
              </div>



              {/* Guest Action Call to Sync */}
              {!user && (
                <div className="max-w-xl mx-auto p-6 bg-white/5 border border-white/10 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 text-left backdrop-blur-md">
                  <div className="space-y-1.5">
                    <h4 className="font-display font-semibold text-white text-sm flex items-center gap-2 uppercase tracking-wide">
                      <Layout className="h-4 w-4 text-cyan-400 animate-pulse" /> Unlock Personal Panel
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Sync your Google Auth to flag favorite summaries, record custom bookmarks, and visualize your daily study metrics instantly.
                    </p>
                  </div>
                  <button
                    onClick={triggerGoogleAccess}
                    className="bg-white hover:bg-cyan-50 text-[#0F172A] font-semibold p-3 px-6 rounded-full text-xs transition duration-300 active:scale-95 shrink-0 cursor-pointer shadow-lg"
                  >
                    Connect Google
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {currentTab === "subjects" && (
            <motion.div
              key="subjects"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
            >
              <SubjectSection
                setTab={setTab}
                setNotesFilter={setNotesFilter}
                openAiChat={handleOpenAiChat}
              />
            </motion.div>
          )}

          {currentTab === "syllabus" && (
            <motion.div
              key="syllabus"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
            >
              <SyllabusPlanner
                openAiChat={handleOpenAiChat}
                googleCalendarToken={calendarToken}
                onGoogleConnect={triggerGoogleAccess}
              />
            </motion.div>
          )}

          {currentTab === "notes" && (
            <motion.div
              key="notes"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
            >
              <NotesSection
                initialFilter={notesFilter}
                userSavedNotes={userSavedNotes}
                onSavedNotesChanged={(updatedIds) => setUserSavedNotes(updatedIds)}
                openAiChat={handleOpenAiChat}
              />
            </motion.div>
          )}

          {currentTab === "donate" && (
            <motion.div
              key="donate"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
            >
              <DonationSystem onNewActivityRegistered={handleNewActivityRegistered} />
            </motion.div>
          )}

          {currentTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
            >
              <StudentDashboard
                user={user}
                userSavedNotes={userSavedNotes}
                setTab={setTab}
                triggerNotesDownloadSim={handleTriggerDownloadSimFromDashboard}
                onRefreshTrigger={refreshTrigger}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating quantum tutor companion chatbot */}
      <AIChatbot
        key={`${chatbotTriggerKey}_${aiGreetingPayload?.subject}`}
        initialSubject={aiGreetingPayload?.subject}
        onNewActivityRegistered={handleNewActivityRegistered}
      />

      {/* Footer component */}
      <Footer />
    </div>
  );
}
