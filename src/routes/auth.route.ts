import { Router } from 'express';
import { authController } from '@src/controllers/auth.controller';
import { validateData } from '@src/middlewares/validation.middleware';
import {
  userRegistrationSchema,
  userLoginSchema,
} from '@src/schemas/user.schema';

/**
 * @openapi
 * '/auth/register':
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 * '/auth/login':
 *   post:
 *     summary: Sign in user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: Invalid input

 */

const router = Router();

router.post(
  '/register',
  validateData(userRegistrationSchema),
  authController.register,
);
router.post('/login', validateData(userLoginSchema), authController.login);

export default router;
