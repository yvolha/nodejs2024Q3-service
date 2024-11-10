import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { ERROR_MESSAGES } from 'src/server/error-messages.constant';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { ROUTES } from '../routes.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller(ROUTES.USER)
@ApiTags(ROUTES.USER)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: [User],
  })
  getAll(): User[] {
    return this.userService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
  })
  getOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): User {
    const user = this.userService.getOne(id);

    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }

    return new User(user);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: User,
  })
  @HttpCode(HttpStatus.CREATED)
  createOne(@Body() createUserDto: CreateUserDto) {
    const newUser = this.userService.createOne(createUserDto);

    return new User(newUser);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
  })
  updateOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const user = this.userService.getOne(id);

    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedUser = this.userService.updateOne({
      id,
      ...updatePasswordDto,
    });

    if (!updatedUser) {
      throw new HttpException(
        ERROR_MESSAGES.WRONG_PASSWORD,
        HttpStatus.FORBIDDEN,
      );
    }

    return new User(updatedUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = this.userService.getOne(id);

    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }

    this.userService.deleteOne(id);
  }
}
