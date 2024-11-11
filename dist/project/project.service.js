"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const project_entity_1 = require("./entities/project.entity");
const typeorm_2 = require("@nestjs/typeorm");
const user_service_1 = require("../user/user.service");
let ProjectService = class ProjectService {
    constructor(repo, userService) {
        this.repo = repo;
        this.userService = userService;
    }
    async create(authorId, createProjectDto) {
        const user = await this.userService.findById(authorId);
        if (!user)
            throw new common_1.BadRequestException('authorId не правильный');
        return this.repo.save({ ...createProjectDto, author: user });
    }
    async addEmplToProject(projectId, userId) {
        const user = await this.userService.findById(userId);
        const project = await this.repo.findOne({
            where: { id: projectId },
            relations: ['empls'],
        });
        if (!user || !project) {
            throw new common_1.BadRequestException('userId или projectId не правильные');
        }
        const existingEmp = project.empls.find((empl) => empl.id === user.id);
        if (existingEmp) {
            throw new common_1.BadRequestException('Пользователь уже добавлен в проект');
        }
        project.empls.push(user);
        return this.repo.save(project);
    }
    async removeEmplFromProject(projectId, userId) {
        const user = await this.userService.findById(userId);
        const project = await this.repo.findOne({
            where: { id: projectId },
            relations: ['empls'],
        });
        if (!user || !project) {
            throw new common_1.BadRequestException('userId или projectId не правильные');
        }
        const empIndex = project.empls.findIndex((empl) => empl.id === user.id);
        if (empIndex === -1) {
            throw new common_1.BadRequestException('Пользователь не найден в проекте');
        }
        project.empls.splice(empIndex, 1);
        return this.repo.save(project);
    }
    update(id, updateProjectDto) {
        return this.repo.update(id, updateProjectDto);
    }
    remove(id) {
        return this.repo.update(id, { isDelete: true });
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(project_entity_1.ProjectEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        user_service_1.UserService])
], ProjectService);
//# sourceMappingURL=project.service.js.map