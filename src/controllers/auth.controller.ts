import { authService } from '@src/services/auth.service';
import { Request, Response, NextFunction } from 'express';
import { TokenRequest } from '@src/middlewares/auth.middleware';
import { HttpError } from '@src/errors/http.error';

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    try {
      await authService.register({ name, email, password });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, user } = await authService.login({
        email,
        password,
      });
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      res.status(201).json({ accessToken: accessToken, user });
    } catch (error) {
      next(error);
    }
  },

  getProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = (req as TokenRequest).token;
      if (!token || !token.userId) throw new HttpError('Invalid token', 401);
      const userId = token.userId;
      const user = await authService.getProfile(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  refresh: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies['refreshToken'];
      if (!token) throw new HttpError('Refresh token missing', 401);

      const { accessToken, refreshToken } = await authService.refresh(token);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      res.status(201).json({ accessToken: accessToken });
    } catch (error) {
      res.clearCookie('refreshToken');
      next(error);
    }
  },
};
