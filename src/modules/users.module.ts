import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { UsersService } from '@/services/users.service';
import { UsersController } from '@/controllers/users.controller';
import { Contact } from '@/entities/contacts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Contact])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
