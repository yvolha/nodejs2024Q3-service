import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

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
  providers: [AuthService],
})
export class AuthModule {}
