import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  ModalFooter,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import HeadingDash from '../../components/HeadingDash/HeadingDash';
import { useDashboard } from '../../Providers/DashboardContext';
import { MdSchool } from 'react-icons/md';
import { useRef, useState } from 'react';
import Switcher from '../../components/Switcher/Switcher';
import { FaPlus } from 'react-icons/fa';
import CustomModal from '../../components/CustomModal/CustomModal';
import formatDate from '../../utils/formatDate';
import useCustomToast from '../../hooks/useCustomToast';
import { useForm } from 'react-hook-form';
import { useUser } from '../../Providers/UserContext';
import DeleteButton from '../../components/DeleteButton/DeleteButton';
import InfoCard from '../../components/InfoCard/InfoCard';

const WorkshopsDash = () => {
  const {
    workshops,
    setWorkshops,
    loading,
    setLoading,
    fetchResources,
    deleteResources
  } = useDashboard();
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      eventDate: '',
      capacity: '',
      available: true
    }
  });
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const inputRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenNewWorkshop,
    onOpen: onOpenNewWorkshop,
    onClose: onCloseNewWorkshop
  } = useDisclosure();
  const { showToast } = useCustomToast();
  const [imageFiles, setImageFiles] = useState([]);

  const handleSearch = async () => {
    const search = inputRef.current.value;

    if (!search.trim()) return;

    try {
      setLoading((prev) => ({ ...prev, workshops: true }));
      const res = await fetch(
        `http://localhost:3000/api/v1/workshops/filter/${search}`,
        {
          credentials: 'include'
        }
      );

      if (!res.ok) throw new Error('Error en búsqueda.');
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

      setWorkshops(data);
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

  const resetWorkshops = () => {
    fetchResources(
      'http://localhost:3000/api/v1/workshops',
      setWorkshops,
      'workshops'
    );
  };

  const onSubmit = async (data) => {
    if (!user) throw new Error('No estás logueado.');
    if (imageFiles.length === 0) {
      showToast({
        title: 'Error',
        description: 'Sube una imagen',
        status: 'error'
      });
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('eventDate', data.eventDate);
    formData.append('image', imageFiles[0]);
    formData.append('capacity', data.capacity);
    formData.append('available', data.available);
    formData.append('user', user._id);

    try {
      setLoading((prev) => ({ ...prev, workshops: true }));
      const url = selectedWorkshop
        ? `http://localhost:3000/api/v1/workshops/${selectedWorkshop._id}`
        : 'http://localhost:3000/api/v1/workshops';

      const method = selectedWorkshop ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        credentials: 'include',
        body: formData
      });

      if (!res.ok) throw new Error('Error creando/actualizando el taller.');

      reset();
      setImageFiles([]);
      setSelectedWorkshop(null);
      onCloseNewWorkshop();
      fetchResources(
        'http://localhost:3000/api/v1/workshops',
        setWorkshops,
        'workshops'
      );

      showToast({
        description: selectedWorkshop
          ? 'Taller actualizado correctamente.'
          : 'Taller creado correctamente.',
        status: 'success'
      });
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'No se pudo guardar el taller',
        status: 'error'
      });
    } finally {
      setLoading((prev) => ({ ...prev, workshops: false }));
    }
  };

  const handleSwitch = async (workshopId, currentValue) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/workshops/${workshopId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ available: !currentValue })
        }
      );

      if (!res.ok) throw new Error('Error en la actualización.');
      const data = await res.json();

      setWorkshops((prev) =>
        prev.map((p) =>
          p._id === workshopId ? { ...p, available: !p.available } : p
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
    deleteResources('workshops', selectedWorkshop._id, setWorkshops);
    setSelectedWorkshop(null);
    onClose();
  };

  return (
    <section className='main-dashboard'>
      <HeadingDash>Talleres</HeadingDash>
      <Flex gap={10} align='center' mb={10}>
        <InfoCard
          w='25%'
          icon={MdSchool}
          count={workshops?.length}
          label='Talleres totales'
        />

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
              placeholder='Buscar taller...'
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
            onClick={() => resetWorkshops()}
          >
            Todos
          </Button>
        </Flex>
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
            <Text textAlign='right' mr={10}>
              Disponible
            </Text>
          </Box>

          <Button
            leftIcon={<FaPlus />}
            bg='blue.500'
            color='white'
            w='17%'
            _hover={{ bg: 'blue.200' }}
            onClick={() => {
              setSelectedWorkshop(null);
              reset({
                title: '',
                description: '',
                eventDate: '',
                capacity: '',
                available: true
              });
              setImageFiles([]);
              onOpenNewWorkshop();
            }}
          >
            Nuevo taller
          </Button>
        </Flex>

        {workshops.map((workshop, index) => {
          const bgWorkshop = !workshop.available
            ? 'red.200'
            : index % 2 === 0
            ? 'gray.100'
            : 'white';
          return (
            <Flex
              key={workshop._id}
              justify='space-between'
              bg={bgWorkshop}
              p={2}
              _hover={{ bg: 'gray.300' }}
              cursor='pointer'
              onClick={(e) => {
                e.stopPropagation();
                setSelectedWorkshop(workshop);
                reset({
                  title: workshop.title,
                  description: workshop.description,
                  eventDate: new Date(workshop.eventDate)
                    .toISOString()
                    .slice(0, 16),
                  capacity: workshop.capacity,
                  available: workshop.available
                });
                setImageFiles([]);
                onOpenNewWorkshop();
              }}
            >
              <Box w='210px'>
                <Text>{workshop.title}</Text>
              </Box>
              <Box>
                <Text>{formatDate(workshop.eventDate)}</Text>
              </Box>
              <Box onClick={(e) => e.stopPropagation()}>
                <Switcher
                  isChecked={workshop.available}
                  onChange={() =>
                    handleSwitch(workshop._id, workshop.available)
                  }
                />
              </Box>
              <DeleteButton
                item={workshop}
                setSelectedItem={setSelectedWorkshop}
                disabledCondition={!workshop.available}
                onOpen={onOpen}
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

        <CustomModal
          isOpen={isOpenNewWorkshop}
          onClose={() => {
            reset({
              title: '',
              description: '',
              eventDate: '',
              capacity: '',
              available: true
            });
            setSelectedWorkshop(null);
            setImageFiles([]);
            onCloseNewWorkshop();
          }}
          size='xl'
        >
          <Flex direction='column' align='center' mt={5}>
            <Heading textAlign='center' mb={3}>
              {selectedWorkshop ? 'Modificar taller' : 'Crear nuevo taller'}
            </Heading>
            <form id='new-workshop-form' onSubmit={handleSubmit(onSubmit)}>
              <FormControl mb={4} isInvalid={errors.title}>
                <FormLabel>Título</FormLabel>
                <Input
                  placeholder='Título del taller...'
                  {...register('title', {
                    required: 'El título es obligatorio'
                  })}
                />
              </FormControl>

              <FormControl mb={4} isInvalid={errors.slug}>
                <FormLabel>Descripción</FormLabel>
                <Input
                  placeholder='Descripción del taller...'
                  {...register('description', {
                    required: 'La descripción es obligatorio'
                  })}
                />
              </FormControl>

              <FormControl mb={4} isInvalid={errors.summary}>
                <FormLabel>Fecha del taller</FormLabel>
                <Input
                  type='datetime-local'
                  placeholder='Fecha y hora del taller...'
                  {...register('eventDate', {
                    required: 'La fecha y hora es obligatorio'
                  })}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Imagen</FormLabel>
                <Input
                  type='file'
                  accept='image/*'
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setImageFiles([file]);
                  }}
                />
                {imageFiles.length > 0 && (
                  <Image
                    src={URL.createObjectURL(imageFiles[0])}
                    alt='preview'
                    borderRadius='md'
                    boxSize='200px'
                    objectFit='cover'
                  />
                )}
              </FormControl>

              <FormControl mb={4} isInvalid={errors.summary}>
                <FormLabel>Capacidad</FormLabel>
                <Input
                  type='number'
                  placeholder='Plazas disponibles...'
                  {...register('capacity', {
                    required: 'El numero  de plazas es obligatorio'
                  })}
                />
              </FormControl>

              <FormControl mb={4}>
                <Checkbox {...register('available')}>Disponible</Checkbox>
              </FormControl>

              <ModalFooter>
                <Button
                  colorScheme={selectedWorkshop ? 'red' : 'blue'}
                  type='submit'
                  isLoading={loading.workshops}
                  loadingText={
                    selectedWorkshop ? 'Modificando...' : 'Creando...'
                  }
                  isDisabled={loading.workshops}
                >
                  {selectedWorkshop ? 'Modificar' : 'Crear'}
                </Button>
                <Button ml={3} onClick={onCloseNewWorkshop}>
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

export default WorkshopsDash;

//! AÑADIR BOTON TODOS A SearchBox opcional
