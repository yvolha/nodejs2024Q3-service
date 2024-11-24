import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { FavsResponse } from './favs.type';
import { NIL } from 'uuid';

@Injectable()
export class FavsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<FavsResponse> {
    const favs = await this.databaseService.favs.findUnique({
      where: { id: NIL },
      select: {
        tracks: {
          select: {
            id: true,
            name: true,
            artistId: true,
            albumId: true,
            duration: true,
          },
        },
        artists: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
        albums: {
          select: {
            id: true,
            name: true,
            year: true,
            artistId: true,
          },
        },
      },
    });

    if (!favs) {
      return await this.databaseService.favs.create({
        data: {
          id: NIL,
        },
        select: {
          tracks: {
            select: {
              id: true,
              name: true,
              artistId: true,
              albumId: true,
              duration: true,
            },
          },
          artists: {
            select: {
              id: true,
              name: true,
              grammy: true,
            },
          },
          albums: {
            select: {
              id: true,
              name: true,
              year: true,
              artistId: true,
            },
          },
        },
      });
    }

    return favs;
  }

  async addToFavs(id: string, field: string) {
    try {
      return await this.databaseService[field]?.update({
        where: {
          id: id,
        },
        data: {
          favoritesId: NIL,
        },
      });
    } catch (e) {
      console.log(e)
    }
    
  }

  async deleteFromFavs(id: string, field: string) {
    return await this.databaseService[field]?.update({
      where: {
        id: id,
      },
      data: {
        favoritesId: null,
      },
    });
  }
}
