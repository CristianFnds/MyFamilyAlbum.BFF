import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
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
