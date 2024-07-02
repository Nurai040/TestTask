import { Controller, Get, Post, Param, Body, UseInterceptors} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get(':id')
    async getUserById(@Param('id') id: number){
        try {
            const userData = await this.usersService.findById(id);
            return userData;
        } catch (error) {
            throw error;
        }
    }

    @Post()
    async createUser(@Body() createUser: CreateUserDTO): Promise<User>{
        try {
            const newUser = await this.usersService.create(createUser); 
            return newUser;
        } catch (error) {
            throw error;
        }
    }
}
