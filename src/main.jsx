import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { UserProvider } from './Providers/UserContext.jsx';
import { FilterProvider } from './Providers/FilterContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <UserProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </UserProvider>
    </ChakraProvider>
  </BrowserRouter>
);
