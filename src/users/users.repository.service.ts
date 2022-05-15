import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ICreateUser, IUpdateUser } from './interfaces';

@Injectable()
export class UsersRepositoryService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        email: email
      },
    });
  }

  async create(body: ICreateUser): Promise<User> {
    const user = this.usersRepository.create(body);
    return this.usersRepository.save(user);
  }

  async update(id: number, updateCollection: IUpdateUser) {
    return this.usersRepository.update(id, {
      ...updateCollection,
    });
  }

  async delete(id: number) {
    return this.usersRepository.softDelete(id);
  }
}
