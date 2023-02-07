import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty} from "class-validator";


export class CreateLanguageDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    programmingLanguage : string;
}
