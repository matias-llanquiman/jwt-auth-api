import pool from '@src/config/postgres.config';
import { NewUser, User, UserSummary } from '@src/types/user.type';
import { HttpError } from '@src/errors/http.error';

export const userRepository = {
  findEmail: async (email: string): Promise<UserSummary | null> => {
    const result = await pool.query<UserSummary>(
      `SELECT email FROM users WHERE email=$1`,
      [email],
    );
    return result.rows[0] || null;
  },

  findPassword: async (email: string): Promise<User | null> => {
    const result = await pool.query<User>(
      `SELECT id, name, email, password FROM users WHERE email=$1`,
      [email],
    );
    return result.rows[0] || null;
  },

  create: async (userData: NewUser): Promise<UserSummary> => {
    const sql = `INSERT INTO users(name, email, password) values($1, $2, $3) RETURNING id, name, email`;
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
