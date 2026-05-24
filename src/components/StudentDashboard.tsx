import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { NOTES_LIST } from "../data/syllabus";
import { NoteItem } from "../types";
import { db, auth, handleFirestoreError, OperationType } from "../firebase/setup";
import { collection, query, where, getDocs } from "firebase/firestore";
import { BookOpen, User as UserIcon, Calendar, Bookmark, History, FileText, BarChart2, CalendarDays, BrainCircuit, MessageCircle, ArrowUpRight } from "lucide-react";

interface StudentDashboardProps {
  user: User | null;
  userSavedNotes: string[];
  setTab: (tab: string) => void;
  triggerNotesDownloadSim: (noteId: string) => void;
  onRefreshTrigger?: number;
}

export default function StudentDashboard({
  user,
  userSavedNotes,
  setTab,
  triggerNotesDownloadSim,
  onRefreshTrigger
}: StudentDashboardProps) {
  const [learningHistory, setLearningHistory] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [activeQueryReview, setActiveQueryReview] = useState<any | null>(null);

  // Filter local notes corresponding to savedNote array
  const bookmarkedChapters = NOTES_LIST.filter((note) => userSavedNotes.includes(note.id));

  useEffect(() => {
    const fetchStudyQueriesHistory = async () => {
      if (!user) return;
      setIsLoadingHistory(true);
      try {
        // Query user's exact study questions asked to Gemini
        const queriesRef = collection(db, "queries");
        const q = query(queriesRef, where("userId", "==", user.uid));
        const snapSnapshot = await getDocs(q);
        
        const rawList = snapSnapshot.docs.map((doc) => doc.data());
        
        // Anti-index crash rule: Sort client-side using milliseconds to preserve flexibility
        rawList.sort((a: any, b: any) => {
          const t1 = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : Date.now();
          const t2 = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : Date.now();
          return t2 - t1;
        });

        setLearningHistory(rawList);
      } catch (err: any) {
        handleFirestoreError(err, OperationType.LIST, "queries");
      } finally {
        setIsLoadingHistory(false);
      }
    };

    fetchStudyQueriesHistory();
  }, [user, userSavedNotes, onRefreshTrigger]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center font-sans text-white">
        <div className="p-8 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center shadow-2xl backdrop-blur-xl">
          <UserIcon className="h-10 w-10 text-slate-500 mb-4 animate-pulse" />
          <h3 className="text-lg font-bold font-display">Student Portal Offline</h3>
          <p className="text-slate-400 text-xs mt-2 max-w-xs font-light leading-relaxed">
            Please connect your identity via the Google Access button inside the header bar to synchronize your dashboard progress.
          </p>
        </div>
      </div>
    );
  }

  // Study hours and metrics calculations
  const totalAIQueries = learningHistory.length;
  const totalBookmarks = bookmarkedChapters.length;
  const calculatedReadiness = Math.min(100, 30 + (totalBookmarks * 10) + (totalAIQueries * 5));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-white font-sans z-10 relative space-y-8">
      
      {/* Upper Student Profile Card */}
      <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-xl flex flex-col md:flex-row items-center gap-6 shadow-2xl">
        <img
          src={user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80"}
          alt={user.displayName || "Novice Student"}
          className="h-16 w-16 rounded-full border border-white/20 shadow-lg"
          referrerPolicy="no-referrer"
        />
        <div className="flex-1 text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <h2 className="text-2xl font-bold font-display text-white">
              {user.displayName || "Novice Scholar"}
            </h2>
            <span className="text-[10px] bg-white/10 text-white font-semibold uppercase px-2.5 py-1 rounded-full border border-white/10">
              Grade 10
            </span>
          </div>
          <p className="text-xs text-slate-400 font-light">{user.email}</p>
          <p className="text-[10px] text-slate-500 flex items-center justify-center md:justify-start gap-1 font-light">
            <CalendarDays className="h-3 w-3 text-cyan-400" /> Member since {new Date(user.metadata.creationTime || Date.now()).toLocaleDateString()}
          </p>
        </div>

        <div className="p-5 bg-white/5 rounded-2xl border border-white/10 text-center w-full md:w-56 space-y-1.5 md:self-stretch flex flex-col justify-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display block">Syllabus Progress</span>
          <div className="text-3xl font-black text-cyan-400 font-display">{calculatedReadiness}%</div>
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full" style={{ width: `${calculatedReadiness}%` }} />
          </div>
        </div>
      </div>

      {/* Numerical Metrics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
          <div className="text-slate-400 text-[10px] font-semibold tracking-wider font-display uppercase mb-1">Saved Handouts</div>
          <div className="text-2xl font-bold font-display text-white">{totalBookmarks} Chapters</div>
          <span className="text-[9px] text-slate-500 mt-1 block">Stored in your secure profile</span>
        </div>
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
          <div className="text-slate-400 text-[10px] font-semibold tracking-wider font-display uppercase mb-1">AI Consultations</div>
          <div className="text-2xl font-bold font-display text-white">{totalAIQueries} Solved</div>
          <span className="text-[9px] text-slate-500 mt-1 block">Class 10 concepts mastered</span>
        </div>
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
          <div className="text-slate-400 text-[10px] font-semibold tracking-wider font-display uppercase mb-1">Pages Studied</div>
          <div className="text-2xl font-bold font-display text-white">{totalBookmarks * 12} Pages</div>
          <span className="text-[9px] text-slate-500 mt-1 block">Accumulated course materials</span>
        </div>
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
          <div className="text-slate-400 text-[10px] font-semibold tracking-wider font-display uppercase mb-1">Study Rating</div>
          <div className="text-2xl font-bold font-display text-yellow-400 flex items-center gap-1.5">
            <BrainCircuit className="h-5 w-5 text-yellow-500 animate-pulse" /> Stellar
          </div>
          <span className="text-[9px] text-slate-500 mt-1 block">Overall performance rank</span>
        </div>
      </div>

      {/* Main Bottom bento column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Saved/Bookmarked Notes */}
        <div className="lg:col-span-4 bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4 shadow-2xl">
          <h3 className="font-semibold text-lg text-white flex items-center gap-2 font-display">
            <Bookmark className="h-5 w-5 text-purple-400" /> Saved Handouts
          </h3>

          <div className="space-y-3 max-h-115 overflow-y-auto pr-1">
            {bookmarkedChapters.map((note) => (
              <div
                key={note.id}
                className="bg-white/5 border border-white/5 p-3.5 pr-4 rounded-2xl flex items-center justify-between gap-3 group hover:border-cyan-500/30 transition-all duration-300 shadow-sm"
              >
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-xs text-white truncate font-display">{note.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 capitalize font-light">{note.subjectId} • Grade 10 Notes</p>
                </div>
                <button
                  onClick={() => triggerNotesDownloadSim(note.id)}
                  className="bg-white/5 hover:bg-cyan-500 hover:text-white p-2.5 text-slate-300 rounded-full transition-all duration-300 cursor-pointer border border-white/5 hover:border-transparent"
                  title="Direct Download Handout"
                >
                  <FileText className="h-4 w-4" />
                </button>
              </div>
            ))}

            {bookmarkedChapters.length === 0 && (
              <div className="text-center py-10 bg-white/5 rounded-2xl border border-dashed border-white/10">
                <Bookmark className="h-8 w-8 text-slate-500 mx-auto mb-2" />
                <h5 className="font-semibold text-xs text-slate-400 font-display">No Bookmarks</h5>
                <p className="text-[10px] text-slate-500 max-w-xs mx-auto mt-1 leading-relaxed font-light">
                  Save PDF revision guides from the Notes board to construct your target study workspace here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: AI Tutoring History */}
        <div className="lg:col-span-8 bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4 shadow-2xl">
          <h3 className="font-semibold text-lg text-white flex items-center gap-2 font-display">
            <History className="h-5 w-5 text-cyan-400" /> Consultation Logs
          </h3>

          <div className="space-y-3.5 max-h-115 overflow-y-auto pr-1">
            {learningHistory.map((log, idx) => (
              <div
                key={log.queryId || idx}
                onClick={() => setActiveQueryReview(log)}
                className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyan-400/30 p-4 rounded-2xl cursor-pointer transition-all duration-300 flex items-start gap-4 shadow-sm"
              >
                <div className="bg-cyan-500/10 p-3 rounded-full border border-cyan-400/10 shrink-0 text-cyan-400 h-10 w-10 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-cyan-400" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider font-display">{log.subject}</span>
                    <span className="text-slate-500">
                      {log.createdAt?.seconds
                        ? new Date(log.createdAt.seconds * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                        : "Today"}
                    </span>
                  </div>
                  <h4 className="font-semibold text-xs text-slate-200 truncate font-display">Q: {log.question}</h4>
                  <p className="text-[10px] text-slate-400 truncate mt-1 font-light leading-relaxed">A: {log.answer}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-600 self-center shrink-0" />
              </div>
            ))}

            {learningHistory.length === 0 && !isLoadingHistory && (
              <div className="text-center py-16 bg-white/5 rounded-2xl border border-dashed border-white/10">
                <BrainCircuit className="h-10 w-10 text-slate-500 mx-auto mb-2 animate-pulse" />
                <h5 className="font-semibold text-slate-400 text-sm font-display">No Saved Queries</h5>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed font-light">
                  Ask study questions inside the floating chat tutor on the bottom right. Your logs sync here for quick revision.
                </p>
              </div>
            )}

            {isLoadingHistory && (
              <div className="text-center py-16">
                <span className="h-6 w-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin inline-block mb-3" />
                <p className="text-xs text-slate-400 font-light">Sycnhronizing tutoring archives...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Tutoring Query Modal */}
      {activeQueryReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4">
          <div className="bg-[#0F172A] border border-white/10 rounded-3xl overflow-hidden max-w-2xl w-full flex flex-col shadow-2xl max-h-[85vh]">
            <div className="p-5 bg-white/5 flex items-center justify-between border-b border-white/10">
              <h3 className="font-semibold text-white text-base truncate flex items-center gap-2 font-display">
                <BrainCircuit className="h-5 w-5 text-purple-400" />
                Topic Review
              </h3>
              <button 
                onClick={() => setActiveQueryReview(null)}
                className="text-slate-400 hover:text-white bg-white/5 px-4 py-1.5 rounded-full text-xs cursor-pointer hover:bg-white/10 transition duration-300"
              >
                Close Logs
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-5 font-sans text-sm">
              <div className="space-y-1.5 bg-white/5 p-4 rounded-2xl border border-white/5">
                <span className="text-[10px] uppercase text-cyan-400 font-bold tracking-widest block font-display">Student Question</span>
                <p className="text-white font-semibold font-display">{activeQueryReview.question}</p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase text-purple-300 font-bold tracking-widest block font-display">Tutor Answer</span>
                <div className="bg-transparent leading-relaxed text-slate-300 text-sm whitespace-pre-wrap font-light">
                  {/* formatting highlights */}
                  {activeQueryReview.answer.split("**").map((part: string, idx: number) =>
                    idx % 2 === 1 ? <strong key={idx} className="text-cyan-400 font-semibold">{part}</strong> : part
                  )}
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/5 text-[10px] text-slate-500 border-t border-white/10 flex justify-between tracking-wide">
              <span>LIRAVEN ACADEMY NOTES LOGGER</span>
              <span>LANG_{activeQueryReview.language?.toUpperCase() || "EN"}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
