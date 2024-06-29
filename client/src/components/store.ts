import create from "zustand";

interface LoginState {
  id: string;
  pin: string;
  setId: (id: string) => void;
  setPin: (pin: string) => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  id: "",
  pin: "",
  setId: (id) => set({ id }),
  setPin: (pin) => set({ pin }),
}));
