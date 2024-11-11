import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config/orm.config';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: join(process.cwd(), '.env'),
        }),
        TypeOrmModule.forRootAsync(ormConfig),
        AuthModule,
        RoleModule,
        UserModule,
        TaskModule,
        ProjectModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
