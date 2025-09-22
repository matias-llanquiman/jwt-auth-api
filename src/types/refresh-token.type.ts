import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export interface RefreshToken {
  id: number;
  userId: number;
  refreshToken: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface TokenRequest extends Request {
  token?: JwtPayload | null;
}

export interface RefreshTokenSummary {
  userId: number;
  refreshToken: string;
  expiresAt: Date;
}

export interface RefreshTokenSummaryBd {
  user_id: number;
  refresh_token: string;
  expires_at: Date;
}
