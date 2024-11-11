import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateUserTable1731006516467 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'roleId',
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
            'users',
            new TableForeignKey({
                columnNames: ['roleId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'roles',
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('users');
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('roleId') !== -1,
        );
        await queryRunner.dropForeignKey('users', foreignKey);
        await queryRunner.dropTable('users');
    }
}
