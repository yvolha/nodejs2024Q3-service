import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.model';
import { AuthDto } from './auth.dto';
import { ROUTES } from '../routes.constant';


@Controller(ROUTES.AUTH)
@ApiTags(ROUTES.AUTH)
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

    console.log(newEntity);
    return newEntity;
  }
}
