import { Router } from 'express';
import { authController } from '@src/controllers/auth.controller';
import { validateData } from '@src/middlewares/validation.middleware';
import {
  userRegistrationSchema,
  userLoginSchema,
} from '@src/schemas/user.schema';

const router = Router();

router.post(
  '/register',
  validateData(userRegistrationSchema),
  authController.register,
);
router.post('/login', validateData(userLoginSchema), authController.login);

export default router;
