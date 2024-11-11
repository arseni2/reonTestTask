import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { JoinTable } from 'typeorm';
import { StatusEnum } from '../status-type';
import { ProjectEntity } from '../../project/entities/project.entity';

@Entity('tasks')
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    deadline: Date;

    @ManyToMany(() => UserEntity)
    @JoinTable({
        name: 'users_responsibility_tasks',
        joinColumn: { name: 'taskId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
    })
    responsibilities: UserEntity[];

    @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.UnComplete })
    status: string;

    @Column()
    projectId: number;

    @ManyToOne(() => ProjectEntity, (project) => project.tasks)
    project: ProjectEntity;

    @Column({ default: false })
    isDelete: boolean;
}
