import { RegisterInput, UserSummary } from '@src/models/user.model';
import { userRepository } from '@src/repositories/user.repository';
import { HttpError } from '@src/errors/HttpError';
import { hashPassword } from '@src/utils/hash';

export const authService = {
  register: async (data: RegisterInput): Promise<UserSummary> => {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) {
      throw new HttpError('Email already exists', 409);
    }
    const hashedPassword = await hashPassword(data.password);
    return await userRepository.create({
      ...data,
      password: hashedPassword,
    });
  },
};
