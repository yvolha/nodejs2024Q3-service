import { Module } from '@nestjs/common';
import { BaseService } from './base.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [BaseService],
  exports: [BaseService],
})
export class BaseModule {}
