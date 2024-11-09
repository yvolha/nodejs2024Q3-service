import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { BaseModule } from 'src/server/shared/base.module';
import { BaseService } from 'src/server/shared/base.service';
import { ArtistController } from './artist.controller';

@Module({
  imports: [DatabaseModule, BaseModule],
  controllers: [ArtistController],
  providers: [BaseService],
})
export class ArtistModule {}
