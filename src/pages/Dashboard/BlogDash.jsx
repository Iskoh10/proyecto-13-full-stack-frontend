import { useRef, useState } from 'react';
import HeadingDash from '../../components/HeadingDash/HeadingDash';
import { useDashboard } from '../../Providers/DashboardContext';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { GiNotebook } from 'react-icons/gi';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Switcher from '../../components/Switcher/Switcher';
import CustomModal from '../../components/CustomModal/CustomModal';
import useCustomToast from '../../hooks/useCustomToast';

const BlogDash = () => {
  const { blogs, setBlogs, fetchResources, deleteResources } = useDashboard();
  const [selectedPost, setSelectedPost] = useState(null);
  const inputRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onClose: onCloseDetail
  } = useDisclosure();
  const { showToast } = useCustomToast();

  const handleSearch = async () => {
    const search = inputRef.current.value;
    if (!search.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/blogs/filter/${search}`,
        {
          credentials: 'include'
        }
      );

      if (!res.ok) throw new Error('Error en la búsqueda');
      const data = await res.json();

      if (data.length === 0) {
        showToast({
          title: 'Error',
          description: 'Error, no se encontró ninguna coincidencia.',
          status: 'error'
        });
        inputRef.current.value = '';
        return;
      }

      setBlogs(data);
    } catch (error) {
      inputRef.current.value = '';
      showToast({
        title: 'Error',
        description: 'Error en la búsqueda.',
        status: 'error'
      });
    }
  };

  const resetBlogs = () => {
    fetchResources('http://localhost:3000/api/v1/blogs', setBlogs, 'blogs');
  };

  const handleSwitch = async (postId, currentValue) => {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/blogs/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ available: !currentValue })
      });

      if (!res.ok) {
        throw new Error('Error en la actualización.');
      }

      const data = await res.json();

      setBlogs((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, available: !p.available } : p
        )
      );

      showToast({
        title: 'Éxito',
        description: 'Disponibilidad actualizada.',
        status: 'success'
      });
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'No se pudo completar la acción.',
        status: 'error'
      });
    }
  };

  const confirmDelete = () => {
    deleteResources('blogs', selectedPost._id, setBlogs);
    setSelectedPost(null);
    onClose();
  };

  return (
    <section className='main-dashboard'>
      <HeadingDash>Blog</HeadingDash>
      {console.log(blogs)}

      <Flex gap={10} align='center' mb={10}>
        <Flex
          h='10svh'
          bg='white'
          borderRadius='10px'
          p={5}
          align='center'
          w='25%'
        >
          <Icon as={GiNotebook} boxSize={12} color='blue.500' />
          <Flex direction='column' ml={5}>
            <Text fontSize='2rem' color='isc.darkAccent'>
              {blogs?.length}
            </Text>
            <Text>Posts totales</Text>
          </Flex>
        </Flex>
        <Flex
          bg='white'
          w='600px'
          p={2}
          justify='space-between'
          borderRadius='10px'
        >
          <InputGroup w='80%'>
            <Input
              type='search'
              placeholder='Buscar producto...'
              ref={inputRef}
            />
            <Button ml={2} colorScheme='blue' onClick={handleSearch}>
              Buscar
            </Button>
          </InputGroup>
          <Button
            bg='gray.400'
            borderRadius='10px'
            p={2}
            _hover={{ bg: 'gray.200' }}
            fontWeight='default'
            cursor='pointer'
            onClick={() => resetBlogs()}
          >
            Todos
          </Button>
        </Flex>
      </Flex>

      <Flex bg='white' borderRadius='10px' p={5} direction='column' gap={2}>
        <Flex direction='column'>
          <Flex mb={5} justify='flex-end' align='center'>
            <Button
              leftIcon={<FaPlus />}
              bg='blue.500'
              color='white'
              w='17%'
              _hover={{ bg: 'blue.200' }}
            >
              Nuevo post
            </Button>
          </Flex>

          <Grid templateColumns='repeat(4, 1fr)' gap='6'>
            {blogs.map((post) => {
              return (
                <GridItem
                  key={post._id}
                  colSpan={1}
                  border='1px solid black'
                  borderRadius='10px'
                  p={4}
                  align='center'
                  _hover={{ bg: 'gray.200' }}
                  cursor='pointer'
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPost({
                      ...post,
                      paragraphs: post.body.replace(/\\n/g, '\n').split('\n\n')
                    });
                    onOpenDetail();
                  }}
                >
                  <Box mb={10}>
                    <Text mb={5}>{post.title}</Text>
                    <Image src={post.image} width='200px' height='200px' />
                  </Box>

                  <Flex justify='space-between' mt='auto'>
                    <Box onClick={(e) => e.stopPropagation()}>
                      <Switcher
                        isChecked={post.available}
                        onChange={() => handleSwitch(post._id, post.available)}
                      />
                    </Box>

                    <IconButton
                      icon={<FaTrash />}
                      colorScheme='red'
                      size='xs'
                      isDisabled={!post.available}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPost(post);
                        onOpen();
                      }}
                    />
                  </Flex>
                </GridItem>
              );
            })}
          </Grid>

          {selectedPost && (
            <CustomModal
              isOpen={isOpenDetail}
              onClose={onCloseDetail}
              size='xl'
            >
              <Flex direction='column' align='center' mt={5}>
                <Heading textAlign='center' mb={3}>
                  {console.log(selectedPost)}
                  {selectedPost?.title}
                </Heading>
                <Text>Título clave: ➡️ {selectedPost.slug}</Text>
                <Flex mt={5} direction='column' gap={2}>
                  <Text textAlign='center'>
                    {selectedPost?.paragraphs?.[0]}
                  </Text>
                  <Image
                    mx='auto'
                    boxSize='400px'
                    src={selectedPost.image[0]}
                  />
                  <Text textAlign='center'>
                    {selectedPost?.paragraphs?.[1]}
                  </Text>
                  <Image
                    mx='auto'
                    boxSize='300px'
                    src={selectedPost.image[1]}
                  />
                  <Text textAlign='center'>
                    {selectedPost?.paragraphs?.[2]}
                  </Text>
                  <Image
                    mx='auto'
                    boxSize='200px'
                    src={selectedPost.image[2]}
                  />
                </Flex>

                <Flex direction='column' mt={5} w='100%'>
                  <Text textAlign='left'>
                    Me gusta: {selectedPost.likes.length} 💚
                  </Text>
                  <Text>No me gusta: {selectedPost.dislikes.length} 💔</Text>
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
                  </Stack>
                </Box>
              </Flex>
            </CustomModal>
          )}
        </Flex>

        <CustomModal
          isOpen={isOpen}
          onClose={() => {
            setSelectedPost(null);
            onClose();
          }}
        >
          <Flex direction='column' mt={8}>
            <Text m={5}>
              ¿Estás seguro de que quieres eliminar {selectedPost?.title}?
            </Text>
            <Flex justify='flex-end'>
              <Button
                onClick={() => {
                  setSelectedPost(null);
                  onClose();
                }}
                mr={3}
              >
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={confirmDelete}>
                Elimminar
              </Button>
            </Flex>
          </Flex>
        </CustomModal>
      </Flex>
    </section>
  );
};

export default BlogDash;

//! el pulsar la card y poder modificar datos del post, y el boton crear post.
