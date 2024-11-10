import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsDate, IsInt, IsString, IsUUID, Min } from 'class-validator';

export class User {
  @IsUUID()
  @ApiResponseProperty()
  id: string; // uuid v4

  @IsString()
  @ApiProperty()
  @ApiResponseProperty()
  login: string;

  @Exclude()
  password: string;

  @IsInt()
  @Min(1)
  @ApiResponseProperty()
  version: number; // integer number, increments on update

  @IsDate()
  @ApiResponseProperty()
  createdAt: number; // timestamp of creation

  @IsDate()
  @ApiResponseProperty()
  updatedAt: number; // timestamp of last update

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
