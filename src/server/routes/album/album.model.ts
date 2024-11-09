import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

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
  @IsOptional()
  artistId: string | null; // refers to Artist
}
