import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsUUID()
  @IsOptional()
  artistId: string | null; // refers to Artist
}

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsInt()
  @IsOptional()
  year: number;

  @IsUUID()
  @IsOptional()
  artistId: string | null; // refers to Artist
}
