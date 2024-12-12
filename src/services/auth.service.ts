import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { RegisterUserRequestPayload } from '@/payloads/register-user-request.payload';
import * as bcrypt from 'bcrypt';
import { UserResponsePayload } from '@/payloads/user-response.payload';
import { Utils } from '@/utils/common-utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(
    userDetails: RegisterUserRequestPayload,
  ): Promise<UserResponsePayload> {
    const existingUser: User = await this.userRepository.findOne({
      where: { phoneNumber: userDetails.phoneNumber },
    });
    if (existingUser)
      throw new BadRequestException(
        'Cannot add two users with the same phone number.',
      );
    const hashedPassword: string = await bcrypt.hash(userDetails.password, 10);
    userDetails.password = hashedPassword;
    const newUser: User = this.userRepository.create(userDetails);
    await this.userRepository.save(newUser);
    const userResponsePyaload: UserResponsePayload =
      Utils.mapToUserResponsePayload(newUser);
    return userResponsePyaload;
  }

  async validateUser(
    phoneNumber: string,
    password: string,
  ): Promise<UserResponsePayload> {
    const user = await this.userRepository.findOne({ where: { phoneNumber } });
    if (user && (await bcrypt.compare(password, user.password)))
      return Utils.mapToUserResponsePayload(user);
    return null;
  }
}
