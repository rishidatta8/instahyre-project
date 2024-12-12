import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '@/services/auth.service';
import { RegisterUserRequestPayload } from '@/payloads/register-user-request.payload';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: RegisterUserRequestPayload,
  })
  @Post('register')
  async register(
    @Body()
    body: RegisterUserRequestPayload,
  ) {
    return await this.authService.register(body);
  }
}
