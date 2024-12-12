import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from '@/services/users.service';
import { BasicAuthGuard } from '@/auth/auth-guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBasicAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@ApiBasicAuth()
@UseGuards(BasicAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Mark a contact as spam' })
  @ApiBody({
    type: 'string',
    description: 'The phone number of the contact',
  })
  @ApiResponse({
    status: 200,
    description: 'The contact has been marked as spam',
  })
  @Post('/spam')
  async markAsSpam(@Body('phoneNumber') phoneNumber: string) {
    return this.usersService.markAsSpam(phoneNumber);
  }
}
