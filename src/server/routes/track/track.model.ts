import { IsInt, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class Track {
  @IsUUID()
  @IsNotEmpty()
  id: string; // uuid v4

  @IsString()
  name: string;

  @IsUUID()
  artistId: string | null; // refers to Artist

  @IsUUID()
  albumId: string | null; // refers to Album

  @IsInt()
  duration: number; // integer number
}