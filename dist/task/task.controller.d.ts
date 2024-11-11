import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { IRequestWithUser } from '../types';
import { AddResponsibleDto } from './dto/add-responsible.dto';
import { ChangeDeadlineDto } from './dto/change-deadline.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(req: IRequestWithUser, createTaskDto: CreateTaskDto): Promise<{
        responsibilities: {
            id: number;
        }[];
        title: string;
        description: string;
        deadline: Date;
        projectId: number;
    } & import("./entities/task.entity").TaskEntity>;
    addResponsible(dto: AddResponsibleDto, id: string): Promise<import("./entities/task.entity").TaskEntity>;
    setStatus(id: string): Promise<import("typeorm").UpdateResult>;
    changeDeadline(id: string, dto: ChangeDeadlineDto): Promise<import("typeorm").UpdateResult>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
