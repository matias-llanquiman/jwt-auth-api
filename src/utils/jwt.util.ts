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

export const verifyJwt = (token: string): string | JwtPayload => {
  return jwt.verify(token, config.apiKey);
};
