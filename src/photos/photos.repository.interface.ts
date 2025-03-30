import { Photo } from './photo.entity';

export interface IPhotosRepository {
  findAll(): Promise<Photo[]>;
  findOne(id: number): Promise<Photo | null>;
}
