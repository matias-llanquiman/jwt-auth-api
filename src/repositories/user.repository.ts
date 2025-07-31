import pool from '@src/config/postgres.config';
import { User, UserSummary } from '@src/models/user.model';
import { HttpError } from '@src/errors/HttpError';

export const userRepository = {
  findByEmail: async (email: string): Promise<UserSummary | null> => {
    const result = await pool.query<UserSummary>(
      `SELECT email FROM users WHERE email=$1`,
      [email],
    );
    return result.rows[0] || null;
  },

  create: async (userData: User): Promise<UserSummary> => {
    const sql = `INSERT INTO users(name, email, password) values($1, $2, $3)`;
    const result = await pool.query(sql, [
      userData.name,
      userData.email,
      userData.password,
    ]);

    if (result.rowCount === 0) {
      throw new HttpError('Failed to create user', 500);
    }
    return result.rows[0];
  },
};
