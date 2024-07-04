import create from "zustand";
import { persist } from "zustand/middleware";

interface LoginState {
  studentId: string;
  pin: string;
  name: string;
  setStudentId: (studentId: string) => void;
  setPin: (pin: string) => void;
  setName: (name: string) => void;
}

export const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      studentId: "",
      pin: "",
      name: "",
      setStudentId: (studentId) => set({ studentId }),
      setPin: (pin) => set({ pin }),
      setName: (name) => set({ name }),
    }),
    {
      name: "login-storage",
      getStorage: () => localStorage,
    }
  )
);
