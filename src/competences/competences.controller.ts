import { Controller, Get, Post, Body, Patch, Param, Delete,Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CompetencesService } from './competences.service';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';


@ApiTags()
@Controller('competences')
export class CompetencesController {
  constructor(private readonly competencesService: CompetencesService,
              private readonly usersService: UsersService) { }
  

  @ApiBody({ type: CreateCompetenceDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createComp( @Body() createCompetenceDto: CreateCompetenceDto , @Request()req) {
   const user = await this.usersService.findUserById(req.user.userId)
    return this.competencesService.createComp(createCompetenceDto, user);
  }

  @Get()
  findAllComp() {
    return this.competencesService.findAllComp();
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
