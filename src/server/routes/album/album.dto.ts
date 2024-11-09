import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsUUID()
  artistId: string | null; // refers to Artist
}

export class UpdateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  //@IsUUID()
  // artistId: string | null; // refers to Artist
}
