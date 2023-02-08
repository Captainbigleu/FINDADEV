import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { User } from 'src/users/entities/user.entity';
import { Language } from './entities/language.entity';


@Injectable()
export class LanguagesService {
  async createLanguage(createLanguageDto: CreateLanguageDto, user: User) {
    delete user.password;
    delete user.firstname;
    delete user.lastname;
    return await Language.create({ ...createLanguageDto, user: user }).save();
  }
  async findAllLanguages(): Promise<Language[]> {

    return await Language.find({ relations: { user: { competences: false } }, select: { user: { pseudo: true, password: false } } });
  }


  async findLanguageById(id: number) {
    const language = await Language.findOneBy({ id })
    if (!language) {
      return undefined;
    }
    return language;
  }

  async updateLanguage(id: number, updateLanguageDto: UpdateLanguageDto) {
    const lang = await Language.findOneBy({ id });
    if (updateLanguageDto.programmingLanguage) lang.programmingLanguage = updateLanguageDto.programmingLanguage;
    return await lang.save();
  }


  async deleteLanguage(id: number) {
    return (await Language.delete({ id })).affected;
  }

}