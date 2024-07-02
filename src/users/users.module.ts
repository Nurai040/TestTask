import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BullModule } from '@nestjs/bull';
import { UserProcessor } from './user-status.processor';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore  from 'cache-manager-redis-store';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        BullModule.registerQueue({
            name: 'users'
        }),
        CacheModule.register({
            max: 100,
            ttl: 1800,
            isGlobal: true,
            store: redisStore,
            host: 'localhost',
            port: 6379
        })
    ],
    controllers: [UsersController],
    providers: [UsersService, UserProcessor]
})
export class UsersModule {}
