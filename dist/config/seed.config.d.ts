declare const options: {
    type: string;
    host: string;
    username: string;
    password: string;
    database: string;
    port: number;
    entities: string[];
    factories: string[];
    seeds: string[];
    migrationsTableName: string;
    migrationsRun: boolean;
    synchronize: boolean;
    logging: boolean;
};
export default options;
