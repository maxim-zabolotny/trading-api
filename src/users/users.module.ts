import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { UsersRepositoryService } from './users.repository.service';
import { AuthModule, AuthService } from '../auth';
import { JwtModule } from '@nestjs/jwt';
import { ConfirmationToken } from './entities/confirmation-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      ConfirmationToken
    ]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRES },
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepositoryService,
  ],
  exports: [
    UsersService,
  ],
})
export class UsersModule {
}
