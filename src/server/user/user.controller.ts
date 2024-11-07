import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.type';
import { IdParam } from '../types';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): User[] {
    return this.userService.getAll();
  }

  @Get(':id')
  getOne(@Param() { id }: IdParam): User {
    return this.userService.getOne(id);
  }

  @Post()
  createOne(){
    
  }
}
