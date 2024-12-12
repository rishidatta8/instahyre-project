import { BasicAuthGuard } from '@/auth/auth-guard';
import { ContactsService } from '@/services/contacts.service';
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBasicAuth,
} from '@nestjs/swagger';

@ApiTags('Contacts')
@Controller('contacts')
@ApiBasicAuth()
@UseGuards(BasicAuthGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @ApiOperation({ summary: 'Add a new contact' })
  @ApiParam({
    name: 'userId',
    type: 'string',
    description: 'User id of user for whom contact is being added',
  })
  @ApiParam({
    name: 'contactDetails',
    type: 'object',
    description: 'The contact details (name, phoneNumber) of the new contact',
  })
  @ApiResponse({ status: 201, description: 'The contact has been added' })
  @Post(':userId/add')
  async addContact(
    @Param('userId') userId: string,
    @Body() contactDetails: { name: string; phoneNumber: string },
  ) {
    return await this.contactsService.addContact(userId, contactDetails);
  }

  @ApiOperation({ summary: 'Get all contacts for current logged in user' })
  @ApiResponse({ status: 200, description: 'The list of contacts' })
  @Get()
  async getContacts() {
    return await this.contactsService.getContacts();
  }
}
