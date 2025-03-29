import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PhotosRepositoryImpl } from 'src/infrastructure/photos/photos.repository';
import { PhotosService } from '../application/photos/photos.service';
import { PhotosController } from '../controllers/photos.controller';

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
