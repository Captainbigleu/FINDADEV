import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, ParseIntPipe, HttpStatus, HttpException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { ApiTags } from "@nestjs/swagger";


@ApiTags('languages')
@Controller('languages')

export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService,
    private readonly usersService: UsersService) { }


  @UseGuards(JwtAuthGuard)
  @Post()
  async createLanguage(@Body() createLanguageDto: CreateLanguageDto, @Request() req) {
    if (await this.languagesService.findByLanguageAndUser(req.user.userId, createLanguageDto.programmingLanguage)) {
      throw new HttpException("Langage déjà existant.", HttpStatus.NOT_ACCEPTABLE);
    }
    const user = await this.usersService.findUserById(req.user.userId)
    return await this.languagesService.createLanguage(createLanguageDto, user);
  }


  @UseGuards(JwtAuthGuard)
  @Patch(':id')
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


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
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







