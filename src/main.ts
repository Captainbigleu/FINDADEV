import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {//fonction qui démarre notre appli
  const app = await NestFactory.create(AppModule);

 app.useGlobalPipes(new ValidationPipe({

    whitelist: true,
    forbidNonWhitelisted: true,

  }));




  await app.listen(3000);//démarre l'écoute http et attend les requêtes
}
bootstrap();
//Le fichier d'entrée de l'application qui utilise la fonction principale NestFactory pour créer une instance d'application Nest.npm 