import { create } from "zustand";

interface User {
  id: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;

  setAuth: (token: string, user: User) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,

  setAuth: (token, user) =>
    set({
      accessToken: token,
      user,
    }),

  logout: () =>
    set({
      accessToken: null,
      user: null,
    }),
}));
