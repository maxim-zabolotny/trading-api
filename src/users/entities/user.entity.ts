import { BaseEntity } from 'src/common/entities';
import { Payments } from 'src/payments';
import {
  Column,
  Entity,
  Index,
  OneToMany,
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

  @OneToMany(() => Payments, (moneyTransfers) => moneyTransfers.user)
  public moneyTransfers: Payments[];
}
