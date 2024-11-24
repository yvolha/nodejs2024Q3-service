import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthDto } from './auth.dto';
import { User } from '@prisma/client';


@Injectable()
export class AuthService {
  constructor(private databaseService: DatabaseService) {}
  async createOne({login, password}: AuthDto): Promise<User> {
    return await this.databaseService.user.create({
      data: {
        login,
        password,
      },
    });
  }

}
