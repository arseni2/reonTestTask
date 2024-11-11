import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { StatusEnum } from './status-type';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly repo: Repository<TaskEntity>,
        private readonly userService: UserService,
    ) {}

    create(authorId: number, createTaskDto: CreateTaskDto) {
        return this.repo.save({
            ...createTaskDto,
            responsibilities: [{ id: authorId }],
        });
    }

    async addResponsible(taskId: number, userId: number) {
        const user = await this.userService.findById(userId);
        if (!user) throw new BadRequestException('user не найден');
        const task = await this.repo.findOne({
            transaction: false,
            where: { id: taskId },
            relations: ['responsibilities'],
        });
        if (!task) throw new BadRequestException('task не найден');
        const existingResponsible = task.responsibilities.find(
            (res) => res.id === user.id,
        );
        if (existingResponsible) {
            throw new BadRequestException(
                'Пользователь уже назначен ответственным за задачу',
            );
        }
        task.responsibilities.push(user);
        return this.repo.save(task);
    }

    update(id: number, updateTaskDto: UpdateTaskDto) {
        return this.repo.update(id, updateTaskDto);
    }

    remove(id: number) {
        return this.repo.update(id, { isDelete: true });
    }

    setStatus(id: number) {
        return this.repo.update(id, { status: StatusEnum.Complete });
    }

    changeDeadline(id: number, deadline: Date) {
        return this.repo.update(id, { deadline });
    }
}
