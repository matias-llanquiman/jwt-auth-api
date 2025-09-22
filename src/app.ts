import express from 'express';
import { errorHandler } from '@src/middlewares/error.middleware';
import router from '@src/routes/auth.route';
import swaggerUI from 'swagger-ui-express';
import { swaggerSpec } from '@src/docs/swagger';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/auth', router);
app.use(errorHandler);

export default app;
