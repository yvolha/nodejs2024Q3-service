import { ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, UseInterceptors } from "@nestjs/common";
import { BaseService } from "src/server/shared/base.service";
import { ROUTES } from "../routes.constant";
import { Artist } from "./artist.model";
import { ERROR_MESSAGES } from "src/server/error-messages.constant";


@Controller(ROUTES.ARTIST)
@UseInterceptors(ClassSerializerInterceptor)
export class ArtistController {
  constructor(private readonly baseService: BaseService<Artist>) {}

  @Get()
  getAll(): Artist[] {
    return this.baseService.getAll(ROUTES.ARTIST);
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Artist {
    const entity = this.baseService.getOne(ROUTES.ARTIST, id);

    if (!entity) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }

    return entity;
  }
}