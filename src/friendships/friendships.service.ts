import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { Friendship } from './entities/friendship.entity';

@Injectable()
export class FriendshipsService {
  async createFriendship( user: User, friend: User) {
    return await Friendship.create({user, friend}).save();
  }

  findAll() {
    return `This action returns all friendships`;
  }

  findOne(id: number) {
    return `This action returns a #${id} friendship`;
  }

  update(id: number, updateFriendshipDto: UpdateFriendshipDto) {
    return `This action updates a #${id} friendship`;
  }

  remove(id: number) {
    return `This action removes a #${id} friendship`;
  }
}
