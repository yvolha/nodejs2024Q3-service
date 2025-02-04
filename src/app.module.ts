import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './server/routes/user/user.module';
import { ArtistModule } from './server/routes/artist/artist.module';
import { AlbumModule } from './server/routes/album/album.module';
import { TrackModule } from './server/routes/track/track.module';
import { FavsModule } from './server/routes/favs/favs.module';
import { DatabaseModule } from './database/database.module';
import { BaseModule } from './server/routes/base/base.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './server/routes/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavsModule,
    DatabaseModule,
    BaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
