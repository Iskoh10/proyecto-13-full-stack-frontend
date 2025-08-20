import { Box, Heading, Tag } from '@chakra-ui/react';
import './Home.css';
import Parallax from '../../components/Parallax/Parallax';
import TagItem from '../../components/TagItem/TagItem';

const Home = () => {
  return (
    <main className='home'>
      <Box position='relative'>
        <TagItem color='orange' left='70%' top='60%' transform='rotate(15deg)'>
          Sourdough
        </TagItem>
        <TagItem color='blue' left='20%' top='30%' transform='rotate(5deg)'>
          Crunchy
        </TagItem>
        <TagItem color='red' left='55%' top='75%' transform='rotate(-15deg)'>
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
      <Parallax />
    </main>
  );
};

export default Home;
