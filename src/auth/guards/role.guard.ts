import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/role/role-types';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        try {
            const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(
                'role',
                [context.getHandler(), context.getClass()],
            );
            if (!requiredRoles) {
                return true;
            }

            const bearerToken = request.headers.authorization;
            const bearer = bearerToken.split(' ')[0];
            const token = bearerToken.split(' ')[1];

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException('Вы не авторизованы!');
            }

            const user = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });
            request.user = user;

            if (!requiredRoles.some((role) => user.role?.includes(role)))
                throw new HttpException(
                    'У вас нет доступа!',
                    HttpStatus.FORBIDDEN,
                );
            return true;
        } catch (e) {
            throw new HttpException('У вас нет доступа!', HttpStatus.FORBIDDEN);
        }
    }
}
