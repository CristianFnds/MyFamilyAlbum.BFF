import { Photo } from 'src/photo/photo.entity';
import { Album } from './album.entity';
import { User } from './user.entity';

export interface IUserRepository {
  getAll(): Promise<User[]>;
  getUserByID(id: number): Promise<User>;
  getPhotosByUserId(id: number): Promise<Photo[]>;
  getAlbumByUserId(id: number): Promise<Album[]>;
}
