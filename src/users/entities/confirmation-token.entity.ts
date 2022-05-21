import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities';

export enum ConfirmationTokenType {
  'email' = 1,
  'password' = 2,
}

@Entity({ name: 'confirmation-token' })
export class ConfirmationToken extends BaseEntity {
  @Column()
  public userId: number;

  @Column()
  public token: string;

  @Column()
  public type: string
}