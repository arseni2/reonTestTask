import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { UserService } from '../user/user.service';
export declare class TaskService {
    private readonly repo;
    private readonly userService;
    constructor(repo: Repository<TaskEntity>, userService: UserService);
    create(authorId: number, createTaskDto: CreateTaskDto): Promise<{
        responsibilities: {
            id: number;
        }[];
        title: string;
        description: string;
        deadline: Date;
        projectId: number;
    } & TaskEntity>;
    addResponsible(taskId: number, userId: number): Promise<TaskEntity>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
    setStatus(id: number): Promise<import("typeorm").UpdateResult>;
    changeDeadline(id: number, deadline: Date): Promise<import("typeorm").UpdateResult>;
}
