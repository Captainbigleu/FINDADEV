import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CompetencesService } from './competences.service';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';


@Controller('competences')
export class CompetencesController {
  constructor(private readonly competencesService: CompetencesService) {}

  //@ApiBody({type :createCompetenceDto})
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCompetenceDto: CreateCompetenceDto) {
    return this.competencesService.create(createCompetenceDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.competencesService.findAll();
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competencesService.findOne(+id);
  }


  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompetenceDto: UpdateCompetenceDto) {
    return this.competencesService.update(+id, updateCompetenceDto);
  }

  
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.competencesService.remove(+id);
  }
}
