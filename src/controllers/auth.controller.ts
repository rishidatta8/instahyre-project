import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '@/services/auth.service';
import { RegisterUserRequestPayload } from '@/request-payloads/register-user-request.payload';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body()
    body: RegisterUserRequestPayload,
  ) {
    return await this.authService.register(body);
  }
}
