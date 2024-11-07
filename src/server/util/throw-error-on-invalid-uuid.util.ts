import { HttpException, HttpStatus } from "@nestjs/common";
import { validate } from "uuid";
import { ERROR_MASSAGES } from "../error-messages.constant";

export default function throwErrorOnInvalidUuid(id: string): void {
  const isIdValidUuid = validate(id);

  if (!isIdValidUuid) {
    throw new HttpException(ERROR_MASSAGES.INVALID_UUID, HttpStatus.BAD_REQUEST);
  }
}