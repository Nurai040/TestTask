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
var UserProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
let UserProcessor = UserProcessor_1 = class UserProcessor {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(UserProcessor_1.name);
    }
    async updateStatus(job) {
        const { id } = job.data;
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            if (user) {
                user.status = true;
                await this.userRepository.save(user);
                this.logger.log(`Updated status for user ${id}`);
            }
            else {
                this.logger.error(`User with id ${id} not found.`);
            }
        }
        catch (error) {
            this.logger.error(`Failed to update status for user ${id}: ${error.message}`);
            throw error;
        }
    }
};
exports.UserProcessor = UserProcessor;
__decorate([
    (0, bull_1.Process)('updateStatus'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserProcessor.prototype, "updateStatus", null);
exports.UserProcessor = UserProcessor = UserProcessor_1 = __decorate([
    (0, bull_1.Processor)('users'),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserProcessor);
//# sourceMappingURL=user-status.processor.js.map