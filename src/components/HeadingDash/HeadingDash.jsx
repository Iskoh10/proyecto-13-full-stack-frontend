import { Heading } from '@chakra-ui/react';
import theme from '../../theme';

const HeadingDash = ({ children }) => {
  return (
    <Heading
      w='full'
      mb='10'
      sx={{
        WebkitTextStroke: `1px ${theme.colors.isc.gray800}`,
        WebkitTextFillColor: 'white'
      }}
    >
      {children}
    </Heading>
  );
};

export default HeadingDash;
