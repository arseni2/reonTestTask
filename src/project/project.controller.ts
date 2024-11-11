import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Req,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Role } from '../auth/decorators/role.decorator';
import { Roles } from '../role/role-types';
import { AddEmplProjectDto } from './dto/add-empl-project.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IRequestWithUser } from '../types';

@ApiBearerAuth()
@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Role(Roles.Admin)
    @Post()
    create(
        @Req() req: IRequestWithUser,
        @Body() createProjectDto: CreateProjectDto,
    ) {
        return this.projectService.create(req.user.id, createProjectDto);
    }

    @Role(Roles.Admin)
    @Post('addEmpl')
    addEmpl(@Body() dto: AddEmplProjectDto) {
        return this.projectService.addEmplToProject(dto.projectId, dto.userId);
    }

    @UseGuards(AuthGuard)
    @Post('removeEmpl')
    removeEmpl(@Body() dto: AddEmplProjectDto) {
        return this.projectService.removeEmplFromProject(
            dto.projectId,
            dto.userId,
        );
    }

    @Role(Roles.Admin)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProjectDto: UpdateProjectDto,
    ) {
        return this.projectService.update(+id, updateProjectDto);
    }

    @Role(Roles.Admin)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.projectService.remove(+id);
    }
}
