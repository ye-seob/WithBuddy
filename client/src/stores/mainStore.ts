import create from "zustand";
import { persist } from "zustand/middleware";

interface MainState {
  commonNumber: string;
  buddyName: string;
  studentId: string;
  setCommonNumber: (commonNumber: string) => void;
  setBuddyName: (buddyName: string) => void;
  setStudentId: (studentId: string) => void;
}

export const useMainStore = create<MainState>()(
  persist(
    (set) => ({
      commonNumber: "",
      buddyName: "",
      studentId: "",
      setCommonNumber: (commonNumber) => set({ commonNumber }),
      setBuddyName: (buddyName) => set({ buddyName }),
      setStudentId: (studentId) => set({ studentId }),
    }),
    {
      name: "main-storage", // 저장소의 이름을 지정합니다.
      getStorage: () => localStorage, // localStorage를 사용하여 데이터를 저장합니다.
    }
  )
);
