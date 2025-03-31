import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { Photo } from 'src/photo/photo.entity';
import { Album } from './album.entity';
import { User } from './user.entity';
import { IUserRepository } from './users.repository.interface';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  private baseUrl: string | null;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl =
      this.configService.get<string>('BASE_URL') || 'https://default.url';
  }

  async getAll(): Promise<User[]> {
    const response = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/users`),
    );

    return response.data.map(
      (user: any) =>
        new User(
          user.id,
          user.name,
          user.username,
          user.email,
          null,
          user.phone,
          user.website,
          null,
        ),
    );
  }

  async getAlbumByUserId(id: string): Promise<Album[]> {
    const response = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/users/${id}/albums`),
    );

    return response.data.map(
      (album: any) => new Album(album.id, album.userId, album.title),
    );
  }

  async getUserByID(id: string): Promise<User> {
    const response = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/users/${id}`),
    );
    return new User(
      response.data.id,
      response.data.name,
      response.data.username,
      response.data.email,
      null,
      response.data.phone,
      response.data.website,
      null,
    );
  }

  async getPhotosByUserId(id: string): Promise<Photo[]> {
    const response = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/users/${id}/photos`),
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
}
