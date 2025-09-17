import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '@src/config/general.config';
import { uuidv4 } from 'zod';

export const generateAuthJwt = (userId: number): string => {
  const payload = { userId };
  return jwt.sign(payload, config.apiKey, {
    expiresIn: '20s',
  });
};

export const generateRefreshJwt = (userId: number): string => {
  const tokenId = uuidv4();
  const payload = { userId, tokenId };
  return jwt.sign(payload, config.refreshApiKey, {
    expiresIn: '7d',
  });
};

type TokenType = 'ACCESS' | 'REFRESH';

export const verifyJwt = (
  token: string,
  type: TokenType,
): JwtPayload | null => {
  try {
    if (type === 'ACCESS') {
      return jwt.verify(token, config.apiKey) as JwtPayload;
    }
    if (type === 'REFRESH') {
      return jwt.verify(token, config.refreshApiKey) as JwtPayload;
    }
    return null;
  } catch (err) {
    return null;
  }
};
