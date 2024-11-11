"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = void 0;
const config_1 = require("@nestjs/config");
exports.ormConfig = {
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: async (config) => {
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
//# sourceMappingURL=orm.config.js.map