import { useRef, useState } from 'react';
import HeadingDash from '../../components/HeadingDash/HeadingDash';
import { useDashboard } from '../../Providers/DashboardContext';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  ModalFooter,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useDisclosure
} from '@chakra-ui/react';
import { GiNotebook } from 'react-icons/gi';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Switcher from '../../components/Switcher/Switcher';
import CustomModal from '../../components/CustomModal/CustomModal';
import useCustomToast from '../../hooks/useCustomToast';
import { useForm } from 'react-hook-form';
import { useUser } from '../../Providers/UserContext';

const BlogDash = () => {
  const {
    blogs,
    setBlogs,
    loading,
    setLoading,
    fetchResources,
    deleteResources
  } = useDashboard();
  const [selectedPost, setSelectedPost] = useState(null);
  const inputRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onClose: onCloseDetail
  } = useDisclosure();
  const {
    isOpen: isOpenNewPost,
    onOpen: onOpenNewPost,
    onClose: onCloseNewPost
  } = useDisclosure();
  const { showToast } = useCustomToast();
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      summary: '',
      body: '',
      slug: '',
      available: true
    }
  });
  const [imageFiles, setImageFiles] = useState([]);

  const handleSearch = async () => {
    const search = inputRef.current.value;
    if (!search.trim()) return;

    try {
      setLoading((prev) => ({ ...prev, blogs: true }));
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
      inputRef.current.value = '';
    } catch (error) {
      inputRef.current.value = '';
      showToast({
        title: 'Error',
        description: 'Error en la búsqueda.',
        status: 'error'
      });
    } finally {
      setLoading((prev) => ({ ...prev, blogs: false }));
    }
  };

  const resetBlogs = () => {
    fetchResources('http://localhost:3000/api/v1/blogs', setBlogs, 'blogs');
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setImageFiles(files);
  };

  const onSubmit = async (data) => {
    if (!user) throw new Error('No estás logueado.');
    if (imageFiles.length === 0) {
      showToast({
        title: 'Error',
        description: 'Sube al menos una imagen',
        status: 'error'
      });
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('summary', data.summary);
    formData.append('body', data.body);
    formData.append('slug', data.slug);
    formData.append('available', data.available);
    formData.append('user', user._id);

    imageFiles.forEach((file) => formData.append('image', file));

    try {
      setLoading((prev) => ({ ...prev, blogs: true }));
      const url = selectedPost
        ? `http://localhost:3000/api/v1/blogs/${selectedPost._id}`
        : 'http://localhost:3000/api/v1/blogs';

      const method = selectedPost ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        credentials: 'include',
        body: formData
      });

      if (!res.ok) throw new Error('Error creando/actualizando el post.');

      reset();
      setImageFiles([]);
      setSelectedPost(null);
      onCloseNewPost();
      fetchResources('http://localhost:3000/api/v1/blogs', setBlogs, 'blogs');

      showToast({
        description: selectedPost
          ? 'Post actualizado correctamente.'
          : 'Post creado correctamente.',
        status: 'success'
      });
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'No se pudo guardar el post',
        status: 'error'
      });
    } finally {
      setLoading((prev) => ({ ...prev, blogs: false }));
    }
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
            <Input type='search' placeholder='Buscar post...' ref={inputRef} />
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
              onClick={() => {
                setSelectedPost(null);
                reset({
                  title: '',
                  slug: '',
                  summary: '',
                  body: '',
                  available: true
                });
                setImageFiles([]);
                onOpenNewPost();
              }}
            >
              Nuevo post
            </Button>
          </Flex>

          <Grid templateColumns='repeat(4, 1fr)' gap='6'>
            {blogs.map((post) => {
              const bgPost = !post.available ? 'red.200' : 'white';

              return (
                <GridItem
                  bg={bgPost}
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
                  <Box mb={10} h='250px'>
                    <Text mb={5} h='50px'>
                      {post.title}
                    </Text>
                    <Image src={post.image?.[0]} width='200px' height='200px' />
                  </Box>
                  <Flex justify='center'>
                    <Text
                      maxW='250px'
                      h='100px'
                      noOfLines={4}
                      overflow='hidden'
                      textOverflow='ellipsis'
                    >
                      {post.summary}
                    </Text>
                  </Flex>
                  <Flex justify='space-between' align='center' mt='auto'>
                    <Box onClick={(e) => e.stopPropagation()}>
                      <Switcher
                        isChecked={post.available}
                        onChange={() => handleSwitch(post._id, post.available)}
                      />
                    </Box>

                    <Button
                      bg='red.500'
                      color='white'
                      _hover={{ bg: 'red.200' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPost(post);
                        reset({
                          title: post.title,
                          slug: post.slug,
                          summary: post.summary,
                          body: post.body,
                          available: post.available
                        });
                        setImageFiles([]);
                        onOpenNewPost();
                      }}
                    >
                      Modificar post
                    </Button>

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
                  <Flex mt={5} direction='column' gap={2}>
                    {selectedPost.image &&
                      selectedPost.paragraphs &&
                      selectedPost.image.map((imgSrc, index) => (
                        <>
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
                        </>
                      ))}
                  </Flex>
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

        <CustomModal isOpen={isOpenNewPost} onClose={onCloseNewPost} size='xl'>
          <Flex direction='column' align='center' mt={5}>
            <Heading textAlign='center' mb={3}>
              {selectedPost ? 'Modificar post' : 'Crear nuevo post'}
            </Heading>
            <form id='new-post-form' onSubmit={handleSubmit(onSubmit)}>
              <FormControl mb={4} isInvalid={errors.title}>
                <FormLabel>Título</FormLabel>
                <Input
                  placeholder='Título del post'
                  {...register('title', {
                    required: 'El título es obligatorio'
                  })}
                />
              </FormControl>

              <FormControl mb={4} isInvalid={errors.slug}>
                <FormLabel>Slug</FormLabel>
                <Input
                  placeholder='Escribe-el-slug-del-post'
                  {...register('slug', {
                    required: 'El slug es obligatorio'
                  })}
                />
              </FormControl>

              <FormControl mb={4} isInvalid={errors.summary}>
                <FormLabel>Resumen</FormLabel>
                <Input
                  placeholder='Resumen del post'
                  {...register('summary', {
                    required: 'El resumen es obligatorio'
                  })}
                />
              </FormControl>

              <FormControl mb={4} isInvalid={errors.body}>
                <FormLabel>Contenido</FormLabel>
                <Textarea
                  placeholder='Contenido principal'
                  {...register('body', {
                    required: 'El contenido es obligatorio'
                  })}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Imágenes (máx. 3)</FormLabel>
                <Input
                  type='file'
                  accept='image/*'
                  multiple
                  onChange={handleImagesChange}
                />
                {imageFiles.length > 0 && (
                  <SimpleGrid columns={3} spacing={2} mt={2}>
                    {imageFiles.map((file, index) => (
                      <Image
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`preview-${index}`}
                        borderRadius='md'
                      />
                    ))}
                  </SimpleGrid>
                )}
              </FormControl>

              <FormControl mb={4}>
                <Checkbox {...register('available')}>Disponible</Checkbox>
              </FormControl>

              <ModalFooter>
                <Button
                  colorScheme={selectedPost ? 'red' : 'blue'}
                  type='submit'
                  form='new-post-form'
                  isLoading={loading.blogs}
                  loadingText={selectedPost ? 'modificando...' : 'Creando...'}
                  isDisabled={loading.blogs}
                >
                  {selectedPost ? 'Modificar' : 'Crear'}
                </Button>
                <Button ml={3} onClick={onCloseNewPost}>
                  Cancelar
                </Button>
              </ModalFooter>
            </form>
          </Flex>
        </CustomModal>
      </Flex>
    </section>
  );
};

export default BlogDash;
