import { z } from 'zod';

export const userRegistrationSchema = z.strictObject({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
});

export const userLoginSchema = z.strictObject({
  email: z.email(),
  password: z.string().min(8),
});
