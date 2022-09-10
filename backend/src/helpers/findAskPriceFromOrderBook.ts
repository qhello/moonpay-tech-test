import { Exchanges } from 'src/types';

export const findAskPriceFromOrderBook = (
  amount: number,
  orderBook: Array<[number, number]>,
  exchangeName: Exchanges,
): number => {
  let askPrice = 0;
  let totalQuantity = 0;

  for (const [currentAskPrice, currentQuantity] of orderBook) {
    totalQuantity += currentQuantity;
    askPrice = currentAskPrice;

    if (amount <= totalQuantity) {
      break;
    }
  }

  if (amount >= totalQuantity) {
    throw new Error(
      `Couldn't find specified quantity ${amount} in ${exchangeName} order book, available quantity: ${totalQuantity}`,
    );
  }

  return askPrice;
};
