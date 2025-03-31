import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IAuthService } from 'src/auth/auth.service.interface';
import { IPhotosRepository } from 'src/photo/photos.repository.interface';
import { IUserService } from 'src/user/user.service.interface';
import { PhotosServiceImpl } from '../photos.service';

describe('PhotosService', () => {
  let photosService: PhotosServiceImpl;
  let photosRepository: IPhotosRepository;
  let authService: IAuthService;
  let userService: IUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhotosServiceImpl,
        {
          provide: 'IPhotosRepository',
          useValue: {
            delete: jest.fn(),
          },
        },
        {
          provide: 'IAuthService',
          useValue: {
            decodeToken: jest.fn(),
          },
        },
        {
          provide: 'IUserService',
          useValue: {
            getPhotosByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    photosService = module.get<PhotosServiceImpl>(PhotosServiceImpl);
    photosRepository = module.get<IPhotosRepository>('IPhotosRepository');
    authService = module.get<IAuthService>('IAuthService');
    userService = module.get<IUserService>('IUserService');
  });

  it('deve lançar UnauthorizedException se a foto não pertencer ao usuário', async () => {
    const photoId = 2;
    const reqPhotoId = 1;
    (authService.decodeToken as jest.Mock).mockReturnValue({ userId: 1 });
    (userService.getPhotosByUserId as jest.Mock).mockResolvedValue([
      { id: photoId },
    ]);

    await expect(
      photosService.deletePhoto(reqPhotoId, 'Bearer token'),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('deve chamar o repositório para deletar a foto se o usuário tiver permissão', async () => {
    const photoId = 1;
    const reqPhotoId = 2;

    (authService.decodeToken as jest.Mock).mockReturnValue({ userId: 1 });
    (userService.getPhotosByUserId as jest.Mock).mockResolvedValue([
      { id: photoId },
    ]);

    (photosRepository.delete as jest.Mock).mockResolvedValue(true);

    await expect(
      photosService.deletePhoto(photoId, 'Bearer token'),
    ).resolves.toBe(true);

    expect(photosRepository.delete).toHaveBeenCalledWith(1);
  });
});
