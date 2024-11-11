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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
const typeorm_2 = require("@nestjs/typeorm");
const user_service_1 = require("../user/user.service");
const status_type_1 = require("./status-type");
let TaskService = class TaskService {
    constructor(repo, userService) {
        this.repo = repo;
        this.userService = userService;
    }
    create(authorId, createTaskDto) {
        return this.repo.save({
            ...createTaskDto,
            responsibilities: [{ id: authorId }],
        });
    }
    async addResponsible(taskId, userId) {
        const user = await this.userService.findById(userId);
        if (!user)
            throw new common_1.BadRequestException('user не найден');
        const task = await this.repo.findOne({
            transaction: false,
            where: { id: taskId },
            relations: ['responsibilities'],
        });
        if (!task)
            throw new common_1.BadRequestException('task не найден');
        const existingResponsible = task.responsibilities.find((res) => res.id === user.id);
        if (existingResponsible) {
            throw new common_1.BadRequestException('Пользователь уже назначен ответственным за задачу');
        }
        task.responsibilities.push(user);
        return this.repo.save(task);
    }
    update(id, updateTaskDto) {
        return this.repo.update(id, updateTaskDto);
    }
    remove(id) {
        return this.repo.update(id, { isDelete: true });
    }
    setStatus(id) {
        return this.repo.update(id, { status: status_type_1.StatusEnum.Complete });
    }
    changeDeadline(id, deadline) {
        return this.repo.update(id, { deadline });
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(task_entity_1.TaskEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        user_service_1.UserService])
], TaskService);
//# sourceMappingURL=task.service.js.map