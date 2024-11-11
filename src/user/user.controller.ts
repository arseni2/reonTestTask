import { Controller, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../role/role-types';
import { Role } from '../auth/decorators/role.decorator';

@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Role(Roles.Admin)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
