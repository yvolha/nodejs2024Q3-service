import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthDto } from './auth.dto';
import * as dotenv from 'dotenv';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './auth.type';
import { User } from '../user/user.model';

dotenv.config();

const SALT_ROUNDS = +process.env.CRYPT_SALT || 15;

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async createOne({ login, password }: AuthDto): Promise<User> {
    const hashedPassword = await hash(password, SALT_ROUNDS);

    return await this.databaseService.user.create({
      data: {
        login,
        password: hashedPassword,
      },
    });
  }

  async logIn({ login, password }: AuthDto): Promise<LoginResponse> {
    try {
      const user = await this.databaseService.user.findFirst({
        where: {
          login,
        },
      });

      if (!user) {
        return;
      }

      const isPasswordMatching = await compare(password, user.password);

      if (!isPasswordMatching) {
        return;
      }

      const payload = { userId: user.id, login: user.login };

      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      console.log(e);
    }
  }
}
