import { User } from '@/entities/user.entity';
import { UserResponsePayload } from '@/payloads/user-response.payload';

export class Utils {
  static mapToUserResponsePayload(
    user: User,
    includeEmail?: boolean,
  ): UserResponsePayload {
    const { id, name, phoneNumber, email } = user;
    if (includeEmail) return { id, name, phoneNumber, email };
    return { id, name, phoneNumber };
  }
}
