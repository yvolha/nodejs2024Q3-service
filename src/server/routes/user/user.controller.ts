import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { IdParam } from '../../types';
import { ERROR_MASSAGES } from 'src/server/error-messages.constant';
import { CreateUserDto } from './user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): User[] {
    return this.userService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe({ version: '4'})) { id }: IdParam): User {

    const user = this.userService.getOne(id);

    if (!user) {
      throw new HttpException(ERROR_MASSAGES.NON_EXISTENT_ENTITY, HttpStatus.NOT_FOUND);
    }

    return user
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOne(@Body() createUserDto: CreateUserDto){
    
  }
}
