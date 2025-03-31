import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { IAlbumService } from './album.service.interface';

@Controller('album')
export class AlbumController {
  constructor(
    @Inject('IAlbumService') private readonly albumService: IAlbumService,
  ) {}

  @Get(':albumId/photos')
  async getAllPhotosByAlbumID(@Param('albumId') albumId: number) {
    return this.albumService.getAllPhotosByAlbumID(albumId);
  }

  @Delete(':albumId')
  async deletePhoto(
    @Param('albumId') albumId: number,
    @Req() request: Request,
  ) {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Token não encontrado');
    }
    return this.albumService.deleteAlbum(albumId, authHeader);
  }
}
