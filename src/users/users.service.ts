import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {

    return await User.create({ ...createUserDto }).save();
  }

  async findUserByPseudo(pseudo: string) {
    return await User.findOneBy({ pseudo });

  }

  async findUserById(id: number) {
    const user = await User.findOneBy({ id })
    if (!id) {
      return undefined;
    }
    return user;
  }
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await User.findOneBy({ id });
    if (updateUserDto.pseudo) user.pseudo = updateUserDto.pseudo;
    if (updateUserDto.adresse) user.adresse = updateUserDto.adresse;
    return await user.save()
  }



  async deleteUser(id: number) {
    return (await User.delete({ id })).affected;
  }

}
