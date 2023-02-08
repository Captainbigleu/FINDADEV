import { IsNotEmpty, IsString} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class FindAllCompetenceDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()

    competence : string

  

}
