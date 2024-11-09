import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { BaseModule } from 'src/server/shared/base.module';
import { BaseService } from 'src/server/shared/base.service';
import { TrackController } from './track.controller';

@Module({
  imports: [
    DatabaseModule,
    BaseModule,
  ],
  controllers: [TrackController],
  providers: [BaseService],
})
export class TrackModule {}
