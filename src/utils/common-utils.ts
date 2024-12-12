import { User } from '@/entities/user.entity';
import { UserResponsePayload } from '@/payloads/user-response.payload';

export class Utils {
  static mapToUserResponsePayload(user: User): UserResponsePayload {
    const { name, phoneNumber, email } = user;
    return { name, phoneNumber, email };
  }
}
