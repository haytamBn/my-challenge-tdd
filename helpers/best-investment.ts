type TypeFileDataStockPrice= {
  v: number,
  vw: number,
  o: number,
  c:  number,
  highestPriceOfTheDay: number,
  lowestPriceOfTheDay:  number
  timestamp:  number,
  n:  number
}[]

export function findBestInvestment(data:TypeFileDataStockPrice) {
  let minPriceIndex = 0;
  let maxProfit = 0;
  let buyDate = data[0].timestamp;
  let sellDate = data[0].timestamp;

  for (let i = 1; i < data.length; i++) {
    if (data[i].lowestPriceOfTheDay < data[minPriceIndex].lowestPriceOfTheDay) {
      minPriceIndex = i;
    }

    const profit =
      data[i].highestPriceOfTheDay - data[minPriceIndex].lowestPriceOfTheDay;

    if (profit > maxProfit) {
      maxProfit = profit;
      buyDate = data[minPriceIndex].timestamp;
      sellDate = data[i].timestamp;
    }
  }

  return {
    buyDate,
    sellDate,
    profit: maxProfit,
  };
}
