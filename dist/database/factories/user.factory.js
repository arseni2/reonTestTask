"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("typeorm-seeding");
const user_entity_1 = require("../../user/entities/user.entity");
(0, typeorm_seeding_1.define)(user_entity_1.UserEntity, () => {
    const user = new user_entity_1.UserEntity();
    return user;
});
//# sourceMappingURL=user.factory.js.map