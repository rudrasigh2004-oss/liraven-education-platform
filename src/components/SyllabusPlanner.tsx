import { useState, useEffect } from "react";
import {
  Atom, Calculator, BookOpen, Globe, Scroll, Compass, Cpu, Activity,
  Search, Sparkles, CheckCircle, FileText, Calendar, CheckSquare,
  FlaskConical, ChevronRight, GraduationCap, Layout, Sparkle, Trash2,
  RefreshCw, AlertCircle, ExternalLink, Lock, Check, Clock
} from "lucide-react";
import {
  MONTHS,
  SYLLABUS_SUBJECTS,
  MONTHLY_SCHOOL_SYLLABUS,
  MonthlySyllabusEntry
} from "../data/schoolSyllabus";

interface SyllabusPlannerProps {
  openAiChat: (subjectName: string, text: string) => void;
  googleCalendarToken?: string | null;
  onGoogleConnect?: () => void;
}

export default function SyllabusPlanner({ 
  openAiChat, 
  googleCalendarToken, 
  onGoogleConnect 
}: SyllabusPlannerProps) {
  const [viewMode, setViewMode] = useState<"month" | "subject" | "calendar">("month");
  const [selectedMonth, setSelectedMonth] = useState<string>("April");
  const [selectedSubject, setSelectedSubject] = useState<string>("science");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [checkedChapters, setCheckedChapters] = useState<string[]>([]);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Calendar operational integration variables
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [loadingEvents, setLoadingEvents] = useState<boolean>(false);
  const [calendarError, setCalendarError] = useState<string | null>(null);
  
  // Custom interactive Scheduler Modal States
  const [activeScheduleEntry, setActiveScheduleEntry] = useState<MonthlySyllabusEntry | null>(null);
  const [scheduleDate, setScheduleDate] = useState<string>("2026-05-25");
  const [scheduleTime, setScheduleTime] = useState<string>("16:00");
  const [scheduleDuration, setScheduleDuration] = useState<number>(60);
  const [scheduleHabit, setScheduleHabit] = useState<string>("🧠 Deep Focus Study");
  const [syncingEntryId, setSyncingEntryId] = useState<string | null>(null);

  // Load checked chapters from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("liraven_syllabus_checked_v1");
      if (stored) {
        setCheckedChapters(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Local storage access failed", e);
    }
  }, []);

  // Fetch Liraven-flagged study events from primary Google Calendar
  const fetchCalendarEvents = async () => {
    if (!googleCalendarToken) return;
    setLoadingEvents(true);
    setCalendarError(null);
    try {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events?orderBy=startTime&singleEvents=true&maxResults=50",
        {
          headers: {
            Authorization: `Bearer ${googleCalendarToken}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to load events");
      }
      const data = await response.json();
      // Filter events to only list Liraven study sessions
      const studyEvents = (data.items || []).filter((evt: any) => 
        evt.summary?.includes("Liraven Study") || evt.description?.includes("Liraven")
      );
      setCalendarEvents(studyEvents);
    } catch (err: any) {
      console.error("Error fetching events:", err);
      setCalendarError(err.message || "Unable to read Google Calendar");
    } finally {
      setLoadingEvents(false);
    }
  };

  // Sync calendar events when token changes
  useEffect(() => {
    if (googleCalendarToken) {
      fetchCalendarEvents();
    }
  }, [googleCalendarToken]);

  // Update checked chapters state & localStorage
  const handleToggleChecked = (id: string) => {
    let updated: string[];
    if (checkedChapters.includes(id)) {
      updated = checkedChapters.filter((c) => c !== id);
    } else {
      updated = [...checkedChapters, id];
    }
    setCheckedChapters(updated);
    try {
      localStorage.setItem("liraven_syllabus_checked_v1", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Maps custom subject ID to standard colored borders/backgrounds
  const getSubjectColor = (subId: string) => {
    const sub = SYLLABUS_SUBJECTS.find((s) => s.id === subId);
    return sub ? sub.color : "from-slate-500 to-slate-400";
  };

  const getCalendarColorId = (subId: string): string => {
    switch (subId) {
      case "science": return "11"; // Blueberry (cyan-like)
      case "maths": return "3"; // Grape (purple-like)
      case "english": return "9"; // Lavender (blue-like)
      case "social_science": return "2"; // Sage (emerald/green-like)
      case "hindi": return "6"; // Tangerine (orange-like)
      case "sanskrit": return "4"; // Flamingo (rose-like)
      case "it": return "10"; // Basil (indigo-like)
      default: return "1"; // Default Blue
    }
  };

  const getSubjectIcon = (subId: string, className?: string) => {
    const cls = className || "h-5 w-5";
    switch (subId) {
      case "science":
        return <Atom className={`${cls} text-cyan-400`} />;
      case "maths":
        return <Calculator className={`${cls} text-purple-400`} />;
      case "english":
        return <BookOpen className={`${cls} text-blue-400`} />;
      case "social_science":
        return <Globe className={`${cls} text-emerald-400`} />;
      case "hindi":
        return <Scroll className={`${cls} text-orange-400`} />;
      case "sanskrit":
        return <Compass className={`${cls} text-rose-400`} />;
      case "it":
        return <Cpu className={`${cls} text-indigo-400`} />;
      case "physical_activity":
        return <Activity className={`${cls} text-green-400`} />;
      default:
        return <GraduationCap className={`${cls} text-slate-400`} />;
    }
  };

  const getSubjectName = (subId: string) => {
    const sub = SYLLABUS_SUBJECTS.find((s) => s.id === subId);
    return sub ? sub.name : subId;
  };

  // Helper checking if an entry ID has been synced to calendar
  const isEntrySynced = (entryId: string): boolean => {
    return calendarEvents.some(evt => evt.description?.includes(`Liraven Entry ID: ${entryId}`));
  };

  // Helper returning synced calendar event info
  const getSyncedEventInfo = (entryId: string) => {
    return calendarEvents.find(evt => evt.description?.includes(`Liraven Entry ID: ${entryId}`));
  };

  // Document download action simulation
  const handleDownloadSyllabus = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      // Direct file generation & trigger browser simulation
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(MONTHLY_SCHOOL_SYLLABUS, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "Bal_Mandir_Class_10_Syllabus_2026_27.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      setDownloadSuccess(false);
    }, 1200);
  };

  // Create Google Calendar Study session event
  const handleCreateCalendarEvent = async (
    entry: MonthlySyllabusEntry,
    date: string,
    time: string,
    duration: number,
    habitType: string
  ) => {
    if (!googleCalendarToken) return;

    const summaryStr = `📖 Liraven Study: Class 10 ${entry.subject} (${habitType})`;
    const displayTopic = entry.topics.split("\n")[0].replace("*", "").trim();

    // MANDATORY confirmation dialog describing the precise event mutation
    const confirmed = window.confirm(
      `Are you sure you want to add this study session details to your primary Google Calendar?\n\n` +
      `📅 Event: ${summaryStr}\n` +
      `📖 Topic: ${displayTopic}\n` +
      `⏰ Time Range: ${date} at ${time} (${duration} minutes)\n` +
      `This action will register a live reminder block inside your Google account.`
    );
    if (!confirmed) return;

    setSyncingEntryId(entry.id);
    try {
      const startDateTime = new Date(`${date}T${time}:00`);
      const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

      const descriptionText = `🤖 NCERT Class 10 Interactive Study Planner by Liraven AI\n\n` +
        `📖 Subject: ${entry.subject}\n` +
        `📅 Target Academic Month: ${entry.month}\n` +
        `🎯 Core Study Topics:\n${entry.topics}\n\n` +
        (entry.practical ? `🧪 Practical/Lab Exercise: ${entry.practical}\n\n` : "") +
        `💡 Focus Category: ${habitType}\n\n` +
        `----------------------------------------\n` +
        `Liraven Entry ID: ${entry.id}\n` +
        `Happy learning! Compare your notes and walkthroughs.`;

      const body = {
        summary: summaryStr,
        description: descriptionText,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
        },
        colorId: getCalendarColorId(entry.subjectId),
        reminders: {
          useDefault: false,
          overrides: [
            { method: "popup", minutes: 30 },
            { method: "email", minutes: 120 }
          ]
        }
      };

      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${googleCalendarToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to create event");
      }

      await fetchCalendarEvents();
      alert("✨ Success! This study revision block is now successfully listed in your default Google Calendar.");
    } catch (err: any) {
      console.error("Error creating event:", err);
      alert(`Could not synchronize event: ${err.message}`);
    } finally {
      setSyncingEntryId(null);
    }
  };

  // Delete Google Calendar Event
  const handleDeleteCalendarEvent = async (eventId: string, summary: string) => {
    if (!googleCalendarToken) return;

    // MANDATORY confirmation dialog describing the precise deletion process
    const confirmed = window.confirm(
      `Are you sure you want to completely delete the study session "${summary}" from your Google Calendar?\n\nThis cannot be undone.`
    );
    if (!confirmed) return;

    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${googleCalendarToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to delete from server");
      }

      await fetchCalendarEvents();
      alert("🗑️ Google Calendar event has been successfully removed.");
    } catch (err: any) {
      console.error("Error deleting event:", err);
      alert(`Could not delete event: ${err.message}`);
    }
  };

  // Helper to request Gemini summary for a syllabus entry
  const handleAskTutorForTopic = (entry: MonthlySyllabusEntry) => {
    const cleanedTopic = entry.topics.split("\n")[0].replace("*", "").trim();
    const prompt = `Hey Liraven AI, I am studying Class 10 NCERT "${entry.subject}" as part of my school monthly breakup syllabus for "${entry.month}". Please explain the key formulas, concepts, and board-exam prep expectations for: "${cleanedTopic}". If there are practical applications (like "${entry.practical || 'laboratory work'}"), please summarize them too! Ensure the response is interactive, structured with bold headings, and easy to memorize.`;
    openAiChat(`${entry.subject} (${entry.month})`, prompt);
  };

  // Filter logic
  const filteredEntries = MONTHLY_SCHOOL_SYLLABUS.filter((entry) => {
    const matchesSearch = searchQuery
      ? entry.topics.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.practical.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.month.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    if (!matchesSearch) return false;

    if (viewMode === "month") {
      return entry.month === selectedMonth;
    } else if (viewMode === "subject") {
      return entry.subjectId === selectedSubject;
    }
    return true; // Filter handles separately in Calendar tab
  });

  // Calculate complete/all syllabus coverage percentage
  const totalItemsCount = MONTHLY_SCHOOL_SYLLABUS.length;
  const completedItemsCount = checkedChapters.length;
  const completionPercent = Math.round((completedItemsCount / totalItemsCount) * 100) || 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-white font-sans z-10 relative space-y-8">
      {/* Upper header title layout card */}
      <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl animate-fade-in">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest font-display">
            <Sparkle className="h-3 w-3 animate-spin" /> CBSE Directives Active
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">学校 Schedular: School Syllabus Plan</h2>
          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-2xl leading-relaxed">
            Bal Mandir Senior Secondary School, Kishanganj • Class – X, Session – 2026-27. Compare month topics, register completed chapters, and integrate live Google Calendars.
          </p>
        </div>

        {/* Global progress and download button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center flex flex-col justify-center min-w-[140px]">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-display block mb-1">
              Course Coverage
            </span>
            <div className="text-xl font-bold text-cyan-400 font-display">
              {completedItemsCount}/{totalItemsCount} Done
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">{completionPercent}% chapters check</div>
          </div>

          <button
            onClick={handleDownloadSyllabus}
            disabled={downloadSuccess}
            className="bg-white hover:bg-cyan-50 disabled:bg-cyan-50/70 text-[#0F172A] font-semibold px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs active:scale-95 duration-300 transition-all shadow-lg cursor-pointer shrink-0"
          >
            {downloadSuccess ? (
              <>
                <span className="h-3 w-3 border-2 border-[#0F172A] border-t-transparent rounded-full animate-spin" />
                Compiling PDF...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                Download Syllabus
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main dashboard switcher segment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column options and selectors */}
        <div className="lg:col-span-4 bg-white/5 border border-white/10 p-5 rounded-3xl space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-display">
              View Navigation Strategy
            </span>
            <div className="grid grid-cols-3 gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5">
              <button
                onClick={() => {
                  setViewMode("month");
                  setSearchQuery("");
                }}
                className={`py-2 rounded-lg text-[10px] font-semibold cursor-pointer transition ${
                  viewMode === "month"
                    ? "bg-white/10 text-white shadow-md font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                📅 Monthly
              </button>
              <button
                onClick={() => {
                  setViewMode("subject");
                  setSearchQuery("");
                }}
                className={`py-2 rounded-lg text-[10px] font-semibold cursor-pointer transition ${
                  viewMode === "subject"
                    ? "bg-white/10 text-white shadow-md font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                📚 Subject
              </button>
              <button
                onClick={() => {
                  setViewMode("calendar");
                  setSearchQuery("");
                }}
                className={`py-2 rounded-lg text-[10px] font-semibold cursor-pointer transition flex items-center justify-center gap-1 ${
                  viewMode === "calendar"
                    ? "bg-white/10 text-white shadow-md font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🗓️ Calendar
                {googleCalendarToken && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </button>
            </div>
          </div>

          {/* Monthly navigation scroll */}
          {viewMode === "month" && (
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-display">
                Select Study Month
              </span>
              <div className="grid grid-cols-3 gap-1.5 font-display">
                {MONTHS.map((month) => (
                  <button
                    key={month}
                    onClick={() => {
                      setSelectedMonth(month);
                      setSearchQuery("");
                    }}
                    className={`p-2 rounded-xl text-center text-xs border transition cursor-pointer ${
                      selectedMonth === month
                        ? "bg-cyan-500/10 text-cyan-400 border-cyan-400/40 font-semibold"
                        : "bg-transparent border-white/5 text-slate-300 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Subject Navigation choices */}
          {viewMode === "subject" && (
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-display">
                Select Course Subject
              </span>
              <div className="space-y-1.5">
                {SYLLABUS_SUBJECTS.map((subject) => {
                  const itemsCount = MONTHLY_SCHOOL_SYLLABUS.filter((u) => u.subjectId === subject.id).length;
                  const isCurSel = selectedSubject === subject.id;
                  return (
                    <button
                      key={subject.id}
                      onClick={() => {
                        setSelectedSubject(subject.id);
                        setSearchQuery("");
                      }}
                      className={`w-full p-2.5 rounded-2xl flex items-center justify-between border text-left transition cursor-pointer ${
                        isCurSel
                          ? "bg-white/15 border-white/20 text-white font-semibold"
                          : "bg-transparent border-white/5 text-slate-300 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded-lg bg-white/5`}>
                          {getSubjectIcon(subject.id, "h-4 w-4")}
                        </div>
                        <span className="text-xs font-medium">{subject.name}</span>
                      </div>
                      <span className="text-[10px] bg-white/5 text-slate-400 px-2 rounded-full border border-white/5">
                        {itemsCount} plans
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Live Google Calendar quick status sidebar info */}
          <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-display">
              Google Account Sync
            </span>
            {googleCalendarToken ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Synced with Google Calendar
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Your Class 10 Study events will sync directly. Manage alerts on the Calendar tab.
                </p>
                <button
                  onClick={fetchCalendarEvents}
                  disabled={loadingEvents}
                  className="w-full justify-center bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 p-2 rounded-xl text-[10px] font-medium flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                >
                  <RefreshCw className={`h-3 w-3 ${loadingEvents ? "animate-spin" : ""}`} />
                  Refresh Calendar Data
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-orange-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                  Calendar Not Synced
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Connect calendar to lock in syllabus deadlines and schedule study notification blocks.
                </p>
                {onGoogleConnect && (
                  <button
                    onClick={onGoogleConnect}
                    className="w-full bg-white text-[#0F172A] hover:bg-cyan-50 font-semibold p-2.5 rounded-xl text-[11px] flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md cursor-pointer"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    Connect Google Calendar
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Interactive Search input bar */}
          {viewMode !== "calendar" && (
            <div className="space-y-2 pt-2 border-t border-white/5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-display">
                Text Search filters
              </span>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search topics (e.g., pH, Ohm, Letter)..."
                  className="w-full bg-white/5 text-white pl-10 pr-4 py-2.5 rounded-xl border border-white/10 text-xs focus:border-cyan-400 focus:outline-none transition-all leading-none placeholder:text-slate-500"
                />
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              </div>
            </div>
          )}
        </div>

        {/* Right column: Interactive list card items */}
        <div className="lg:col-span-8 bg-white/5 border border-white/10 p-6 rounded-3xl space-y-5">
          {viewMode === "calendar" ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-display flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-cyan-400 animate-bounce" />
                  Study Schedule Manager
                </h3>
                {googleCalendarToken && (
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
                    Google Synced
                  </span>
                )}
              </div>

              {!googleCalendarToken ? (
                <div className="text-center py-16 bg-white/5 rounded-3xl border border-dashed border-white/10 space-y-6 max-w-xl mx-auto px-6">
                  <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-full w-14 h-14 flex items-center justify-center mx-auto text-orange-400 shadow-xl">
                    <Lock className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-200 text-sm font-display">Google Calendar Permission Request</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Liraven needs permission to write and update study session events inside your primary Google Calendar. Sign in using your Google Account to authorize sync securely.
                    </p>
                  </div>
                  {onGoogleConnect && (
                    <button
                      onClick={onGoogleConnect}
                      className="gsi-material-button mx-auto flex items-center justify-center cursor-pointer active:scale-95 transition-all duration-300"
                      style={{ background: "#ffffff", padding: "10px 24px", borderRadius: "9999px" }}
                    >
                      <div className="gsi-material-button-state"></div>
                      <div className="gsi-material-button-content-wrapper flex items-center gap-2.5 text-[#0F172A] font-semibold text-xs font-display">
                        <div className="gsi-material-button-icon h-5 w-5">
                          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: "block" }}>
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                            <path fill="none" d="M0 0h48v48H0z"></path>
                          </svg>
                        </div>
                        <span className="gsi-material-button-contents">Sign in with Google Account</span>
                      </div>
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    Below are your scheduled Class X study sessions synchronized directly with Google Calendar. Click on any event to delete it or keep track of your schedule from your phone/desktop calendar widget.
                  </p>

                  {loadingEvents ? (
                    <div className="text-center py-16 flex flex-col items-center justify-center gap-3">
                      <RefreshCw className="h-8 w-8 text-cyan-400 animate-spin" />
                      <p className="text-xs text-slate-400">Loading study events from Google...</p>
                    </div>
                  ) : calendarEvents.length === 0 ? (
                    <div className="text-center py-12 bg-white/5 rounded-2xl border border-dashed border-white/5 space-y-2">
                      <AlertCircle className="h-8 w-8 text-slate-500 mx-auto" />
                      <h4 className="text-xs font-semibold text-slate-400">No Synced Sessions Found</h4>
                      <p className="text-[10px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                        Navigate to the "Monthly" or "Subject" strategy tabs and choose "📅 Schedule Session" on any chapter to populate this list.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {calendarEvents.map((evt) => {
                        const start = evt.start?.dateTime ? new Date(evt.start.dateTime) : null;
                        const dateStr = start ? start.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : "N/A";
                        const timeStr = start ? start.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' }) : "N/A";
                        
                        return (
                          <div 
                            key={evt.id}
                            className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-white/10 transition duration-200"
                          >
                            <div className="min-w-0 space-y-1.5 flex-grow">
                              <h4 className="font-semibold text-xs text-slate-200 truncate pr-2 font-display">
                                {evt.summary}
                              </h4>
                              <div className="flex items-center gap-2.5 text-[10px] text-slate-400">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5 text-cyan-400" />
                                  {dateStr} at {timeStr}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {evt.htmlLink && (
                                <a 
                                  href={evt.htmlLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 bg-white/5 border border-white/5 rounded-xl hover:bg-white/15 text-slate-300 hover:text-white transition cursor-pointer"
                                  title="Open in Google Calendar"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              )}
                              <button
                                onClick={() => handleDeleteCalendarEvent(evt.id, evt.summary)}
                                className="p-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 rounded-xl transition cursor-pointer"
                                title="Delete study event"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-display flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-cyan-400 animate-fade-in" />
                  {viewMode === "month"
                    ? `Academic Plans: ${selectedMonth}`
                    : `Subject Roadmap: ${getSubjectName(selectedSubject)}`}
                </h3>
                {searchQuery && (
                  <span className="text-[10px] text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    search active
                  </span>
                )}
              </div>

              <div className="space-y-4 max-h-[145vh] overflow-y-auto pr-1">
                {filteredEntries.map((entry) => {
                  const isChecked = checkedChapters.includes(entry.id);
                  const isSynced = isEntrySynced(entry.id);
                  const syncedEvent = getSyncedEventInfo(entry.id);

                  return (
                    <div
                      key={entry.id}
                      className={`border bg-white/5 p-4 sm:p-5 rounded-2xl flex flex-col gap-4 transition-all duration-300 relative ${
                        isChecked
                          ? "border-emerald-500/40 bg-emerald-500/[0.02]"
                          : "border-white/5 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1.5 min-w-0 flex-grow">
                          <div className="flex items-center flex-wrap gap-2 text-[10px] font-semibold">
                            {/* Selected Month badge in Subject view; Subject Badge in Month View */}
                            {viewMode === "subject" ? (
                              <span className="bg-white/5 text-slate-300 px-2.5 py-1 rounded-full border border-white/5 font-medium uppercase font-display">
                                {entry.month}
                              </span>
                            ) : (
                              <span className="bg-white/5 text-slate-300 px-2.5 py-1 rounded-full border border-white/5 flex items-center gap-1 font-medium font-display">
                                {getSubjectIcon(entry.subjectId, "h-3.5 w-3.5")}
                                {getSubjectName(entry.subjectId)}
                              </span>
                            )}
                            <span className="bg-[#0F172A] text-slate-400 px-2 py-0.5 rounded border border-white/5 uppercase">
                              {entry.subject}
                            </span>

                            {/* Beautiful live Google Sync Badge dynamically updated */}
                            {isSynced && (
                              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[9px] font-bold tracking-wide uppercase">
                                <Check className="h-3 w-3 animate-pulse" /> Synced to Calendar
                              </span>
                            )}
                          </div>

                          <h4 className="font-semibold text-sm text-slate-100 font-display leading-snug whitespace-pre-line pt-1">
                            {entry.topics}
                          </h4>
                        </div>

                        {/* Completion Checklist trigger */}
                        <button
                          onClick={() => handleToggleChecked(entry.id)}
                          className={`p-2 rounded-xl border flex items-center justify-center transition cursor-pointer h-9 w-9 shrink-0 ${
                            isChecked
                              ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                              : "bg-white/5 border-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                          }`}
                          title={isChecked ? "Mark as Uncompleted" : "Mark as Completed"}
                        >
                          <CheckSquare className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Laboratory practicals if present */}
                      {entry.practical ? (
                        <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 flex items-start gap-2.5 text-slate-300 text-xs font-light">
                          <FlaskConical className="h-4.5 w-4.5 text-cyan-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-[10px] uppercase text-cyan-400 font-bold tracking-widest font-display block mb-0.5">
                              Practical Activity / Laboratory
                            </strong>
                            <p className="leading-relaxed font-light text-slate-300">{entry.practical}</p>
                          </div>
                        </div>
                      ) : null}

                      {/* AI Tutor smart consult trigger and calendar sync tools */}
                      <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                        <span className="text-[10px] text-slate-500 flex items-center gap-1.5">
                          <CheckCircle className={`h-3.5 w-3.5 ${isChecked ? "text-emerald-400" : "text-slate-600"}`} />
                          {isChecked ? "Course segment flagged as done" : "Incompleted syllabus revision segment"}
                        </span>

                        <div className="flex items-center gap-2">
                          {googleCalendarToken ? (
                            isSynced ? (
                              <button
                                onClick={() => handleDeleteCalendarEvent(syncedEvent.id, syncedEvent.summary)}
                                className="bg-red-500/10 hover:bg-red-600 border border-red-500/20 text-red-300 hover:text-white font-medium p-2 px-3 rounded-xl text-[10px] flex items-center gap-1 cursor-pointer transition active:scale-95 duration-200"
                                title="Remove scheduled event from Calendar"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Cancel Session
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setActiveScheduleEntry(entry);
                                  // Pick a logical date e.g. May 25, 2026
                                  setScheduleDate("2026-05-25");
                                }}
                                disabled={syncingEntryId === entry.id}
                                className="bg-cyan-500/10 hover:bg-cyan-500 border border-cyan-500/20 text-cyan-300 hover:text-white font-semibold p-2 px-3.5 rounded-xl text-[10px] flex items-center gap-1 cursor-pointer transition active:scale-95 duration-200"
                              >
                                <Calendar className="h-3.5 w-3.5" />
                                {syncingEntryId === entry.id ? "Syncing..." : "Schedule Event"}
                              </button>
                            )
                          ) : (
                            onGoogleConnect && (
                              <button
                                onClick={onGoogleConnect}
                                className="bg-orange-500/10 hover:bg-orange-600 border border-orange-500/20 text-orange-400 hover:text-white font-semibold p-2 px-3.5 rounded-xl text-[10px] flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                              >
                                <Lock className="h-3 w-3" />
                                Calendar Sync
                              </button>
                            )
                          )}

                          <button
                            onClick={() => handleAskTutorForTopic(entry)}
                            className="bg-purple-600/10 hover:bg-purple-600 border border-purple-500/30 font-semibold p-2 px-3.5 rounded-xl text-[10px] text-purple-300 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 duration-200"
                          >
                            <Sparkles className="h-3.5 w-3.5 text-purple-400 group-hover:text-white" />
                            Consult AI
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredEntries.length === 0 && (
                  <div className="text-center py-16 bg-white/5 rounded-3xl border border-dashed border-white/10 animate-fade-in text-slate-500">
                    <Layout className="h-10 w-10 text-slate-500 mx-auto mb-2.5 animate-pulse" />
                    <h5 className="font-semibold text-slate-400 text-sm font-display">No Syllabus Plans Found</h5>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed font-light">
                      No matching chapters, subjects, or monthly plans comply with your filtering choices or text query.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Elegant Study Scheduling Dialog Modal */}
      {activeScheduleEntry && (
        <div className="fixed inset-0 bg-[#0F172A]/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#1E293B] border border-white/10 rounded-3xl p-6 max-w-md w-full space-y-6 shadow-2xl relative animate-scale-up">
            <div className="space-y-1">
              <h3 className="text-lg font-bold font-display text-white">📅 Study Schedular Event</h3>
              <p className="text-xs text-slate-400">Lock the selected CBSE chapter study block directly to Google Calendar</p>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-2">
              <div className="text-[10px] uppercase text-cyan-400 font-bold tracking-widest font-display">
                Chapter topic detail
              </div>
              <div className="text-xs font-semibold text-white leading-relaxed">
                {activeScheduleEntry.topics.split("\n")[0].replace("*", "").trim()}
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1.5 font-display">
                <span className="bg-[#0F172A] px-2 py-0.5 rounded font-medium border border-white/5 text-slate-300">
                  {getSubjectName(activeScheduleEntry.subjectId)}
                </span> 
                <span>•</span> 
                <span>{activeScheduleEntry.month} Roadmap</span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Date Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-display">
                  Revision Date
                </label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full bg-white/5 text-white p-3 rounded-xl border border-white/10 text-xs focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition duration-200 leading-none"
                />
              </div>

              {/* Time and Duration Picker */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-display">
                    Start Hour
                  </label>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full bg-white/5 text-white p-3 rounded-xl border border-white/10 text-xs focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition duration-200 leading-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-display">
                    Revision Duration
                  </label>
                  <select
                    value={scheduleDuration}
                    onChange={(e) => setScheduleDuration(Number(e.target.value))}
                    className="w-full bg-slate-800 text-white p-3 rounded-xl border border-white/10 text-xs focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition duration-200"
                  >
                    <option value="30">30 min (Express Walkthrough)</option>
                    <option value="60">1 hr (Standard Learning)</option>
                    <option value="90">1.5 hr (Deep Study Session)</option>
                    <option value="120">2 hr (Exhaustive Mock Test)</option>
                  </select>
                </div>
              </div>

              {/* Focus Category Select Choice */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-display">
                  Study Routine Category Style
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    "🧠 Deep Focus Study",
                    "📝 Chapter Revision",
                    "🧪 Practical Practice",
                    "📚 Board Mock Test"
                  ].map((habit) => (
                    <button
                      key={habit}
                      type="button"
                      onClick={() => setScheduleHabit(habit)}
                      className={`p-2 rounded-xl border text-[10px] text-center transition cursor-pointer font-medium ${
                        scheduleHabit === habit
                          ? "bg-cyan-500/10 border-cyan-400/40 text-cyan-300 font-semibold shadow-inner"
                          : "bg-white/5 border-white/20 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      {habit}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Submit Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveScheduleEntry(null)}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 rounded-xl text-xs transition duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  handleCreateCalendarEvent(
                    activeScheduleEntry,
                    scheduleDate,
                    scheduleTime,
                    scheduleDuration,
                    scheduleHabit
                  );
                  setActiveScheduleEntry(null);
                }}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl text-xs transition duration-200 shadow-lg shadow-cyan-500/20 cursor-pointer active:scale-95"
              >
                Confirm & Sync Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
