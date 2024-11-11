import { Factory, Seeder } from 'typeorm-seeding';
import { UserEntity } from '../../user/entities/user.entity';
import * as bcrypt from 'bcrypt';

export default class CreateUser implements Seeder {
    public async run(factory: Factory): Promise<any> {
        await factory(UserEntity)().create({
            name: 'user',
            password: await bcrypt.hash('user', 10),
            roleId: 1,
            email: 'user@gmail.com',
        });
        await factory(UserEntity)().create({
            name: 'admin',
            password: await bcrypt.hash('admin', 10),
            roleId: 2,
            email: 'admin@gmail.com',
        });
    }
}
