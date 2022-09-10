import { Module } from '@nestjs/common';
import { ExchangeRoutingController } from './exchangeRouting.controller';
import { ExchangeRoutingService } from './exchangeRouting.service';

@Module({
  imports: [],
  controllers: [ExchangeRoutingController],
  providers: [ExchangeRoutingService],
})
export class AppModule {}
