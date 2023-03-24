type TypeFileDataStockPrice = {
  v: number;
  vw: number;
  o: number;
  c: number;
  highestPriceOfTheDay: number;
  lowestPriceOfTheDay: number;
  timestamp: number;
  n: number;
}[];

export function findBestInvestment(
  data1: TypeFileDataStockPrice,
  data2: TypeFileDataStockPrice
) {
  const initialCapital = 100000;
  let capital = initialCapital;
  let stocks = { amazon: 0, google: 0 };
  const transactions = [];

  for (let i = 0; i < data1.length; i++) {
    const amazonPrice = data1[i].lowestPriceOfTheDay;
    const googlePrice = data2[i].lowestPriceOfTheDay;
    const currentDate = data1[i].timestamp;

    // Buy stocks if possible
    if (capital > 0) {
      const amazonStocksToBuy = Math.floor(capital / (2 * amazonPrice));
      const googleStocksToBuy = Math.floor(capital / (2 * googlePrice));

      if (amazonStocksToBuy > 0 || googleStocksToBuy > 0) {
        capital -=
          amazonStocksToBuy * amazonPrice + googleStocksToBuy * googlePrice;
        stocks.amazon += amazonStocksToBuy;
        stocks.google += googleStocksToBuy;

        transactions.push({
          type: "buy",
          date: currentDate,
          amazon: amazonStocksToBuy,
          google: googleStocksToBuy,
        });
      }
    }

    // Sell stocks
    const sellAmazonStocks = stocks.amazon;
    const sellGoogleStocks = stocks.google;
    capital +=
      sellAmazonStocks * data1[i].highestPriceOfTheDay +
      sellGoogleStocks * data2[i].highestPriceOfTheDay;
    stocks.amazon = 0;
    stocks.google = 0;

    transactions.push({
      type: "sell",
      date: currentDate,
      amazon: sellAmazonStocks,
      google: sellGoogleStocks,
    });
  }

  const profit = capital - initialCapital;

  return {
    transactions,
    profit,
  } as {
    profit: number;
    transactions: {
      amazon: number;
      date: number;
      google: number;
      type: "buy" | "sell";
    }[];
  };
}
