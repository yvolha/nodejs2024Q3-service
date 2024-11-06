import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv'

import { AppModule } from './app.module';

dotenv.config();
const DEFAULT_PORT = 2000;
const SERVER_PORT = +process.env.PORT || DEFAULT_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(SERVER_PORT);
}
bootstrap();
