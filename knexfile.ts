import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: 'mysql://root:mhkhan@localhost:3306/message_board'
  },
  production: {
    client: 'mysql2',
    connection: process.env.DATABASE_URL
  }
};

export default config;
