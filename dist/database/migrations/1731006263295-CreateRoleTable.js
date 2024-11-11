"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoleTable1731006263295 = void 0;
const typeorm_1 = require("typeorm");
class CreateRoleTable1731006263295 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('roles');
    }
}
exports.CreateRoleTable1731006263295 = CreateRoleTable1731006263295;
//# sourceMappingURL=1731006263295-CreateRoleTable.js.map