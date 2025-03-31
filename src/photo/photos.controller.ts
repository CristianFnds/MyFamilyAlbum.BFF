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
  async deletePhoto(@Param('id') albumId: number, @Req() request: Request) {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Token not found');
    }
    return this.photosService.deletePhoto(albumId, authHeader);
  }
}
