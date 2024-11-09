import { Inject, Module } from '@nestjs/common';
import { BaseService } from './base.service';
import { DatabaseModule } from 'src/database/database.module';
import { ROUTES } from '../routes/routes.constant';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [DatabaseModule],
  providers: [BaseService, DatabaseService],
  exports: [BaseService],
})
export class BaseModule {}
