import { Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { Contact } from '@/entities/contacts.entity';
import { Utils } from '@/utils/common-utils';
import { UserContext } from '@/utils/user.context';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly userContext: UserContext,
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
    const user: User = await this.userRepository.findOne({
      where: { phoneNumber },
    });
    if (user) {
      const loggedInUser: User = this.userContext.getCurrentUser();
      const includeEmail: boolean = loggedInUser.contacts.some(
        (contact) => contact.phoneNumber === user.phoneNumber,
      );
      return Utils.mapToUserResponsePayload(user, includeEmail);
    }
    const results = await this.contactRepository.find({
      where: { phoneNumber },
      relations: {
        owner: true,
      },
    });
    return results;
  }
}
