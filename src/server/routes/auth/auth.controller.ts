import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.model';
import { AuthDto } from './auth.dto';
import { ROUTES } from '../routes.constant';
import { LoginResponse } from './auth.type';
import { ERROR_MESSAGES } from 'src/server/error-messages.constant';
import { Public } from './auth.decorator';

@Controller(ROUTES.AUTH)
@ApiTags(ROUTES.AUTH)
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: User,
  })
  async createOne(@Body() createDto: AuthDto) {
    const newEntity = await this.authService.createOne(createDto);

    return newEntity;
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: LoginResponse,
  })
  async logIn(@Body() loginDto: AuthDto) {
    const authTokens = await this.authService.logIn(loginDto);

    if (!authTokens) {
      throw new HttpException(ERROR_MESSAGES.AUTH_FAILED, HttpStatus.FORBIDDEN);
    }

    return authTokens;
  }
}
