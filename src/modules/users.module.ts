import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { UsersService } from '@/services/users.service';
import { UsersController } from '@/controllers/users.controller';
import { Contact } from '@/entities/contacts.entity';
import { ContactsService } from '@/services/contacts.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Contact])],
  providers: [UsersService, ContactsService],
  controllers: [UsersController],
})
export class UsersModule {}
