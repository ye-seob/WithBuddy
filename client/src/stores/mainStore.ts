import create from "zustand";
import { persist } from "zustand/middleware";

interface MainState {
  commonNumber: string;
  buddyName: string;
  studentId: string;
  major: string;
  setCommonNumber: (commonNumber: string) => void;
  setBuddyName: (buddyName: string) => void;
  setStudentId: (studentId: string) => void;
  setMajor: (major: string) => void;
}

export const useMainStore = create<MainState>()(
  persist(
    (set) => ({
      commonNumber: "",
      buddyName: "",
      studentId: "",
      major: "",
      setCommonNumber: (commonNumber) => set({ commonNumber }),
      setBuddyName: (buddyName) => set({ buddyName }),
      setStudentId: (studentId) => set({ studentId }),
      setMajor: (major) => set({ major }),
    }),
    {
      name: "main-storage",
      getStorage: () => localStorage,
    }
  )
);
