export interface IAlbumService {
  getAllPhotosByAlbumID(albumId: number): Promise<any>;
  deleteAlbum(id: number, authHeader: string): Promise<void>;
}
