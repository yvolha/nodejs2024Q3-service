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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller(ROUTES.ARTIST)
@ApiTags(ROUTES.ARTIST)
@UseInterceptors(ClassSerializerInterceptor)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Artist],
  })
  async getAll(): Promise<Artist[]> {
    return (await this.artistService.getAll(ROUTES.ARTIST)) as Artist[];
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: Artist,
  })
  async getOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Artist> {
    const entity = (await this.artistService.getOne(
      id,
      ROUTES.ARTIST,
    )) as Artist;

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
    type: Artist,
  })
  async createOne(@Body() createDto: CreateArtistDto) {
    const newEntity = await this.artistService.createOne(
      createDto,
      ROUTES.ARTIST,
    );

    return newEntity;
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: Artist,
  })
  async updateOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateDto: UpdateArtistDto,
  ) {
    const entity = await this.artistService.getOne(id, ROUTES.ARTIST);

    if (!entity) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedEntity = await this.artistService.updateOne(
      id,
      updateDto,
      ROUTES.ARTIST,
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
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const entity = await this.artistService.getOne(id, ROUTES.ARTIST);

    if (!entity) {
      throw new HttpException(
        ERROR_MESSAGES.NON_EXISTENT_ENTITY,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.artistService.deleteOne(id, ROUTES.ARTIST);
  }
}
