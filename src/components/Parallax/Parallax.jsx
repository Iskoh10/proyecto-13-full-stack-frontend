import { Box, Heading } from '@chakra-ui/react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const Parallax = () => {
  const { scrollY } = useScroll();

  const titleY = useTransform(scrollY, [0, 200], [0, -100]);
  const titleOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  const headingY = useTransform(scrollY, [0, 200], [100, 0]);
  const headingOpacity = useTransform(scrollY, [0, 200], [0, 1]);

  const smoothX = useSpring(scrollY, { stiffness: 50, damping: 20 });
  const x = useTransform(smoothX, [30, 200], [-700, 0]);
  const opacityLado = useTransform(
    scrollY,
    [30, 120, 180, 200],
    [0, 0.1, 0.3, 1]
  );

  return (
    <Box position='relative' h='600px' overflow='hidden'>
      <motion.img
        src='./trigo.png'
        alt='trigo'
        style={{
          y: headingY,
          opacity: headingOpacity,
          position: 'absolute',
          top: '20%',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
      <motion.img
        src='./lado.jpg'
        alt='pan'
        style={{
          x,
          opacity: opacityLado,
          position: 'absolute',
          top: '40%',
          width: '50%',
          height: '50%',
          objectFit: 'contain'
        }}
      />
      <motion.div
        style={{
          y: titleY,
          opacity: titleOpacity,
          position: 'absolute',
          width: '100%',
          top: 0
        }}
      >
        <Heading fontSize='6xl' color='white' textAlign='center' mt='200px'>
          Nuestro Proceso
        </Heading>
      </motion.div>
      <motion.div
        style={{
          y: headingY,
          opacity: headingOpacity,
          position: 'absolute',
          width: '100%',
          top: 0
        }}
      >
        <Heading fontSize='6xl' color='white' textAlign='center' mt='200px'>
          Empezamos
        </Heading>
      </motion.div>
    </Box>
  );
};

export default Parallax;
