import { UserEntity } from '../../user/entities/user.entity';
import { ProjectEntity } from '../../project/entities/project.entity';
export declare class TaskEntity {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    responsibilities: UserEntity[];
    status: string;
    projectId: number;
    project: ProjectEntity;
    isDelete: boolean;
}
