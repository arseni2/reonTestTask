import { AuthService } from './auth.service';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { RefreshAuthDto } from './dto/refresh-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signin(createAuthDto: SigninAuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        userId: number;
        role: string;
    }>;
    signup(createAuthDto: SignupAuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        userId: number;
        role: string;
    }>;
    refresh(dto: RefreshAuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        userId: number;
        role: string;
    }>;
}
