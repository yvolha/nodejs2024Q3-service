import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  year: number;

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional()
  artistId: string | null; // refers to Artist
}

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name: string;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  year: number;

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional()
  artistId: string | null; // refers to Artist
}
