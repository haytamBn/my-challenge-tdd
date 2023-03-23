
function mergeAndGroupData(data) {
  const groupedData = {};

  data.forEach((entry) => {
    const date = new Date(entry.timestamp);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const key = `${year}-${month}`;

    if (!groupedData[key]) {
      groupedData[key] = {
        total: 0,
        count: 0,
      };
    }

    const averagePrice = (entry.highestPriceOfTheDay + entry.lowestPriceOfTheDay) / 2;
    groupedData[key].total += averagePrice;
    groupedData[key].count++;
  });

  return groupedData;
}

function calculateMonthlyAverages(groupedData) {
  const monthlyAverages = Object.entries(groupedData).map(([key, data]) => {
    const averagePrice = data.total / data.count;

    return {
      month: key,
      averagePrice,
    };
  });

  return monthlyAverages;
}

 export function getMonthlyAverages(fileData) {
  const groupedData = mergeAndGroupData(fileData);
  const monthlyAverages = calculateMonthlyAverages(groupedData);
  return monthlyAverages;
}
