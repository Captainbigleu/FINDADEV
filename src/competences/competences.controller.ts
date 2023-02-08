import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CompetencesService } from './competences.service';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { FindAllCompetenceDto } from './dto/findAll-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';


@ApiTags()
@Controller('competences')
export class CompetencesController {
  constructor(private readonly competencesService: CompetencesService) { }


  @ApiBody({ type: CreateCompetenceDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCompetenceDto: CreateCompetenceDto) {
    return this.competencesService.createComp(createCompetenceDto);
  }

  @Get('getAll')
  findAll(@Body() findAllCompetenceDto: FindAllCompetenceDto) {
    return this.competencesService.findAllComp(findAllCompetenceDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompetenceDto: UpdateCompetenceDto) {
    return this.competencesService.update(+id, updateCompetenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.competencesService.remove(+id);
  }
}
