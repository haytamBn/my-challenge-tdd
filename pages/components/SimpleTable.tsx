import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

interface SimpleTableProps {
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

const SimpleTable: React.FC<SimpleTableProps> = ({
  dataBestInvestmentErwan,
}: SimpleTableProps): React.ReactElement => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>
          Gain:{Number(dataBestInvestmentErwan?.erwan?.profit).toFixed(2)} €
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>ACTION</Th>
            <Th isNumeric>GOOGLE</Th>
            <Th isNumeric>AMAZONE</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataBestInvestmentErwan?.erwan?.transactions.map((el, index) => (
            <Tr key={index}>
              <Td>{el.date}</Td>
              <Td>{el.type}</Td>
              <Td isNumeric>{el.google} €</Td>
              <Td isNumeric>{el.amazon} €</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default SimpleTable;
