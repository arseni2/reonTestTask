import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleModule } from '../role/role.module';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [TypeOrmModule.forFeature([UserEntity]), RoleModule, JwtModule],
    exports: [UserService],
})
export class UserModule {}
