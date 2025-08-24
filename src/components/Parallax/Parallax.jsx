import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MotionText = motion.create(Text);
const MotionImage = motion.create(Image);
const MotionFlex = motion.create(Flex);

const Parallax = () => {
  const { scrollY } = useScroll();

  const titleY = useTransform(scrollY, [0, 400], [0, -150]);
  const titleOpacity = useTransform(scrollY, [0, 450], [1, 0]);

  const titleX = useTransform(scrollY, [0, 400], [0, -150]);
  const titleXImage = useTransform(scrollY, [0, 400], [0, 300]);

  const createBlockTransforms = (start, end, offset = 0) => ({
    y: useTransform(scrollY, [start, end], [50, 0]),
    opacity: useTransform(scrollY, [start, end], [0, 1]),
    textX: useTransform(scrollY, [start, end], [offset, 0]),
    imageX: useTransform(scrollY, [start, end], [-offset, 0])
  });

  const block2 = createBlockTransforms(350, 700, 500);
  const block3 = createBlockTransforms(800, 1500, 200);

  return (
    <Box position='relative' minH='200vh' overflow='hidden'>
      <motion.div
        style={{
          y: titleY,
          opacity: titleOpacity,
          position: 'absolute',
          width: '100%',
          top: 0
        }}
      >
        <Heading fontSize='6xl' color='white' textAlign='center' mt='50px'>
          Breve historia del Pan
        </Heading>
      </motion.div>

      <MotionFlex
        align='center'
        justify='space-between'
        w='100%'
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <MotionText
          fontSize='1.5rem'
          textAlign='left'
          width='55%'
          mx={4}
          p={4}
          style={{ x: titleX }}
        >
          En 2019 se produjo un hallazgo que transformó nuestra visión sobre el
          origen del pan. Hasta entonces, la idea más aceptada era que este
          alimento había surgido tras el desarrollo de la agricultura, hace unos
          8.000-10.000 años.
        </MotionText>

        <MotionImage
          src='./assets/parallax/bread1.jpg'
          alt='bread1'
          width='35%'
          p={5}
          mt='150px'
          objectFit='contain'
          style={{ x: titleXImage }}
        />
      </MotionFlex>

      <MotionFlex
        align='center'
        justify='space-between'
        w='100%'
        style={{ y: block2, opacity: block2.opacity }}
      >
        <Flex direction='column'>
          <MotionImage
            borderRadius='100%'
            src='./assets/parallax/bread2.jpg'
            alt='bread2'
            width='100%'
            p={5}
            mx='70px'
            objectFit='contain'
            style={{
              x: block2.imageX,
              opacity: block2.opacity
            }}
          />

          <MotionImage
            src='./assets/parallax/bread3.png'
            alt='bread3'
            ml='50px'
            width='50%'
            objectFit='contain'
            style={{
              x: useTransform(scrollY, [350, 900], [-500, 0]),
              opacity: block2.opacity
            }}
          />
        </Flex>

        <MotionText
          textAlign='right'
          fontSize='1.5rem'
          width='80%'
          p={4}
          ml='auto'
          style={{
            x: block2.textX,
            opacity: block2.opacity
          }}
        >
          En este descubrimiento, en zonas de Jordanía, se hallaron restos
          carbonizados de migas de pan de hace 14.400 años, en asentamientos de
          cazadores-recolectores de la época natufiense, es decir, entre 4.000 y
          6.000 años antes del inicio de la agricultura.
        </MotionText>
      </MotionFlex>

      <MotionFlex
        align='center'
        justify='space-between'
        w='100%'
        style={{
          y: block3.y,
          opacity: block3.opacity
        }}
      >
        <MotionText
          fontSize='1.5rem'
          textAlign='left'
          width='65%'
          mx={4}
          p={4}
          style={{ x: block3.textX }}
        >
          En nuestra panadería utilizamos masa madre para elaborar el pan, lo
          que implica un amasado cuidadoso y una selección rigurosa de las
          materias primas. Su fermentación requiere más tiempo, pero este
          proceso lento nos permite obtener un pan con un sabor más intenso y
          una conservación superior.
          <br />
          <Text
            as='span'
            fontSize='2rem'
            color='isc.darkAccent'
            style={{ x: block3.textX }}
          >
            A tope con la Masa Madre!!! ♥️
          </Text>
        </MotionText>

        <MotionImage
          src='./assets/parallax/bread4.png'
          alt='bread1'
          width='35%'
          p={4}
          mt='300px'
          objectFit='contain'
          style={{ x: block3.imageX }}
        />
      </MotionFlex>
    </Box>
  );
};

export default Parallax;
