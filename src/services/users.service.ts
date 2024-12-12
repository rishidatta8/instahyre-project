import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { ContactsService } from './contacts.service';
import { UserContext } from '@/utils/user.context';
import { Utils } from '@/utils/common-utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly contactsService: ContactsService,
    private readonly userContext: UserContext,
  ) {}

  async markAsSpam(phoneNumber: string) {
    const loggedInUser: User = this.userContext.getCurrentUser();
    const user: User = await this.userRepository.findOne({
      where: { phoneNumber },
    });
    if (user) {
      Utils.validateAndUpdateSpamContact(user, loggedInUser.id, phoneNumber);
      await this.userRepository.save(user);
    }
    await this.contactsService.markAsSpam(loggedInUser.id, phoneNumber);
    return { message: `Marked ${phoneNumber} as spam successfully` };
  }
}
