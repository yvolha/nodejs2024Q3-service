import { HttpException, HttpStatus } from "@nestjs/common";
import { validate } from "uuid";

export default function throwErrorOnInvalidUuid(id: string): void {
  const isIdValidUuid = validate(id);

  if (!isIdValidUuid) {
    throw new HttpException('User ID is not a valid UUID', HttpStatus.BAD_REQUEST);
  }
}