import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [TaskController],
    providers: [TaskService],
    imports: [TypeOrmModule.forFeature([TaskEntity]), UserModule, JwtModule],
})
export class TaskModule {}
