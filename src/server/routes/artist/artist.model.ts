import { ApiResponseProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class Artist {
  @IsUUID()
  @IsNotEmpty()
  @ApiResponseProperty()
  id: string; // uuid v4

  @IsString()
  @IsNotEmpty()
  @ApiResponseProperty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  @ApiResponseProperty()
  grammy: boolean;
}
