import express from 'express';
import { errorHandler } from '@src/middlewares/error.middleware';
import router from '@src/routes/auth.route';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', router);
app.use(errorHandler);

export default app;
