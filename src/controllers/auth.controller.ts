import { authService } from '@src/services/auth.service';
import { Request, Response, NextFunction } from 'express';

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({ message: 'User created', user });
    } catch (error) {
      next(error);
    }
  },
};
