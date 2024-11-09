import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './server/routes/user/user.module';
import { ArtistModule } from './server/routes/artist/artist.module';
import { AlbumModule } from './server/routes/album/album.module';
import { TrackModule } from './server/routes/track/track.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
