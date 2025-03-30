import { LoginDto } from './dto/login.dto';

export interface IAuthService {
  login(LoginDto: LoginDto): Promise<any>;
}
