import { FlexProps, Flex } from "@chakra-ui/react";

interface SimpleCardProps extends FlexProps {
  children: React.ReactNode;
}

const SimpleCard: React.FC<SimpleCardProps> = ({
  children,
  ...props
}: SimpleCardProps): React.ReactElement => {
  return (
    <Flex
      alignItems="center"
      padding="1.5rem"
      border="1px solid #eaeaea"
      borderRadius="10px"
      transition="color 0.15s ease, border-color 0.15s ease"
      {...props}
    >
      {children}
    </Flex>
  );
};

export default SimpleCard;
