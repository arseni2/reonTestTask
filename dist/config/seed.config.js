"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: (0, path_1.join)(process.cwd(), '.env') });
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
exports.default = options;
//# sourceMappingURL=seed.config.js.map