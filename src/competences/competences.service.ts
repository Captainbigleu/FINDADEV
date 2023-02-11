import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { Competence } from './entities/competence.entity'

/**@class CompetencesService
 * 
 * * Méthodes liées aux requêtes client.
 * * Méthode permettant de recevoir les données de la source de données,appliquer la logique métier et renvoyer la réponse au controller.
 * * Création de compétences, Recherche via des critères, Modifification des données, Suppression d'une compétence.
 */
@Injectable()
export class CompetencesService {

  /** 
     * @method createComp :
     * * Methode permettant de créer une compétence sur son compte utilisateur suivant le modèle CreateCompétenceDto..
   */
  async createComp(createCompetenceDto: CreateCompetenceDto, user: User) {
    const competences = Competence.create({ ...createCompetenceDto });
    delete user.password
    competences.user = user;
    return await competences.save()
  }

  /** 
     * @method findCompetences:
     * * Methode permettant de chercher toutes les compétences.
   */
  async findCompetences(): Promise<Competence[]> {
    return await Competence.find();
  }
  /** 
       * @method findCompetenceById :
       * * Methode permettant de chercher une compétence par son id .
     */
  async findCompetenceById(id: number) {
    const competence = await Competence.findOne({ relations: { user: true }, where: { id } })
    if (!competence) {
      return undefined;
    }
    return competence;
  }
  /** 
     * @method updateComp :
     * * Methode permettant de modifier une compétence sur son compte utilisateur.
   */
  async updateComp(id: number, updateCompetenceDto: UpdateCompetenceDto) {
    const comp = await Competence.findOneBy({ id });
    if (updateCompetenceDto.competence) comp.competence = updateCompetenceDto.competence;
    return await comp.save();
  }
  /** 
       * @method findByCompetenceAndUser:
       * * Methode permettant de retourner les données d'une relation user et compétence sur son compte utilisateur
     */
  async findByCompetenceAndUser(userId: number, competence: string) {
    return await Competence.findOne({ where: { user: { id: userId }, competence: competence } });
  }
  /** 
     * @method deleteComp :
     * * Methode permettant de supprimer une compétence sur son compte utilisateur.
   */
  async deleteComp(id: number) {
    return await Competence.delete({ id })
  }

}
