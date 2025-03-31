import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { IPhotosRepository } from './photos.repository.interface';

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

  async delete(id: string): Promise<void> {
    const response = await lastValueFrom(
      this.httpService.delete(`${this.baseUrl}/photos/${id}`),
    );
    if (response.status !== 200) {
      throw new Error(`Erro ao excluir foto: ${response.statusText}`);
    }
    return;
  }
}
