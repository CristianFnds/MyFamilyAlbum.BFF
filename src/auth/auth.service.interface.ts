import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt/jwt.payload.class';

export interface IAuthService {
  login(LoginDto: LoginDto): Promise<any>;
  decodeToken(token: string): JwtPayload;
}
