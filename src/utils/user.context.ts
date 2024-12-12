import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserContext {
  private currentUser: User | null = null;

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async setCurrentUser(userId: string): Promise<void> {
    const { id, name, phoneNumber, email, contacts } =
      await this.userRepo.findOne({
        where: { id: userId },
        relations: {
          contacts: true,
        },
      });
    this.currentUser = { id, name, phoneNumber, email, contacts };
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  clearCurrentUser(): void {
    this.currentUser = null;
  }
}
