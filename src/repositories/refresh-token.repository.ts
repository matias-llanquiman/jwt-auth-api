import pool from '@src/config/postgres.config';
import {
  RefreshToken,
  RefreshTokenSummary,
} from '@src/types/refresh-token.type';

export const refreshTokenRepository = {
  create: async (token: RefreshTokenSummary): Promise<RefreshToken> => {
    const sql = `INSERT INTO refresh_tokens(user_id, refresh_token, expires_at) values($1, $2, $3) RETURNING id, user_id, refresh_token, expires_at, created_at`;
    const result = await pool.query(sql, [
      token.userId,
      token.refreshToken,
      token.expiresAt,
    ]);

    return result.rows[0];
  },
};
