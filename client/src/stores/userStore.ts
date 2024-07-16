import create from "zustand";
import { persist, devtools } from "zustand/middleware";

interface UserState {
  name: string;
  commonNumber: string;
  buddyName: string;
  studentId: string;
  major: string;
  setName: (name: string) => void;
  setCommonNumber: (commonNumber: string) => void;
  setBuddyName: (buddyName: string) => void;
  setStudentId: (studentId: string) => void;
  setMajor: (name: string) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        name: "",
        commonNumber: "",
        buddyName: "",
        studentId: "",
        major: "",
        setName: (name) => set({ name }),
        setCommonNumber: (commonNumber) => set({ commonNumber }),
        setBuddyName: (buddyName) => set({ buddyName }),
        setStudentId: (studentId) => set({ studentId }),
        setMajor: (major) => set({ major }),
      }),
      {
        name: "user-storage",
        getStorage: () => localStorage,
      }
    )
  )
);
