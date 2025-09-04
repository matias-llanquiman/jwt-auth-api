import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '@src/config/general.config';

export const authJwt = (userId: number): string => {
  const payload = { userId };
  return jwt.sign(payload, config.apiKey, {
    expiresIn: '900',
  });
};

export const verifyJwt = (token: string): string | JwtPayload => {
  return jwt.verify(token, config.apiKey);
};
