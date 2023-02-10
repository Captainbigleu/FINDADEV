import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
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

  remove(id: number) {
    return `This action removes a #${id} friendship`;
  }
}
