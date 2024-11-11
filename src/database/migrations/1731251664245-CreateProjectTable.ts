import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProjectTable1731251664245 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
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
            }),
        );

        await queryRunner.query(`CREATE TABLE "users_employing_projects" (
            "projectId" int NOT NULL,
            "userId" int NOT NULL,
            PRIMARY KEY ("projectId", "userId"),
            FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE,
            FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_employing_projects');
        await queryRunner.dropTable('projects');
    }
}
