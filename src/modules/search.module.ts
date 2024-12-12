import { SearchController } from '@/controllers/search.controller';
import { Contact } from '@/entities/contacts.entity';
import { User } from '@/entities/user.entity';
import { SearchService } from '@/services/search.service';
import { UserContext } from '@/utils/user.context';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Contact])],
  providers: [SearchService, UserContext],
  controllers: [SearchController],
})
export class SearchModule {}
