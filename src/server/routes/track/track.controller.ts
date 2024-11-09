import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { BaseService } from 'src/server/shared/base.service';
import { ROUTES } from '../routes.constant';
import { Track } from './track.model';
import { ERROR_MESSAGES } from 'src/server/error-messages.constant';

@Controller(ROUTES.TRACK)
@UseInterceptors(ClassSerializerInterceptor)
export class TrackController {
  constructor(private readonly baseService: BaseService<Track>) {}

  @Get()
  getAll(): Track[] {
    return this.baseService.getAll(ROUTES.TRACK);
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Track {
    const entity = this.baseService.getOne(ROUTES.TRACK, id);

    if (!entity) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }

    return entity;
  }
}
