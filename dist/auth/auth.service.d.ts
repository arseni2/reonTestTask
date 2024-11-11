import { SigninAuthDto } from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signup(dto: SignupAuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        userId: number;
        role: string;
    }>;
    signin(dto: SigninAuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        userId: number;
        role: string;
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        userId: number;
        role: string;
    }>;
    generateToken(user: UserEntity): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
