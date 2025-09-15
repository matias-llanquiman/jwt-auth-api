import {
  LoginInput,
  LoginResponse,
  NewUser,
  UserSummary,
} from '@src/types/user.type';
import { userRepository } from '@src/repositories/user.repository';
import { HttpError } from '@src/errors/http.error';
import { hashCompare, hashPassword } from '@src/utils/hash.util';
import { generateAuthJwt } from '@src/utils/jwt.util';

export const authService = {
  register: async (data: NewUser): Promise<UserSummary> => {
    const existing = await userRepository.findEmail(data.email);
    if (existing) {
      throw new HttpError('Email already exists', 409);
    }
    const hashedPassword = await hashPassword(data.password);
    return await userRepository.create({
      ...data,
      password: hashedPassword,
    });
  },

  login: async (data: LoginInput): Promise<LoginResponse> => {
    const user = await userRepository.findPassword(data.email);
    if (!user) {
      throw new HttpError('Email does not exists');
    }
    const isPasswordCorrect = await hashCompare(data.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpError('Wrong password');
    }

    const jwt = generateAuthJwt(user.id);
    const { password, ...userSafe } = user;
    return { jwt, user: userSafe };
  },
};
