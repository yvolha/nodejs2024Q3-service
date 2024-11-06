import { Album, Artist, Favorites, Track, User } from "src/types";

export interface Database {
  users: User[];
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  favorites: Favorites[];
}