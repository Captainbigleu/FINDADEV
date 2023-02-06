import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({//imports servent à communiquer avec la database
  imports: [
    ConfigModule.forRoot(),// c'est quoi?
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      synchronize: true,
      logging: false
    }),






  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { constructor(private datasource: DataSource) { } }
//app.module: module racine du projet