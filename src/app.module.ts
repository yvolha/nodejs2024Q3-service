import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './server/routes/user/user.module';
import { ArtistModule } from './server/routes/artist/artist.module';
import { AlbumModule } from './server/routes/album/album.module';
import { TrackModule } from './server/routes/track/track.module';
import { FavsModule } from './server/routes/favs/favs.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    UserModule, 
    ArtistModule,
    AlbumModule, 
    TrackModule, 
    FavsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
