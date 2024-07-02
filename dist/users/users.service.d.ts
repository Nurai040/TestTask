import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';
export declare class UsersService {
    private userRepository;
    private readonly usersQueue;
    private readonly cacheManager;
    constructor(userRepository: Repository<User>, usersQueue: Queue, cacheManager: Cache);
    findById(id: number): Promise<unknown>;
    create(user: Partial<User>): Promise<User>;
}
