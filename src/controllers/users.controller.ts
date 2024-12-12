import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from '@/services/users.service';
import { BasicAuthGuard } from '@/auth/auth-guard';

@Controller('users')
@UseGuards(BasicAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/spam')
  async markAsSpam(@Body('phoneNumber') phoneNumber: string) {
    return this.usersService.markAsSpam(phoneNumber);
  }
}
