import { IconButton } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

const DeleteButton = ({
  item,
  setSelectedItem,
  disabledCondition = null,
  onOpen
}) => {
  return (
    <IconButton
      aria-label='Eliminar usuario'
      icon={<FaTrash />}
      colorScheme='red'
      size='xs'
      isDisabled={disabledCondition}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedItem(item);
        onOpen();
      }}
    />
  );
};

export default DeleteButton;
