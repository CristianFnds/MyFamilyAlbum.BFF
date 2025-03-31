import { Inject, Injectable } from '@nestjs/common';
import { IAlbumRepository } from 'src/album/album.repository.interface';
import { IUserService } from './user.service.interface';
import { IUserRepository } from './users.repository.interface';

@Injectable()
export class UserServiceImpl implements IUserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IAlbumRepository') private readonly albumService: IAlbumRepository,
  ) {}

  async getAll() {
    return await this.userRepository.getAll();
  }

  async getAlbumByUserId(userID: string) {
    return await this.userRepository.getAlbumByUserId(userID);
  }

  async getUserByID(id: string) {
    return await this.userRepository.getUserByID(id);
  }

  async getPhotosByUserId(id: string) {
    const albuns = await this.userRepository.getAlbumByUserId(id);
    const photosPromises = albuns.map((album) =>
      this.albumService.getAllPhotosByAlbumID(album.id.toString()),
    );
    const allPhotos = await Promise.all(photosPromises);
    return allPhotos.flat();
  }
}
