import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    passwordConfirm: string;

    @IsString()
    @IsNotEmpty()
    adresse: string

    @IsString()
    @IsNotEmpty()
    zipCode: string

    @IsNotEmpty()
    @IsString()
    city: string



}
