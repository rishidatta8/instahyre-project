import { Controller, Post, Param, Body } from '@nestjs/common';
import { UsersService } from '@/services/users.service';

@Controller('users')
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
