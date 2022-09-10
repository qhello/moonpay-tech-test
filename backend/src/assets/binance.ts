import axios from 'axios';

type BinanceResponse = {
  lastUpdateId: number;
  bids: Array<[string, string]>;
  asks: Array<[string, string]>;
};

export const getBinanceAskOrderBook = async (): Promise<
  Array<[number, number]>
> => {
  const { data: orderBook } = await axios.get<BinanceResponse>(
    'https://api.binance.com/api/v3/depth?symbol=BTCUSDT',
  );

  return orderBook.asks.map(([price, amount]) => [
    parseFloat(price),
    parseFloat(amount),
  ]);
};
