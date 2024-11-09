import { ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, UseInterceptors } from "@nestjs/common";
import { BaseService } from "src/server/shared/base.service";
import { ROUTES } from "../routes.constant";
import { Album } from "./album.model";
import { ERROR_MESSAGES } from "src/server/error-messages.constant";


@Controller(ROUTES.ALBUM)
@UseInterceptors(ClassSerializerInterceptor)
export class AlbumController {
  constructor(private readonly baseService: BaseService<Album>) {}

  @Get()
  getAll(): Album[] {
    return this.baseService.getAll(ROUTES.ALBUM);
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Album {
    const entity = this.baseService.getOne(ROUTES.ALBUM, id);

    if (!entity) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }

    return entity;
  }
}