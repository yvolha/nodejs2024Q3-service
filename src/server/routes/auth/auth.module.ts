import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

dotenv.config();

const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: TOKEN_EXPIRE_TIME },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
