import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ExchangeRoutingService } from './exchangeRouting.service';
import { Exchanges } from './types';

@Controller()
export class ExchangeRoutingController {
  constructor(private readonly service: ExchangeRoutingService) {}

  @Get('exchange-routing')
  async getExhangeRouting(@Query() query: { amount: string }): Promise<{
    btcAmount: number;
    usdAmount: number;
    exchange: Exchanges;
  }> {
    const btcAmount = parseFloat(query.amount);
    let bestPrice;

    try {
      bestPrice = await this.service.getExchangeRouting(btcAmount);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      btcAmount,
      usdAmount: bestPrice.price,
      exchange: bestPrice.exchange,
    };
  }
}
