import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payments } from './entities/payments.entity';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payments])
  ],
  exports: [PaymentsService],
  providers: [PaymentsService],
  controllers: [PaymentsController]
})
export class PaymentsModule {}
