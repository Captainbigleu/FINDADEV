import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
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
    console.log(createUserDto);

    createUserDto.password = await encodePassword(createUserDto.password)
    return this.usersService.create(createUserDto);
  }



  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findUserById(id);
    if (!user) {
      throw new HttpException("le user n'existe pas", HttpStatus.BAD_REQUEST);
    }
    return user;
  }


  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    if (await this.usersService.findUserById(id)) {
      return this.usersService.updateUser(id, updateUserDto);
    }
    throw new HttpException("Compte introuvable", HttpStatus.NOT_FOUND);
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    if (await this.usersService.findUserById(id)) {
      if (await this.usersService.deleteUser(id)) {
        throw new HttpException("Compte supprimé", HttpStatus.ACCEPTED);
      }
      throw new HttpException("suppression impossible", HttpStatus.BAD_REQUEST);
    }
    throw new HttpException("Compte introuvable", HttpStatus.NOT_FOUND);

  }
}

