import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { Contact } from '@/entities/contacts.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async searchByName(query: string) {
    return this.userRepository.find({
      where: { name: Like(query) },
      //   `name ILIKE '${query}%' OR name ILIKE '%${query}%'`,
    });
  }

  async searchByPhoneNumber(phoneNumber: string) {
    const results = await this.contactRepository.find({
      where: { phoneNumber },
    });
    return results;
  }
}
