import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IAuthService } from 'src/auth/auth.service.interface';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
  ) {}

  @Post('FakeLogin')
  async login(@Body() loginData: LoginDto) {
    return await this.authService.login(loginData);
  }
}
