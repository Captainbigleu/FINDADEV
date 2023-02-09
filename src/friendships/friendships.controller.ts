import { Controller, Get, Request, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { UsersService } from 'src/users/users.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ParseIntPipe } from '@nestjs/common/pipes';


@ApiTags('friendships')
@Controller('friendships')
export class FriendshipsController {
  constructor(private readonly friendshipsService: FriendshipsService,
    private readonly usersService: UsersService) { }


  @UseGuards(JwtAuthGuard)
  @Post()
  async createFriendship(@Body() body: CreateFriendshipDto, @Request() req) {
    const user = await this.usersService.findUserById(req.user.userId);
    const friend = await this.usersService.findUserByPseudo(body.pseudo);
    return await this.friendshipsService.createFriendship(user, friend);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const friendship = await this.friendshipsService.findOne(id);
    if (!friendship) {
      throw new HttpException("Relation introuvable", HttpStatus.NOT_FOUND);
    }
    return friendship;
  }

  @UseGuards(JwtAuthGuard)//accepte l'invitation et sert à créer la relation inverse de friendId vers UserId
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const friendship = await this.friendshipsService.findOne(id);
    if (!friendship) {
      throw new HttpException(" realtion introuvable", HttpStatus.NOT_FOUND);
    }
    const user = await this.usersService.findUserById(req.user.userId);
    
    if (friendship.friend.id !== user.id) {
      throw new HttpException(" Non autorisé.", HttpStatus.FORBIDDEN);
    }
    if (friendship.accepted) {
      throw new HttpException("Already accepted .", HttpStatus.BAD_REQUEST);
    }
    await this.friendshipsService.update(id);
    const inverseRelation = await this.friendshipsService.createFriendship(friendship.friend, friendship.user);
    return await this.friendshipsService.update(inverseRelation.id);
    
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const friendship = await this.friendshipsService.findOne(id);
    if (!friendship) {
      throw new HttpException(" relation introuvable", HttpStatus.NOT_FOUND);
    }
    const user = await this.usersService.findUserById(req.user.userId);
    if (friendship.friend.id !== user.id && friendship.user.id !== user.id) {
      throw new HttpException(" Non autorisé.", HttpStatus.FORBIDDEN);
    }
    if(friendship.accepted){
      const invertRelation = await this.friendshipsService.findByUserAndFriend(friendship.friend,friendship.user);
      await this.friendshipsService.remove(invertRelation.id);
    }
    return await this.friendshipsService.remove(id);
  }
}
