import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { RegisterUserRequestPayload } from '@/payloads/register-user-request.payload';
import * as bcrypt from 'bcrypt';
import { UserResponsePayload } from '@/payloads/user-response.payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(
    userDetails: RegisterUserRequestPayload,
  ): Promise<UserResponsePayload> {
    const hashedPassword: string = await bcrypt.hash(userDetails.password, 10);
    userDetails.password = hashedPassword;
    const newUser: User = this.userRepository.create(userDetails);
    await this.userRepository.save(newUser);
    const userResponsePyaload: UserResponsePayload =
      this.mapToUserResponsePayload(newUser);
    return userResponsePyaload;
  }

  async validateUser(
    phoneNumber: string,
    password: string,
  ): Promise<UserResponsePayload> {
    const user = await this.userRepository.findOne({ where: { phoneNumber } });
    if (user && (await bcrypt.compare(password, user.password)))
      return this.mapToUserResponsePayload(user);
    return null;
  }

  private mapToUserResponsePayload(user: User): UserResponsePayload {
    const { name, phoneNumber, email } = user;
    return { name, phoneNumber, email };
  }
}
