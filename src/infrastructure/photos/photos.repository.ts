import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { Photo } from '../../domain/photos/photo.entity';
import { IPhotosRepository } from '../../domain/photos/photos.repository.interface';

@Injectable()
export class PhotosRepositoryImpl implements IPhotosRepository {
  private baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl =
      this.configService.get<string>('BASE_URL') || 'https://default.url';
  }

  async findAll(): Promise<Photo[]> {
    const response = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/photos`),
    );

    return response.data.map(
      (photo: any) =>
        new Photo(
          photo.id,
          photo.albumId,
          photo.title,
          photo.url,
          photo.thumbnailUrl,
        ),
    );
  }

  async findOne(id: number): Promise<Photo | null> {
    const response = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/photos/${id}`),
    );

    const photo = response.data;

    return photo
      ? new Photo(
          photo.id,
          photo.albumId,
          photo.title,
          photo.url,
          photo.thumbnailUrl,
        )
      : null;
  }
}
