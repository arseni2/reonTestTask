import { UserEntity } from '../../user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../role-types';

@Entity('roles')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: Roles, default: Roles.Empl })
    name: string;

    @OneToMany(() => UserEntity, (user) => user.role)
    user: UserEntity[];
}
