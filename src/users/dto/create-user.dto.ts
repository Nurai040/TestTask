import { IsString, IsEmail, Length} from 'class-validator';

export class CreateUserDTO {
    @IsString()
    @Length(3,20)
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    @Length(5,25)
    readonly password: string;
}