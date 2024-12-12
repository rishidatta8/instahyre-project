import { Controller, Post, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from '@/services/users.service';
import { BasicAuthGuard } from '@/auth/auth-guard';

@Controller('users')
@UseGuards(BasicAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(':userId/spam')
  async markAsSpam(
    @Param('userId') userId: string,
    @Body('phoneNumber') phoneNumber: string,
  ) {
    return this.usersService.markAsSpam(userId, phoneNumber);
  }
}
