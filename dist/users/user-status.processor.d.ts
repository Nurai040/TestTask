import { Job } from "bull";
import { User } from "./user.entity";
import { Repository } from "typeorm";
export declare class UserProcessor {
    private userRepository;
    constructor(userRepository: Repository<User>);
    private readonly logger;
    updateStatus(job: Job<{
        id: number;
    }>): Promise<void>;
}
