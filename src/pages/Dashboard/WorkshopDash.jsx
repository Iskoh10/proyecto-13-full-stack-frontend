import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import HeadingDash from '../../components/HeadingDash/HeadingDash';
import { useDashboard } from '../../Providers/DashboardContext';
import { MdSchool } from 'react-icons/md';
import { useRef, useState } from 'react';
import Switcher from '../../components/Switcher/Switcher';
import { FaPlus } from 'react-icons/fa';
import formatDate from '../../utils/formatDate';
import useCustomToast from '../../hooks/useCustomToast';
import { useForm } from 'react-hook-form';
import { useUser } from '../../Providers/UserContext';
import DeleteButton from '../../components/DeleteButton/DeleteButton';
import InfoCard from '../../components/InfoCard/InfoCard';
import DashboardButton from '../../components/DashboardButton/DashboardButton';
import SearchBox from '../../components/SearchBox/SearchBox';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal/ConfirmDeleteModal';
import useCreateModForm from '../../hooks/useCreateModForm';
import CreateModFormModal from '../../components/CreateModFormModal/CreateModFormModal';
import useSwitchAvailability from '../../hooks/useSwitchAvailability';
import useSearchResource from '../../hooks/useSearchResource';

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

  const { handleSearch } = useSearchResource({
    inputRef,
    setLoading,
    resource: 'workshops',
    setItems: setWorkshops,
    showToast
  });

  const resetWorkshops = () => {
    fetchResources(
      'http://localhost:3000/api/v1/workshops',
      setWorkshops,
      'workshops'
    );
  };

  const { onSubmit } = useCreateModForm({
    user,
    reset,
    setImageFiles,
    setSelectedItem: setSelectedWorkshop,
    onCloseNewItem: onCloseNewWorkshop,
    fetchResources,
    setItems: setWorkshops,
    showToast,
    setLoading
  });

  const { handleSwitch } = useSwitchAvailability({
    resource: 'workshops',
    setItems: setWorkshops,
    showToast
  });

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
        <SearchBox
          inputRef={inputRef}
          handleSearch={handleSearch}
          placeholder='Buscar taller...'
          allButton={
            <DashboardButton onAction={resetWorkshops} w='100px'>
              Todos
            </DashboardButton>
          }
        />
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
              align='center'
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

        <ConfirmDeleteModal
          isOpen={isOpen}
          onClose={() => {
            setSelectedWorkshop(null);
            onClose();
          }}
          textQuestion={`¿Estás seguro de que quieres eliminar « ${selectedWorkshop?.title} »?`}
          onAction={confirmDelete}
        />

        <CreateModFormModal
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
          loading={loading.workshops}
          selectedItem={selectedWorkshop}
          labelTarget='taller'
          onSubmit={handleSubmit((data) =>
            onSubmit({
              data,
              imageFiles,
              target: 'workshops',
              selectedItem: selectedWorkshop,
              targetText: 'Taller'
            })
          )}
          errors={errors}
          register={register}
          imageFiles={imageFiles}
          onImageAction={(e) => {
            const file = e.target.files[0];
            if (file) setImageFiles([file]);
          }}
          fields={[
            { name: 'title', label: 'Título', type: 'text', required: true },
            {
              name: 'description',
              label: 'Descripción',
              type: 'text',
              required: true
            },
            {
              name: 'eventDate',
              label: 'Fecha y hora del taller',
              type: 'datetime-local',
              required: true
            },
            { name: 'images', label: 'Imagen', type: 'file', required: true },
            {
              name: 'capacity',
              label: 'Capacidad',
              type: 'number',
              required: true
            },
            { name: 'available', label: 'Disponible', type: 'checkbox' }
          ]}
        />
      </Flex>
    </section>
  );
};

export default WorkshopsDash;
