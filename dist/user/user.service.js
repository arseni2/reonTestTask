"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const role_service_1 = require("../role/role.service");
const bcrypt = require("bcrypt");
const role_types_1 = require("../role/role-types");
let UserService = class UserService {
    constructor(repo, roleService) {
        this.repo = repo;
        this.roleService = roleService;
    }
    async create(createUserDto) {
        createUserDto.password = await this.hashPassword(createUserDto.password);
        const role = await this.roleService.findOneByName(role_types_1.Roles.Empl);
        return this.repo.save({ ...createUserDto, role });
    }
    async findById(id) {
        return this.repo.findOne({
            transaction: false,
            where: { id },
            relations: { role: true },
        });
    }
    async findByEmail(email) {
        const user = await this.repo.findOne({
            transaction: false,
            relations: {
                role: true,
            },
            where: {
                email,
            },
        });
        if (!user)
            return null;
        return user;
    }
    async hashPassword(pass) {
        return await bcrypt.hash(pass, 10);
    }
    update(userId, updateUserDto) {
        return this.repo.update(userId, updateUserDto);
    }
    remove(id) {
        return this.repo.update(id, { isDelete: true });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        role_service_1.RoleService])
], UserService);
//# sourceMappingURL=user.service.js.map