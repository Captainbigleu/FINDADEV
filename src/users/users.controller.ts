import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Request, ParseIntPipe, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

/**@class UsersController
 * 
 * * Méthodes liées à l'accessibilité du client.
 * * Contrôle des informations entrantes , Vérification avant envoi en base de données, suivant un protocole précis et renseigné.
 * * Création de comptes, Recherche via des critères, Modifification deS données, Suppression d'un compte utilisateur.
 */
@ApiBearerAuth()
@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  /** 
   * @method create :
   * 
   * Une méthode permettant de :
   * * Contrôler les données lors de la création d'un compte utilisateur.
   * * Méthode d'authentification et respect des contraintes.
   * * Envoi d'un message correspondant au résultat de la requête.
   */
  @Post('register')
  @ApiOperation({ summary: "Création d'un compte utilisateur" })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createUserDto: CreateUserDto) {

    const ExistingUser = await this.usersService.findUserByPseudo(createUserDto.pseudo);
    if (ExistingUser) {
      throw new HttpException("le pseudo existe déjà", HttpStatus.NOT_ACCEPTABLE);
    }
    createUserDto.password = await encodePassword(createUserDto.password)

    return this.usersService.create(createUserDto);
  }
  /** 
   * @method findUserByPseudo:
   * * Contrôle des données sur la recherche par Pseudo
   * * Envoi d'un message correspondant au résultat de la requête.
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('pseudo/:pseudo')
  @ApiOperation({ summary: 'Chercher un utilisateur par le pseudo' })
  async findUserByPseudo(@Param('pseudo') pseudo: string) {

    const user = await this.usersService.findUserByPseudo(pseudo);
    if (!user) {
      throw new HttpException("le pseudo n'existe pas", HttpStatus.BAD_REQUEST);
    }
    return user;
  }
  /** 
   * @method findUserByZipCode:
   * * Contrôle des données sur la recherche par code postal.
   * * Envoi d'un message correspondant au résultat de la requête.
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('zipCode/:zipCode')
  @ApiOperation({ summary: 'Chercher un utilisateur par le code postal' })
  async findUserByZipCode(@Param('zipCode') zipCode: string) {

    const user = await this.usersService.findUserByZipCode(zipCode);
    if (!user) {
      throw new HttpException("aucun profil enregistré avec ce code postal", HttpStatus.BAD_REQUEST);
    }
    return user;
  }
  /** 
  * @method findUserByCity:
  * * Contrôle des données sur la recherche par ville.
  * * Envoi d'un message correspondant au résultat de la requête.
  */
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('city/:city')
  @ApiOperation({ summary: 'Chercher un utilisateur par la ville' })
  async findUserByCity(@Param('city') city: string) {

    const user = await this.usersService.findUserByCity(city);
    if (!user) {
      throw new HttpException("aucun profil enregistré dans cette ville", HttpStatus.BAD_REQUEST);
    }
    return user;
  }
  /** 
 * @method findUserByArea:
 * * Contrôle des données sur la recherche par région.
 * * Envoi d'un message correspondant au résultat de la requête.
 */
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('area/:area')
  @ApiOperation({ summary: 'Chercher un utilisateur par la région' })
  async findUserByArea(@Param('area') area: string) {

    const user = await this.usersService.findUserByArea(area);
    if (!user) {
      throw new HttpException("aucun profil enregistré dans cette région", HttpStatus.BAD_REQUEST);
    }
    return user;
  }
  /** 
 * @method findUserByCountry:
 * * Contrôle des données sur la recherche par pays.
 * * Envoi d'un message correspondant au résultat de la requête.
 */
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('country/:country')
  @ApiOperation({ summary: 'Chercher un utilisateur par le pays' })
  async findUserByCountry(@Param('country') country: string) {

    const user = await this.usersService.findUserByCountry(country);
    if (!user) {
      throw new HttpException("aucun profil enregistré dans ce pays", HttpStatus.BAD_REQUEST);
    }
    return user;
  }
  /** 
 * @method findUserById:
 * * Contrôle des données sur la recherche par id d'un utilisateur.
 * * Envoi d'un message correspondant au résultat de la requête.
 */
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  @ApiOperation({ summary: 'Chercher un utilisateur par son id' })
  @ApiResponse({
    status: 200,
    description: 'User found',
  })
  async findUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findUserById(id);
    if (!user) {
      throw new HttpException("le user n'existe pas", HttpStatus.BAD_REQUEST);
    }
    return user;
  }
  /** 
 * @method updateUser:
 * * Contrôle des données sur la modification d'un compte utilisateur.
 * * Envoi d'un message correspondant au résultat de la requête.
 */
  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({ summary: "Modifier les informations d'un compte utilisateur" })
  @ApiResponse({ status: 200, description: 'informations modifiées' })
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Request() req) {

    const pseudoExist = await this.usersService.findUserByPseudo(updateUserDto.pseudo);

    if (updateUserDto.pseudo && pseudoExist) {

      throw new HttpException("le pseudo existe déjà", HttpStatus.CONFLICT);
    }
    const updatedInfo = await this.usersService.updateUser(req.user.userId, updateUserDto);

    return updatedInfo;
  }
  /** 
 * @method deleteUser:
 * * Contrôle des données sur la suppression d'un compte utilisateur.
 * * Envoi d'un message correspondant au résultat de la requête.
 */
  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiOperation({ summary: 'Supprimer un compte utilisateur' })
  @ApiResponse({ status: 200, description: 'Compte supprimé' })
  async deleteUser(@Request() req) {
    if (await this.usersService.deleteUser(req.user.userId)) {

      throw new HttpException("Compte supprimé", HttpStatus.ACCEPTED);
    }
    throw new HttpException("suppression impossible", HttpStatus.BAD_REQUEST);
  }

}

