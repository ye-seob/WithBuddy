// signupStore.ts
import create from "zustand";

interface SignupState {
  name: string;
  studentId: string;
  pin: string;
  pinConfirm: string;
  email: string;
  authCode: string;
  step: number;
  setName: (name: string) => void;
  setStudentId: (studentId: string) => void;
  setPin: (pin: string) => void;
  setPinConfirm: (pinConfirm: string) => void;
  setEmail: (email: string) => void;
  setAuthCode: (authCode: string) => void;
  setStep: (step: number) => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  name: "",
  studentId: "",
  pin: "",
  pinConfirm: "",
  email: "",
  authCode: "",
  step: 1,
  setName: (name: string) => set({ name }),
  setStudentId: (studentId: string) => set({ studentId }),
  setPin: (pin: string) => set({ pin }),
  setPinConfirm: (pinConfirm: string) => set({ pinConfirm }),
  setEmail: (email: string) => set({ email }),
  setAuthCode: (authCode: string) => set({ authCode }),
  setStep: (step: number) => set({ step }),
}));
