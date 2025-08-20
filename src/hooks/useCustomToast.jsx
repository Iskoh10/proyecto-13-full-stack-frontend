import { useToast } from '@chakra-ui/react';

const useCustomToast = () => {
  const toast = useToast();

  const showToast = ({
    title,
    description = '',
    status = 'info',
    duration = 3000
  }) => {
    toast({
      title,
      description,
      status,
      duration,
      isClosable: true,
      position: 'top-right'
    });
  };

  return { showToast };
};

export default useCustomToast;
