import { ContactsService } from '@/services/contacts.service';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post(':userId/add')
  async addContact(
    @Param('userId') userId: string,
    @Body() contactDetails: { name: string; phoneNumber: string },
  ) {
    return this.contactsService.addContact(userId, contactDetails);
  }

  @Get(':userId')
  async getContacts(@Param('userId') userId: string) {
    return this.contactsService.getContacts(userId);
  }
}
