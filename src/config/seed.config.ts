import { join } from 'path';
import { config } from 'dotenv';

config({ path: join(process.cwd(), '.env') });

const options = {
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: +process.env.DB_PORT,
    entities: ['dist/**/entities/*.entity.{js,ts}'],
    factories: ['dist/database/factories/**/*.js'],
    seeds: ['dist/database/seeds/**/*.js'],
    migrationsTableName: 'migrations',
    migrationsRun: false,
    synchronize: false,
    logging: true,
};

export default options;
