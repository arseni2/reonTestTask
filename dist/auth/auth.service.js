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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async signup(dto) {
        const user = await this.userService.findByEmail(dto.email);
        if (user)
            throw new common_1.BadRequestException('email уже используется');
        const newUser = await this.userService.create(dto);
        const { accessToken, refreshToken } = await this.generateToken(newUser);
        return {
            accessToken,
            refreshToken,
            userId: newUser.id,
            role: newUser.role.name,
        };
    }
    async signin(dto) {
        const user = await this.userService.findByEmail(dto.email);
        if (!user)
            throw new common_1.UnauthorizedException('не правильный email или пароль');
        const isEqualPasswords = await bcrypt.compare(dto.password, user.password);
        if (!isEqualPasswords)
            throw new common_1.UnauthorizedException('не правильный email или пароль');
        const { accessToken, refreshToken } = await this.generateToken(user);
        return {
            accessToken,
            refreshToken,
            userId: user.id,
            role: user.role.name,
        };
    }
    async refresh(refreshToken) {
        let userData = null;
        try {
            userData = await this.jwtService.verifyAsync(refreshToken);
        }
        catch (e) {
            throw new common_1.UnauthorizedException('refreshToken не валидный');
        }
        const user = await this.userService.findById(userData.id);
        const { accessToken, refreshToken: newRefreshToken } = await this.generateToken(user);
        return {
            accessToken,
            refreshToken: newRefreshToken,
            userId: user.id,
            role: user.role.name,
        };
    }
    async generateToken(user) {
        const payload = { id: user.id, role: user.role.name };
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '60d',
        });
        return { accessToken, refreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map