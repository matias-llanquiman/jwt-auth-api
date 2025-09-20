import {
  LoginInput,
  LoginResponse,
  NewUser,
  RefreshResponse,
  UserSummary,
} from '@src/types/user.type';
import { userRepository } from '@src/repositories/user.repository';
import { HttpError } from '@src/errors/http.error';
import { hashCompare, hashPassword } from '@src/utils/hash.util';
import {
  generateAuthJwt,
  generateRefreshJwt,
  verifyJwt,
} from '@src/utils/jwt.util';
import { RefreshTokenSummary } from '@src/types/refresh-token.type';
import { refreshTokenRepository } from '@src/repositories/refresh-token.repository';
import { TokenRequest } from '@src/middlewares/auth.middleware';

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
      throw new HttpError('Invalid credentials');
    }
    const isPasswordCorrect = await hashCompare(data.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpError('Invalid credentials');
    }

    let now = new Date();
    now.setDate(now.getDate() + 7);
    const expiresAt = now;

    const accessJwt = generateAuthJwt(user.id);
    const refreshJwt = generateRefreshJwt(user.id);
    const { password, ...userSafe } = user;
    const refreshTokenData: RefreshTokenSummary = {
      userId: userSafe.id,
      refreshToken: refreshJwt,
      expiresAt: expiresAt,
    };

    await refreshTokenRepository.create(refreshTokenData);

    return { accessToken: accessJwt, refreshToken: refreshJwt, user: userSafe };
  },

  getProfile: async (userId: number): Promise<UserSummary> => {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new HttpError('User not found', 401);
    }
    return user;
  },

  refresh: async (refreshToken: string): Promise<RefreshResponse> => {
    const inputRefreshToken = refreshToken;

    if (!inputRefreshToken) {
      throw new HttpError('Unauthorized', 401);
    }

    const decoded = verifyJwt(inputRefreshToken, 'REFRESH');
    const userId = (decoded as TokenRequest).token!.userId;

    const oldRefreshToken = await refreshTokenRepository.findByUserId(userId);

    if (oldRefreshToken !== inputRefreshToken) {
      throw new HttpError('Invalid Refresh Token', 401);
    }

    await refreshTokenRepository.deleteByUserId(userId);

    const accessJwt = generateAuthJwt(userId);
    const refreshJwt = generateRefreshJwt(userId);
    let now = new Date();
    now.setDate(now.getDate() + 7);
    const expiresAt = now;

    const refreshTokenData: RefreshTokenSummary = {
      userId: userId,
      refreshToken: refreshJwt,
      expiresAt: expiresAt,
    };

    await refreshTokenRepository.create(refreshTokenData);

    return { accessToken: accessJwt, refreshToken: refreshJwt };
  },
};
