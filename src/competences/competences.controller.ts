import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CompetencesService } from './competences.service';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { FindAllCompetenceDto } from './dto/findAll-competence.dto';
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
  async create( @Body() createCompetenceDto: CreateCompetenceDto , @Request()req) {
   const user : User = await this.usersService.findUserById(req.user.userId);
   //console.log(user);
   return await this.competencesService.createComp(createCompetenceDto, user)
  }

  @Get('allcompetences')
  async findAllComp() {
    return await this.competencesService.findCompetences();
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competencesService.findOne(+id);
  }

  @ApiBody({ type: UpdateCompetenceDto })
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
