import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AddEmplProjectDto } from './dto/add-empl-project.dto';
import { IRequestWithUser } from '../types';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(req: IRequestWithUser, createProjectDto: CreateProjectDto): Promise<{
        author: import("../user/entities/user.entity").UserEntity;
        title: string;
        description: string;
    } & import("./entities/project.entity").ProjectEntity>;
    addEmpl(dto: AddEmplProjectDto): Promise<import("./entities/project.entity").ProjectEntity>;
    removeEmpl(dto: AddEmplProjectDto): Promise<import("./entities/project.entity").ProjectEntity>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
