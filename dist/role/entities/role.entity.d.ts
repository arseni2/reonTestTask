import { UserEntity } from '../../user/entities/user.entity';
export declare class RoleEntity {
    id: number;
    name: string;
    user: UserEntity[];
}
