export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  createdAt: string;
  updatedAt: string;
  savedNotes: string[]; // Note IDs saved by the student
  searchHistory: string[]; // List of historical searches
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: number;
}

export interface ChatQuery {
  queryId: string;
  userId: string;
  subject: string;
  question: string;
  answer: string;
  language: "en" | "hi";
  createdAt: string;
}

export interface DonationRecord {
  donationId: string;
  userId?: string;
  donorName: string;
  amount: number;
  paymentMethod: "Razorpay" | "UPI";
  status: "success" | "pending";
  createdAt: string;
}

export type SubjectId = "english" | "maths" | "science" | "social_science" | "hindi";

export interface SubCategory {
  id: string;
  name: string;
  description: string;
  topics: string[];
}

export interface Subject {
  id: SubjectId;
  name: string;
  icon: string; // Lucide icon identifier
  color: string; // Tailwind glow color class
  categories: SubCategory[];
  description: string;
}

export interface NoteItem {
  id: string;
  subjectId: SubjectId;
  categoryName: string;
  chapterNumber: number;
  title: string;
  description: string;
  fileSize: string;
  pageCount: number;
  downloadCount: number;
  lastUpdated: string;
  videoUrl?: string; // YouTube or educational video placeholder
  importantTopics: string[];
}
