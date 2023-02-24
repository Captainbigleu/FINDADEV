import { Controller, Post, Body,Get, Patch, Param, Delete, Request, UseGuards, ParseIntPipe, HttpStatus, HttpException } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { ApiTags, ApiOperation } from "@nestjs/swagger";

/**@class LanguagesController
 * 
 * * Méthode chargée d'invoquer le service Language.
 * * Contrôle des requêtes entrantes , Vérification avant envoi en base de données, invoque le service.
 * * Création de languages, Recherche via certains critères, Modifification des données, Suppression d'un service.
 */
@ApiTags('LANGUAGES')
@Controller('languages')

export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService,
    private readonly usersService: UsersService) { }
  /** 
     * @method createLanguage :
     * 
     * Une méthode permettant de :
     * * Contrôler les données entrantes lors de la création d'un service.
     * * Envoi d'un message correspondant au résultat de la requête.
     */
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Création d'un langage" })
  async createLanguage(@Body() createLanguageDto: CreateLanguageDto, @Request() req) {
    if (await this.languagesService.findByLanguageAndUser(req.user.userId, createLanguageDto.programmingLanguage)) {
      throw new HttpException("Langage déjà existant.", HttpStatus.NOT_ACCEPTABLE);
    }
    const user = await this.usersService.findUserById(req.user.userId)
    return await this.languagesService.createLanguage(createLanguageDto, user);
  }

  /** 
      * @method findUserByLanguage :
      * 
      * Une méthode permettant de :
      * * Contrôler les données entrantes lors de la recherche d'un service.
      * * Envoi d'un message correspondant au résultat de la requête.
      */
  @Get('programmingLanguage/:programmingLanguage')
  @ApiOperation({ summary: 'Chercher un utilisateur par ses langages informatiques' })
  async findUserByLanguage(@Param('programmingLanguage') programmingLanguage: string) {
    const data = await this.languagesService.findUserByLanguage(programmingLanguage);
    if (!data) {
      throw new HttpException("Langage introuvable.", HttpStatus.NOT_FOUND);
    }
    return data;
  }
  /** 
    * @method updateLanguage:
    * * Contrôle les données entrantes sur la modification d'un langage
    * * Envoi d'un message correspondant au résultat de la requête.
    */
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: "Modification d'un langage " })
  async updateLanguage(@Param('id', ParseIntPipe) id: number, @Body() updateLanguageDto: UpdateLanguageDto, @Request() req) {
    const language = await this.languagesService.findLanguageById(id);
    if (!language) {
      throw new HttpException("Langage introuvable.", HttpStatus.NOT_FOUND);
    }
    if (language.user.id != req.user.userId) {
      throw new HttpException("Non autorisé.", HttpStatus.FORBIDDEN);
    }
    if (await this.languagesService.findByLanguageAndUser(req.user.userId, updateLanguageDto.programmingLanguage)) {
      throw new HttpException("Langage déjà existant.", HttpStatus.NOT_ACCEPTABLE);
    }
    return await this.languagesService.updateLanguage(id, updateLanguageDto);
  }
  /** 
    * @method deleteLanguage:
    * * Contrôle les données entrantes sur la suppression d'un langage
    * * Envoi d'un message correspondant au résultat de la requête.
    */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: "Suppression d'un langage" })
  async deleteLanguage(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const language = await this.languagesService.findLanguageById(id);

    if (!language) {

      throw new HttpException("Langage introuvable.", HttpStatus.NOT_FOUND);
    }

    if (req.user.userId !== language.user.id) {

      throw new HttpException(" Non autorisé.", HttpStatus.FORBIDDEN);
    }
    if (await this.languagesService.deleteLanguage(id)) {

      throw new HttpException("Langage supprimé.", HttpStatus.OK);
    }
    throw new HttpException("Suppression impossible.", HttpStatus.BAD_REQUEST);
  }

}







