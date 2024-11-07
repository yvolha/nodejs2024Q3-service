import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from './user.type';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  getAll(): User[] {
    return this.databaseService.users;
  }

  getOne(id: string): User {
    return this.databaseService.users.find(user => user.id === id);
  }
}
