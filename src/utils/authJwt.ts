import jwt from 'jsonwebtoken';
import config from '@src/config/general.config';

export const authJwt = (userId: number): string => {
  const payload = { userId };
  return jwt.sign(payload, config.apiKey, {
    expiresIn: '1h',
  });
};
