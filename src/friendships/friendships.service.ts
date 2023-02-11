import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Friendship } from './entities/friendship.entity';

/**@class LanguagesService
 * 
 * * Méthodes liées aux requêtes client.
 * * Méthode permettant de recevoir les données de la source de données,appliquer la logique métier et renvoyer la réponse au controller.
 * * Faire une demande d'amis, Recherche via des critères, Modifification des données, Suppression d'un ami.
 */
@Injectable()
export class FriendshipsService {
  /** 
    * @method createFriendship :
    * * Methode permettant de créer une relation ami sur son compte utilisateur suivant le modèle CreateFriendshipDto..
  */
  async createFriendship(user: User, friend: User) {
    return await Friendship.create({ user, friend }).save();
  }
  /** 
    * @method findOne :
    * * Methode permettant de récupérer les données d'un ami sur son compte utilisateur.
  */
  async findOne(id: number) {
    return await Friendship.findOneBy({ id });
  }
  /** 
    * @method update :
    * * Methode permettant de modifier les données d'une relation ami sur son compte utilisateur .
  */
  async update(id: number) {
    const friendship = await Friendship.findOneBy({ id });
    friendship.accepted = true;
    return friendship.save()
  }
  /** 
    * @method remove :
    * * Methode permettant de supprimer les données d'une amitié sur son compte utilisateur.
  */
  async remove(id: number) {
    return await Friendship.delete({ id })
  }
  /** 
    * @method findUserAndFriend :
    * * Methode permettant de retourner les données d'une relation user et friend sur son compte utilisateur.
  */
  async findByUserAndFriend(user: User, friend: User) {
    return await Friendship.findOne({ relations: { friend: true, user: true }, where: { user: { id: user.id }, friend: { id: friend.id } } });
  }
}



