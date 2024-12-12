import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { ContactsService } from './contacts.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly contactsService: ContactsService,
  ) {}

  async markAsSpam(userId: string, phoneNumber: string) {
    const user: User = await this.userRepository.findOne({
      where: { phoneNumber },
    });
    if (user) {
      user.spamCount = user.spamCount + 1;
      await this.userRepository.save(user);
    }
    await this.contactsService.markAsSpam(userId, phoneNumber);
    return { message: `Marked ${phoneNumber} as spam successfully` };
  }
}
