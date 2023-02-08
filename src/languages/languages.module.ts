import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [LanguagesController],
  providers: [LanguagesService,UsersService]
})
export class LanguagesModule {}
