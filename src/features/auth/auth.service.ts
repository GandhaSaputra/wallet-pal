import { AuthSession, SignInInput, SignUpInput } from "./auth.model";

export async function signIn(_input: SignInInput): Promise<AuthSession> {
  throw new Error("Auth API is not connected yet");
}

export async function signUp(_input: SignUpInput): Promise<AuthSession> {
  throw new Error("Auth API is not connected yet");
}

export async function signOut() {
  return undefined;
}

export async function refreshSession(): Promise<AuthSession | null> {
  return null;
}
