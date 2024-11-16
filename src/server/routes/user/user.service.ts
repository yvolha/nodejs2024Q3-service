import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from './user.model';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<User[]> {
    return await this.databaseService.user.findMany();
  }

  async getOne(id: string): Promise<User> {
    return await this.databaseService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async createOne(createUserDto: CreateUserDto): Promise<User> {
    return await this.databaseService.user.create({
      data: createUserDto,
    });
  }

  async updateOne(
    updatePasswordDto: UpdatePasswordDto,
    id: string,
  ): Promise<User | null> {
    const user = await this.getOne(id);

    if (user && user.password === updatePasswordDto.oldPassword) {
      return await this.databaseService.user.update({
        data: {
          password: updatePasswordDto.newPassword,
          version: user.version + 1,
        },
        where: {
          id,
        },
      });
    }

    return null;
  }

  async deleteOne(id: string): Promise<User> {
    return await this.databaseService.user.delete({
      where: { id },
    });
  }
}
