import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): User[] {
    return this.userService.getAll();
  }
}
