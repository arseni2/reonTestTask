import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from '../role/role.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../role/role-types';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repo: Repository<UserEntity>,
        private readonly roleService: RoleService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        createUserDto.password = await this.hashPassword(
            createUserDto.password,
        );
        const role = await this.roleService.findOneByName(Roles.Empl);
        return this.repo.save({ ...createUserDto, role });
    }

    async findById(id: number) {
        return this.repo.findOne({
            transaction: false,
            where: { id },
            relations: { role: true },
        });
    }

    async findByEmail(email: string) {
        const user = await this.repo.findOne({
            transaction: false,
            relations: {
                role: true,
            },
            where: {
                email,
            },
        });
        if (!user) return null;
        return user;
    }

    async hashPassword(pass: string): Promise<string> {
        return await bcrypt.hash(pass, 10);
    }

    update(userId: number, updateUserDto: UpdateUserDto) {
        return this.repo.update(userId, updateUserDto);
    }

    remove(id: number) {
        return this.repo.update(id, { isDelete: true });
    }
}
