import { Module } from '@nestjs/common';
import { AuthModule } from '@/modules/auth.module';
import { UsersModule } from '@/modules/users.module';
import { SearchModule } from '@/modules/search.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ContactsModule } from './modules/contacts.module';
import { Contact } from './entities/contacts.entity';
import { User } from './entities/user.entity';
import { UserContext } from './utils/user.context';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'contacts-directory',
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Contact],
    }),
    AuthModule,
    UsersModule,
    SearchModule,
    ContactsModule,
  ],
  providers: [UserContext],
})
export class AppModule {}
