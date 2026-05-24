import { useState } from "react";
import { SUBJECTS } from "../data/syllabus";
import { Subject, SubCategory } from "../types";
import { motion } from "motion/react";
import * as Icons from "lucide-react";

interface SubjectSectionProps {
  setTab: (tab: string) => void;
  setNotesFilter: (subjectId: string) => void;
  openAiChat: (subjectName: string, greetingMsg: string) => void;
}

export default function SubjectSection({ setTab, setNotesFilter, openAiChat }: SubjectSectionProps) {
  const [activeSubjectId, setActiveSubjectId] = useState<string>("science");

  const currentSubjectObj = SUBJECTS.find((sub) => sub.id === activeSubjectId) || SUBJECTS[0];

  const handleNotesJump = (subjectId: string) => {
    setNotesFilter(subjectId);
    setTab("notes");
  };

  const handleAiEngagement = (subjectName: string, subCategoryName: string) => {
    const greeting = `Provide me a super clean, bite-sized summary of Class 10 ${subjectName} chapter: **${subCategoryName}** with its most important Board Exam topics!`;
    openAiChat(subjectName, greeting);
  };

  return (
    <div className="text-white max-w-7xl mx-auto px-6 py-12 font-sans z-10 relative">
      {/* Subject Header */}
      <div className="text-center mb-12 max-w-3xl mx-auto space-y-3">
        <h2 className="text-4xl font-bold tracking-tight text-white font-display">
          Curriculum Modules
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto font-light leading-relaxed">
          Explore complete NCERT-aligned subjects for Class 10. Study core chapters, access standard revision guides, and tap into real-time AI concepts training.
        </p>
      </div>

      {/* Grid Tabs Selection Panel */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        {SUBJECTS.map((subject) => {
          let LucideIcon = Icons.BookOpen;
          if (subject.icon === "Calculator") LucideIcon = Icons.Calculator;
          if (subject.icon === "Atom") LucideIcon = Icons.Atom;
          if (subject.icon === "Globe") LucideIcon = Icons.Globe;
          if (subject.icon === "Scroll") LucideIcon = Icons.Scroll;

          const isActive = activeSubjectId === subject.id;

          return (
            <button
              key={subject.id}
              onClick={() => setActiveSubjectId(subject.id)}
              className={`flex flex-col items-center justify-center p-6 rounded-3xl border transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer text-center ${
                isActive
                  ? "bg-white text-[#0F172A] border-white shadow-xl shadow-white/5"
                  : "bg-white/5 border-white/10 hover:border-white/30 text-white"
              }`}
            >
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${subject.color} text-white mb-3 shadow-lg shadow-black/10`}>
                <LucideIcon className="h-5 w-5 text-white" />
              </div>
              <span className="font-display font-semibold text-xs tracking-wider uppercase">{subject.name}</span>
            </button>
          );
        })}
      </div>

      {/* Bento Layout Subject Category Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white/5 border border-white/10 p-6 md:p-10 rounded-3xl backdrop-blur-xl shadow-2xl">
        {/* Left column Description Column */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-bold bg-white/10 text-white px-3 py-1 rounded-full tracking-widest border border-white/10 inline-block">
              Core Course
            </span>
            <h3 className="text-3xl font-bold text-white font-display">{currentSubjectObj.name}</h3>
            <p className="text-slate-400 text-sm font-light leading-relaxed">{currentSubjectObj.description}</p>
          </div>

          <div className="p-5 bg-white/5 rounded-2xl border border-white/10 flex flex-col gap-3.5">
            <h4 className="text-xs text-cyan-400 font-semibold tracking-wider flex items-center gap-1.5 uppercase font-display">
              <Icons.ShieldAlert className="h-4 w-4 text-cyan-400" /> Syllabus Directive
            </h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              These Class 10 structures heavily influence cumulative board milestones. Review corresponding PDFs to optimize review processes.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleNotesJump(currentSubjectObj.id)}
                className="flex-1 text-center bg-white hover:bg-cyan-50 text-[#0F172A] font-semibold text-xs py-2.5 px-4 rounded-full shadow transition-all duration-300 cursor-pointer"
              >
                Go to Notes Vault
              </button>
            </div>
          </div>
        </div>

        {/* Right column bento categories */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentSubjectObj.categories.map((cat, idx) => (
            <div
              key={cat.id || idx}
              className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:border-cyan-400/30 transition duration-300 shadow-sm flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-base text-white group-hover:text-cyan-400 transition font-display">
                    {cat.name}
                  </h4>
                </div>
                <p className="text-xs text-slate-400 mb-4 font-light leading-relaxed">{cat.description}</p>
                
                {/* Visual bullet bullet tags list */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cat.topics.slice(0, 4).map((topic, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] bg-white/5 text-cyan-300 px-2.5 py-1 rounded-full border border-white/5 font-light"
                    >
                      {topic}
                    </span>
                  ))}
                  {cat.topics.length > 4 && (
                    <span className="text-[9px] text-slate-500 px-1 py-0.5 self-center">
                      +{cat.topics.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => handleNotesJump(currentSubjectObj.id)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-slate-200 p-2.5 text-xs rounded-full font-medium flex items-center justify-center gap-1 transition cursor-pointer border border-white/10"
                >
                  <Icons.Download className="h-3.5 w-3.5" />
                  Notes
                </button>
                <button
                  onClick={() => handleAiEngagement(currentSubjectObj.name, cat.name)}
                  className="flex-1 bg-white hover:bg-cyan-50 text-[#0F172A] p-2.5 text-xs rounded-full font-semibold flex items-center justify-center gap-1 transition cursor-pointer shadow-md duration-300"
                >
                  <Icons.Sparkles className="h-3.5 w-3.5 text-purple-600 animate-pulse" />
                  Ask AI
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
