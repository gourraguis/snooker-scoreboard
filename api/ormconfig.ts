import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import * as dotenv from 'dotenv'
import { join } from 'path'

dotenv.config()

module.exports = {
  type: 'postgres',
  ssl: {
    rejectUnauthorized: false,
  },

  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,

  entities: [join(__dirname, '**', '*.entity.{ts,js}')],

  namingStrategy: new SnakeNamingStrategy(),

  migrationsTableName: 'migrations',

  migrations: ['src/migrations/*.ts'],

  cli: {
    migrationsDir: 'src/migrations',
  },
}
