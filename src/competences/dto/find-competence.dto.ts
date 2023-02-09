import { IsNotEmpty, IsString} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class FindCompetenceDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()

    competence : string
}
