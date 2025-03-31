export interface IPhotosRepository {
  delete(id: string): Promise<void>;
}
