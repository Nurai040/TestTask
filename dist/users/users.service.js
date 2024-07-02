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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const cache_manager_1 = require("@nestjs/cache-manager");
let UsersService = class UsersService {
    constructor(userRepository, usersQueue, cacheManager) {
        this.userRepository = userRepository;
        this.usersQueue = usersQueue;
        this.cacheManager = cacheManager;
    }
    async findById(id) {
        const cachedData = await this.cacheManager.get(`userKey:${id}`);
        if (cachedData) {
            return cachedData;
        }
        const existingUser = await this.userRepository.findOne({ where: { id } });
        if (!existingUser) {
            throw new common_1.BadRequestException({ statusCode: 400, message: 'ERR_USER_NOT_FOUND' });
        }
        await this.cacheManager.set(`userKey:${id}`, {
            statusCode: 200,
            message: 'SUCCESS',
            user: existingUser,
        });
        return {
            statusCode: 200,
            message: 'SUCCESS',
            user: existingUser,
        };
    }
    async create(user) {
        const { email } = user;
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new common_1.BadRequestException({ statusCode: 400, message: 'ERR_USER_EMAIL_EXISTS' });
        }
        const newUser = this.userRepository.create(user);
        const savedUser = await this.userRepository.save(newUser);
        const { id } = savedUser;
        await this.usersQueue.add('updateStatus', { id }, { delay: 10000 });
        return savedUser;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, common_1.Inject)('BullQueue_users')),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object, Object])
], UsersService);
//# sourceMappingURL=users.service.js.map