import { useState, useEffect } from "react";
import { NOTES_LIST } from "../data/syllabus";
import { NoteItem, SubjectId } from "../types";
import { auth, db, handleFirestoreError, OperationType } from "../firebase/setup";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, serverTimestamp } from "firebase/firestore";
import { Search, Download, Bookmark, BookOpen, Clock, FileText, Check, AlertCircle, PlayCircle } from "lucide-react";

interface NotesSectionProps {
  initialFilter?: string;
  userSavedNotes: string[];
  onSavedNotesChanged: (savedIds: string[]) => void;
  openAiChat: (subjectName: string, greetingMsg: string) => void;
}

export default function NotesSection({
  initialFilter,
  userSavedNotes,
  onSavedNotesChanged,
  openAiChat
}: NotesSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [authTip, setAuthTip] = useState(false);
  const [activeVideoNote, setActiveVideoNote] = useState<NoteItem | null>(null);

  useEffect(() => {
    if (initialFilter) {
      setSelectedSubject(initialFilter);
    }
  }, [initialFilter]);

  // Filters the list based on query and subject selected
  const filteredNotes = NOTES_LIST.filter((note) => {
    const matchesSubject = selectedSubject === "all" || note.subjectId === selectedSubject;
    const cleanQuery = searchQuery.toLowerCase().trim();
    if (!cleanQuery) return matchesSubject;

    const matchesTitle = note.title.toLowerCase().includes(cleanQuery);
    const matchesDesc = note.description.toLowerCase().includes(cleanQuery);
    const matchesTopics = note.importantTopics.some((topic) =>
      topic.toLowerCase().includes(cleanQuery)
    );
    return matchesSubject && (matchesTitle || matchesDesc || matchesTopics);
  });

  // Action: Simulated holographic download engine with beautiful state feedback
  const handleDownload = (note: NoteItem) => {
    if (downloadingId) return;
    setDownloadingId(note.id);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Trigger browser actual simulated download trigger
            const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify({
                platform: "LIRAVEN Educational Portal",
                class: "10th Grade Board Exam",
                chapter: note.title,
                topics: note.importantTopics,
                disclaimer: "These are compiled revision board handouts."
              })
            )}`;
            const link = document.createElement("a");
            link.setAttribute("href", jsonString);
            link.setAttribute("download", `LIRAVEN_Class10_${note.id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            
            setDownloadingId(null);
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 80);
  };

  // Action: Toggle cloud bookmarked notes syncing safe through ABAC rules
  const handleToggleBookmark = async (noteId: string) => {
    if (!auth.currentUser) {
      setAuthTip(true);
      setTimeout(() => setAuthTip(false), 5000);
      return;
    }

    const { uid } = auth.currentUser;
    const isSaved = userSavedNotes.includes(noteId);
    let updatedList = [...userSavedNotes];

    if (isSaved) {
      updatedList = updatedList.filter((id) => id !== noteId);
    } else {
      updatedList.push(noteId);
    }

    onSavedNotesChanged(updatedList);

    const userRef = doc(db, "users", uid);
    try {
      await updateDoc(userRef, {
        savedNotes: isSaved ? arrayRemove(noteId) : arrayUnion(noteId),
        updatedAt: serverTimestamp() // Required by profiles update rules check
      });
    } catch (err: any) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${uid}`);
    }
  };

  const handleAiQuickReview = (note: NoteItem) => {
    const greetingMsg = `Explain the key concepts of Class 10 **${note.title}**! Specifically cover: ${note.importantTopics.join(", ")}. Please simplify the formulas and equations!`;
    openAiChat(note.subjectId, greetingMsg);
  };

  const subjectFilters = [
    { id: "all", label: "All Subjects" },
    { id: "science", label: "Science" },
    { id: "maths", label: "Mathematics" },
    { id: "social_science", label: "Social Science" },
    { id: "english", label: "English" },
    { id: "hindi", label: "Hindi" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-white z-10 relative">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold tracking-tight text-white font-display">
            Notes Vault
          </h2>
          <p className="text-slate-400 text-sm font-light">
            NCERT-pattern board revision capsule sheets, equations guides, and solved target board milestones.
          </p>
        </div>

        {/* Dynamic Search Bar */}
        <div className="relative w-full md:w-80 font-sans">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chapters or topics..."
            className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-5 py-3 text-sm text-slate-200 placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none transition-all duration-300"
          />
        </div>
      </div>

      {/* Categories filter layout */}
      <div className="flex flex-wrap gap-2.5 mb-10">
        {subjectFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedSubject(filter.id)}
            className={`px-5 py-2 rounded-full text-xs font-semibold border transition duration-300 cursor-pointer ${
              selectedSubject === filter.id
                ? "bg-white border-white text-[#0F172A] shadow-md shadow-white/5"
                : "bg-white/5 border-white/10 hover:border-white/30 text-slate-300"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Guest Sign-in Banner Notification */}
      {authTip && (
        <div className="mb-6 p-4 bg-white/5 border border-purple-500/20 text-purple-300 rounded-2xl flex items-center gap-3 font-sans text-sm animate-pulse">
          <AlertCircle className="h-5 w-5 text-purple-400 shrink-0" />
          <span>
            <strong>Secure Feature:</strong> Please login using **Google Access** on navbar to cache chapter bookmarks to your student progress panel.
          </span>
        </div>
      )}

      {/* Main Grid notes cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNotes.map((note) => {
          const isSaved = userSavedNotes.includes(note.id);
          const isDownloading = downloadingId === note.id;

          return (
            <div
              key={note.id}
              className="bg-white/5 border border-white/10 hover:border-cyan-400/30 p-6 rounded-3xl backdrop-blur-xl transition duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-black/10 group"
            >
              {/* Note Content */}
              <div>
                <div className="flex items-center justify-between mb-4 text-xs">
                  <span className="bg-white/10 border border-white/10 rounded-full px-3 py-1 uppercase text-slate-300 font-medium text-[10px] tracking-wide">
                    {note.categoryName} • Ch {note.chapterNumber}
                  </span>
                  <button
                    onClick={() => handleToggleBookmark(note.id)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition cursor-pointer"
                    title={isSaved ? "Remove Bookmark" : "Save Revision Leaf"}
                  >
                    <Bookmark className={`h-4 w-4 ${isSaved ? "fill-cyan-400 text-cyan-400" : ""}`} />
                  </button>
                </div>

                <h3 className="font-semibold text-lg text-white group-hover:text-cyan-400 transition mb-2 font-display">
                  {note.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4 font-light">
                  {note.description}
                </p>

                {/* Important Board Topics Grid list */}
                <div className="mb-6">
                  <h4 className="text-[9px] text-purple-300 uppercase tracking-widest font-semibold mb-2 font-display">
                    High-Weightage Topics
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {note.importantTopics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-white/5 text-slate-300 px-2.5 py-1 rounded-full border border-white/10 font-light"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Note Bottom Details & Actions */}
              <div className="border-t border-white/5 pt-5 flex flex-col gap-4">
                <div className="flex justify-between items-center text-[11px] text-slate-500 font-light">
                  <span className="flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5 text-neutral-500" /> {note.pageCount} Pages
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-neutral-500" /> Updated {note.lastUpdated}
                  </span>
                </div>

                <div className="flex gap-2">
                  {/* Real simulated download loader */}
                  {isDownloading ? (
                    <div className="flex-grow bg-white/5 border border-white/10 rounded-full p-2 px-4 flex flex-col justify-center items-center">
                      <div className="flex justify-between w-full text-[10px] text-cyan-400 mb-1 font-light">
                        <span>Compiling Revision PDF...</span>
                        <span>{downloadProgress}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full transition-all duration-100"
                          style={{ width: `${downloadProgress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDownload(note)}
                      className="flex-grow bg-white hover:bg-cyan-50 text-[#0F172A] font-semibold text-xs py-3 rounded-full flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer shadow duration-300"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download ({note.fileSize})
                    </button>
                  )}

                  <button
                    onClick={() => handleAiQuickReview(note)}
                    className="bg-white/5 hover:bg-white/10 text-slate-200 p-3 rounded-full border border-white/10 transition cursor-pointer"
                    title="Ask AI to summarize this chapter"
                  >
                    <BookOpen className="h-4 w-4 text-purple-400 animate-pulse" />
                  </button>
                  
                  {note.videoUrl && (
                    <button
                      onClick={() => setActiveVideoNote(note)}
                      className="bg-white/5 hover:bg-white/10 text-slate-200 p-3 rounded-full border border-white/10 transition cursor-pointer"
                      title="Watch Syllabus Video Tutorial"
                    >
                      <PlayCircle className="h-4 w-4 text-cyan-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredNotes.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <BookOpen className="h-10 w-10 text-slate-600 mx-auto mb-3 animate-bounce" />
            <h4 className="font-semibold text-lg text-slate-400 font-display">No Learning Capsules Found</h4>
            <p className="text-slate-500 text-sm max-w-sm mx-auto mt-1 font-light leading-relaxed">
              No Class 10 files matched your search parameters. Try adjusting filters or search keywords.
            </p>
          </div>
        )}
      </div>

      {/* Video Modal Player */}
      {activeVideoNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4">
          <div className="bg-[#0F172A] border border-white/10 rounded-3xl overflow-hidden max-w-2xl w-full flex flex-col shadow-2xl">
            <div className="p-5 bg-white/5 flex items-center justify-between border-b border-white/10">
              <h3 className="font-semibold text-white text-base truncate font-display">{activeVideoNote.title} - Video Lecture</h3>
              <button 
                onClick={() => setActiveVideoNote(null)}
                className="text-slate-400 hover:text-white bg-white/5 p-1.5 rounded-full cursor-pointer h-8 w-8 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-video bg-black">
              <iframe
                src={activeVideoNote.videoUrl} 
                title={activeVideoNote.title}
                className="absolute inset-0 w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-5 bg-white/5 text-xs text-slate-400 font-light leading-relaxed">
              <p>Lecture focuses on cumulative formula steps and diagrams. Cross-reference study patterns with downloadable PDFs for perfect mastery.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
