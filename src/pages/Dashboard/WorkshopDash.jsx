import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import HeadingDash from '../../components/HeadingDash/HeadingDash';
import { useDashboard } from '../../Providers/DashboardContext';
import { MdSchool } from 'react-icons/md';
import { useRef, useState } from 'react';
import Switcher from '../../components/Switcher/Switcher';
import { FaPlus, FaTrash } from 'react-icons/fa';
import CustomModal from '../../components/CustomModal/CustomModal';
import formatDate from '../../utils/formatDate';

const WorkshopsDash = () => {
  const { workshops } = useDashboard();
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const inputRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = () => {
    const search = inputRef.current.value;

    if (!search.trim()) return;
    console.log(search);
  };

  const handleSwitch = () => {};

  const confirmDelete = () => {};

  return (
    <section className='main-dashboard'>
      <HeadingDash>Talleres</HeadingDash>
      {console.log(workshops)}

      <Flex gap={10} align='center' mb={10}>
        <Flex
          h='10svh'
          bg='white'
          borderRadius='10px'
          p={5}
          align='center'
          w='25%'
        >
          <Icon as={MdSchool} boxSize={12} color='blue.500' />
          <Flex direction='column' ml={5}>
            <Text fontSize='2rem' color='isc.darkAccent'>
              {workshops?.length}
            </Text>
            <Text>Talleres totales</Text>
          </Flex>
        </Flex>
        <InputGroup w='50%'>
          <Input
            type='search'
            placeholder='Buscar producto...'
            ref={inputRef}
          />
          <Button ml={2} colorScheme='blue' onClick={handleSearch}>
            Buscar
          </Button>
        </InputGroup>
      </Flex>

      <Flex bg='white' borderRadius='10px' p={5} direction='column' gap={2}>
        <Flex mb={5} align='center'>
          <Box w='39%'>
            <Text>Título</Text>
          </Box>
          <Box flex='1'>
            <Text>Fecha</Text>
          </Box>

          <Box flex='1'>
            <Text textAlign='right' mr={5}>
              Disponible
            </Text>
          </Box>

          <Button
            leftIcon={<FaPlus />}
            bg='blue.500'
            color='white'
            w='17%'
            _hover={{ bg: 'blue.200' }}
          >
            Nuevo taller
          </Button>
        </Flex>

        {workshops.map((workshop, index) => {
          const bgWorkshop = index % 2 === 0 ? 'gray.200' : 'white';
          return (
            <Flex
              justify='space-between'
              bg={bgWorkshop}
              p={2}
              _hover={{ bg: 'gray.300' }}
            >
              <Box>
                <Text>{workshop.title}</Text>
              </Box>
              <Box>
                <Text>{formatDate(workshop.eventDate)}</Text>
              </Box>
              <Box>
                <Switcher
                  isChecked={workshop.available}
                  onChange={() =>
                    handleSwitch(workshop._id, workshop.available)
                  }
                />
              </Box>
              <IconButton
                aria-label='Eliminar taller'
                icon={<FaTrash />}
                colorScheme='red'
                size='xs'
                isDisabled={!workshop.available}
                onClick={() => {
                  setSelectedWorkshop(workshop);
                  onOpen();
                }}
              />
            </Flex>
          );
        })}

        <CustomModal
          isOpen={isOpen}
          onClose={() => {
            setSelectedWorkshop(null);
            onClose();
          }}
        >
          <Flex direction='column' mt={8}>
            <Text m={5}>
              ¿Estás seguro de que quieres eliminar {selectedWorkshop?.title}?
            </Text>
            <Flex justify='flex-end'>
              <Button
                onClick={() => {
                  setSelectedWorkshop(null);
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

export default WorkshopsDash;

//! Implementar la busqueda por titulo, pulsar el titulo para modificar el taller, implementar la funcionalidad del switcher y el boton de eliminar, añadir logica del boton de crear nuevo taller.
