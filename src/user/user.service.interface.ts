export interface IUserService {
  getAlbumByUserId(userId: number);
  getPhotosByUserId(id: number);
  getUserByID(id: number);
  getAll();
}
