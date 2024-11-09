import { Album } from 'src/server/routes/album/album.model';
import { Artist } from 'src/server/routes/artist/artist.model';
import { Track } from 'src/server/routes/track/track.model';
import { User } from 'src/server/routes/user/user.model';
import { Favorites } from 'src/types';

export interface Database {
  user: User[];
  artist: Artist[];
  album: Album[];
  track: Track[];
  favorites: Favorites[];
}
