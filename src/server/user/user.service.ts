import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from 'src/types';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}


  getAll(): any {
    return this.databaseService.users;
  }
}
