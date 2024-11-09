import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ROUTES } from '../routes.constant';

import { ERROR_MESSAGES } from 'src/server/error-messages.constant';
import { Album } from './album.model';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';

@Controller(ROUTES.ALBUM)
@UseInterceptors(ClassSerializerInterceptor)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAll(): Album[] {
    return this.albumService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Album {
    const entity = this.albumService.getOne(id);

    if (!entity) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }

    return entity;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOne(@Body() createDto: CreateAlbumDto) {
    const newEntity = this.albumService.createOne(createDto);

    return newEntity;
  }

  @Put(':id')
  updateOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateDto: UpdateAlbumDto,
  ) {
    const entity = this.albumService.getOne(id);

    if (!entity) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedEntity = this.albumService.updateOne(
      id,
      updateDto,
    );

    if (!updatedEntity) {
      throw new HttpException(
        ERROR_MESSAGES.WRONG_PASSWORD,
        HttpStatus.FORBIDDEN,
      );
    }

    return updatedEntity;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const entity = this.albumService.getOne(id);

    if (!entity) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }

    this.albumService.deleteOne(id);
  }
}
