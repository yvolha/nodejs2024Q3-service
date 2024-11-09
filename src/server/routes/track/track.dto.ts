import { IsInt, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  artistId: string | null; // refers to Artist

  @IsUUID()
  @IsNotEmpty()
  albumId: string | null; // refers to Album

  @IsInt()
  @IsNotEmpty()
  duration: number; // integer number
}

export class UpdateTrackDto {
  @IsString()
  name: string;

  // @IsUUID()
  // artistId: string | null; // refers to Artist

  // @IsUUID()
  // albumId: string | null; // refers to Album

  @IsInt()
  duration: number; // integer number
}