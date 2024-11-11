import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleService } from '../role/role.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private readonly repo;
    private readonly roleService;
    constructor(repo: Repository<UserEntity>, roleService: RoleService);
    create(createUserDto: CreateUserDto): Promise<{
        role: import("../role/entities/role.entity").RoleEntity;
        name: string;
        email: string;
        password: string;
    } & UserEntity>;
    findById(id: number): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity>;
    hashPassword(pass: string): Promise<string>;
    update(userId: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
