import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

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

  @Type(() => Number)
  @IsNumber()
  @ApiResponseProperty()
  createdAt: Date; // timestamp of creation

  @Type(() => Number)
  @IsNumber()
  @ApiResponseProperty()
  updatedAt: Date; // timestamp of last update

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
