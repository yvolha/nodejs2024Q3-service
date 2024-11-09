import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class Track {
  @IsUUID()
  @IsNotEmpty()
  id: string; // uuid v4

  @IsString()
  name: string;

  @IsUUID()
  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsUUID()
  @IsOptional()
  albumId: string | null; // refers to Album

  @IsInt()
  duration: number; // integer number
}
