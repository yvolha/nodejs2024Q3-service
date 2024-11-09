import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ROUTES } from '../routes.constant';
import { Track } from '../track/track.model';
import { Artist } from '../artist/artist.model';
import { Album } from '../album/album.model';
import { FavsResponse } from './favs.type';

@Injectable()
export class FavsService {
  constructor(private readonly databaseService: DatabaseService) {}

  getAll(): FavsResponse {
    return {
      artists: this.databaseService.artist.filter((item) =>
        this.databaseService.favs.artists.includes(item.id),
      ),
      albums: this.databaseService.album.filter((item) =>
        this.databaseService.favs.albums.includes(item.id),
      ),
      tracks: this.databaseService.track.filter((item) =>
        this.databaseService.favs.tracks.includes(item.id),
      ),
    };
  }

  getEntity(route: string, id: string) {
    return this.databaseService[route].find((entity) => entity.id === id);
  }

  addEntityToFavs(
    route: ROUTES.ALBUM | ROUTES.ARTIST | ROUTES.TRACK,
    entity: Album | Artist | Track,
  ) {
    const subroute = this.getFavsSubrouteByRequestRoute(route);
    this.databaseService.favs[subroute].push(entity.id);
  }

  deleteEntity(
    route: ROUTES.ALBUM | ROUTES.ARTIST | ROUTES.TRACK,
    entityId: string,
  ) {
    const subroute = this.getFavsSubrouteByRequestRoute(route);
    const isEntityInFavs = this.databaseService.favs[subroute].find(
      (favEntity) => favEntity === entityId,
    );

    if (!isEntityInFavs) {
      return null;
    }

    this.databaseService.favs[subroute] = this.databaseService.favs[
      subroute
    ].filter((id) => id !== entityId);
    return {};
  }

  getFavsSubrouteByRequestRoute(
    route: ROUTES.ALBUM | ROUTES.ARTIST | ROUTES.TRACK,
  ) {
    return route === 'track'
      ? 'tracks'
      : route === 'artist'
      ? 'artists'
      : 'albums';
  }
}
