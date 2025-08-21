import { useEffect, useState } from 'react';
import './Blog.css';
import { Flex, Heading, Image, Text, useDisclosure } from '@chakra-ui/react';
import useCustomToast from '../../hooks/useCustomToast';
import CustomModal from '../../components/CustomModal/CustomModal';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const { showToast } = useCustomToast();
  const [selectedPost, setSelectedPost] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/v1/blogs');

        if (!res.ok) {
          throw new Error('Error al obtener los posts');
        }

        const data = await res.json();

        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setPosts(sorted);
      } catch (error) {
        showToast({
          title: 'Error',
          description: 'Error al obtener los posts',
          status: 'error'
        });
      }
    };
    fetchBlogs();
  }, []);

  return (
    <main className='blog'>
      <Heading align='center' py='4'>
        Nuestro Blog
      </Heading>
      <Flex wrap='wrap' gap={4}>
        {posts.map((post) => (
          <Flex
            key={post._id}
            width='400px'
            direction='column'
            ml={5}
            mt={5}
            p={2}
            gap={2}
            align='center'
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
              setSelectedPost(post), onOpen();
            }}
          >
            <Heading size='md'>{post.title}</Heading>
            <Text>{post.summary}</Text>
          </Flex>
        ))}
      </Flex>
      {selectedPost && (
        <CustomModal isOpen={isOpen} onClose={onClose}>
          <Flex direction='column' align='center'>
            <Heading textAlign='center'>{selectedPost.title}</Heading>
            <Text>Título clave: ➡️ {selectedPost.slug}</Text>
            <Flex mt={5}>
              <Text width='70%'>{selectedPost.body}</Text>
              <Flex direction='column' width='40%' gap={3}>
                {selectedPost.image.map((img) => (
                  <Image src={img} key={img} />
                ))}
              </Flex>
            </Flex>
          </Flex>
        </CustomModal>
      )}
    </main>
  );
};

export default Blog;
