import { Module } from '@nestjs/common';
import { PaymentsService } from '.';

@Module({
  providers: [PaymentsService]
})
export class PaymentsModule {}
