import type { NextPage } from "next";
import { Flex, Heading } from "@chakra-ui/react";

import SimpleCard from "./components/SimpleCard";
import SimpleChart from "./components/SimpleChart";
import SimpleList from "./components/SimpleList";
import SimpleTable from "./components/SimpleTable";

interface HomeProps {
  averagePrices: { month: string; google: number; amazone: number }[];
  dataBestInvestment: {
    aymen: { buyDate: number; sellDate: number; profit: number };
    anouar: { buyDate: number; sellDate: number; profit: number };
  };
  dataBestInvestmentErwan: {
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
  };
}

const Home: NextPage<HomeProps> = ({
  averagePrices,
  dataBestInvestment,
  dataBestInvestmentErwan,
}) => {
  console.log(dataBestInvestmentErwan);
  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      height={"100%"}
      overflow={"auto"}
      // gap="20px"
    >
      <SimpleCard
        margin="1rem"
        w="50%"
        h="700px"
        flexDirection="column"
        gap="10px"
        p="20px"
      >
        <Heading as="h4" size="lg" textAlign="center">
          Evolution du prixd des actions Amazone et Google sur 2022
        </Heading>

        <SimpleChart averagePrices={averagePrices} />

        <SimpleList dataBestInvestment={dataBestInvestment} />
      </SimpleCard>

      <SimpleCard
        margin="1rem"
        w="50%"
        height="100%"
        flexDirection="column"
        gap="10px"
        p="20px"
      >
        <Heading as="h4" size="lg" textAlign="center">
          Meilleur moment pour acheter et pour vendre
        </Heading>

        <SimpleTable dataBestInvestmentErwan={dataBestInvestmentErwan} />
      </SimpleCard>
    </Flex>
  );
};

export async function getServerSideProps(context: {
  req: { headers: { host: string } };
}) {
  // Fetch data from external API

  let baseUrl: string | undefined = process.env.APP_API_URL;

  if (process.env.NODE_ENV === "production") {
    baseUrl = `https://${context.req.headers.host}${process.env.APP_API_PATH}`;
  }

  const resBestInvestmentErwan = await fetch(`${baseUrl}/erwan-investment`);
  const dataBestInvestmentErwan = await resBestInvestmentErwan.json();

  const resBestInvestment = await fetch(`${baseUrl}/best-investment`);
  const dataBestInvestment = await resBestInvestment.json();

  const res = await fetch(`${baseUrl}/average-prices`);
  const data = await res.json();

  // handle Data averagePrices
  const amazonStockPrices = data.amazonStockPrices;
  const googleStockPrices = data.googleStockPrices;

  let averagePrices: { month: string; google: number; amazone: number }[] = [];

  amazonStockPrices.forEach(
    (amazonStockPrices: { month: string; averagePrice: number }) => {
      googleStockPrices.forEach(
        (googleStockPrices: { month: string; averagePrice: number }) => {
          const obj: any = {};
          if (amazonStockPrices.month === googleStockPrices.month) {
            obj.month = amazonStockPrices.month;
            obj.google = googleStockPrices.averagePrice;
            obj.amazone = amazonStockPrices.averagePrice;
            averagePrices.push(obj);
          }
        }
      );
    }
  );

  // Pass data to the page via props
  return {
    props: { averagePrices, dataBestInvestment, dataBestInvestmentErwan },
  };
}

export default Home;
