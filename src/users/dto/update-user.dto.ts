import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsNotEmpty, IsEmail } from "class-validator";


export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    pseudo: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    adresse: string;

    @ApiProperty()
    @IsString()
    presentation: string




}

