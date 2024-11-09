import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from "@nestjs/common";
import { BaseService } from "src/server/shared/base.service";
import { ROUTES } from "../routes.constant";

@Controller(ROUTES.ARTIST)
@UseInterceptors(ClassSerializerInterceptor)
export class ArtistController {
  constructor(private readonly baseService: BaseService) {}

  @Get()
  getAll() {
    return this.baseService.getAll(ROUTES.ARTIST);
  }
}