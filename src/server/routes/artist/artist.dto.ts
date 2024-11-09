import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}

export class UpdateArtistDto {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}