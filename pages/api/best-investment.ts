import googleStocksData from "../../public/data/google-stock-price.json";
import amazonStocksData from "../../public/data/amazone-stock-price.json";
import { findBestInvestment } from "../../helpers/best-investment";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {aymen:{buyDate:number,sellDate:number,profit:number},anouar:{buyDate:number,sellDate:number,profit:number}} |{ message: string };;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const bestInvestmentAymen = findBestInvestment(amazonStocksData);
  const bestInvestmentAnouar = findBestInvestment(googleStocksData);

  res
    .status(200)
    .json({ aymen: bestInvestmentAymen, anouar: bestInvestmentAnouar });
}
