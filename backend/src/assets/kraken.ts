import axios from 'axios';

type KrakenResponse = {
  result: {
    XXBTZUSD: {
      bids: Array<[string, string, number]>;
      asks: Array<[string, string, number]>;
    };
  };
};

export const getKrakenAskOrderBook = async (): Promise<
  Array<[number, number]>
> => {
  const { data: orderBook } = await axios.get<KrakenResponse>(
    'https://api.kraken.com/0/public/Depth?pair=XXBTZUSD',
  );

  return orderBook.result.XXBTZUSD.asks.map(([price, amount]) => [
    parseFloat(price),
    parseFloat(amount),
  ]);
};
