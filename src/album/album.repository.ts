import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { Photo } from 'src/photo/photo.entity';
import { IAlbumRepository } from './album.repository.interface';

@Injectable()
export class AlbumRepositoryImpl implements IAlbumRepository {
  private baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl =
      this.configService.get<string>('BASE_URL') || 'https://default.url';
  }

  async getAllPhotosByAlbumID(albumId: number): Promise<Photo[]> {
    const response = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/album/${albumId}/photos`),
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

  async delete(id: number): Promise<void> {
    const response = await lastValueFrom(
      this.httpService.delete(`${this.baseUrl}/albums/${id}`),
    );
    if (response.status !== 200) {
      throw new Error(`Error deleting photo: ${response.statusText}`);
    }
    return;
  }
}
