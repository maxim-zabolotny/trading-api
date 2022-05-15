import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { UsersRepositoryService } from './users.repository.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ])
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepositoryService,
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}
