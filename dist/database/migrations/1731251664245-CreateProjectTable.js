"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjectTable1731251664245 = void 0;
const typeorm_1 = require("typeorm");
class CreateProjectTable1731251664245 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'projects',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'text',
                },
                {
                    name: 'authorId',
                    type: 'int',
                },
                {
                    name: 'isDelete',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }));
        await queryRunner.query(`CREATE TABLE "users_employing_projects" (
            "projectId" int NOT NULL,
            "userId" int NOT NULL,
            PRIMARY KEY ("projectId", "userId"),
            FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE,
            FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE
        )`);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users_employing_projects');
        await queryRunner.dropTable('projects');
    }
}
exports.CreateProjectTable1731251664245 = CreateProjectTable1731251664245;
//# sourceMappingURL=1731251664245-CreateProjectTable.js.map