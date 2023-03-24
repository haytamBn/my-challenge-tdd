import type { NextApiRequest, NextApiResponse } from "next";
import googleStocksData from "../../public/data/google-stock-price.json";
import amazonStocksData from "../../public/data/amazone-stock-price.json";
import { findBestInvestment } from "../../helpers/erwan-best-investment";
{
  amazon: 348;
  date: 1641186000000;
  google: 300;
  type: "buy";
}

type Data = {
    erwan: {
    profit: number;
    transactions: {
      amazon: number;
      date: number;
      google: number;
      type: "buy" | "sell";
    }[];
  };
  timeTaken: number;
} | {message:string};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const startTime = Date.now();
  const erwanInvestment = findBestInvestment(
    googleStocksData,
    amazonStocksData
  );
  const endTime = Date.now();
  const timeTaken = endTime - startTime;

  res.status(200).json({ erwan: erwanInvestment, timeTaken });
}
