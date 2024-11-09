import { User } from 'src/server/routes/user/user.model';
import { Album, Artist, Favorites, Track } from 'src/types';

export interface Database {
  user: User[];
  artist: Artist[];
  album: Album[];
  track: Track[];
  favorites: Favorites[];
}
