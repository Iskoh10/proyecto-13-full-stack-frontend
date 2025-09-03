import { Box, Heading, Tag, useMediaQuery } from '@chakra-ui/react';
import './Home.css';
import Parallax from '../../components/Parallax/Parallax';
import TagItem from '../../components/TagItem/TagItem';
import StaticHome from '../../components/StaticHome/StaticHome';

const Home = () => {
  const [isSmaller] = useMediaQuery('(max-width: 1360px)');
  return (
    <main className='home'>
      <Box position='relative'>
        <TagItem
          color='orange'
          left={{ base: '60%', md: '70%' }}
          top={{ base: '30%', md: '60%' }}
          transform='rotate(15deg)'
        >
          Sourdough
        </TagItem>
        <TagItem color='blue' left='20%' top='30%' transform='rotate(5deg)'>
          Crunchy
        </TagItem>
        <TagItem
          color='red'
          left={{ base: '40%', md: '55%' }}
          top={{ base: '90%', md: '75%' }}
          transform='rotate(-15deg)'
        >
          Flavour
        </TagItem>
        <Heading
          align='center'
          pt='10'
          fontSize={{ base: '2xl', md: '6xl', xl: '8xl' }}
        >
          THE ART OF BAKING
        </Heading>
      </Box>
      {isSmaller ? <StaticHome /> : <Parallax />}
    </main>
  );
};

export default Home;
