import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();
const DEFAULT_PORT = 2000;
const SERVER_PORT = +process.env.PORT || DEFAULT_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );


  const config = new DocumentBuilder()
    .setTitle('Home Library Server Documentation')
    .setDescription('Server endpoints description')
    .setVersion('1.0')
    .addTag('home-library-volha')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);


    await app.listen(SERVER_PORT, () => {
      console.log(`Server is running on http://localhost:${SERVER_PORT}`);
    });
}
bootstrap();
