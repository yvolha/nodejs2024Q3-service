import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as yaml from 'yamljs';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'node:path';

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

  const swaggerDocument = yaml.load(resolve('doc', 'api.yaml'));
  const documentFactory = SwaggerModule.createDocument(app, swaggerDocument);
  SwaggerModule.setup('api', app, documentFactory);


    await app.listen(SERVER_PORT, () => {
      console.log(`Server is running on http://localhost:${SERVER_PORT}`);
    });
}
bootstrap();
