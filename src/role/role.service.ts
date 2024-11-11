import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly repo: Repository<RoleEntity>,
    ) {}

    findAll() {
        return this.repo.find();
    }

    findOneByName(role: string) {
        return this.repo.findOne({ transaction: false, where: { name: role } });
    }
}
