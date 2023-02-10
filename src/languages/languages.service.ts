import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { User } from 'src/users/entities/user.entity';
import { Language } from './entities/language.entity';

/**@class LanguagesService
 * 
 * * Méthodes liées aux requêtes client.
 * * Méthode permettant de recevoir les données de la source de données,appliquer la logique métier et renvoyer la réponse au controller.
 * * Création de langages, Recherche via des critères, Modifification des données, Suppression d'un langage.
 */
@Injectable()
export class LanguagesService {
  /** 
    * @method createLanguage :
    * * Methode permettant de créer un langage sur son compte utilisateur suivant le modèle CreateLanguageDto..
  */
  async createLanguage(createLanguageDto: CreateLanguageDto, user: User) {
    delete user.password;
    delete user.firstname;
    delete user.lastname;
    return await Language.create({ ...createLanguageDto, user: user }).save();
  }
  /** 
    * @method findAllLanguages :
    * * Methode permettant de récupérer les données des langages.
  */
  async findAllLanguages(): Promise<Language[]> {

    return await Language.find({ relations: { user: { competences: false } }, select: { user: { pseudo: true, password: false } } });
  }

  /** 
    * @method findLanguageById :
    * * Methode permettant de récupérer les données d'un langage par son id.
  */
  async findLanguageById(id: number) {
    const language = await Language.findOne({ relations: { user: true }, where: { id } })
    if (!language) {
      return undefined;
    }
    return language;
  }
  /** 
    * @method updateLanguage :
    * * Methode permettant de modifier les données d'un langage du compte utlisateur
  */
  async updateLanguage(id: number, updateLanguageDto: UpdateLanguageDto) {
    const lang = await Language.findOneBy({ id });
    if (updateLanguageDto.programmingLanguage) lang.programmingLanguage = updateLanguageDto.programmingLanguage;
    return await lang.save();
  }
  /** 
    * @method findByLanguageAndUser :
    * * Methode permettant de récupérer les données d'un langage et de son auteur.
  */
  async findByLanguageAndUser(userId: number, language: string) {
    return await Language.findOne({ where: { user: { id: userId }, programmingLanguage: language } });
  }
  /** 
    * @method deleteLanguage :
    * * Methode permettant de supprimer les données d'un langage du compte utlisateur 
  */
  async deleteLanguage(id: number) {
    return (await Language.delete({ id })).affected;
  }

}