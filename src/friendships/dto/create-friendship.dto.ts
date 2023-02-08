import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, IsBoolean } from "class-validator";




export class CreateFriendshipDto {

    @ApiProperty()
    @IsBoolean()
    accepted:boolean
}
