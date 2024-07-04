import create from "zustand";

interface MainState {
  commonNumber: string;
  buddyName: string;
  studentId: string;
  setCommonNumber: (commonNumber: string) => void;
  setBuddyName: (buddyName: string) => void;
  setStudentId: (studentId: string) => void;
}

export const useMainStore = create<MainState>((set) => ({
  commonNumber: "",
  buddyName: "",
  studentId: "",
  setCommonNumber: (commonNumber) => set({ commonNumber }),
  setBuddyName: (buddyName) => set({ buddyName }),
  setStudentId: (studentId) => set({ studentId }),
}));
