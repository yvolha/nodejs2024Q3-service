import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

import { v4 } from 'uuid';
import { Album } from './album.model';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';



@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}

  getAll(): Album[] {
    return this.databaseService.album;
  }

  getOne(id: string): Album {
    return this.databaseService.album.find((entity) => entity.id === id);
  }

  createOne(
    dto: CreateAlbumDto,
  ): Album {
    const newEntity = {
      id: v4(),
      ...dto,
    };

    this.databaseService.album.push(newEntity);

    return newEntity;
  }

  updateOne(
    id: string,
    dto: UpdateAlbumDto,
  ): Album {
    const entity = this.databaseService.album.find(
      (entity) => entity.id === id,
    );

    const entityIndex = this.databaseService.album.findIndex(
      (entity) => entity.id === id,
    );

    if (!entity) {
      return null;
    }

    const updatedEntity = {
      ...entity,
      ...dto,
    };

    this.databaseService.album[entityIndex] = updatedEntity;

    return updatedEntity;
  }

  deleteOne(id: string) {
      this.databaseService.album = this.databaseService.album.filter(
        (album) => album.id !== id,
      );

      this.databaseService.track.forEach((track) =>
        track.albumId === id ? (track.albumId = null) : track.albumId,
      );
    }
}
