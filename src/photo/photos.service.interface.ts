export interface IPhotosService {
  deletePhoto(id: number, authHeader: string): Promise<void>;
}
