import {
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
  UseInterceptors,
} from '@nestjs/common';
import { ROUTES } from '../routes.constant';
import { FavsService } from './favs.service';
import { ERROR_MESSAGES } from 'src/server/error-messages.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FavsResponse } from './favs.type';

@Controller(ROUTES.FAVS)
@ApiTags(ROUTES.FAVS)
@UseInterceptors(ClassSerializerInterceptor)
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: FavsResponse,
  })
  async getAll() {
    return await this.favsService.getAll();
  }

  @Post(`${ROUTES.TRACK}/:id`)
  @HttpCode(HttpStatus.CREATED)
  async createTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const track = await this.favsService.addToFavs(id, ROUTES.TRACK);

    if (!track) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete(`${ROUTES.TRACK}/:id`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const removedTrack = await this.favsService.deleteFromFavs(
      id,
      ROUTES.TRACK,
    );

    if (!removedTrack) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post(`${ROUTES.ALBUM}/:id`)
  @HttpCode(HttpStatus.CREATED)
  async createAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const album = await this.favsService.addToFavs(id, ROUTES.ALBUM);

    if (!album) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete(`${ROUTES.ALBUM}/:id`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const removedAlbum = await this.favsService.deleteFromFavs(
      id,
      ROUTES.ALBUM,
    );

    if (!removedAlbum) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post(`${ROUTES.ARTIST}/:id`)
  @HttpCode(HttpStatus.CREATED)
  async createArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const artist = await this.favsService.addToFavs(id, ROUTES.ARTIST);

    if (!artist) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete(`${ROUTES.ARTIST}/:id`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const removedArtist = await this.favsService.deleteFromFavs(
      id,
      ROUTES.ARTIST,
    );

    if (!removedArtist) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
