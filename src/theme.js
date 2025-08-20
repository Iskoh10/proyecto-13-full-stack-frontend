import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    isc: {
      primary: 'hsl(109, 27%, 12%)',
      secondary: 'hsl(42, 89%, 50%)',
      accent: 'hsl(32, 45%, 62%)',
      darkAccent: 'hsl(26, 59%, 38%)',
      gray100: 'hsl(0, 0%, 97%)'
    }
  },
  fonts: {
    heading: `'Bungee', sans-serif`,
    body: `'Bungee', sans-serif`
  }
});

export default theme;
