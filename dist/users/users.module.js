"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const bull_1 = require("@nestjs/bull");
const user_status_processor_1 = require("./user-status.processor");
const cache_manager_1 = require("@nestjs/cache-manager");
const redisStore = require("cache-manager-redis-store");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            bull_1.BullModule.registerQueue({
                name: 'users'
            }),
            cache_manager_1.CacheModule.register({
                max: 100,
                ttl: 1800,
                isGlobal: true,
                store: redisStore,
                host: 'localhost',
                port: 6379
            })
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, user_status_processor_1.UserProcessor]
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map