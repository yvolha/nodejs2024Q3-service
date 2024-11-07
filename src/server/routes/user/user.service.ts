import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from './user.model';
import { CreateUserDto } from './user.dto';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  getAll(): User[] {

    return this.databaseService.users;
  }

  getOne(id: string): User {

    return this.databaseService.users.find(user => user.id === id);;
  }

  createOne({
    login,
    password,
  }: CreateUserDto): Omit<User, 'password'> {
    const currentTime = Date.now();

    const newUser: User = {
      id: v4(),
      login,
      password,
      version: 1,
      createdAt: currentTime,
      updatedAt: currentTime,
    }
    
    this.databaseService.users.push(newUser);

    return 
  }
}
