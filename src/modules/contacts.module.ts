import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from '@/entities/contacts.entity';
import { User } from '@/entities/user.entity';
import { ContactsController } from '@/controllers/contacts.controller';
import { ContactsService } from '@/services/contacts.service';
import { UserContext } from '@/utils/user.context';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, User])],
  providers: [ContactsService, UserContext],
  controllers: [ContactsController],
})
export class ContactsModule {}
