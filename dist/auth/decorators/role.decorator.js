"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = Role;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../guards/auth.guard");
const role_guard_1 = require("../guards/role.guard");
function Role(...role) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)('role', role), (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RoleGuard));
}
//# sourceMappingURL=role.decorator.js.map