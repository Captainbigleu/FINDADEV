import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';

import { CompetencesModule } from './competences/competences.module';
import { Competence } from './competences/entities/competence.entity';

import { LanguagesModule } from './languages/languages.module';
import { Language } from './languages/entities/language.entity';

import { FriendshipsModule } from './friendships/friendships.module';
import { Friendship } from './friendships/entities/friendship.entity';


@Module({//imports servent à communiquer avec la database
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Competence, Language, Friendship],
      synchronize: true,
      logging: false
    }), UsersModule, AuthModule, CompetencesModule, LanguagesModule, FriendshipsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { constructor(private datasource: DataSource) { } }
//app.module: module racine du projet