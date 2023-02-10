import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateFriendshipDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    pseudo: string
}
