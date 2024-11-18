

import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAlbumDto, UpdateAlbumDto } from '../album/album.dto';
import { CreateArtistDto, UpdateArtistDto } from '../artist/artist.dto';
import { CreateTrackDto, UpdateTrackDto } from '../track/track.dto';
import { Artist } from '../artist/artist.model';
import { Album } from '../album/album.model';
import { Track } from '../track/track.model';

@Injectable()
export class BaseService {
  constructor(private databaseService: DatabaseService) {}

  async getAll(field: string): Promise<Artist[] | Album[] | Track[]> {
    return await this.databaseService[field].findMany();
  }

  async getOne(id: string, field: string): Promise<Artist | Album | Track> {
    return await this.databaseService[field].findUnique({
      where: {
        id,
      },
    });
  }

  async createOne(
    data: CreateAlbumDto | CreateArtistDto | CreateTrackDto,
    field: string,
  ): Promise<Artist | Album | Track> {
    console.log('!!!!!!!!!!!!!!', data)
    return await this.databaseService[field].create({
      data,
    });
  }

  async updateOne(
    id: string,
    data: UpdateAlbumDto | UpdateArtistDto | UpdateTrackDto,
    field: string,
  ): Promise<Artist | Album | Track> {
    return await this.databaseService[field].update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteOne(id: string, field: string) {
    return await this.databaseService[field].delete({
      where: {
        id,
      },
    });
  }
}
