import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { Contact } from '@/entities/contacts.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async markAsSpam(userId: string, phoneNumber: string) {
    const contact = await this.contactRepository.findOne({
      where: { phoneNumber },
    });
    if (contact) {
      contact.isSpam = true;
      return this.contactRepository.save(contact);
    } else {
      const newSpamContact = this.contactRepository.create({
        name: 'Unknown',
        phoneNumber,
        isSpam: true,
        owner: { id: userId } as User,
      });
      return this.contactRepository.save(newSpamContact);
    }
  }
}
