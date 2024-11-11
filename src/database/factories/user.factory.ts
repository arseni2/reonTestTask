import { define } from 'typeorm-seeding';
import { UserEntity } from '../../user/entities/user.entity';

define(UserEntity, () => {
    const user = new UserEntity();
    return user;
});
