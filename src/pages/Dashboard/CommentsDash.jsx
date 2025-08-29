import { useRef, useState } from 'react';
import HeadingDash from '../../components/HeadingDash/HeadingDash';
import { useDashboard } from '../../Providers/DashboardContext';
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { FaComments, FaTrash } from 'react-icons/fa';
import useCustomToast from '../../hooks/useCustomToast';
import CustomModal from '../../components/CustomModal/CustomModal';

const CommentsDash = () => {
  const { comments, setComments, fetchResources, deleteResources } =
    useDashboard();
  const [selectedComment, setSelectedComment] = useState(null);
  const inputRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showToast } = useCustomToast();

  const handleSearch = async () => {
    const search = inputRef.current.value;
    if (!search.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/comments/filter/${search}`,
        {
          credentials: 'include'
        }
      );

      if (!res.ok) throw new Error('Error en la búsqueda.');
      const data = await res.json();

      setComments(data);
    } catch (error) {
      inputRef.current.value = '';
      showToast({
        title: 'Error',
        description: 'Error en la búsqueda.',
        status: 'error'
      });
    }
  };

  const resetComments = () => {
    fetchResources(
      'http://localhost:3000/api/v1/comments',
      setComments,
      'comments'
    );
  };

  const confirmDelete = () => {
    deleteResources('comments', selectedComment._id, setComments);
    setSelectedComment(null);
    onClose();
  };

  return (
    <section className='main-dashboard'>
      <HeadingDash>Comentarios</HeadingDash>

      <Flex gap={10} align='center' mb={10}>
        <Flex
          h='10svh'
          bg='white'
          borderRadius='10px'
          p={5}
          align='center'
          w='25%'
        >
          <Icon as={FaComments} boxSize={12} color='blue.500' />
          <Flex direction='column' ml={5}>
            <Text fontSize='2rem' color='isc.darkAccent'>
              {comments?.length}
            </Text>
            <Text>Comentarios totales</Text>
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
              placeholder='Buscar comentario...'
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
            onClick={() => resetComments()}
          >
            Todos
          </Button>
        </Flex>
      </Flex>

      <Flex bg='white' borderRadius='10px' p={5} direction='column' gap={2}>
        <Flex justify='space-between'>
          <Box flex='1'>
            <Text>Comentario</Text>
          </Box>
          <Box flex='1'>
            <Text>Cliente</Text>
          </Box>
        </Flex>
        <Divider borderColor='gray.400' />

        {comments.length > 0
          ? comments.map((comment, index) => {
              const bgComment = index % 2 === 0 ? 'gray.200' : 'white';

              return (
                <Flex
                  key={comment._id}
                  justify='space-between'
                  bg={bgComment}
                  _hover={{ bg: 'gray.400' }}
                >
                  <Box flex='1'>
                    <Text>{comment.text}</Text>
                  </Box>
                  <Box flex='1'>
                    <Text>
                      {comment.user.name} {comment.user.lastName}
                    </Text>
                  </Box>

                  <IconButton
                    aria-label='Eliminar usuario'
                    icon={<FaTrash />}
                    colorScheme='red'
                    size='xs'
                    onClick={() => {
                      setSelectedComment(comment);
                      onOpen();
                    }}
                  />
                </Flex>
              );
            })
          : 'Ningún comentario seleccionado'}

        <CustomModal
          isOpen={isOpen}
          onClose={() => {
            setSelectedComment(null);
            onClose();
          }}
        >
          <Flex direction='column' mt={8}>
            <Text m={5}>
              ¿Estás seguro de que quieres eliminar este comentario ➡️ "
              {selectedComment?.text}"?
            </Text>
            <Flex justify='flex-end'>
              <Button
                onClick={() => {
                  setSelectedComment(null);
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

export default CommentsDash;
