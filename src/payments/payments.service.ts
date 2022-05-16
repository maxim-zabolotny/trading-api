import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  constructor() {
  }

  async walletReplenishByCoinBaseConfirmed(body): Promise<any> {
    if (body && body.event && body.event.data && body.event.data.id) {
      const { metadata, id } = body.event.data;
      const event = body.event.type;
      const { userId, quantity } = metadata;

      if (event == 'charge:confirmed') {
        return this.walletReplenish({
          quantity,
          userId,
          txId: id,
          txService: 'coinBase',
        });
      }
    }
  }

  async walletReplenish(
    walletReplenishDto: WalletReplenishDto,
  ): Promise<WallerReplenishResponse> {
    const { quantity, wallet, txId, txService } = walletReplenishDto;

    if (!user) throw new NotFoundException('User not found');

    const transfer = {
      userId: user.id,
      coinCounts: Number(quantity),
      transferCLBIStatus: false,
      txId: txId,
      txService: txService,
    };

    const {
      id,
      coinCounts,
    } = await this.moneyTransferService.createUserTransfer(transfer);

    const transferCLBI = await this.blockchainService.sendCoins({
      walletAddress: user.wallet,
      moneyTransferId: id,
      count: coinCounts,
      isFirstDeposit: user.isFirstDeposit,
    });

    if (!transferCLBI.status)
      throw new BadRequestException('Transaction failed');

    const newBalance = await this.blockchainService.getBalance(
      convertAdreessClbiToEth(user.wallet),
    );

    //const newBalance = Number(user.balance) + Number(quantity);
    const currencyCLBI = (await presaleInfo()).value;

    await this.refererPayment(user, Number(quantity), currencyCLBI);

    const { refPercent, tariffPlan } = this.checkBalance(
      newBalance,
      currencyCLBI,
    );
    let updateUser = {
      ...user,
      balance: newBalance,
      refPercent: refPercent,
      tariffPlan: tariffPlan,
      isFreeSpin: true,
    };

    if (user.isFirstDeposit) {
      updateUser = { ...updateUser, isFirstDeposit: false };
    }

    await this.userRepository.update(user.id, updateUser);

    const data = { count: quantity, type: 'replenished' };

    await this.informerService.sendNotification(user.id, data);

    return {
      walletAddress: user.wallet,
      moneyTransferId: 2,
      clbiCounts: 2,
    };
  }

}
