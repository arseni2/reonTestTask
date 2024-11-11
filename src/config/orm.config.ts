import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const ormConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
        return {
            type: 'postgres',
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: +process.env.DB_PORT,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: false,
            autoLoadEntities: true,
            logging: true,
            ssl: {
                rejectUnauthorized: false
            }
        };
    },
};
