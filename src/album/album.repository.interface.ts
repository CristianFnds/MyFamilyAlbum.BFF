import { Album } from './album.entity';

export interface IAlbumRepository {
  getAllPhotosByAlbumID(albumId: string): Promise<Album[]>;
  delete(albumId: string): Promise<void>;
}
