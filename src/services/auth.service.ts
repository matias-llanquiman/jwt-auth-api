import {
  User,
  LoginInput,
  RegisterInput,
  UserSummary,
} from '@src/models/user.model';
import { userRepository } from '@src/repositories/user.repository';
import { HttpError } from '@src/errors/HttpError';
import { hashCompare, hashPassword } from '@src/utils/hash';

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

  login: async (data: LoginInput): Promise<User> => {
    const existing = await userRepository.findPassword(data.email);
    if (!existing) {
      throw new HttpError('Email does not exists');
    }
    if (!hashCompare(data.password, existing.password)) {
      throw new HttpError('Wrong password');
    }
  },
};
