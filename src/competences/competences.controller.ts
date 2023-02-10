import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, ParseIntPipe, HttpStatus, HttpException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CompetencesService } from './competences.service';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { FindAllCompetenceDto } from './dto/findAll-competence.dto';
import { FindCompetenceDto } from './dto/find-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { DeleteCompetenceDto } from './dto/delete-competence.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';

@ApiTags("COMPETENCES")
@Controller('competences')
export class CompetencesController {
  constructor(private readonly competencesService: CompetencesService,
    private readonly usersService: UsersService) { }


  @ApiBody({ type: CreateCompetenceDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createComp(@Body() createCompetenceDto: CreateCompetenceDto, @Request() req) {
    const user = await this.usersService.findUserById(req.user.userId);
    return await this.competencesService.createComp(createCompetenceDto, user);
  }


  @ApiBody({ type: FindAllCompetenceDto })
  @Get('allcompetences')
  async findAllComp() {
    return await this.competencesService.findCompetences();
  }


  @ApiBody({ type: FindCompetenceDto })
  @Get(':id')
  findCompetenceById(@Param('id', ParseIntPipe) id: number) {
    return this.competencesService.findCompetenceById(id);
  }


  @ApiBody({ type: UpdateCompetenceDto })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateComp(@Param('id', ParseIntPipe) id: number, @Body() updateCompetenceDto: UpdateCompetenceDto) {
    if (await this.competencesService.findCompetenceById(id)) {
      return await this.competencesService.updateComp(id, updateCompetenceDto);
    }
    throw new HttpException("Competence introuvable", HttpStatus.NOT_FOUND);
  }


  @ApiBody({ type: DeleteCompetenceDto })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    if (await this.competencesService.findCompetenceById(id)) {
      if (await this.competencesService.deleteComp(id)) {
        throw new HttpException("Compétence supprimée", HttpStatus.ACCEPTED);
      }
      throw new HttpException("suppression impossible", HttpStatus.BAD_REQUEST);
    }
    throw new HttpException("Competence introuvable", HttpStatus.NOT_FOUND);
  }

}
