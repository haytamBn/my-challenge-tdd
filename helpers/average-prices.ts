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

function mergeAndGroupData(data: TypeFileDataStockPrice) {
  const groupedData: { [key: string]: { total: number; count: number } } = {};

  data.forEach((entry) => {
    const date = new Date(entry.timestamp);
    const month = date.toLocaleString("fr", { month: "long" });

    const key: keyof typeof groupedData = `${month}`;

    if (!groupedData[key]) {
      groupedData[key] = {
        total: 0,
        count: 0,
      };
    }

    const averagePrice =
      (entry.highestPriceOfTheDay + entry.lowestPriceOfTheDay) / 2;
    groupedData[key].total += averagePrice;
    groupedData[key].count++;
  });

  return groupedData;
}

function calculateMonthlyAverages(groupedData: {
  [key: string]: { total: number; count: number };
}) {
  const monthlyAverages = Object.entries(groupedData).map(([key, data]) => {

    const averagePrice = data.total / data.count;

    return {
      month: key,
      averagePrice,
    };
  });

  return monthlyAverages;
}

export function getMonthlyAverages(fileData: TypeFileDataStockPrice) {
  const groupedData = mergeAndGroupData(fileData);
  const monthlyAverages = calculateMonthlyAverages(groupedData);
  return monthlyAverages;
}
