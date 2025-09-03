import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import formatDate from '../../utils/formatDate';

const CardBlog = ({ setSelectedPost, post, onOpen }) => {
  return (
    <Flex
      key={post._id}
      width={{ base: '320px', md: '400px' }}
      direction='column'
      align='center'
      justify='space-between'
      ml={{ base: '0', md: '5' }}
      mt={5}
      p={2}
      gap={2}
      border='1px solid'
      borderRadius='10px'
      borderColor='gray.400'
      bg='rgba(255, 255, 255, 0.1)'
      backdropFilter='blur(10px)'
      boxShadow='0 4px 30px rgba(0, 0, 0, 0.1)'
      transition='all 0.3s ease-in-out'
      _hover={{
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        transform: 'scale(1.02)',
        boxShadow: '0 6px 40px rgba(0, 0, 0, 0.15)'
      }}
      cursor='pointer'
      onClick={() => {
        setSelectedPost({
          ...post,
          paragraphs: post.body.replace(/\\n/g, '\n').split('\n\n')
        });
        onOpen();
      }}
    >
      <Heading size='md' textAlign='center' mt={5}>
        {post.title}
      </Heading>
      <Text textAlign='center'>{post.summary}</Text>
      <Flex align='center' w='100%' h='auto'>
        <Image src={post.image[0]} boxSize='100%' objectFit='cover' />
      </Flex>
      <Flex w='100%' justify='flex-end'>
        <Text>{formatDate(post.createdAt, true)}</Text>
      </Flex>
    </Flex>
  );
};

export default CardBlog;
