import { Injectable, Logger } from '@nestjs/common';

import {
  getBinanceAskOrderBook,
  getCoinbaseAskOrderBook,
  getKrakenAskOrderBook,
} from './assets';
import { findAskPriceFromOrderBook as findAskPrice } from './helpers';
import { Exchanges } from './types';

@Injectable()
export class ExchangeRoutingService {
  private readonly logger = new Logger(ExchangeRoutingService.name);

  async getExchangeRouting(
    amount: number,
  ): Promise<{ exchange: Exchanges; price: number }> {
    const [binanceOrderBook, coinbaseOrderBook, krakenOrderBook] =
      await Promise.all([
        getBinanceAskOrderBook(),
        getCoinbaseAskOrderBook(),
        getKrakenAskOrderBook(),
      ]);

    this.logger.debug({
      binanceOrderBook: binanceOrderBook.slice(0, 3),
      coinbaseOrderBook: coinbaseOrderBook.slice(0, 3),
      krakenOrderBook: krakenOrderBook.slice(0, 3),
    });

    const prices = {
      [Exchanges.BINANCE]: findAskPrice(
        amount,
        binanceOrderBook,
        Exchanges.BINANCE,
      ),
      [Exchanges.COINBASE]: findAskPrice(
        amount,
        coinbaseOrderBook,
        Exchanges.COINBASE,
      ),
      [Exchanges.KRAKEN]: findAskPrice(
        amount,
        krakenOrderBook,
        Exchanges.KRAKEN,
      ),
    };

    const [exchange, bestPrice] = Object.entries(prices).sort(
      ([, price1], [, price2]) => price1 - price2,
    )[0];

    this.logger.debug({
      prices,
      exchange,
      bestPrice,
    });

    return {
      price: bestPrice,
      exchange: exchange as Exchanges, // this is due to Object.entries not being properly typed
    };
  }
}
