import { UserEntity } from '../../user/entities/user.entity';
import { TaskEntity } from '../../task/entities/task.entity';
export declare class ProjectEntity {
    id: number;
    title: string;
    description: string;
    authorId: number;
    isDelete: boolean;
    author: UserEntity;
    tasks: TaskEntity[];
    empls: UserEntity[];
    createdAt: Date;
}
