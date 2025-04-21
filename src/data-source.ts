import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [process.env.DB_ENTITIES!],
  migrations: [process.env.DB_MIGRATIONS!],
  synchronize: false,
  migrationsTableName: 'migrations',
  metadataTableName: 'typeorm_metadata',
});

export async function initializeDataSource() {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  return dataSource;
}

export default dataSource;
