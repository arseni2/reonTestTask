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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
let RoleGuard = class RoleGuard {
    constructor(jwtService, reflector) {
        this.jwtService = jwtService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        try {
            const requiredRoles = this.reflector.getAllAndOverride('role', [context.getHandler(), context.getClass()]);
            if (!requiredRoles) {
                return true;
            }
            const bearerToken = request.headers.authorization;
            const bearer = bearerToken.split(' ')[0];
            const token = bearerToken.split(' ')[1];
            if (bearer !== 'Bearer' || !token) {
                throw new common_1.UnauthorizedException('Вы не авторизованы!');
            }
            const user = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });
            request.user = user;
            if (!requiredRoles.some((role) => user.role?.includes(role)))
                throw new common_1.HttpException('У вас нет доступа!', common_1.HttpStatus.FORBIDDEN);
            return true;
        }
        catch (e) {
            throw new common_1.HttpException('У вас нет доступа!', common_1.HttpStatus.FORBIDDEN);
        }
    }
};
exports.RoleGuard = RoleGuard;
exports.RoleGuard = RoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        core_1.Reflector])
], RoleGuard);
//# sourceMappingURL=role.guard.js.map