import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUserById(id: number): Promise<unknown>;
    createUser(createUser: CreateUserDTO): Promise<User>;
}
