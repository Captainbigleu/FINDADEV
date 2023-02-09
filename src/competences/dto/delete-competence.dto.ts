import { PartialType } from '@nestjs/swagger';
import { CreateCompetenceDto } from './create-competence.dto';

export class DeleteCompetenceDto extends PartialType(CreateCompetenceDto) {}
