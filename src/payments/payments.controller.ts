import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';

@Controller('payments')
@ApiTags('Payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService
  ) {}

  @Post('/coinbase-webhook/charge-confirmed')
  public async CoinBaseWebhookChargeConfirmed(
    @Body() body: any,
  ): Promise<any> {
    return this.paymentsService.walletReplenishByCoinBaseConfirmed(body);
  }

}
