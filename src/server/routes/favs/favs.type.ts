import { ApiResponseProperty } from '@nestjs/swagger';
import { Album } from '../album/album.model';
import { Artist } from '../artist/artist.model';
import { Track } from '../track/track.model';

export interface Favs {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export class FavsResponse {
  @ApiResponseProperty({
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Rihanna',
        grammy: true,
      },
    ],
  })
  artists: Artist[];
  @ApiResponseProperty({
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Forever and ever',
        year: 2024,
        artistId: null,
      },
    ],
  })
  albums: Album[];
  @ApiResponseProperty({
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'So lonely',
        artistId: null,
        albumId: '765e4567-1234-12d3-a456-426614174000',
        duration: 5,
      },
    ],
  })
  tracks: Track[];
}
