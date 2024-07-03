import create from "zustand";

interface LoginState {
  studentId: string;
  pin: string;
  setStudentId: (studentId: string) => void;
  setPin: (pin: string) => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  studentId: "",
  pin: "",
  setStudentId: (studentId) => set({ studentId }),
  setPin: (pin) => set({ pin }),
}));
