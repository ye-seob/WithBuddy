import create from "zustand";
import { persist, devtools } from "zustand/middleware";

interface UserState {
  name: string;
  studentId: string;
  major: string;
  snsIds: string[];
  mbti: string;
  setName: (name: string) => void;
  setStudentId: (studentId: string) => void;
  setMajor: (major: string) => void;
  setSnsIds: (snsIds: string[]) => void;
  setMbti: (mbti: string) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        name: "",
        studentId: "",
        major: "",
        snsIds: [],
        mbti: "",
        setName: (name: string) => set({ name }),
        setStudentId: (studentId: string) => set({ studentId }),
        setMajor: (major: string) => set({ major }),
        setSnsIds: (snsIds: string[]) => set({ snsIds }),
        setMbti: (mbti: string) => set({ mbti }),
      }),
      {
        name: "user-storage",
        getStorage: () => localStorage,
      }
    )
  )
);
