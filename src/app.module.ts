import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
// import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/song.entity';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Artist } from './artists/entities/artist.entity';
import { PlayList } from './playlists/entities/playlist.entity';
import { PlaylistsModule } from './playlists/playlists.module';

// const devConfig = { port: 3000 }
// const proConfig = { port: 400 }
@Module({
  imports: [
    SongsModule,
    TypeOrmModule.forRoot({
      type:'mysql',
      database: 'spotify',
      host: 'localhost',
      port: 3306,
      username: 'dbreadonly',
      password: 'Truongwf0701',
      entities: [Song, User, Artist, PlayList],
      synchronize: true,
    }),
    ArtistsModule,
    UsersModule,
    PlaylistsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: DevConfigService,
    //   useClass: DevConfigService,
    // },
    // {
    //   provide: 'CONFIG',
    //   useFactory: () => {
    //     return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
    //   }
    // },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource){
    console.log(`DBName: ${this.dataSource.driver.database}`)
  }
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); option 1
    // consumer.apply(LoggerMiddleware).forRoutes({path: 'songs', method: RequestMethod.POST}); option 2

    consumer.apply(LoggerMiddleware).forRoutes(SongsController); // option 3
  }
}
