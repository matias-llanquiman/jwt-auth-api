import jwt, { JwtPayload } from 'jsonwebtoken';
import { verifyJwt } from '@src/utils/jwt.util';
import { HttpError } from '@src/errors/http.error';
import { Request, Response, NextFunction } from 'express';

export interface TokenRequest extends Request {
  token: JwtPayload | null;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new HttpError('Unauthorized', 401);
    }

    const decoded = verifyJwt(token, 'ACCESS');
    (req as TokenRequest).token = decoded;
    next();
  } catch (error) {
    throw new HttpError('Invalid or expired token', 403);
  }
};
