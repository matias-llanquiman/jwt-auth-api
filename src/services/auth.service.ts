import { User, UserSummary } from '@src/models/user.model';
import { userRepository } from '@src/repositories/user.repository';
import { HttpError } from '@src/errors/HttpError';

export const authService = {
  getByEmail: (email: string): Promise<UserSummary | null> => {
    return userRepository.findByEmail(email);
  },

  register: async (data: User): Promise<UserSummary> => {
    try {
      return await userRepository.create(data);
    } catch (error) {
      if (error instanceof Error && (error as any).code === '23505') {
        throw new HttpError('Email already exists', 409);
      }
    }
    throw new HttpError('Database error', 500);
  },
};
