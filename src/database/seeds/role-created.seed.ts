import { Factory, Seeder } from 'typeorm-seeding';
import { RoleEntity } from '../../role/entities/role.entity';
import { Roles } from '../../role/role-types';

export default class CreateRole implements Seeder {
    public async run(factory: Factory): Promise<any> {
        await factory(RoleEntity)().create({ name: Roles.Empl });
        await factory(RoleEntity)().create({ name: Roles.Admin });
    }
}
