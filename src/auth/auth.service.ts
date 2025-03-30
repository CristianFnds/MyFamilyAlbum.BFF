import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from 'src/auth/auth.service.interface';
import { IUserRepository } from 'src/user/users.repository.interface';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(login: LoginDto) {
    const { email, password } = login;

    if (!email || !password) {
      throw new BadRequestException('Email e senha são obrigatórios');
    }

    const data = await this.userRepository.findAll();
    const user = data.find((x) => x.email == email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.generateToken(user.id, user.email, user.name);
  }

  private async generateToken(userId: number, email: string, name: string) {
    const payload = { userId, email, name };
    return this.jwtService.sign(payload);
  }
}
