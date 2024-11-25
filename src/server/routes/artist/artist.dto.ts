import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsBoolean()
  @ApiProperty()
  grammy: boolean;
}

export class UpdateArtistDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  grammy: boolean;
}
