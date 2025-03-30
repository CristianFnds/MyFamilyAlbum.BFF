import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserRepositoryImpl } from '../user/user.repository';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepositoryImpl,
    },
  ],
  exports: ['IUserRepository'],
})
export class UserModule {}
