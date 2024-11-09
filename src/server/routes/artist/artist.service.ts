import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

import { v4 } from 'uuid';
import { Artist } from './artist.model';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';


@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}

  getAll(): Artist[] {
    return this.databaseService.artist;
  }

  getOne(id: string): Artist {
    return this.databaseService.artist.find((entity) => entity.id === id);
  }

  createOne(
    dto: CreateArtistDto,
  ): Artist {
    const newEntity = {
      id: v4(),
      ...dto,
    };

    this.databaseService.artist.push(newEntity);

    return newEntity;
  }

  updateOne(
    id: string,
    dto: UpdateArtistDto,
  ): Artist {
    const entity = this.databaseService.artist.find(
      (entity) => entity.id === id,
    );

    const entityIndex = this.databaseService.artist.findIndex(
      (entity) => entity.id === id,
    );

    if (!entity) {
      return null;
    }

    const updatedEntity = {
      ...entity,
      ...dto,
    };

    this.databaseService.artist[entityIndex] = updatedEntity;

    return updatedEntity;
  }

  deleteOne(id: string) {
      this.databaseService.artist = this.databaseService.artist.filter(
        (artist) => artist.id !== id,
      );

      const artistIndexInAlbum = this.databaseService.album.findIndex(
        (album) => album.artistId === id,
      );

      
      const artistIndexInTrack = this.databaseService.track.findIndex(
        (track) => track.artistId === id,
      );

      if (artistIndexInAlbum) {
        // this.databaseService.album[artistIndexInAlbum].artistId = null;
      }

      if (artistIndexInTrack) {
       // this.databaseService.track[artistIndexInTrack].artistId = null;
      }
    }
}
