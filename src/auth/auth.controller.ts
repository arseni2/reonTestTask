import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { RefreshAuthDto } from './dto/refresh-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    signin(@Body() createAuthDto: SigninAuthDto) {
        return this.authService.signin(createAuthDto);
    }

    @Post('signup')
    signup(@Body() createAuthDto: SignupAuthDto) {
        return this.authService.signup(createAuthDto);
    }

    @Post('refresh')
    refresh(@Body() dto: RefreshAuthDto) {
        return this.authService.refresh(dto.refreshToken);
    }
}
