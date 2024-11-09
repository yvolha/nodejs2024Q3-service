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
import { Artist } from './artist.model';
import { ERROR_MESSAGES } from 'src/server/error-messages.constant';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { ArtistService } from './artist.service';

@Controller(ROUTES.ARTIST)
@UseInterceptors(ClassSerializerInterceptor)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAll(): Artist[] {
    return this.artistService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Artist {
    const entity = this.artistService.getOne(id);

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
  createOne(@Body() createDto: CreateArtistDto) {
    const newEntity = this.artistService.createOne(createDto);

    return newEntity;
  }

  @Put(':id')
  updateOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateDto: UpdateArtistDto,
  ) {
    const entity = this.artistService.getOne(id);

    if (!entity) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedEntity = this.artistService.updateOne(
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
  deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const entity = this.artistService.getOne(id);

    if (!entity) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }

    this.artistService.deleteOne(id);
  }
}
