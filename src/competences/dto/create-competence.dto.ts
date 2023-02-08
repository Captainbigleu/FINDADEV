import { IsNotEmpty, IsString, IsInt} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompetenceDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()

    competence : string

    /* @ApiProperty()
    @IsNotEmpty()
    @IsInt()

    userId : number
 */
}
