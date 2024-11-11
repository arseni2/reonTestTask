import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        try {
            const bearerToken = request.headers.authorization;
            const bearer = bearerToken.split(' ')[0];
            const token = bearerToken.split(' ')[1];

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException('Вы не авторизованы!');
            }

            const user = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });
            request.user = user;
        } catch (e) {
            throw new UnauthorizedException('Вы не авторизованы!');
        }

        return true;
    }
}
