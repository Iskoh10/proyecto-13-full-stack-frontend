import { useRef, useState } from 'react';
import HeadingDash from '../../components/HeadingDash/HeadingDash';
import { useDashboard } from '../../Providers/DashboardContext';
import {
  Box,
  Divider,
  Flex,
  Icon,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { FaComments } from 'react-icons/fa';
import useCustomToast from '../../hooks/useCustomToast';
import DeleteButton from '../../components/DeleteButton/DeleteButton';
import DashboardButton from '../../components/DashboardButton/DashboardButton';
import SearchBox from '../../components/SearchBox/SearchBox';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal/ConfirmDeleteModal';
import useSearchResource from '../../hooks/useSearchResource';

const CommentsDash = () => {
  const { comments, setComments, setLoading, fetchResources, deleteResources } =
    useDashboard();
  const [selectedComment, setSelectedComment] = useState(null);
  const inputRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showToast } = useCustomToast();

  const { handleSearch } = useSearchResource({
    inputRef,
    setLoading,
    resource: 'comments',
    setItems: setComments,
    showToast
  });

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
        <SearchBox
          inputRef={inputRef}
          handleSearch={handleSearch}
          placeholder='Buscar comentario...'
          allButton={
            <DashboardButton onAction={resetComments} w='100px'>
              Todos
            </DashboardButton>
          }
        />
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

        {comments.map((comment, index) => {
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

              <DeleteButton
                item={comment}
                setSelectedItem={setSelectedComment}
                onOpen={onOpen}
              />
            </Flex>
          );
        })}

        <ConfirmDeleteModal
          isOpen={isOpen}
          onClose={() => {
            setSelectedComment(null);
            onClose();
          }}
          textQuestion={`¿Estás seguro de que quieres eliminar este comentario ➡️ "
              ${selectedComment?.text}"?`}
          onAction={confirmDelete}
        />
      </Flex>
    </section>
  );
};

export default CommentsDash;
