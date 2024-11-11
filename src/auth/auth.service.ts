import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUserJWT } from '../types';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async signup(dto: SignupAuthDto) {
        const user = await this.userService.findByEmail(dto.email);
        if (user) throw new BadRequestException('email уже используется');
        const newUser = await this.userService.create(dto);
        const { accessToken, refreshToken } = await this.generateToken(newUser);

        return {
            accessToken,
            refreshToken,
            userId: newUser.id,
            role: newUser.role.name,
        };
    }

    async signin(dto: SigninAuthDto) {
        const user = await this.userService.findByEmail(dto.email);
        if (!user)
            throw new UnauthorizedException('не правильный email или пароль');
        const isEqualPasswords = await bcrypt.compare(
            dto.password,
            user.password,
        );
        if (!isEqualPasswords)
            throw new UnauthorizedException('не правильный email или пароль');
        const { accessToken, refreshToken } = await this.generateToken(user);

        return {
            accessToken,
            refreshToken,
            userId: user.id,
            role: user.role.name,
        };
    }

    async refresh(refreshToken: string) {
        let userData: IUserJWT = null;
        try {
            userData = await this.jwtService.verifyAsync(refreshToken);
        } catch (e) {
            throw new UnauthorizedException('refreshToken не валидный');
        }
        const user = await this.userService.findById(userData.id);
        const { accessToken, refreshToken: newRefreshToken } =
            await this.generateToken(user);

        return {
            accessToken,
            refreshToken: newRefreshToken,
            userId: user.id,
            role: user.role.name,
        };
    }

    async generateToken(user: UserEntity) {
        const payload = { id: user.id, role: user.role.name };
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '60d',
        });
        return { accessToken, refreshToken };
    }
}
