import { Injectable } from '@nestjs/common';

import { Database } from './database.type';

@Injectable()
export class DatabaseService implements Database {
  public users = [
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      login: 'hehe',
      password: 'hehe',
      version: 5,
      createdAt: 5,
      updatedAt: 5,
    },
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      login: 'ss',
      password: 'ss',
      version: 5,
      createdAt: 5,
      updatedAt: 5,
    },
  ];

  artists = [];

  albums = [];

  tracks = [];

  favorites = [];
}
