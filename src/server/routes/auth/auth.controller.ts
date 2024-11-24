import {
  Body,
  ClassSerializerInterceptor,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse } from '@nestjs/swagger';
import { User } from '../user/user.model';
import { AuthDto } from './auth.dto';



@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: User,
  })
  async createOne(@Body() createDto: AuthDto) {
    const newEntity = await this.authService.createOne(
      createDto,
    );

    return newEntity;
  }
}
