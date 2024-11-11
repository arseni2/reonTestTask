import { Factory, Seeder } from 'typeorm-seeding';
export default class CreateUser implements Seeder {
    run(factory: Factory): Promise<any>;
}
