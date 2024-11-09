import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from './user.model';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  getAll(): User[] {
    return this.databaseService.user;
  }

  getOne(id: string): User {
    return this.databaseService.user.find((user) => user.id === id);
  }

  createOne({ login, password }: CreateUserDto): User {
    const currentTime = Date.now();

    const newUser: User = {
      id: v4(),
      login,
      password,
      version: 1,
      createdAt: currentTime,
      updatedAt: currentTime,
    };

    this.databaseService.user.push(newUser);

    return newUser;
  }

  updateOne({
    id,
    oldPassword,
    newPassword,
  }: UpdatePasswordDto & { id: string }): User | null {
    const user = this.databaseService.user.find((user) => user.id === id);
    const userIndex = this.databaseService.user.findIndex(
      (user) => user.id === id,
    );

    if (!user || user.password !== oldPassword) {
      return null;
    }

    const updatedUser = {
      ...user,
      version: user.version + 1,
      updatedAt: Date.now(),
      password: newPassword,
    };

    this.databaseService.user[userIndex] = updatedUser;

    return updatedUser;
  }

  deleteOne(id: string) {
    this.databaseService.user = this.databaseService.user.filter(
      (user) => user.id !== id,
    );
  }
}
