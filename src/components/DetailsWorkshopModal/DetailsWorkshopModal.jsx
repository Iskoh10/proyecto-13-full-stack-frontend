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

const DetailsWorkshopModal = ({
  isOpen,
  onClose,
  selectedWorkshop,
  user,
  handleVote,
  hasVote,
  isAttending,
  handleAttend,
  commentRef,
  handleAddComment,
  loadingComment
}) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <Flex direction='column' align='center' mt={5}>
        <Heading textAlign='center' mb={4}>
          {selectedWorkshop.title}
        </Heading>
        <Text>{selectedWorkshop.description}</Text>
        <Flex align='center' w='350px' h='350px'>
          <Image src={selectedWorkshop.image} w='100%' objectFit='contain' />
        </Flex>
        {user ? (
          <Flex direction='column' mt={5}>
            <Text width='70%'>
              Asistentes: [{' '}
              {selectedWorkshop?.attendees?.map((a) => a.name).join(', ')} ]
            </Text>
            <Text width='70%'>
              Me gusta: [ {selectedWorkshop?.likes.length} 💚 ]
            </Text>
            <Text width='70%'>
              No me gusta: [ {selectedWorkshop?.dislikes.length} 💔 ]
            </Text>
            <Flex mt={3} justify='center' gap={4}>
              <Button
                bg='green.300'
                onClick={() => handleVote(selectedWorkshop._id, 'like')}
                disabled={hasVote}
              >
                💚 Me gusta
              </Button>
              <Button
                bg='red.300'
                onClick={() => handleVote(selectedWorkshop._id, 'dislike')}
                disabled={hasVote}
              >
                💔 No me gusta
              </Button>
            </Flex>
            <Flex mt={5}>
              <Button
                colorScheme={isAttending ? 'red' : 'blue'}
                onClick={() =>
                  handleAttend(
                    selectedWorkshop._id,
                    isAttending ? 'unattend' : 'attend'
                  )
                }
                disabled={!isAttending && selectedWorkshop.capacity <= 0}
              >
                {isAttending ? '🙅‍♂️ No Asistir' : '🙋‍♂️ Asistir'}
              </Button>
            </Flex>
          </Flex>
        ) : null}
        {user ? (
          <Box
            border='1px solid'
            borderColor='gray.400'
            borderRadius='10px'
            p={5}
            mt={3}
          >
            <Text width='70%' fontSize='2rem'>
              Comentarios
            </Text>
            <Stack mt={5} width='100%'>
              {selectedWorkshop.comments?.map((comment) => (
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
        ) : (
          <Text mt={3} color='gray.500' textAlign='center'>
            Inicia sesión para ver likes y comentarios.
          </Text>
        )}
      </Flex>
    </CustomModal>
  );
};

export default DetailsWorkshopModal;
