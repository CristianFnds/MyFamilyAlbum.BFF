import { Inject, Injectable } from '@nestjs/common';
import { IPhotosService } from 'src/domain/photos/photos.service.interface';
import { IPhotosRepository } from 'src/domain/photos/photos.repository.interface';

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
