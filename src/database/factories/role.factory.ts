import { define } from 'typeorm-seeding';
import { RoleEntity } from '../../role/entities/role.entity';

define(RoleEntity, () => {
    const role = new RoleEntity();
    return role;
});
