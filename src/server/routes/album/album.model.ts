import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class Album {
  @IsUUID()
  @IsNotEmpty()
  id: string; // uuid v4

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsUUID()
  artistId: string | null; // refers to Artist
}
