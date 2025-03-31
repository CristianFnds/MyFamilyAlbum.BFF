import { Album } from './album.entity';

export interface IAlbumRepository {
  getAllPhotosByAlbumID(albumId: number): Promise<Album[]>;
  delete(albumId: number): Promise<void>;
}
