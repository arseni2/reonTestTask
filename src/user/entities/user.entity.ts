import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from '../../role/entities/role.entity';
import { ProjectEntity } from '../../project/entities/project.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    roleId: number;

    @ManyToOne(() => RoleEntity, (role) => role.user, { onDelete: 'RESTRICT' })
    role: RoleEntity;

    @OneToMany(() => ProjectEntity, (project) => project.author)
    projects: ProjectEntity[];

    @Column({ default: false })
    isDelete: boolean;
}
