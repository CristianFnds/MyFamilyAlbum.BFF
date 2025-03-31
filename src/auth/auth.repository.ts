import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

import { User } from 'src/user/user.entity';
import { IAuthRepository } from './auth.repository.interface';

@Injectable()
export class AuthRepositoryImpl implements IAuthRepository {
  private baseUrl: string | null;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl =
      this.configService.get<string>('BASE_URL') || 'https://default.url';
  }

  async findAll(): Promise<User[]> {
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
}
