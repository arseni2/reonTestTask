"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskTable1731251672984 = void 0;
const typeorm_1 = require("typeorm");
class CreateTaskTable1731251672984 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'tasks',
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
                    name: 'deadline',
                    type: 'timestamp',
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['UnComplete', 'Complete'],
                    default: `'UnComplete'`,
                },
                {
                    name: 'projectId',
                    type: 'int',
                },
                {
                    name: 'isDelete',
                    type: 'boolean',
                    default: false,
                },
            ],
        }));
        await queryRunner.createForeignKey('tasks', new typeorm_1.TableForeignKey({
            columnNames: ['projectId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'projects',
            onDelete: 'CASCADE',
        }));
        await queryRunner.query(`CREATE TABLE "users_responsibility_tasks" (
            "taskId" int NOT NULL,
            "userId" int NOT NULL,
            PRIMARY KEY ("taskId", "userId"),
            FOREIGN KEY ("taskId") REFERENCES "tasks" ("id") ON DELETE CASCADE,
            FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE
        )`);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users_responsibility_tasks');
        await queryRunner.dropForeignKey('tasks', 'FK_projectId');
        await queryRunner.dropTable('tasks');
    }
}
exports.CreateTaskTable1731251672984 = CreateTaskTable1731251672984;
//# sourceMappingURL=1731251672984-CreateTaskTable.js.map