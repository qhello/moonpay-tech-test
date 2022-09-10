import axios from 'axios';

type CoinbaseResponse = {
  sequence: number;
  bids: Array<[string, string, number]>;
  asks: Array<[string, string, number]>;
};

export const getCoinbaseAskOrderBook = async (): Promise<
  Array<[number, number]>
> => {
  const { data: orderBook } = await axios.get<CoinbaseResponse>(
    'https://api.exchange.coinbase.com/products/BTC-USD/book?level=2',
  );

  return orderBook.asks.map(([price, amount]) => [
    parseFloat(price),
    parseFloat(amount),
  ]);
};
