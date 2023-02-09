import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, ParseIntPipe, HttpStatus, HttpException } from '@nestjs/common';
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
    const language = await this.usersService.findUserById(req.user.userId)
    return this.languagesService.createLanguage(createLanguageDto, language);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllLanguages() {
    return await this.languagesService.findAllLanguages();
  }

  @UseGuards(JwtAuthGuard)
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
  async deleteLanguage(@Param('id', ParseIntPipe) id: number) {
    if (await this.languagesService.findLanguageById(id)) {
      if (await this.languagesService.deleteLanguage(id)) {
        throw new HttpException("Langage supprimée", HttpStatus.ACCEPTED);
      }
      throw new HttpException("suppression impossible", HttpStatus.BAD_REQUEST);
    }
    throw new HttpException("langage introuvable", HttpStatus.NOT_FOUND);
  }
}

