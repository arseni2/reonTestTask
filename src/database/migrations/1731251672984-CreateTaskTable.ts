import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateTaskTable1731251672984 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
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
            }),
        );

        await queryRunner.createForeignKey(
            'tasks',
            new TableForeignKey({
                columnNames: ['projectId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'projects',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.query(`CREATE TABLE "users_responsibility_tasks" (
            "taskId" int NOT NULL,
            "userId" int NOT NULL,
            PRIMARY KEY ("taskId", "userId"),
            FOREIGN KEY ("taskId") REFERENCES "tasks" ("id") ON DELETE CASCADE,
            FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_responsibility_tasks');
        await queryRunner.dropForeignKey('tasks', 'FK_projectId');
        await queryRunner.dropTable('tasks');
    }
}
