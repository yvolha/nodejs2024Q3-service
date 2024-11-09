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

@Controller(ROUTES.FAVS)
@UseInterceptors(ClassSerializerInterceptor)
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getAll() {
    return this.favsService.getAll();
  }

  @Post(`${ROUTES.TRACK}/:id`)
  @HttpCode(HttpStatus.CREATED)
  createTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = this.favsService.getEntity(ROUTES.TRACK, id);

    if (!track) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.favsService.addEntityToFavs(ROUTES.TRACK, track);
  }

  @Delete(`${ROUTES.TRACK}/:id`)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const removedTrack = this.favsService.deleteEntity(ROUTES.TRACK, id);

    if (!removedTrack) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post(`${ROUTES.ALBUM}/:id`)
  @HttpCode(HttpStatus.CREATED)
  createAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = this.favsService.getEntity(ROUTES.ALBUM, id);

    if (!album) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.favsService.addEntityToFavs(ROUTES.ALBUM, album);
  }

  @Delete(`${ROUTES.ALBUM}/:id`)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const removedAlbum = this.favsService.deleteEntity(ROUTES.ALBUM, id);

    if (!removedAlbum) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post(`${ROUTES.ARTIST}/:id`)
  @HttpCode(HttpStatus.CREATED)
  createArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = this.favsService.getEntity(ROUTES.ARTIST, id);

    if (!artist) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.favsService.addEntityToFavs(ROUTES.ARTIST, artist);
  }

  @Delete(`${ROUTES.ARTIST}/:id`)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const removedArtist = this.favsService.deleteEntity(ROUTES.ARTIST, id);

    if (!removedArtist) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
