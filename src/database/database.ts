import { Injectable } from '@nestjs/common';

import { Database } from "./database.type";

@Injectable()
export class DATABASE implements Database {
  users: [];
  artists: [];
  albums: [];
  tracks: [];
  favorites: [];
}
