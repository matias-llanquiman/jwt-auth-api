import { authService } from '@src/services/auth.service';
import { Request, Response, NextFunction } from 'express';

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
      const { jwt, user } = await authService.login({ email, password });
      res.status(201).json({ token: jwt, user });
    } catch (error) {
      next(error);
    }
  },
};
