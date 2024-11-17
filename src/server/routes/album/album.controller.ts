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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller(ROUTES.ALBUM)
@ApiTags(ROUTES.ALBUM)
@UseInterceptors(ClassSerializerInterceptor)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Album],
  })
  async getAll(): Promise<Album[]> {
    return (await this.albumService.getAll(ROUTES.ALBUM)) as Album[];
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: Album,
  })
  async getOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Album> {
    const entity = (await this.albumService.getOne(id, ROUTES.ALBUM)) as Album;

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
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Album,
  })
  async createOne(@Body() createDto: CreateAlbumDto) {
    const newEntity = await this.albumService.createOne(
      createDto,
      ROUTES.ALBUM,
    );

    return newEntity;
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: Album,
  })
  async updateOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateDto: UpdateAlbumDto,
  ) {
    const entity = await this.albumService.getOne(id, ROUTES.ALBUM);

    if (!entity) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedEntity = await this.albumService.updateOne(
      id,
      updateDto,
      ROUTES.ALBUM,
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
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const entity = await this.albumService.getOne(id, ROUTES.ALBUM);

    if (!entity) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.albumService.deleteOne(id, ROUTES.ALBUM);
  }
}
