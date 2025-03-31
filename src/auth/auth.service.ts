import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from 'src/auth/auth.service.interface';
import { IAuthRepository } from './auth.repository.interface';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt/jwt.payload.class';

@Injectable()
export class AuthServiceImpl implements IAuthService {
  constructor(
    @Inject('IAuthRepository')
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(login: LoginDto) {
    const { email, password } = login;

    if (!email || !password) {
      throw new BadRequestException('Email e senha são obrigatórios');
    }
    const data = await this.authRepository.findAll();
    const user = data.find((x) => x.email == email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.generateToken(user.id, user.email, user.name);
  }

  decodeToken(token: string): JwtPayload {
    try {
      return this.jwtService.decode(token);
    } catch (error) {
      throw new Error('Erro ao decodificar o token');
    }
  }

  private async generateToken(userId: number, email: string, name: string) {
    const payload = { userId, email, name };
    return this.jwtService.sign(payload);
  }
}
