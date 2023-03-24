import { ListProps, List, ListItem, ListIcon, Divider } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

interface SimpleListProps extends ListProps {
  dataBestInvestment: {
    aymen: { buyDate: number; sellDate: number; profit: number };
    anouar: { buyDate: number; sellDate: number; profit: number };
  };
}

const SimpleList: React.FC<SimpleListProps> = ({
  dataBestInvestment,
  ...props
}: SimpleListProps): React.ReactElement => {
  return (
    <List spacing={3} {...props}>
      <ListItem>
        <ListIcon as={(): React.ReactNode => <CheckIcon />} mr="5px" />
        Date Acheter Aymen :{" "}
        {`${new Date(dataBestInvestment?.aymen?.buyDate).getDate()}/${
          new Date(dataBestInvestment?.aymen?.buyDate).getMonth() + 1
        }/${new Date(dataBestInvestment?.aymen?.buyDate).getFullYear()}`}
      </ListItem>

      <ListItem>
        <ListIcon as={(): React.ReactNode => <CheckIcon />} mr="5px" />
        Date Vendre Aymen :{" "}
        {`${new Date(dataBestInvestment?.aymen?.sellDate).getDate()}/${
          new Date(dataBestInvestment?.aymen?.sellDate).getMonth() + 1
        }/${new Date(dataBestInvestment?.aymen?.sellDate).getFullYear()}`}
      </ListItem>

      <ListItem>
        <ListIcon as={(): React.ReactNode => <CheckIcon />} mr="5px" />
        Aymen gain : {parseFloat(dataBestInvestment?.aymen?.profit).toFixed(2)} € 
      </ListItem>

      <Divider />

      <ListItem>
        <ListIcon as={(): React.ReactNode => <CheckIcon />} mr="5px" />
        Date Acheter Anouar :{" "}
        {`${new Date(dataBestInvestment?.anouar?.buyDate).getDate()}/${
          new Date(dataBestInvestment?.anouar?.buyDate).getMonth() + 1
        }/${new Date(dataBestInvestment?.anouar?.buyDate).getFullYear()}`}
      </ListItem>

      <ListItem>
        <ListIcon as={(): React.ReactNode => <CheckIcon />} mr="5px" />
        Date Vendre Anouar :{" "}
        {`${new Date(dataBestInvestment?.anouar?.sellDate).getDate()}/${
          new Date(dataBestInvestment?.anouar?.sellDate).getMonth() + 1
        }/${new Date(dataBestInvestment?.anouar?.sellDate).getFullYear()}`}
      </ListItem>

      <ListItem>
        <ListIcon as={(): React.ReactNode => <CheckIcon />} mr="5px" />
        Anouar gain :{" "}
        {parseFloat(dataBestInvestment?.anouar?.profit).toFixed(2)} € 
      </ListItem>
    </List>
  );
};

export default SimpleList;
