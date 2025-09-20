import { Flex, Heading, Spinner, Stack, useDisclosure } from '@chakra-ui/react';
import './Workshops.css';
import { useEffect, useRef, useState } from 'react';
import useCustomToast from '../../hooks/useCustomToast';
import { useUser } from '../../Providers/UserContext';
import CardWorkshop from '../../components/CardWorkshop/CardWorkshop';
import DetailsWorkshopModal from '../../components/DetailsWorkshopModal/DetailsWorkshopModal';
import useVote from '../../hooks/useVote';
import useAttend from '../../hooks/useAttend';
import useAddComment from '../../hooks/useAddComment';

const Workshops = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const commentRef = useRef();
  const [loadingComment, setLoadingComment] = useState(false);
  const { user } = useUser();
  const { handleVote, hasVote } = useVote({
    setItems: setWorkshops,
    selectedItem: selectedWorkshop,
    setSelectedItem: setSelectedWorkshop,
    showToast,
    user
  });
  const { handleAttend, isAttending } = useAttend({
    user,
    setWorkshops,
    selectedWorkshop,
    setSelectedWorkshop,
    showToast
  });
  const { handleAddComment } = useAddComment({
    commentRef,
    target: 'Workshop',
    setLoadingComment,
    selectedItem: selectedWorkshop,
    setSelectedItem: setSelectedWorkshop,
    setItems: setWorkshops,
    showToast
  });

  useEffect(() => {
    setLoading(true);
    const fetchWorkshop = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/workshops`
        );

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
      <Flex wrap='wrap' justify='center' gap={4} pb={10}>
        {workshops?.map((workshop) => {
          const eventDate = new Date(workshop.eventDate);
          const day = eventDate.toLocaleDateString('es-Es');
          const time = eventDate.toLocaleTimeString('es-Es', {
            hour: '2-digit',
            minute: '2-digit'
          });
          return (
            <CardWorkshop
              key={workshop._id}
              workshop={workshop}
              setSelectedWorkshop={setSelectedWorkshop}
              onOpen={onOpen}
              day={day}
              time={time}
            />
          );
        })}
      </Flex>
      {selectedWorkshop && (
        <DetailsWorkshopModal
          isOpen={isOpen}
          onClose={onClose}
          selectedWorkshop={selectedWorkshop}
          user={user}
          handleVote={handleVote}
          hasVote={hasVote}
          isAttending={isAttending}
          handleAttend={handleAttend}
          commentRef={commentRef}
          handleAddComment={handleAddComment}
          loadingComment={loadingComment}
        />
      )}
    </main>
  );
};

export default Workshops;
