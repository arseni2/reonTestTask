import { join } from 'path';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config({ path: join(process.cwd(), '.env') });

export const options: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: +process.env.DB_PORT,
    entities: [],
    migrations: [join(process.cwd(), 'src', 'database', 'migrations', '*.ts')],
    migrationsTableName: 'migrations',
    synchronize: true,
    logging: true,
};

const dataSource = new DataSource(options);

export default dataSource;
