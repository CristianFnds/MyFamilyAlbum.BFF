import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PhotosController } from '../photos/photos.controller';
import { PhotosService } from '../photos/photos.service';
import { PhotosRepositoryImpl } from './photos.repository';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [PhotosController],
  providers: [
    {
      provide: 'IPhotosService',
      useClass: PhotosService,
    },
    {
      provide: 'IPhotosRepository',
      useClass: PhotosRepositoryImpl,
    },
  ],
})
export class PhotosModule {}
