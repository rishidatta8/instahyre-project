import { Injectable } from '@nestjs/common';
import { ILike, Not, Repository } from 'typeorm';
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
    const loggedInUser: User = this.userContext.getCurrentUser();
    const users: User[] = await this.userRepository.find({
      where: { name: ILike(`%${query}%`) },
      order: { name: 'ASC' },
    });
    const contacts: Contact[] = await this.contactRepository.find({
      where: { name: ILike(`%${query}%`) },
      order: { name: 'ASC' },
    });

    // Sort users to prioritize exact matches
    const sortedRecords = [...users, ...contacts].sort((a, b) => {
      const startsWithA = (name) =>
        name.toLowerCase().startsWith(query.toLowerCase());
      if (startsWithA(a.name) && !startsWithA(b.name)) return -1;
      if (!startsWithA(a.name) && startsWithA(b.name)) return 1;
      return a.name.localeCompare(b.name);
    });

    return sortedRecords.map((user: User) =>
      Utils.mapToUserResponsePayload(
        user,
        this.includeEmail(loggedInUser, user),
      ),
    );
  }

  async searchByPhoneNumber(phoneNumber: string) {
    const loggedInUser: User = this.userContext.getCurrentUser();
    const user: User = await this.userRepository.findOne({
      where: { phoneNumber, id: Not(loggedInUser.id) },
    });
    if (user) {
      const includeEmail: boolean = this.includeEmail(loggedInUser, user);
      return Utils.mapToUserResponsePayload(user, includeEmail);
    }
    const results = await this.contactRepository.find({
      where: { phoneNumber },
      relations: {
        owner: true,
      },
    });
    return results.map((contact) => Utils.mapToUserResponsePayload(contact));
  }

  private includeEmail(loggedInUser: User, userToCheck: User): boolean {
    return loggedInUser.contacts.some(
      (contact) => contact.phoneNumber === userToCheck.phoneNumber,
    );
  }
}
