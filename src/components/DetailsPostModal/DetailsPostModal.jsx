import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text
} from '@chakra-ui/react';
import CustomModal from '../CustomModal/CustomModal';
import { Fragment } from 'react';

const DetailsPostModal = ({
  isOpen,
  onClose,
  selectedPost,
  user,
  handleVote,
  hasVote,
  commentRef,
  handleAddComment,
  loadingComment
}) => {
  return (
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
  );
};

export default DetailsPostModal;
