import type { NextApiRequest, NextApiResponse } from "next";
import googleStocksData from "../../public/data/google-stock-price.json";
import amazonStocksData from "../../public/data/amazone-stock-price.json";
import { getMonthlyAverages } from "../../helpers/average-prices";


type Data =
  | {
      googleStockPrices: { month: string; averagePrice: number }[];
      amazonStockPrices: { month: string; averagePrice: number }[];
    }
  | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const googleMonthlyAverages1 = getMonthlyAverages(googleStocksData);
  const amazonMonthlyAverages2 = getMonthlyAverages(amazonStocksData);

  res.status(200).json({
    googleStockPrices: googleMonthlyAverages1,
    amazonStockPrices: amazonMonthlyAverages2,
  });
}
