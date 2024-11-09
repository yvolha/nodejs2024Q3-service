import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Artist } from '../routes/artist/artist.model';
import { Album } from '../routes/album/album.model';
import { Track } from '../routes/track/track.model';
import { BaseRoute } from './base.type';
import { CreateArtistDto, UpdateArtistDto } from '../routes/artist/artist.dto';
import { v4 } from 'uuid';
import { CreateAlbumDto, UpdateAlbumDto } from '../routes/album/album.dto';
import { CreateTrackDto, UpdateTrackDto } from '../routes/track/track.dto';

// to handle Album, Artist, Track
@Injectable()
export class BaseService<T extends Album | Artist | Track> {
  constructor(private readonly databaseService: DatabaseService) {}

  getAll(route: BaseRoute): T[] {
    return this.databaseService[route] as T[];
  }

  getOne(route: BaseRoute, id: string): T {
    return this.databaseService[route].find((entity) => entity.id === id) as T;
  }

  createOne(
    route: BaseRoute,
    dto: CreateArtistDto | CreateAlbumDto | CreateTrackDto,
  ): Album | Artist | Track {
    if (route === 'artist') {
      const newEntity = {
        id: v4(),
        ...(dto as CreateArtistDto),
      } as Artist;

      this.databaseService[route].push(newEntity);

      return newEntity;
    }

    if (route === 'album') {
      const newEntity = {
        id: v4(),
        ...(dto as CreateAlbumDto),
      } as Album;

      this.databaseService[route].push(newEntity);

      return newEntity;
    }

    if (route === 'track') {
      const newEntity = {
        id: v4(),
        ...(dto as CreateTrackDto),
      } as Track;

      this.databaseService[route].push(newEntity);

      return newEntity;
    }
  }

  updateOne(
    route: BaseRoute,
    id: string,
    dto: UpdateArtistDto | UpdateAlbumDto | UpdateTrackDto,
  ): Album | Artist | Track {
    const entity = this.databaseService[route].find(
      (entity) => entity.id === id,
    );
    const entityIndex = this.databaseService[route].findIndex(
      (entity) => entity.id === id,
    );

    if (!entity) {
      return null;
    }

    const updatedEntity = {
      ...entity,
      ...dto,
    };

    this.databaseService[route][entityIndex] = updatedEntity;

    return updatedEntity;
  }

  deleteOne(route, id: string) {
    this.databaseService[route] = this.databaseService[route].filter(
      (entity) => entity.id !== id,
    );

    if (route === 'artist') {
      const artistIndexInAlbum = this.databaseService.album.findIndex(
        (album) => album.artistId === id,
      );
      const artistIndexInTrack = this.databaseService.album.findIndex(
        (track) => track.artistId === id,
      );

      if (artistIndexInAlbum) {
        this.databaseService.album[artistIndexInAlbum].artistId = null;
      }

      if (artistIndexInTrack) {
        this.databaseService.track[artistIndexInTrack].artistId = null;
      }
    }
  }
}
