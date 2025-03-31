import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthService } from 'src/auth/auth.service.interface';
import { IUserService } from 'src/user/user.service.interface';
import { IAlbumRepository } from './album.repository.interface';
import { IAlbumService } from './album.service.interface';

@Injectable()
export class AlbumServiceImpl implements IAlbumService {
  constructor(
    @Inject('IAlbumRepository')
    private readonly albumRepository: IAlbumRepository,
    @Inject('IAuthService') private readonly authService: IAuthService,
    @Inject('IUserService') private readonly userService: IUserService,
  ) {}

  async getAllPhotosByAlbumID(albumId: number) {
    return await this.albumRepository.getAllPhotosByAlbumID(albumId);
  }

  async deleteAlbum(id: number, authHeader: string) {
    const token = authHeader.replace('Bearer ', '');
    const user = this.authService.decodeToken(token);

    const albums = await this.userService.getAlbumByUserId(user.userId);

    const albumExists = albums.some((album) => album.id == id);

    if (!albumExists) {
      throw new UnauthorizedException(
        'Album não encontrada ou não pertence ao usuário',
      );
    }

    return await this.albumRepository.delete(id);
  }
}
