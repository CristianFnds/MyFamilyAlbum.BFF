import { Controller, Get, Inject, Param } from '@nestjs/common';
import { IPhotosService } from 'src/domain/photos/photos.service.interface';

@Controller('photos')
export class PhotosController {
  constructor(
    @Inject('IPhotosService') private readonly photosService: IPhotosService,
  ) {}

  @Get()
  async getAllPhotos() {
    return this.photosService.getAllPhotos();
  }

  @Get(':id')
  async getPhotoById(@Param('id') id: number) {
    return this.photosService.getPhotoById(id);
  }
}
