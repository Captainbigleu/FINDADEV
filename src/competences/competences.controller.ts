import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, ParseIntPipe, HttpStatus, HttpException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CompetencesService } from './competences.service';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { DeleteCompetenceDto } from './dto/delete-competence.dto';
import { ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';

/**@class CompétencesController
 * 
 * * Méthode chargée d'invoquer le service compétences.
 * * Contrôle des requêtes entrantes , Vérification avant envoi en base de données, invoque le service.
 * * Création, Recherche via certains critères, Modifification des données , Suppression d'une compétence.
 */
@ApiTags("COMPETENCES")
@Controller('competences')
export class CompetencesController {
  constructor(private readonly competencesService: CompetencesService,
    private readonly usersService: UsersService) { }

  /** 
  * @method createComp:
  * * Contrôle des données sur la création  d'une compétence utilisateur.
  * * Envoi d'un message correspondant au résultat de la requête.
  */
  @ApiBody({ type: CreateCompetenceDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Création d'une compétence sur compte utilisateur" })
  async createComp(@Body() createCompetenceDto: CreateCompetenceDto, @Request() req) {

    if (await this.competencesService.findByCompetenceAndUser(req.user.userId, createCompetenceDto.competence)) {
      
      throw new HttpException("Cette compétence existe déjà.", HttpStatus.NOT_ACCEPTABLE);
    }

    const user = await this.usersService.findUserById(req.user.userId)
    return await this.competencesService.createComp(createCompetenceDto, user);
  }

  /* @ApiBody({ type: FindAllCompetenceDto })
  @Get('allcompetences')
  async findAllComp() {
    return await this.competencesService.findCompetences();
  }


  @ApiBody({ type: FindCompetenceDto })
  @Get(':id')
  findCompetenceById(@Param('id', ParseIntPipe) id: number) {
    return this.competencesService.findCompetenceById(id);
  } */


  /** 
  * @method updateComp:
  * * Contrôle des données sur la modification d'une compétence utilisateur.
  * * Envoi d'un message correspondant au résultat de la requête.
  */
  @ApiBody({ type: UpdateCompetenceDto })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: "Modification d'une compétence sur compte utilisateur" })
  async updateComp(@Param('id', ParseIntPipe) id: number, @Body() updateCompetenceDto: UpdateCompetenceDto, @Request() req) {
    const competence = await this.competencesService.findCompetenceById(id);
    if (!competence) {
      throw new HttpException("Compétence introuvable.", HttpStatus.NOT_FOUND);
    }
    if (competence.user.id !== req.user.userId) {
      throw new HttpException("Non autorisé.", HttpStatus.FORBIDDEN);
    }
    if (await this.competencesService.findByCompetenceAndUser(req.user.userId, updateCompetenceDto.competence)) {
      throw new HttpException("Compétence déjà existante.", HttpStatus.NOT_ACCEPTABLE);

    }
    return await this.competencesService.updateComp(id, updateCompetenceDto);
  }
  /** 
  * @method deleteComp:
  * * Contrôle des données sur la suppression d'une compétence utilisateur.
  * * Envoi d'un message correspondant au résultat de la requête.
  */
  @ApiBody({ type: DeleteCompetenceDto })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: "Suppression d'une compétence sur compte utilisateur" })
  async deleteComp(@Param('id', ParseIntPipe) id: number, @Request() req) {

    const competence = await this.competencesService.findCompetenceById(id);

    if (!competence) {

      throw new HttpException("Competence introuvable.", HttpStatus.NOT_FOUND);

    }
    if (req.user.userId !== competence.user.id) {

      throw new HttpException(" Non autorisé.", HttpStatus.FORBIDDEN);
    }
    if (await this.competencesService.deleteComp(id)) {

      throw new HttpException("Compétence supprimée.", HttpStatus.OK);
    }
    throw new HttpException("Suppression impossible.", HttpStatus.BAD_REQUEST);
  }


}
