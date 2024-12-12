import { Module } from '@nestjs/common';
import { AuthService } from '@/services/auth.service';
import { AuthController } from '@/controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
