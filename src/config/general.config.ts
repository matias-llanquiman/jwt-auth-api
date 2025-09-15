import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';

dotenv.config();

interface Config {
  port: number;
  host: string;
  appEnv: string;
  apiKey: Secret;
  refreshApiKey: Secret;
}

const config: Config = {
  port: Number(process.env.APP_PORT) || 4000,
  host: process.env.APP_HOST || 'localhost',
  appEnv: process.env.APP_ENV || 'development',
  apiKey: process.env.API_SECRET_KEY || '',
  refreshApiKey: process.env.REFRESH_API_SECRET_KEY || '',
};

export default config;
