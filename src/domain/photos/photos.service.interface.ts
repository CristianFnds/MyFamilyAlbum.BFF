export interface IPhotosService {
  getAllPhotos(): Promise<any>;
  getPhotoById(id: number): Promise<any>;
}
