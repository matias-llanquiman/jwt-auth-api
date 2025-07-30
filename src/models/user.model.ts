export interface User {
  name: string;
  password: string;
  email: string;
}

export interface UserSummary {
  name: string;
  email: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
