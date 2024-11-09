import { Album } from '../album/album.model';
import { Artist } from '../artist/artist.model';
import { Track } from '../track/track.model';

export interface Favs {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavsResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
