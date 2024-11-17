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
import { TrackService } from './track.service';
import { Track } from './track.model';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller(ROUTES.TRACK)
@ApiTags(ROUTES.TRACK)
@UseInterceptors(ClassSerializerInterceptor)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Track],
  })
  async getAll(): Promise<Track[]> {
    return await this.trackService.getAll(ROUTES.TRACK) as Track[];
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: Track,
  })
 async getOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<Track> {
    const entity = await this.trackService.getOne(id, ROUTES.TRACK) as Track;

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
    type: Track,
  })
  async createOne(@Body() createDto: CreateTrackDto) {
    const newEntity = await this.trackService.createOne(createDto, ROUTES.TRACK);

    return newEntity;
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: Track,
  })
 async updateOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateDto: UpdateTrackDto,
  ) {
    const entity = await this.trackService.getOne(id, ROUTES.TRACK);

    if (!entity) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedEntity = await this.trackService.updateOne(id, updateDto, ROUTES.TRACK);

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
  async deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const entity = await this.trackService.getOne(id, ROUTES.TRACK);

    if (!entity) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }

   await this.trackService.deleteOne(id, ROUTES.TRACK);
  }
}
