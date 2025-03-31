export interface IPhotosService {
  deletePhoto(id: string, authHeader: string): Promise<void>;
}
