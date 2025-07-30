import express from 'express';
import { errorHandler } from '@src/middlewares/errorHandler.middleware';
import router from '@src/routes/auth.route';

const app = express();

app.use(express.json());

app.use('/auth', router);

app.use(errorHandler);
export default app;
