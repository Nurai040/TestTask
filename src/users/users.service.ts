import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Queue } from 'bull';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, 
    @Inject('BullQueue_users') private readonly usersQueue: Queue, 
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache){}

    async findById(id:number){

        const cachedData = await this.cacheManager.get(`userKey:${id}`);

        if(cachedData){
            return cachedData;
        }

        const existingUser = await this.userRepository.findOne({where: {id}});

        if(!existingUser){
            throw new BadRequestException({ statusCode: 400, message: 'ERR_USER_NOT_FOUND' });
        }

        await this.cacheManager.set(`userKey:${id}`, {
            statusCode: 200,
            message: 'SUCCESS',
            user: existingUser,
        })

        return {
            statusCode: 200,
            message: 'SUCCESS',
            user: existingUser,
        };
    }

    async create(user: Partial<User>): Promise<User>{
        const {email} = user;
        const existingUser = await this.userRepository.findOne({where: {email}});
        if(existingUser){
            throw new BadRequestException({ statusCode: 400, message: 'ERR_USER_EMAIL_EXISTS' });
        }

        const newUser = this.userRepository.create(user);
        const savedUser = await this.userRepository.save(newUser);
        const {id} = savedUser;
        await this.usersQueue.add('updateStatus', {id}, {delay: 10000})
        return savedUser;
    }
}
