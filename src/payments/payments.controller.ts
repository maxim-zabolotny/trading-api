import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService
  ) {}

  @ApiOperation({ summary: 'Coinbase Webhook charge:confirmed' })
  @Post('/coinbase-webhook/charge-confirmed')
  public async CoinBaseWebhookChargeConfirmed(
    @Body() body: any,
  ): Promise<any> {
    return this.paymentsService.walletReplenishByCoinBaseConfirmed(body);
  }

}
