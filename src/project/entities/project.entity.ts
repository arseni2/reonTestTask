import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { JoinTable } from 'typeorm';
import { TaskEntity } from '../../task/entities/task.entity';

@Entity('projects')
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    authorId: number;

    @Column({ default: false })
    isDelete: boolean;

    @ManyToOne(() => UserEntity, (user) => user.projects)
    author: UserEntity;

    @OneToMany(() => TaskEntity, (task) => task.project)
    tasks: TaskEntity[];

    @ManyToMany(() => UserEntity)
    @JoinTable({
        name: 'users_employing_projects',
        joinColumn: { name: 'projectId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
    })
    empls: UserEntity[];

    @CreateDateColumn()
    createdAt: Date;
}
