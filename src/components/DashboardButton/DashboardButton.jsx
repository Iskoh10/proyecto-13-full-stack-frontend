import { Button } from '@chakra-ui/react';

const DashboardButton = ({
  onAction,
  value = '',
  bg = 'gray.400',
  w = '',
  color = '',
  _hover = { bg: 'gray.300' },
  children
}) => {
  return (
    <Button
      bg={bg}
      w={w}
      color={color}
      _hover={{ _hover }}
      borderRadius='10px'
      p={2}
      fontWeight='default'
      value={value}
      cursor='pointer'
      onClick={onAction}
    >
      {children}
    </Button>
  );
};

export default DashboardButton;
