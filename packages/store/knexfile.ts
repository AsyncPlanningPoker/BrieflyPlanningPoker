import * as dotenv from 'dotenv';
const env = process.env.NODE_ENV ? '.test' : ''

dotenv.config({ path: `../../.env${env}`});

const config = {
  client: 'pg',
  connection: {
   user: 'postgres',
   password: 'postgres',
   host: 'localhost',
   port: 5432,
    ssl: process.env.NODE_ENV === 'production' ? {
      rejectUnauthorized: false
    } : false
  },
  pool: {
    min: 2,
    max: 10,
  },
  seeds: {
    directory: './db/seeds/',
    extension: 'ts',
  },
  migrations: {
    directory: './db/migrations/',
    extension: 'ts',
  },
};

export default config;
