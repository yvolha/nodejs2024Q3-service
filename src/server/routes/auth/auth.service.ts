import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthDto } from './auth.dto';
import { User } from '@prisma/client';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const SALT_ROUNDS = +process.env.CRYPT_SALT || 15;

@Injectable()
export class AuthService {
  constructor(private databaseService: DatabaseService) {}

  async createOne({ login, password }: AuthDto): Promise<User> {
    let hashedPassword = '';

    bcrypt.hash(password, SALT_ROUNDS).then(function (hash) {
      hashedPassword = hash;
    });

    console.log(hashedPassword, 'hashedPassword');

    return await this.databaseService.user.create({
      data: {
        login,
        password: hashedPassword,
      },
    });
  }

  async logIn({ login, password }: AuthDto): Promise<User> {
    try {
      const user = await this.databaseService.user.findFirst({
        where: {
          login,
        },
      });

      console.log('user', user);

      if (!user) {
        return;
      }

      const isPasswordMatching = await bcrypt.compare(password, user.password);
        console.log(isPasswordMatching);

        if (!isPasswordMatching){
          return;
        }



    } catch (e) {
      console.log(e);
    }
  }
}
