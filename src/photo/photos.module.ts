import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { PhotosController } from './photos.controller';
import { PhotosRepositoryImpl } from './photos.repository';
import { PhotosServiceImpl } from './photos.service';

@Module({
  imports: [HttpModule, ConfigModule, AuthModule, UserModule],
  controllers: [PhotosController],
  providers: [
    {
      provide: 'IPhotosService',
      useClass: PhotosServiceImpl,
    },
    {
      provide: 'IPhotosRepository',
      useClass: PhotosRepositoryImpl,
    },
  ],
})
export class PhotosModule {}
