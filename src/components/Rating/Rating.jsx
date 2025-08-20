import { Box, HStack, Icon } from '@chakra-ui/react';
import { MdStar, MdStarBorder } from 'react-icons/md';

const Rating = ({ max = 5, rating = 0, onChange }) => {
  return (
    <HStack spacing='1'>
      {[...Array(max)].map((_, i) => {
        const index = i + 1;
        const filled = index <= rating;
        return (
          <Box
            key={index}
            cursor='pointer'
            color={filled ? 'yellow.400' : 'gray.300'}
            onClick={() => onChange && onChange(index)}
          >
            {filled ? <MdStar size='24px' /> : <MdStarBorder size='24px' />}
          </Box>
        );
      })}
    </HStack>
  );
};

export default Rating;
