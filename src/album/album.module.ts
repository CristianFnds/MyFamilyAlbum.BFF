import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { AlbumController } from './album.controller';
import { AlbumRepositoryImpl } from './album.repository';
import { AlbumServiceImpl } from './album.service';

@Module({
  imports: [HttpModule, ConfigModule, AuthModule, forwardRef(() => UserModule)],
  controllers: [AlbumController],
  providers: [
    {
      provide: 'IAlbumService',
      useClass: AlbumServiceImpl,
    },
    {
      provide: 'IAlbumRepository',
      useClass: AlbumRepositoryImpl,
    },
  ],
  exports: ['IAlbumService', 'IAlbumRepository'],
})
export class AlbumModule {}
