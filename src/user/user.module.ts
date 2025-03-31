import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlbumModule } from 'src/album/album.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepositoryImpl } from '../user/user.repository';
import { UserController } from './user.controller';
import { UserServiceImpl } from './user.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    AuthModule,
    forwardRef(() => AlbumModule),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserService',
      useClass: UserServiceImpl,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepositoryImpl,
    },
  ],
  exports: ['IUserService', 'IUserRepository'],
})
export class UserModule {}
