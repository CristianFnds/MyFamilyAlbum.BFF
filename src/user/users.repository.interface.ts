import { Photo } from 'src/photo/photo.entity';
import { Album } from './album.entity';
import { User } from './user.entity';

export interface IUserRepository {
  getAll(): Promise<User[]>;
  getUserByID(id: string): Promise<User>;
  getPhotosByUserId(id: string): Promise<Photo[]>;
  getAlbumByUserId(id: string): Promise<Album[]>;
}
