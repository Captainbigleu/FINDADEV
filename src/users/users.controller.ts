import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Request, ParseIntPipe, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';




@ApiTags()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiBody({
    type: CreateUserDto
  })
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {

    const ExistingUser = await this.usersService.findUserByPseudo(createUserDto.pseudo);
    if (ExistingUser) {
      throw new HttpException("le pseudo existe déjà", HttpStatus.NOT_ACCEPTABLE);
    }
    createUserDto.password = await encodePassword(createUserDto.password)

    return this.usersService.create(createUserDto);
  }




  @UseInterceptors(ClassSerializerInterceptor)
  @Get('pseudo/:pseudo')
  async findUserByPseudo(@Param('pseudo') pseudo: string) {

    const user = await this.usersService.findUserByPseudo(pseudo);
    console.log(user, 'essai');
    if (!user) {

      throw new HttpException("le pseudo n'existe pas", HttpStatus.BAD_REQUEST);
    }
    return user;
  }


  @UseInterceptors(ClassSerializerInterceptor)
  @Get('zipCode/:zipCode')
  async findUserByZipCode(@Param('zipCode') zipCode: string) {

    const user = await this.usersService.findUserByZipCode(zipCode);
    console.log(user, 'essai');
    if (!user) {
      throw new HttpException("le code postal n'existe pas", HttpStatus.BAD_REQUEST);
    }
    return user;
  }


  @UseInterceptors(ClassSerializerInterceptor)
  @Get('city/:city')
  async findUserByCity(@Param('city') city: string) {

    const user = await this.usersService.findUserByCity(city);
    console.log(user, 'essai');
    if (!user) {
      throw new HttpException("la ville n'existe pas", HttpStatus.BAD_REQUEST);
    }
    return user;
  }


  @UseInterceptors(ClassSerializerInterceptor)
  @Get('area/:area')
  async findUserByArea(@Param('area') area: string) {

    const user = await this.usersService.findUserByArea(area);
    console.log(user, 'essai');
    if (!user) {
      throw new HttpException("la région n'existe pas", HttpStatus.BAD_REQUEST);
    }
    return user;
  }


  @UseInterceptors(ClassSerializerInterceptor)
  @Get('country/:country')
  async findUserByCountry(@Param('country') country: string) {

    const user = await this.usersService.findUserByCountry(country);
    console.log(user, 'essai');
    if (!user) {
      throw new HttpException ("le pays demandé n'existe pas", HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async findUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findUserById(id);
    if (!user) {
      throw new HttpException("le user n'existe pas", HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateUser( @Body() updateUserDto: UpdateUserDto, @Request() req){ 
    const ExistingUser = await this.usersService.findUserByPseudo(updateUserDto.pseudo);
    if (ExistingUser) {
      throw new HttpException("le pseudo existe déjà", HttpStatus.NOT_ACCEPTABLE);
    }
    return await this.usersService.updateUser(req.user.userId, updateUserDto);
  }


  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@Request() req) {

      if (await this.usersService.deleteUser(req.user.userId)) {
        throw new HttpException("Compte supprimé", HttpStatus.ACCEPTED);
      }
      throw new HttpException("suppression impossible", HttpStatus.BAD_REQUEST);
    }

  }

