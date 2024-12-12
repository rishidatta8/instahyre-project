import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '@/entities/contacts.entity';
import { User } from '@/entities/user.entity';
import { Utils } from '@/utils/common-utils';
import { UserContext } from '@/utils/user.context';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userContext: UserContext,
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
    await this.contactRepository.save(newContact);
    return Utils.mapToUserResponsePayload(newContact);
  }

  async markAsSpam(
    userId: string,
    phoneNumber: string,
    registeredSpamUserFound: boolean,
  ) {
    const contacts: Contact[] = await this.contactRepository.find({
      where: { phoneNumber },
    });
    if (contacts && contacts.length > 0) {
      for (const contact of contacts) {
        Utils.validateAndUpdateSpamContact(contact, userId, phoneNumber);
        await this.contactRepository.save(contact);
      }
    } else if (!registeredSpamUserFound) {
      const newSpamContact = this.contactRepository.create({
        name: 'Spam Contact',
        phoneNumber,
        spamCount: 1,
        markedBy: [userId],
      });
      await this.contactRepository.save(newSpamContact);
    }
  }

  async getContacts() {
    const loggedInUser: User = this.userContext.getCurrentUser();
    const contacts = await this.contactRepository.find({
      where: { owner: { id: loggedInUser.id } },
      relations: ['owner'],
    });
    return contacts.map((contact) => Utils.mapToUserResponsePayload(contact));
  }
}
