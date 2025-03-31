export interface IPhotosRepository {
  delete(id: number): Promise<void>;
}
