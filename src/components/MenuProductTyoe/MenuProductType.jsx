import { Box, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import getDisplayText from '../../utils/getDisplayText';
import { useFilterContext } from '../../Providers/FilterContext';

const MenuProductType = () => {
  const { filters, setFilters } = useFilterContext();
  return (
    <Menu>
      <MenuButton
        as={Box}
        m={2}
        p={2}
        bg='white'
        _hover={{ bg: 'gray.200' }}
        borderRadius='md'
        cursor='pointer'
      >
        {getDisplayText(filters)}
      </MenuButton>
      <MenuList placement='bottom-start'>
        <MenuItem onClick={() => setFilters({ typeProduct: 'allProducts' })}>
          Todos los productos
        </MenuItem>
        <MenuItem onClick={() => setFilters({ typeProduct: 'panaderia' })}>
          Panadería
        </MenuItem>
        <MenuItem onClick={() => setFilters({ typeProduct: 'bolleria' })}>
          Bollería
        </MenuItem>
        <MenuItem onClick={() => setFilters({ typeProduct: 'pasteleria' })}>
          Pastelería
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuProductType;
