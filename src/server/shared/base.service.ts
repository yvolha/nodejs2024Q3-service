import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Artist } from '../routes/artist/artist.model';
import { Album } from '../routes/album/album.model';
import { Track } from '../routes/track/track.model';
import { BaseRoute } from './base.type';
import { CreateArtistDto } from '../routes/artist/artist.dto';
import { v4 } from 'uuid';
import { CreateAlbumDto } from '../routes/album/album.dto';
import { CreateTrackDto } from '../routes/track/track.dto';


// to handle Album, Artist, Track
@Injectable()
export class BaseService<T extends Album | Artist | Track> {
  constructor(private readonly databaseService: DatabaseService) {}
  
  
  getAll(route: BaseRoute): T[]  {
    return this.databaseService[route] as T[];
  }
  
  getOne(route: BaseRoute, id: string): T {
    return this.databaseService[route].find((entity) => entity.id === id);
  }

  createOne(route: BaseRoute, dto: CreateArtistDto | CreateAlbumDto | CreateTrackDto): T {

      const newEntity = {
        id: v4(),
        ...dto as (T extends  Artist ? CreateArtistDto : T extends  Album ?  CreateAlbumDto : CreateTrackDto),
      };
  
      this.databaseService[route].push(newEntity);
  
      return newEntity as unknown as T;
  }

  
}
