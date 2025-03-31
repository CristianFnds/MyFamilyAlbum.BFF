import {
  Controller,
  Delete,
  Inject,
  Param,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { IPhotosService } from './photos.service.interface';

@Controller('photos')
export class PhotosController {
  constructor(
    @Inject('IPhotosService') private readonly photosService: IPhotosService,
  ) {}

  @Delete(':id')
  async deletePhoto(@Param('id') albumId: string, @Req() request: Request) {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Token não encontrado');
    }
    return this.photosService.deletePhoto(albumId, authHeader);
  }
}
