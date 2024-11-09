import { Injectable } from '@nestjs/common';

import { Database } from './database.type';
import { User } from 'src/server/routes/user/user.model';
import { Artist } from 'src/server/routes/artist/artist.model';
import { Album } from 'src/server/routes/album/album.model';
import { Track } from 'src/server/routes/track/track.model';
import { Favorites } from 'src/types';

@Injectable()
export class DatabaseService implements Database {
  public user: User[] = [
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      login: 'hehe',
      password: 'hehe',
      version: 5,
      createdAt: 5,
      updatedAt: 5,
    },
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      login: 'ss',
      password: 'ss',
      version: 5,
      createdAt: 5,
      updatedAt: 5,
    },
  ];

  artist: Artist[] = [];

  album: Album[] = [];

  track: Track[] = [];

  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
