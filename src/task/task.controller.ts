import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Roles } from '../role/role-types';
import { Role } from '../auth/decorators/role.decorator';
import { IRequestWithUser } from '../types';
import { AddResponsibleDto } from './dto/add-responsible.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ChangeDeadlineDto } from './dto/change-deadline.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Role(Roles.Admin)
    @Post()
    create(@Req() req: IRequestWithUser, @Body() createTaskDto: CreateTaskDto) {
        return this.taskService.create(req.user.id, createTaskDto);
    }

    @Role(Roles.Admin)
    @Post(':id')
    addResponsible(@Body() dto: AddResponsibleDto, @Param('id') id: string) {
        return this.taskService.addResponsible(+id, dto.userId);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    setStatus(@Param('id') id: string) {
        return this.taskService.setStatus(+id);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    changeDeadline(@Param('id') id: string, dto: ChangeDeadlineDto) {
        return this.taskService.changeDeadline(+id, dto.deadline);
    }

    @Role(Roles.Admin)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(+id, updateTaskDto);
    }

    @Role(Roles.Admin)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.taskService.remove(+id);
    }
}
