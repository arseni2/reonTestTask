import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [ProjectController],
    providers: [ProjectService],
    imports: [TypeOrmModule.forFeature([ProjectEntity]), UserModule, JwtModule],
})
export class ProjectModule {}
