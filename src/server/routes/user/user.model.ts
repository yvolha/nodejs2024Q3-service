import { Exclude } from "class-transformer";
import { IsDate, IsInt, IsString, IsUUID, Min } from "class-validator";

export class User {
  @IsUUID()
  id: string; // uuid v4

  @IsString()
  login: string;

  @Exclude()
  password: string;

  @IsInt()
  @Min(1)
  version: number; // integer number, increments on update

  @IsDate()
  createdAt: number; // timestamp of creation

  @IsDate()
  updatedAt: number; // timestamp of last update

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}