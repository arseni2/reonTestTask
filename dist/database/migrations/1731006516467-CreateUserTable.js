"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTable1731006516467 = void 0;
const typeorm_1 = require("typeorm");
class CreateUserTable1731006516467 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
        await queryRunner.createForeignKey('users', new typeorm_1.TableForeignKey({
            columnNames: ['roleId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'roles',
            onDelete: 'SET NULL',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('users');
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('roleId') !== -1);
        await queryRunner.dropForeignKey('users', foreignKey);
        await queryRunner.dropTable('users');
    }
}
exports.CreateUserTable1731006516467 = CreateUserTable1731006516467;
//# sourceMappingURL=1731006516467-CreateUserTable.js.map