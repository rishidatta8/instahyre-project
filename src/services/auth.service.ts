import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { RegisterUserRequestPayload } from '@/request-payloads/register-user-request.payload';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(userDetails: RegisterUserRequestPayload) {
    const hashedPassword: string = await bcrypt.hash(userDetails.password, 10);
    userDetails.password = hashedPassword;
    const newUser = this.userRepository.create(userDetails);
    return this.userRepository.save(newUser);
  }

  async validateUser(phoneNumber: string, password: string) {
    const user = await this.userRepository.findOne({ where: { phoneNumber } });
    if (user && (await bcrypt.compare(password, user.password))) return user;
    return null;
  }
}
