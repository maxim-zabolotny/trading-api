import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payments } from './entities/payments.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payments)
    private paymentsRepository: Repository<Payments>,
  ) {
  }

  async walletReplenishByCoinBaseConfirmed(body): Promise<any> {
    if (body && body.event && body.event.data && body.event.data.id) {
      const { metadata, id } = body.event.data;
      const event = body.event.type;
      const { userId, quantity } = metadata;

      if (event == 'charge:confirmed') {
        return this.paymentsRepository.save({
          quantity,
          userId,
          txId: id,
          txService: 'coinBase',
          status: true,
        });
      }
    }
  }

  // async walletReplenish(
  //   body: IReplenish,
  // ): Promise<any> {
  //   const { quantity, wallet, txId, txService } = body;
  //
  //   const transfer = {
  //     userId: user.id,
  //     coinCounts: Number(quantity),
  //     transferCLBIStatus: false,
  //     txId: txId,
  //     txService: txService,
  //   };
  //
  //   const {
  //     id,
  //     coinCounts,
  //   } = await this.moneyTransferService.createUserTransfer(transfer);
  //
  //   let updateUser = {
  //     ...user,
  //     balance: newBalance,
  //     refPercent: refPercent,
  //     tariffPlan: tariffPlan,
  //     isFreeSpin: true,
  //   };
  //
  //   if (user.isFirstDeposit) {
  //     updateUser = { ...updateUser, isFirstDeposit: false };
  //   }
  //
  //   await this.userRepository.update(user.id, updateUser);
  //
  //   const data = { count: quantity, type: 'replenished' };
  //
  //
  //   return {
  //     walletAddress: user.wallet,
  //     moneyTransferId: 2,
  //     clbiCounts: 2,
  //   };
  // }
}
