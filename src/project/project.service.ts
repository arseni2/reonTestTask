import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { ProjectEntity } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(ProjectEntity)
        private readonly repo: Repository<ProjectEntity>,
        private readonly userService: UserService,
    ) {}

    async create(authorId: number, createProjectDto: CreateProjectDto) {
        const user = await this.userService.findById(authorId);
        if (!user) throw new BadRequestException('authorId не правильный');
        return this.repo.save({ ...createProjectDto, author: user });
    }

    async addEmplToProject(projectId: number, userId: number) {
        const user = await this.userService.findById(userId);
        const project = await this.repo.findOne({
            where: { id: projectId },
            relations: ['empls'],
        });

        if (!user || !project) {
            throw new BadRequestException('userId или projectId не правильные');
        }

        const existingEmp = project.empls.find((empl) => empl.id === user.id);
        if (existingEmp) {
            throw new BadRequestException('Пользователь уже добавлен в проект');
        }

        project.empls.push(user);
        return this.repo.save(project);
    }

    async removeEmplFromProject(projectId: number, userId: number) {
        const user = await this.userService.findById(userId);
        const project = await this.repo.findOne({
            where: { id: projectId },
            relations: ['empls'],
        });

        if (!user || !project) {
            throw new BadRequestException('userId или projectId не правильные');
        }

        const empIndex = project.empls.findIndex((empl) => empl.id === user.id);
        if (empIndex === -1) {
            throw new BadRequestException('Пользователь не найден в проекте');
        }

        project.empls.splice(empIndex, 1);
        return this.repo.save(project);
    }

    update(id: number, updateProjectDto: UpdateProjectDto) {
        return this.repo.update(id, updateProjectDto);
    }

    remove(id: number) {
        return this.repo.update(id, { isDelete: true });
    }
}
