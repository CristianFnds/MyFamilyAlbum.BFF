import {
  Controller,
  Get,
  Inject,
  Param,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { IUserService } from './user.service.interface';

@Controller('user')
export class UserController {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
  ) {}

  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Get('myAlbums')
  async getMyAlbum(@Req() request: Request) {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Token não encontrado');
    }
    return this.userService.getAlbumByUserId(authHeader);
  }

  @Get(':userId/albums')
  async getAlbumByUserId(@Param('userId') userId: number) {
    return this.userService.getAlbumByUserId(userId);
  }

  @Get(':userId')
  async get(@Param('userId') userId: number) {
    return this.userService.getUserByID(userId);
  }
}
