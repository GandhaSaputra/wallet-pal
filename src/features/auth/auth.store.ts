import { create } from "zustand";
import { AuthSession, SignInInput, SignUpInput } from "./auth.model";
import * as authService from "./auth.service";

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated" | "error";

type AuthStore = {
  error: string | null;
  session: AuthSession | null;
  status: AuthStatus;
  refreshSession: () => Promise<void>;
  signIn: (input: SignInInput) => Promise<boolean>;
  signOut: () => Promise<void>;
  signUp: (input: SignUpInput) => Promise<boolean>;
  resetError: () => void;
};

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong";

export const useAuthStore = create<AuthStore>((set) => ({
  error: null,
  session: null,
  status: "unauthenticated",
  refreshSession: async () => {
    set({ status: "loading", error: null });

    try {
      const session = await authService.refreshSession();
      set({
        session,
        status: session ? "authenticated" : "unauthenticated",
      });
    } catch (error) {
      set({ error: getErrorMessage(error), status: "error" });
    }
  },
  signIn: async (input) => {
    set({ status: "loading", error: null });

    try {
      const session = await authService.signIn(input);
      set({ session, status: "authenticated" });
      return true;
    } catch (error) {
      set({ error: getErrorMessage(error), status: "error" });
      return false;
    }
  },
  signOut: async () => {
    await authService.signOut();
    set({ error: null, session: null, status: "unauthenticated" });
  },
  signUp: async (input) => {
    set({ status: "loading", error: null });

    try {
      const session = await authService.signUp(input);
      set({ session, status: "authenticated" });
      return true;
    } catch (error) {
      set({ error: getErrorMessage(error), status: "error" });
      return false;
    }
  },
  resetError: () => set({ error: null }),
}));
