import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { BaseModule } from 'src/server/shared/base.module';
import { BaseService } from 'src/server/shared/base.service';
import { AlbumController } from './album.controller';

@Module({
  imports: [
    DatabaseModule,
    BaseModule,
  ],
  controllers: [AlbumController],
  providers: [BaseService],
})
export class AlbumModule {}
