import pool from '@src/config/postgres.config';
import {
  RefreshToken,
  RefreshTokenSummary,
  RefreshTokenSummaryBd,
} from '@src/types/refresh-token.type';

export const refreshTokenRepository = {
  findByUserId: async (
    userId: number,
  ): Promise<RefreshTokenSummaryBd | null> => {
    const sql = `SELECT refresh_token FROM refresh_tokens WHERE user_id = $1`;
    const result = await pool.query<RefreshTokenSummaryBd>(sql, [userId]);
    return result.rows[0] || null;
  },
  deleteByUserId: async (userId: number) => {
    const sql = `DELETE FROM refresh_tokens WHERE user_id = $1`;
    await pool.query(sql, [userId]);
  },
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
