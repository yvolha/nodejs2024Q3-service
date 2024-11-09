import { Injectable } from '@nestjs/common';
import { ROUTES } from '../routes/routes.constant';
import { DatabaseService } from 'src/database/database.service';
import { Artist } from '../routes/artist/artist.model';
import { Album } from '../routes/album/album.model';
import { Track } from '../routes/track/track.model';
import { Database } from 'src/database/database.type';


// to handle Album, Artist, Track
@Injectable()
export class BaseService<T extends Album | Artist | Track> {
  constructor(private readonly databaseService: DatabaseService) {}
  
  
  getAll(route: ROUTES.ALBUM | ROUTES.ARTIST | ROUTES.TRACK): T[]  {
    return this.databaseService[route] as T[];
  }
  
  
}
