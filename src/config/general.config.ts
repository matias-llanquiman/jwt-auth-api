import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  appEnv: string;
}

const config: Config = {
  port: Number(process.env.APP_PORT) || 4000,
  appEnv: process.env.APP_ENV || 'development',
};

export default config;
