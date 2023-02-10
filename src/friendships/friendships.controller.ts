import { Controller, Get, Request, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { UsersService } from 'src/users/users.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


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

  @Get(':id')
  async findById(@Param('id') id: number) {
    const   this.friendshipsService.findOne(id);
  }


  @Patch()
  async update(@Param('id', ParseIntPipe) id: number) {
    return await this.friendshipsService.update(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendshipsService.remove(+id);
  }
}
