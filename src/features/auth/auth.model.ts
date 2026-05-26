export type AuthUser = {
  email: string;
  fullName?: string;
  id: string;
};

export type AuthSession = {
  accessToken: string;
  refreshToken?: string;
  user: AuthUser;
};

export type SignInInput = {
  email: string;
  password: string;
};

export type SignUpInput = SignInInput & {
  fullName?: string;
};
