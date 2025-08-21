import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import './Workshops.css';
import { useEffect, useState } from 'react';
import useCustomToast from '../../hooks/useCustomToast';
import CustomModal from '../../components/CustomModal/CustomModal';

const Workshops = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const { showToast } = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/v1/workshops');

        if (!res.ok) {
          throw new Error('No se pudo recuperar los talleres');
        }

        const data = await res.json();
        setWorkshops(data);
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
          <Flex direction='column' align='center'>
            <Heading textAlign='center'>{selectedWorkshop.title}</Heading>
            <Text>{selectedWorkshop.description}</Text>

            <Text width='70%'>
              Asistentes: [ {selectedWorkshop.attendees} ]
            </Text>
            <Text width='70%'>Me gusta: [ {selectedWorkshop.likes} 💚 ]</Text>
            <Text width='70%'>
              No me gusta: [ {selectedWorkshop.dislikes} 💔 ]
            </Text>
            <Text width='70%'>Comentarios: [ {selectedWorkshop.likes} ]</Text>
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
          </Flex>
        </CustomModal>
      )}
    </main>
  );
};

export default Workshops;
