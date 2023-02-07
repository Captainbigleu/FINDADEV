import { NestFactory } from '@nestjs/core';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {//fonction qui démarre notre appli
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Findadev example')
  .setDescription('API DevsSourcing')
  .setVersion('1.0')
  .addTag('users')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);


/* app.useGlobalPipes(new ValidationPipe({

    whitelist: true,
    forbidNonWhitelisted: true,

  })
  );*/




  await app.listen(3000);//démarre l'écoute http et attend les requêtes
}
bootstrap();
//Le fichier d'entrée de l'application qui utilise la fonction principale NestFactory pour créer une instance d'application Nest.npm 