import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Logger } from "@nestjs/common";

@Processor('users')
export class UserProcessor{

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    private readonly logger = new Logger(UserProcessor.name);

    @Process('updateStatus')
    async updateStatus(job: Job<{id: number}>){
        const {id} = job.data;
        try {
            const user = await this.userRepository.findOne({where: {id}});
            if(user){
                user.status = true;
                await this.userRepository.save(user);
                this.logger.log(`Updated status for user ${id}`);
            } else {
                this.logger.error(`User with id ${id} not found.`);
            }
        } catch (error) {
            this.logger.error(`Failed to update status for user ${id}: ${error.message}`);
            throw error; 
        }
    }
}