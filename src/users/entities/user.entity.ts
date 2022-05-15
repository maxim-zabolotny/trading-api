import { BaseEntity } from 'src/common/entities';
import {
  Column,
  Entity,
  Index,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {

  @Index({
    unique: true,
  })
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: number;

  @Column({
    default: false,
  })
  isConfirmed: boolean;

  @Column({
    nullable: true,
  })
  firstName: string;

  @Column({
    nullable: true,
  })
  phone: string;
}
