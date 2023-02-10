import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Friendship } from './entities/friendship.entity';

@Injectable()
export class FriendshipsService {
  async createFriendship(user: User, friend: User) {
    return await Friendship.create({ user, friend }).save();
  }

  
  async findOne(id: number) {
    return await Friendship.findOneBy({id});
  }

  async update(id: number) {
    const friendship = await Friendship.findOneBy({id});
    friendship.accepted = true;
    return friendship.save()
  }

  async remove(id: number) {
    return await Friendship.delete({id})
  }

  async findByUserAndFriend(user:User, friend:User){
    return await Friendship.findOne({ relations: { friend: true, user: true }, where: { user: {id: user.id}, friend: {id: friend.id}} });
  }
}



