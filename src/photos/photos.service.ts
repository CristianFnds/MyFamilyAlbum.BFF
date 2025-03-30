import { Inject, Injectable } from '@nestjs/common';
import { IPhotosRepository } from 'src/photos/photos.repository.interface';
import { IPhotosService } from 'src/photos/photos.service.interface';

@Injectable()
export class PhotosService implements IPhotosService {
  constructor(
    @Inject('IPhotosRepository')
    private readonly photosRepository: IPhotosRepository,
  ) {}

  async getAllPhotos() {
    return await this.photosRepository.findAll();
  }

  async getPhotoById(id: number) {
    return await this.photosRepository.findOne(id);
  }
}
