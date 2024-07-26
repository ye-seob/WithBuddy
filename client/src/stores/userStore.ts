import create from "zustand";
import { persist, devtools } from "zustand/middleware";

interface UserState {
  name: string;
  studentId: string;
  major: string;
  instaId: string;
  kakaoId: string;
  mbti: string;
  setName: (name: string) => void;
  setStudentId: (studentId: string) => void;
  setMajor: (major: string) => void;
  setInstaId: (instaId: string | undefined) => void;
  setKakaoId: (kakaoId: string | undefined) => void;
  setMbti: (mbti: string) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        name: "",
        studentId: "",
        major: "",
        instaId: "",
        kakaoId: "",
        mbti: "",
        setName: (name: string) => set({ name }),
        setStudentId: (studentId: string) => set({ studentId }),
        setMajor: (major: string) => set({ major }),
        setInstaId: (instaId) => set({ instaId: instaId || "" }),
        setKakaoId: (kakaoId) => set({ kakaoId: kakaoId || "" }),
        setMbti: (mbti: string) => set({ mbti }),
      }),
      {
        name: "user-storage",
        getStorage: () => localStorage,
      }
    )
  )
);
