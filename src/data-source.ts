import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/**/*.entity{.ts, .js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/*{.ts, .js}'],
  migrationsRun: false,
  logging: true,
  migrationsTableName: 'migrations',
  metadataTableName: 'typeorm_metadata',
});
