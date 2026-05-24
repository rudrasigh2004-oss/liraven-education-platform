import { useState } from "react";
import { signInWithPopup, signOut, User } from "firebase/auth";
import { auth, googleProvider, db, handleFirestoreError, OperationType } from "../firebase/setup";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { BookOpen, LogIn, LogOut, Menu, X, Rocket, Award, Layout, Heart } from "lucide-react";

interface NavbarProps {
  currentTab: string;
  setTab: (tab: string) => void;
  user: User | null;
  onLoginSuccess?: () => void;
}

export default function Navbar({ currentTab, setTab, user, onLoginSuccess }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsSyncing(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Synchronize in Firestore to enable dashboard bookmark storage
      const userRef = doc(db, "users", result.user.uid);
      const existingSnap = await getDoc(userRef);
      
      if (!existingSnap.exists()) {
        await setDoc(userRef, {
          uid: result.user.uid,
          displayName: result.user.displayName || "Stellar Student",
          email: result.user.email || "",
          photoURL: result.user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80",
          savedNotes: [],
          searchHistory: [],
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err: any) {
      console.error("Firebase Sign In Exception Handled:", err);
    } finally {
      setIsSyncing(false);
      setIsOpen(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setTab("home");
    } catch (err: any) {
      console.error("Sign Out Handled:", err);
    }
    setIsOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "subjects", label: "Subjects" },
    { id: "syllabus", label: "Syllabus" },
    { id: "notes", label: "Notes" },
    { id: "donate", label: "Donate" }
  ];

  return (
    <nav className="sticky top-0 z-50 h-20 flex items-center justify-between bg-[#0F172A]/80 backdrop-blur-md border-b border-white/5 px-6 md:px-10 shadow-lg shadow-black/10 transition-all font-sans">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => setTab("home")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition duration-300">
            <Rocket className="h-5 w-5 text-white animate-pulse" />
          </div>
          <span className="font-display font-bold tracking-tighter text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 group-hover:from-cyan-400 group-hover:to-purple-400 transition duration-300">
            LIRAVEN
          </span>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`pb-1 border-b-2 transition duration-300 relative cursor-pointer ${
                currentTab === item.id
                  ? "text-cyan-400 border-cyan-400 font-semibold"
                  : "text-slate-300 hover:text-cyan-400 border-transparent"
              }`}
            >
              {item.label}
              {currentTab === item.id && (
                <span className="absolute -bottom-[2px] left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              )}
            </button>
          ))}

          {/* User Dashboard Access Tab */}
          {user && (
            <button
              onClick={() => setTab("dashboard")}
              className={`pb-1 border-b-2 transition duration-300 flex items-center gap-1.5 cursor-pointer ${
                currentTab === "dashboard"
                  ? "text-purple-400 border-purple-400 font-semibold"
                  : "text-slate-300 hover:text-purple-400 border-transparent"
              }`}
            >
              <Layout className="h-4 w-4 text-purple-400 animate-pulse" />
              Dashboard
            </button>
          )}
        </div>

        {/* User login / status block (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-1.5 pl-3.5 pr-2.5 rounded-full select-none hover:border-white/20 transition duration-300">
              <span className="text-xs text-slate-300 max-w-28 truncate font-medium">
                {user.displayName || "A Cadet"}
              </span>
              <img
                src={user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80"}
                alt="user avatar"
                className="h-8 w-8 rounded-full border border-white/20 hover:scale-105 hover:border-cyan-400 transition duration-300 cursor-pointer"
                onClick={() => setTab("dashboard")}
                referrerPolicy="no-referrer"
              />
              <button
                onClick={handleSignOut}
                className="text-slate-400 hover:text-red-400 p-1 rounded-full transition cursor-pointer"
                title="Disconnect Node"
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              disabled={isSyncing}
              className="bg-white hover:bg-cyan-50 text-[#0F172A] font-semibold shadow-lg shadow-white/5 px-5 py-2 rounded-full text-sm flex items-center gap-1.5 active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-55"
            >
              {isSyncing ? (
                <>
                  <span className="h-4 w-4 border-2 border-[#0F172A] border-t-transparent rounded-full animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Google Access
                </>
              )}
            </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-3">
          {user && (
            <img
              src={user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80"}
              alt="user avatar"
              className="h-8 w-8 rounded-full border border-purple-500/20 active:scale-95 cursor-pointer transition"
              onClick={() => setTab("dashboard")}
              referrerPolicy="no-referrer"
            />
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-lg text-slate-300 hover:text-white transition cursor-pointer"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden mt-3 bg-[#0F172A]/95 border border-white/5 rounded-2xl p-4 flex flex-col gap-3 font-sans shadow-2xl backdrop-blur-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setTab(item.id);
                setIsOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left text-sm font-medium transition cursor-pointer ${
                currentTab === item.id
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-400/20"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}

          {user && (
            <button
              onClick={() => {
                setTab("dashboard");
                setIsOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left text-sm font-medium flex items-center gap-2 transition cursor-pointer ${
                currentTab === "dashboard"
                  ? "bg-purple-500/10 text-purple-400 border border-purple-400/20"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              <Layout className="h-4.5 w-4.5" />
              Student Dashboard
            </button>
          )}

          <div className="border-t border-white/5 my-1"></div>

          {user ? (
            <button
              onClick={handleSignOut}
              className="p-2.5 rounded-lg text-left text-sm font-semibold text-red-400 hover:bg-red-500/10 transition cursor-pointer flex items-center gap-2"
            >
              <LogOut className="h-4.5 w-4.5" />
              Disconnect Google Network
            </button>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              disabled={isSyncing}
              className="bg-white hover:bg-cyan-50 text-[#0F172A] font-semibold text-sm p-3 rounded-full flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-55 duration-300 transition-all"
            >
              {isSyncing ? (
                <>
                  <span className="h-4 w-4 border-2 border-[#0F172A] border-t-transparent rounded-full animate-spin" />
                  Syncing System Sync...
                </>
              ) : (
                <>
                  <LogIn className="h-4.5 w-4.5" />
                  Connect Google Auth
                </>
              )}
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
