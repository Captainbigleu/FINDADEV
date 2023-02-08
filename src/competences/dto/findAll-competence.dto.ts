import { IsNotEmpty, IsString, IsInt} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class FindAllCompetenceDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()

    competence : string

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()

    userId : number

}
