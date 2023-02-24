import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';


/**@class UsersService
 * 
 * * Méthodes liées aux requêtes client.
 * * Méthode permettant de recevoir les données de la source de données,appliquer la logique métier et renvoyer la réponse au controller.
 * * Création de comptes, Recherche via des critères, Modifification des données, Suppression d'un compte utilisateur.
 */
@Injectable()
export class UsersService {

  /** 
   * @method create :
   * * Methode permettant de créer un utlisateur suivant le modèle du CreatUserDto.
   */
  async create(createUserDto: CreateUserDto) {
    const user = await User.create({ ...createUserDto }).save();
    delete user.password;
    return user;

  }

  /** 
   * @method findUserByPseudo :
   * * Methode permettant de récupérer les données utlisateurs par pseudo.
   */
  async findUserByPseudo(pseudo: string) {
    return await User.findOneBy({ pseudo });
  }
  
  /** 
   * @method findUserByZipCode :
   * * Methode permettant de récupérer les données utlisateurs par code postal.
   */
  async findUserByZipCode(zipCode: string) {
    return await User.findBy({ zipCode });
  }

  /** 
   * @method findUserByCity :
   * * Methode permettant de récupérer les données utlisateurs par ville.
   */
  async findUserByCity(city: string) {
    return await User.findBy({ city });
  }

  /** 
   * @method findUserByArea :
   * * Methode permettant de récupérer les données utlisateurs par région.
   */
  async findUserByArea(area: string) {
    return await User.findBy({ area });
  }

  /** 
   * @method findUserByCountry :
   * * Methode permettant de récupérer les données utlisateurs par pays.
   */
  async findUserByCountry(country: string) {
    return await User.findBy({ country });
  }

  /** 
   * @method findUserById :
   * * Methode permettant de trouver un utlisateur par son id.
   */
  async findUserById(id: number) {
    const user = await User.findOneBy({ id })
    if (!id) {
      return undefined;
    }
    return user;
  }

  /** 
   * @method updateUser :
   * * Methode permettant de modifier les données d'un compte utlisateur avec la classe UpdateUserDto
   */
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await User.findOneBy({ id });
    if (updateUserDto.pseudo) user.pseudo = updateUserDto.pseudo;
    if (updateUserDto.adresse) user.adresse = updateUserDto.adresse;
    if (updateUserDto.presentation) user.presentation = updateUserDto.presentation;
    delete user.password;
    return await user.save();

  }

  /** 
   * @method deleteUser :
   * * Méthode permettant de supprimer un compte utlisateur.
   */
  async deleteUser(id: number) {
    return (await User.delete({ id })).affected;
  }

}
