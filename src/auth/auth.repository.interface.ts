import { User } from '../user/user.entity';

export interface IAuthRepository {
  findAll(): Promise<User[]>;
}
