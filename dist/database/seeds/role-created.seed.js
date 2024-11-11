"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const role_entity_1 = require("../../role/entities/role.entity");
const role_types_1 = require("../../role/role-types");
class CreateRole {
    async run(factory) {
        await factory(role_entity_1.RoleEntity)().create({ name: role_types_1.Roles.Empl });
        await factory(role_entity_1.RoleEntity)().create({ name: role_types_1.Roles.Admin });
    }
}
exports.default = CreateRole;
//# sourceMappingURL=role-created.seed.js.map