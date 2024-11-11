import { RoleEntity } from '../../role/entities/role.entity';
import { ProjectEntity } from '../../project/entities/project.entity';
export declare class UserEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    roleId: number;
    role: RoleEntity;
    projects: ProjectEntity[];
    isDelete: boolean;
}
