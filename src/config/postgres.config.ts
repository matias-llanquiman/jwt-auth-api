import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { PG_HOST, PG_USER, PG_PASS, PG_DB, PG_PORT } = process.env;

const pool = new Pool({
  host: PG_HOST,
  user: PG_USER,
  password: PG_PASS,
  database: PG_DB,
  port: parseInt(PG_PORT as string),
});

export default pool;
