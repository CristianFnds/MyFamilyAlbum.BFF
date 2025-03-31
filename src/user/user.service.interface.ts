export interface IUserService {
  getAlbumByUserId(userId: string);
  getPhotosByUserId(id: string);
  getUserByID(id: string);
  getAll();
}
