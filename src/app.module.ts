import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { PhotosModule } from './photos/photos.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), PhotosModule, UserModule, AuthModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Aplica a todas as rotas
  }
}
