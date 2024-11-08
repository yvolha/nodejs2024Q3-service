import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv'

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();
const DEFAULT_PORT = 2000;
const SERVER_PORT = +process.env.PORT || DEFAULT_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(  
    new ValidationPipe({  
      whitelist: true,  
      transform: true,  
    })),  
  await app.listen(SERVER_PORT);
}
bootstrap();
