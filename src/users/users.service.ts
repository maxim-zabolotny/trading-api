import { Injectable } from '@nestjs/common';
import { UsersRepositoryService } from './users.repository.service';
import { ICreateUser } from './interfaces';
import { User } from './entities';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepositoryService: UsersRepositoryService,
  ) {
  }

  async findById(id: number): Promise<User> {
    return this.userRepositoryService.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepositoryService.findByEmail(email);
  }

  async createUser(body: ICreateUser): Promise<boolean> {
    return !!await this.userRepositoryService.create(body)
  }

}
