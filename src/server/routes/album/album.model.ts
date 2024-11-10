import { ApiResponseProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class Album {
  @IsUUID()
  @IsNotEmpty()
  @ApiResponseProperty()
  id: string; // uuid v4

  @IsString()
  @IsNotEmpty()
  @ApiResponseProperty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  @ApiResponseProperty()
  year: number;

  @IsUUID()
  @IsOptional()
  @ApiResponseProperty()
  artistId: string | null; // refers to Artist
}
