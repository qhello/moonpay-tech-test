import { Test, TestingModule } from '@nestjs/testing';
import nock from 'nock';

import { ExchangeRoutingController } from '../exchangeRouting.controller';
import { ExchangeRoutingService } from '../exchangeRouting.service';

import fixtures from './fixtures';

describe('ExchangeRoutingController', () => {
  let appController: ExchangeRoutingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeRoutingController],
      providers: [ExchangeRoutingService],
    }).compile();

    appController = app.get<ExchangeRoutingController>(
      ExchangeRoutingController,
    );

    // intercepts http requests to exchanges
    nock('https://api.binance.com')
      .get('/api/v3/depth?symbol=BTCUSDT')
      .reply(200, fixtures.binance);
    nock('https://api.exchange.coinbase.com')
      .get('/products/BTC-USD/book?level=2')
      .reply(200, fixtures.coinbase);
    nock('https://api.kraken.com')
      .get('/0/public/Depth?pair=XXBTZUSD')
      .reply(200, fixtures.kraken);
  });

  describe('root', () => {
    it('should return best price', async () => {
      const response = await appController.getExhangeRouting({ amount: '1' });
      expect(response).toMatchInlineSnapshot(`
        Object {
          "btcAmount": 1,
          "exchange": "coinbase",
          "usdAmount": 21312.21,
        }
      `);
    });
  });
});
