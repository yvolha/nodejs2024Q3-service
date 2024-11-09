import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

import { v4 } from 'uuid';
import { Track } from './track.model';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';



@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}

  getAll(): Track[] {
    return this.databaseService.track;
  }

  getOne(id: string): Track {
    return this.databaseService.track.find((entity) => entity.id === id);
  }

  createOne(
    dto: CreateTrackDto,
  ): Track {
    const newEntity = {
      id: v4(),
      ...dto,
    };

    this.databaseService.track.push(newEntity);

    return newEntity;
  }

  updateOne(
    id: string,
    dto: UpdateTrackDto,
  ): Track {
    const entity = this.databaseService.track.find(
      (entity) => entity.id === id,
    );

    const entityIndex = this.databaseService.track.findIndex(
      (entity) => entity.id === id,
    );

    if (!entity) {
      return null;
    }

    const updatedEntity = {
      ...entity,
      ...dto,
    };

    this.databaseService.track[entityIndex] = updatedEntity;

    return updatedEntity;
  }

  deleteOne(id: string) {
      this.databaseService.track = this.databaseService.track.filter(
        (track) => track.id !== id,
      );
    }
}
