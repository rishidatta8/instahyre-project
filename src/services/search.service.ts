import { Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { Contact } from '@/entities/contacts.entity';
import { Utils } from '@/utils/common-utils';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async searchByName(query: string) {
    const users: User[] = await this.userRepository.find({
      where: { name: ILike(`%${query}%`) },
      order: { name: 'ASC' },
    });

    // Sort users to prioritize exact matches
    return users
      .sort((a, b) => {
        if (a.name.toLowerCase() === query.toLowerCase()) return -1;
        if (b.name.toLowerCase() === query.toLowerCase()) return 1;
        return a.name.localeCompare(b.name);
      })
      .map((user: User) => Utils.mapToUserResponsePayload(user));
  }

  async searchByPhoneNumber(phoneNumber: string) {
    const results = await this.contactRepository.find({
      where: { phoneNumber },
    });
    return results;
  }
}
