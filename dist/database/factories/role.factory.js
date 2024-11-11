"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("typeorm-seeding");
const role_entity_1 = require("../../role/entities/role.entity");
(0, typeorm_seeding_1.define)(role_entity_1.RoleEntity, () => {
    const role = new role_entity_1.RoleEntity();
    return role;
});
//# sourceMappingURL=role.factory.js.map