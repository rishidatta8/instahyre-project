import { Contact } from '@/entities/contacts.entity';
import { User } from '@/entities/user.entity';
import { UserResponsePayload } from '@/payloads/user-response.payload';
import { BadRequestException } from '@nestjs/common';

export class Utils {
  static mapToUserResponsePayload(
    user: User,
    includeEmail?: boolean,
  ): UserResponsePayload {
    const { name, phoneNumber, email, spamCount } = user;
    if (includeEmail) return { name, phoneNumber, email, spamCount };
    return { name, phoneNumber, spamCount };
  }

  static validateAndUpdateSpamContact(
    contact: User | Contact,
    userId: string,
    phoneNumber: string,
  ): void {
    if (contact.markedBy?.includes(userId)) {
      throw new BadRequestException(`${phoneNumber} is already marked as spam`);
    }
    contact.markedBy.push(userId);
    contact.spamCount += 1;
  }
}
