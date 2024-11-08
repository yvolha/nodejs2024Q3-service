import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { ERROR_MESSAGES } from 'src/server/error-messages.constant';
import { CreateUserDto } from './user.dto';
import { ROUTES } from '../routes.constant';

@UseInterceptors(ClassSerializerInterceptor)
@Controller(ROUTES.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): User[] {
    return this.userService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe({ version: '4'})) id: string): User {
    console.log('!!!',id)

    const user = this.userService.getOne(id);

    if (!user) {
      throw new HttpException(ERROR_MESSAGES.NON_EXISTENT_ENTITY, HttpStatus.NOT_FOUND);
    }
    console.log(user)

    return new User(user);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOne(@Body() createUserDto: CreateUserDto){
    const newUser = this.userService.createOne(createUserDto);
    console.log(newUser, '---createOne')
    return new User(newUser);
  }
}
