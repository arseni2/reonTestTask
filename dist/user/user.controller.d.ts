import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
