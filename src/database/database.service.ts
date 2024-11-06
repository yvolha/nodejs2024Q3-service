import { Injectable } from '@nestjs/common';

import { Database } from "./database.type";

@Injectable()
export class DatabaseService implements Database {

  public users = [{
        id: 'hehe',
      login: 'hehe',
      password: 'hehe',
      version: 5,
      createdAt: 5,
      updatedAt: 5,
      }, {
        id: 'ss',
      login: 'ss',
      password: 'ss',
      version: 5,
      createdAt: 5,
      updatedAt: 5,
      }];

  artists = [];

  albums = [];

  tracks = [];

  favorites = [];
}
