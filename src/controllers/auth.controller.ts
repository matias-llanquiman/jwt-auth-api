import { authService } from '@src/services/auth.service';
import { Request, Response, NextFunction } from 'express';

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
      await authService.register({ name, email, password });
      res.status(201).json({ message: 'User created' });
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      const { jwt, user } = await authService.login({ email, password });
      res.status(201).json({ token: jwt, user });
    } catch (error) {
      next(error);
    }
  },
};
