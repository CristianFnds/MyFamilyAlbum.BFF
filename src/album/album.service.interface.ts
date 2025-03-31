export interface IAlbumService {
  getAllPhotosByAlbumID(albumId: string): Promise<any>;
  deleteAlbum(id: string, authHeader: string): Promise<void>;
}
