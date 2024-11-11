"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../../user/entities/user.entity");
const bcrypt = require("bcrypt");
class CreateUser {
    async run(factory) {
        await factory(user_entity_1.UserEntity)().create({
            name: 'user',
            password: await bcrypt.hash('user', 10),
            roleId: 1,
            email: 'user@gmail.com',
        });
        await factory(user_entity_1.UserEntity)().create({
            name: 'admin',
            password: await bcrypt.hash('admin', 10),
            roleId: 2,
            email: 'admin@gmail.com',
        });
    }
}
exports.default = CreateUser;
//# sourceMappingURL=user-create.seed.js.map