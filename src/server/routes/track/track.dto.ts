import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional()
  artistId: string | null; // refers to Artist

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional()
  albumId: string | null; // refers to Album

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  duration: number; // integer number
}

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name: string;

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional()
  artistId: string | null; // refers to Artist

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional()
  albumId: string | null; // refers to Album

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  duration: number; // integer number
}
