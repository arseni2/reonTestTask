import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRoleTable1731006263295 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'roles',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'name',
                        type: 'enum',
                        enum: ['admin', 'employee'],
                        default: `'employee'`,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('roles');
    }
}
