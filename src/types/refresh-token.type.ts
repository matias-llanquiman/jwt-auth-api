export interface RefreshToken {
  id: number;
  userId: number;
  refreshToken: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface RefreshTokenSummary {
  userId: number;
  refreshToken: string;
  expiresAt: Date;
}
