import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
