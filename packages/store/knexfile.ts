import * as dotenv from 'dotenv';
const env = process.env.NODE_ENV ? '.test' : ''

dotenv.config({ path: `../../.env${env}`});

const config = {
  client: 'pg',
  connection: {
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
  },
  pool: {
    min: 2,
    max: 10,
  },
  seeds: {
    directory: './src/seeds/',
    extension: 'ts',
  },
  migrations: {
    tableName: 'migrations',
    directory: './src/migrations/',
    extension: 'ts',
  },
};

export default config;
