import { Mail, Github, Compass, HelpCircle, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0F172A]/80 p-8 py-12 z-10 relative font-sans text-xs text-slate-400 backdrop-blur-md">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left Col Brand info */}
        <div className="space-y-3.5 text-center md:text-left">
          <h4 className="font-bold tracking-tight text-white text-lg font-display">
            LIRAVEN
          </h4>
          <p className="max-w-xs text-slate-400 text-xs leading-relaxed mx-auto md:mx-0 font-light">
            A modern study dashboard designed for Class 10 students. Access curated study modules, revision handouts, and the interactive LIRAVEN AI tutor.
          </p>
        </div>

        {/* Center Links */}
        <div className="grid grid-cols-2 gap-4 text-slate-300">
          <div className="space-y-3">
            <h5 className="font-semibold text-slate-400 text-[10px] uppercase tracking-widest font-display">Resources</h5>
            <ul className="space-y-2 text-xs text-slate-500 font-light">
              <li><span className="hover:text-cyan-400 transition cursor-help">NCERT Textbooks</span></li>
              <li><span className="hover:text-cyan-400 transition cursor-help font-light">CBSE Syllabus</span></li>
              <li><span className="hover:text-cyan-400 transition cursor-help">Reference guides</span></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-semibold text-slate-400 text-[10px] uppercase tracking-widest font-display">Guidelines</h5>
            <ul className="space-y-2 text-xs text-slate-500 font-light">
              <li><span className="hover:text-cyan-400 transition cursor-help">Terms of service</span></li>
              <li><span className="hover:text-cyan-400 transition cursor-help">Creator support</span></li>
              <li><span className="hover:text-cyan-400 transition cursor-help">Privacy policies</span></li>
            </ul>
          </div>
        </div>

        {/* Right Contacts & Support creators */}
        <div className="space-y-3.5 text-center md:text-left">
          <h5 className="font-semibold text-slate-400 text-[10px] uppercase tracking-widest font-display">Directory Contact</h5>
          <div className="flex flex-col gap-2.5 items-center md:items-start text-xs text-slate-500 font-light">
            <span className="flex items-center gap-2 hover:text-white transition cursor-pointer">
              <Mail className="h-4 w-4 text-purple-400" />
              support@liraven.com
            </span>
            <span className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-cyan-400" />
              New Delhi, India
            </span>
          </div>

          <div className="border-t border-white/5 pt-3 text-[10px] text-slate-500 uppercase flex items-center justify-center md:justify-start gap-1 font-light">
            Designed with <Heart className="h-3 w-3 text-red-500 animate-pulse fill-red-500" /> for Class 10 board prep.
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 mt-8 pt-4 text-center text-[10px] text-slate-500 font-light tracking-wide">
        © {new Date().getFullYear()} LIRAVEN. All rights reserved.
      </div>
    </footer>
  );
}
