import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
