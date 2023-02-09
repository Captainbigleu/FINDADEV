import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, IsBoolean, isNotEmpty } from "class-validator";
import { User } from "src/users/entities/user.entity";




export class CreateFriendshipDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    pseudo: string
}
