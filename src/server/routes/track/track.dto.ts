import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsUUID()
  @IsOptional()
  albumId: string | null; // refers to Album

  @IsInt()
  @IsNotEmpty()
  duration: number; // integer number
}

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsUUID()
  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsUUID()
  @IsOptional()
  albumId: string | null; // refers to Album

  @IsInt()
  @IsOptional()
  duration: number; // integer number
}
