import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Spacer,
  Text
} from '@chakra-ui/react';
import getAverageRating from '../../utils/getAverageRating';
import Rating from '../Rating/Rating';
import { AddToCartIcon } from '../Icons/Icons';
import addToCart from '../../utils/cartUtils/addToCart';

const CardProduct = ({
  item,
  user,
  ratings,
  handleRatingChange,
  handleCart
}) => {
  return (
    <Flex
      className='product-card'
      direction='column'
      bg='gray.100'
      p='4'
      minW='300px'
      borderRadius='md'
      style={{
        opacity: item.available ? 1 : 0.5,
        cursor: item.available ? 'default' : 'not-allowed'
      }}
      align='center'
      justify='space-between'
    >
      <Heading
        fontWeight='bold'
        fontSize={{ base: 'sm', md: 'md', lg: 'xl' }}
        pb='2'
        textAlign='center'
      >
        {item.nameProduct}
      </Heading>
      <Flex width='250px' height='250px'>
        <Image src={item.productImage} w='100%' objectFit='contain' />
      </Flex>

      <Flex gap='5' justify='center' align='end' width='100%' mt='5'>
        <Text>{item.price.toFixed(2) + ' €'}</Text>
        <Text>{'Stock: ' + item.stock}</Text>
      </Flex>
      <Text>{getAverageRating(item.ratings)} 🌟</Text>
      {user?._id && (
        <Flex w='100%' align='center'>
          <Box
            pointerEvents={item.available ? 'auto' : 'none'}
            cursor={item.available ? 'pointer' : 'not-allowed'}
          >
            <Rating
              rating={ratings[item._id] || 0}
              onChange={(value) => handleRatingChange(item._id, value)}
            />
          </Box>

          <Spacer />
          <Button
            pointerEvents={item.available ? 'auto' : 'none'}
            cursor={item.available ? 'pointer' : 'not-allowed'}
            onClick={() => handleCart(item, addToCart)}
            isDisabled={item.stock <= 0 || !item.available}
          >
            <AddToCartIcon />
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default CardProduct;
