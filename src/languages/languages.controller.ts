import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, ParseIntPipe, HttpStatus, HttpException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { ApiBody, ApiTags } from "@nestjs/swagger";




@ApiTags('languages')
@Controller('languages')

export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService,
    private readonly usersService: UsersService) { }


  @UseGuards(JwtAuthGuard)
  @Post()
  async createLanguage(@Body() createLanguageDto: CreateLanguageDto, @Request() req) {
    const language = await this.usersService.findUserById(req.user.userId)
    return await this.languagesService.createLanguage(createLanguageDto, language);
  }


  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAllLanguages() {
    return await this.languagesService.findAllLanguages();
  }


  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findLanguageById(@Param('id', ParseIntPipe) id: number) {
    return await this.languagesService.findLanguageById(id);
  }


  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateLanguage(@Param('id', ParseIntPipe) id: number, @Body() updateLanguageDto: UpdateLanguageDto) {
    if (await this.languagesService.findLanguageById(id)) {

      return await this.languagesService.updateLanguage(id, updateLanguageDto);
    }
    throw new HttpException("Langage introuvable", HttpStatus.NOT_FOUND);
  }

  
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteLanguage(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const language = await this.languagesService.findLanguageById(id);

    if (!language) {

      throw new HttpException("langage introuvable", HttpStatus.NOT_FOUND);
    }

    const user = await this.usersService.findUserById(req.user.userId);

    if (!req.user.userId) {

      throw new HttpException(" Non autorisé.", HttpStatus.FORBIDDEN);
    }

    return await this.languagesService.deleteLanguage(id)
  }

}







