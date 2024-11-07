import { User } from "src/server/user/user.type";
import { Album, Artist, Favorites, Track } from "src/types";

export interface Database {
  users: User[];
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  favorites: Favorites[];
}