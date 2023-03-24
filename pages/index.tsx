import type { NextPage } from "next";
import {
  Flex,
  Heading,
  List,
  ListItem,
  ListIcon,
  Divider,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import SimpleCard from "./components/SimpleCard";
import SimpleChart from "./components/SimpleChart";
import SimpleList from "./components/SimpleList";

interface HomeProps {
  averagePrices: { month: string; google: number; amazone: number }[];
  dataBestInvestment: {
    aymen: { buyDate: number; sellDate: number; profit: number };
    anouar: { buyDate: number; sellDate: number; profit: number };
  };
}

const Home: NextPage<HomeProps> = ({ averagePrices, dataBestInvestment }) => {
 
  return (
    <Flex flexDirection={"column"} alignItems={"center"} height={"100vh"}>
      <SimpleCard
        margin="1rem"
        w="50%"
        h="800px"
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
    </Flex>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API

  const resBestInvestment = await fetch(
    `http://localhost:3001/api/best-investment`
  );
  const dataBestInvestment = await resBestInvestment.json();

  const res = await fetch(`http://localhost:3001/api/average-prices`);
  const data = await res.json();

  // handle Data averagePrices
  const amazonStockPrices = data.amazonStockPrices;
  const googleStockPrices = data.googleStockPrices;

  let averagePrices: { month: string; google: number; amazone: number }[] = [];

  amazonStockPrices.forEach(
    (amazonStockPrices: { month: string; averagePrice: number }) => {
      googleStockPrices.forEach(
        (googleStockPrices: { month: string; averagePrice: number }) => {
          const obj: { month: string; google: number; amazone: number } = {};

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
  return { props: { averagePrices, dataBestInvestment } };
}

export default Home;
