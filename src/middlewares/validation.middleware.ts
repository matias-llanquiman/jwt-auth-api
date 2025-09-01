import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    const error = result.error;

    if (!result.success && error instanceof ZodError) {
      const errorMessages = error.issues.map((issue: any) => ({
        message: `${issue.path.join('.')} is ${issue.message}`,
      }));
      res.status(400).json({ error: 'Invalid data', details: errorMessages });
    } else {
      next();
    }
  };
}
