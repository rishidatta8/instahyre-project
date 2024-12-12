import { User } from '@/entities/user.entity';
import { UserContext } from '@/utils/user.context';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(
    private readonly userContext: UserContext,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return false;
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'utf-8',
    );
    const [phoneNumber, password] = credentials.split(':');

    if (!phoneNumber || !password) {
      return false;
    }

    const user = await this.userRepository.findOne({
      where: { phoneNumber },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return false;
    }

    await this.userContext.setCurrentUser(user.id);
    return true;
  }
}
