import { IsInt, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  artistId: string | null; // refers to Artist

  @IsUUID()
  albumId: string | null; // refers to Album

  @IsInt()
  duration: number; // integer number
}