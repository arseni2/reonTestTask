import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';
export declare class RoleService {
    private readonly repo;
    constructor(repo: Repository<RoleEntity>);
    findAll(): Promise<RoleEntity[]>;
    findOneByName(role: string): Promise<RoleEntity>;
}
