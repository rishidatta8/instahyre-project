import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '@/entities/contacts.entity';
import { User } from '@/entities/user.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addContact(
    userId: string,
    contactDetails: { name: string; phoneNumber: string },
  ) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const newContact = this.contactRepository.create({
      ...contactDetails,
      owner: user,
    });
    return this.contactRepository.save(newContact);
  }

  async markAsSpam(userId: string, phoneNumber: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    let contact = await this.contactRepository.findOne({
      where: { phoneNumber, owner: user },
    });
    if (!contact) {
      contact = this.contactRepository.create({
        name: 'Unknown',
        phoneNumber,
        isSpam: true,
        owner: user,
      });
    } else {
      contact.isSpam = true;
    }
    return this.contactRepository.save(contact);
  }

  async getContacts(userId: string) {
    return this.contactRepository.find({
      where: { owner: { id: userId } },
      relations: ['owner'],
    });
  }
}
