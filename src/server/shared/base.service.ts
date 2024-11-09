import { Injectable } from '@nestjs/common';
import { ROUTES } from '../routes/routes.constant';
import { DatabaseService } from 'src/database/database.service';

// to handle Album, Artist, Track
@Injectable()
export class BaseService {
  constructor(private readonly databaseService: DatabaseService) {}
  
  getAll(route: ROUTES) {
    
  }
  
}
