import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'root',
  host: 'dpg-cpsfns08fa8c739682og-a.oregon-postgres.render.com',
  database: 'test_database_xa9m',
  password: 'iEhIFdxZTWLSW7eUgcuwd6kSMUgiEEpo',
  port: 5432,
});

export default pool;
