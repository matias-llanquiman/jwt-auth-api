import { Router } from 'express';
import { authController } from '@src/controllers/auth.controller';

const router = Router();

router.post('/register', authController.register);

export default router;
