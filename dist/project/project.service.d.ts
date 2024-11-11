import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { ProjectEntity } from './entities/project.entity';
import { UserService } from '../user/user.service';
export declare class ProjectService {
    private readonly repo;
    private readonly userService;
    constructor(repo: Repository<ProjectEntity>, userService: UserService);
    create(authorId: number, createProjectDto: CreateProjectDto): Promise<{
        author: import("../user/entities/user.entity").UserEntity;
        title: string;
        description: string;
    } & ProjectEntity>;
    addEmplToProject(projectId: number, userId: number): Promise<ProjectEntity>;
    removeEmplFromProject(projectId: number, userId: number): Promise<ProjectEntity>;
    update(id: number, updateProjectDto: UpdateProjectDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
