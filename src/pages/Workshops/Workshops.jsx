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
import './Workshops.css';
import { useEffect, useRef, useState } from 'react';
import useCustomToast from '../../hooks/useCustomToast';
import CustomModal from '../../components/CustomModal/CustomModal';
import { useUser } from '../../Providers/UserContext';

const Workshops = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const commentRef = useRef();
  const [loadingComment, setLoadingComment] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setLoading(true);
    const fetchWorkshop = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/v1/workshops');

        if (!res.ok) {
          throw new Error('No se pudo recuperar los talleres');
        }

        const data = await res.json();
        setWorkshops(data);
        setLoading(false);
      } catch (error) {
        showToast({
          title: 'Error',
          description: 'Error al obtener los talleres',
          status: 'error'
        });
      }
    };
    fetchWorkshop();
  }, []);

  const handleVote = async (workshopId, action) => {
    if (!user) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/workshops/${workshopId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ action })
        }
      );

      if (!res.ok) throw new Error('Error al votar');

      const updatedWorkshop = await res.json();

      setWorkshops((prev) =>
        prev.map((workshop) =>
          workshop._id === updatedWorkshop._id ? updatedWorkshop : workshop
        )
      );

      if (selectedWorkshop?._id === updatedWorkshop._id) {
        setSelectedWorkshop(updatedWorkshop);
      }
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'No se pudo registrar tu voto',
        status: 'error'
      });
    }
  };

  const hasVote =
    selectedWorkshop &&
    user &&
    (selectedWorkshop.likes.some((u) => u._id === user._id) ||
      selectedWorkshop.dislikes.some((u) => u._id === user._id));

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
          target: 'Workshop',
          eventId: selectedWorkshop._id
        })
      });

      if (!res.ok) throw new Error('Error al crear el comentario');

      const createdComment = await res.json();
      const commentWithUser = { ...createdComment, user };

      setSelectedWorkshop((prev) => ({
        ...prev,
        comments: [...prev.comments, commentWithUser]
      }));

      setWorkshops((prev) =>
        prev.map((workshop) =>
          workshop._id === selectedWorkshop._id
            ? { ...workshop, comments: [...workshop.comments, createdComment] }
            : workshop
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
    <main className='workshops'>
      <Heading align='center' py='4'>
        Nuestros Talleres
      </Heading>
      <Flex wrap='wrap' gap={4}>
        {workshops.map((workshop) => {
          const eventDate = new Date(workshop.eventDate);
          const day = eventDate.toLocaleDateString('es-Es');
          const time = eventDate.toLocaleTimeString('es-Es', {
            hour: '2-digit',
            minute: '2-digit'
          });
          return (
            <Flex
              key={workshop._id}
              direction='column'
              p={4}
              ml={5}
              mt={5}
              width='400px'
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
                setSelectedWorkshop(workshop), onOpen();
              }}
            >
              <Heading size='md' textAlign='center'>
                {workshop.title}
              </Heading>
              <Text textAlign='center' mb={5}>
                {workshop.description}
              </Text>
              <Flex direction='column'>
                <Flex align='flex-start' width='100%'>
                  <Text>
                    Fecha: {day} a las {time}
                  </Text>
                </Flex>
                <Flex width='100%' justify='flex-end'>
                  <Text>Plazas: {workshop.capacity}</Text>
                </Flex>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
      {selectedWorkshop && (
        <CustomModal isOpen={isOpen} onClose={onClose}>
          <Flex direction='column' align='center' mt={5}>
            <Heading textAlign='center'>{selectedWorkshop.title}</Heading>
            <Text>{selectedWorkshop.description}</Text>
            {user ? (
              <Flex direction='column' mt={5}>
                <Text width='70%'>
                  Asistentes: [ {selectedWorkshop.attendees} ]
                </Text>
                <Text width='70%'>
                  Me gusta: [ {selectedWorkshop.likes.length} 💚 ]
                </Text>
                <Text width='70%'>
                  No me gusta: [ {selectedWorkshop.dislikes.length} 💔 ]
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
              </Flex>
            ) : null}
            <Flex width='50%' justify='center' textAlign='center' mt={4}>
              {selectedWorkshop.fileUrl && (
                <Flex direction='column' justify='center' gap={5}>
                  <Image
                    boxSize='350'
                    src='#'
                    alt='portada taller'
                    border='1px solid'
                  ></Image>
                  <Button
                    as='a'
                    href={selectedWorkshop.fileUrl}
                    download
                    target='_blank'
                    rel='noopener noreferrer'
                    colorScheme='teal'
                  >
                    Descargar PDF
                  </Button>
                </Flex>
              )}
            </Flex>
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
                  {selectedWorkshop.comments.map((comment) => (
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
      )}
    </main>
  );
};

export default Workshops;

//! MEJORAR LA CARD, revisar el detalle de las cartas
