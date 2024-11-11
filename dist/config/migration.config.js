"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const path_1 = require("path");
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
(0, dotenv_1.config)({ path: (0, path_1.join)(process.cwd(), '.env') });
exports.options = {
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: +process.env.DB_PORT,
    entities: [],
    migrations: [(0, path_1.join)(process.cwd(), 'src', 'database', 'migrations', '*.ts')],
    migrationsTableName: 'migrations',
    synchronize: true,
    logging: true,
    ssl: {
        rejectUnauthorized: false
    }
};
const dataSource = new typeorm_1.DataSource(exports.options);
exports.default = dataSource;
//# sourceMappingURL=migration.config.js.map