import { ClassSerializerInterceptor, Controller, Get, Param, ParseUUIDPipe, UseInterceptors } from "@nestjs/common";
import { BaseService } from "src/server/shared/base.service";
import { ROUTES } from "../routes.constant";
import { Artist } from "./artist.model";


@Controller(ROUTES.ARTIST)
@UseInterceptors(ClassSerializerInterceptor)
export class ArtistController {
  constructor(private readonly baseService: BaseService<Artist>) {}

  @Get()
  getAll(): Artist[] {
    return this.baseService.getAll(ROUTES.ARTIST);
  }

  // @Get(':id')
  // getOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Artist {
  //   const user = this.baseService.getOne(id);

  //   if (!user) {
  //     throw new HttpException(
  //       ERROR_MESSAGES.NON_EXISTENT_ENTITY,
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }

  //   return new User(user);
  // }
}