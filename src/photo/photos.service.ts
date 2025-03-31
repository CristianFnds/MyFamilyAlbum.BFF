import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthService } from 'src/auth/auth.service.interface';
import { IPhotosRepository } from 'src/photo/photos.repository.interface';
import { IPhotosService } from 'src/photo/photos.service.interface';
import { IUserService } from 'src/user/user.service.interface';

@Injectable()
export class PhotosServiceImpl implements IPhotosService {
  constructor(
    @Inject('IPhotosRepository')
    private readonly photosRepository: IPhotosRepository,
    @Inject('IAuthService') private readonly authService: IAuthService,
    @Inject('IUserService') private readonly userService: IUserService,
  ) {}

  async deletePhoto(id: number, authHeader: string) {
    const token = authHeader.replace('Bearer ', '');
    const user = this.authService.decodeToken(token);

    const photosUser = await this.userService.getPhotosByUserId(user.userId);

    const photoExists = photosUser.some((photo) => photo.id == id);

    if (!photoExists) {
      throw new UnauthorizedException(
        'Photo not found or does not belong to the user.',
      );
    }

    return await this.photosRepository.delete(id);
  }
}
