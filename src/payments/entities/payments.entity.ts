import { BaseEntity } from 'src/common/entities';
import { User } from 'src/users';
import {
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';

@Entity('payments')
export class Payments extends BaseEntity {

  @Column({ type: 'numeric' })
  price: number;

  @Column({ default: false })
  status: boolean;

  @Column({ nullable: true })
  txId: string;

  @Column({ nullable: true })
  txService: string;

  @ManyToOne(({}) => User, (users) => users.moneyTransfers, {
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION',
    createForeignKeyConstraints: false,
  })
  user: User;
}
