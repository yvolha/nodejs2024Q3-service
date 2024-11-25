import { ApiResponseProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class Track {
  @IsUUID()
  @IsNotEmpty()
  @ApiResponseProperty()
  id: string; // uuid v4

  @IsString()
  @ApiResponseProperty()
  name: string;

  @IsUUID()
  @IsOptional()
  @ApiResponseProperty()
  artistId: string | null; // refers to Artist

  @IsUUID()
  @IsOptional()
  @ApiResponseProperty()
  albumId: string | null; // refers to Album

  @IsInt()
  @ApiResponseProperty()
  duration: number; // integer number
}
