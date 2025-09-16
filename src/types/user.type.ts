export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
}

export interface UserSummary {
  id: number;
  name: string;
  email: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserSummary;
}
