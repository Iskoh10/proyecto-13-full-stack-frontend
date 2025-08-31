import { Fragment, useEffect, useRef, useState } from 'react';
import './Blog.css';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import useCustomToast from '../../hooks/useCustomToast';
import CustomModal from '../../components/CustomModal/CustomModal';
import formatDate from '../../utils/formatDate';
import { useUser } from '../../Providers/UserContext';
import useVote from '../../hooks/useVote';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useCustomToast();
  const [selectedPost, setSelectedPost] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const commentRef = useRef();
  const [loadingComment, setLoadingComment] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
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

  const { handleVote, hasVote } = useVote({
    setItems: setPosts,
    selectedItem: selectedPost,
    setSelectedItem: setSelectedPost,
    showToast,
    user
  });

  //  const { handleAddComment } = useAddComment({
  //   commentRef,
  //   setLoadingComment,
  //   selectedWorkshop,
  //   setSelectedWorkshop,
  //   setWorkshops,
  //   showToast
  // });

  const handleAddComment = async () => {
    const text = commentRef.current.value;
    if (!text.trim()) {
      commentRef.current.value = '';
      return;
    }

    setLoadingComment(true);
    try {
      const res = await fetch('http://localhost:3000/api/v1/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          text,
          target: 'Blog',
          eventId: selectedPost._id
        })
      });

      if (!res.ok) throw new Error('Error al crear el comentario');

      const createdComment = await res.json();
      const commentWithUser = { ...createdComment, user };

      setSelectedPost((prev) => ({
        ...prev,
        comments: [...prev.comments, commentWithUser]
      }));

      setPosts((prev) =>
        prev.map((post) =>
          post._id === selectedPost._id
            ? { ...post, comments: [...post.comments, createdComment] }
            : post
        )
      );

      commentRef.current.value = '';
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'Error al comentar',
        status: 'error'
      });
    } finally {
      setLoadingComment(false);
    }
  };

  if (loading)
    return (
      <Stack align='center' justify='center' height='100svh'>
        <Spinner size='xl' color='red' />
      </Stack>
    );

  return (
    <main className='blog'>
      <Heading align='center' py='4'>
        Nuestro Blog
      </Heading>

      {console.log(posts)}

      <Flex wrap='wrap' gap={4} justify='center' paddingBottom={10}>
        {posts.map((post) => (
          <Flex
            key={post._id}
            width='400px'
            direction='column'
            align='center'
            justify='space-between'
            ml={5}
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
            <Flex align='center' w='350px' h='350px'>
              <Image src={post.image[0]} boxSize='100%' objectFit='cover' />
            </Flex>
            <Flex w='100%' justify='flex-end'>
              <Text>{formatDate(post.createdAt, true)}</Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
      {selectedPost && (
        <CustomModal isOpen={isOpen} onClose={onClose} size='xl'>
          <Flex direction='column' align='center' mt={5}>
            <Heading textAlign='center' mb={2}>
              {selectedPost.title}
            </Heading>
            <Text>Título clave: ➡️ {selectedPost.slug}</Text>
            <Flex mt={5} direction='column' gap={2}>
              {selectedPost.image &&
                selectedPost.paragraphs &&
                selectedPost.image.map((imgSrc, index) => (
                  <Fragment key={index}>
                    {selectedPost.paragraphs[index] && (
                      <Text key={`p-${index}`} textAlign='center'>
                        {selectedPost.paragraphs[index]}
                      </Text>
                    )}
                    <Image
                      key={`img-${index}`}
                      mx='auto'
                      boxSize={`${400 - index * 100}px`}
                      src={imgSrc}
                    />
                  </Fragment>
                ))}
            </Flex>
          </Flex>
          {user ? (
            <Flex direction='column' mt={5}>
              <Text>Me gusta: {selectedPost.likes.length} 💚</Text>
              <Text>No me gusta: {selectedPost.dislikes.length} 💔</Text>
              <Flex mt={3} justify='center' gap={4}>
                <Button
                  bg='green.300'
                  onClick={() => handleVote('blogs', 'like')}
                  disabled={hasVote}
                >
                  💚 Me gusta
                </Button>
                <Button
                  bg='red.300'
                  onClick={() => handleVote('blogs', 'dislike')}
                  disabled={hasVote}
                >
                  💔 No me gusta
                </Button>
              </Flex>
              <Box
                border='1px solid'
                borderColor='gray.400'
                borderRadius='10px'
                p={5}
                mt={3}
              >
                <Text fontSize='2rem'>Comentarios</Text>
                <Stack mt={5} width='100%'>
                  {selectedPost.comments.map((comment) => (
                    <Flex
                      key={comment._id}
                      align='center'
                      justify='space-between'
                      p={2}
                      borderBottom='1px solid gray'
                    >
                      <Text fontSize='1rem'>{comment.text}</Text>
                      <Text color='gray.400'>{comment.user.name}</Text>
                    </Flex>
                  ))}

                  <Flex mt={3} gap={2}>
                    <Input
                      type='text'
                      placeholder='Escribe un comentario...'
                      ref={commentRef}
                    />
                    <Button
                      colorScheme='red'
                      onClick={handleAddComment}
                      disabled={loadingComment}
                    >
                      {loadingComment ? 'Enviando...' : 'Comentar'}
                    </Button>
                  </Flex>
                </Stack>
              </Box>
            </Flex>
          ) : (
            <Text mt={3} color='gray.500' textAlign='center'>
              Inicia sesión para ver likes y comentarios.
            </Text>
          )}
        </CustomModal>
      )}
    </main>
  );
};

export default Blog;

//* Unificar el customHooks de useAddComment, abstraer componentes
