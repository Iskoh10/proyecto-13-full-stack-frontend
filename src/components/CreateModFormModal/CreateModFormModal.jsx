import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  ModalFooter,
  Textarea
} from '@chakra-ui/react';
import CustomModal from '../CustomModal/CustomModal';

const CreateModFormModal = ({
  isOpen,
  onClose,
  selectedItem,
  labelTarget,
  onSubmit,
  errors,
  register,
  imageFiles,
  onImageAction,
  loading,
  fields,
  typeProduct,
  handleSelect
}) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} size='xl'>
      <Flex direction='column' align='center' mt={5}>
        <Heading textAlign='center' mb={3}>
          {selectedItem
            ? `Modificar ${labelTarget}`
            : `Crear nuevo ${labelTarget}`}
        </Heading>
        <form id='form-modal' onSubmit={onSubmit}>
          {fields.map((field, idx) => (
            <FormControl key={idx} mb={4} isInvalid={errors[field.name]}>
              {field.type !== 'checkbox' && (
                <FormLabel>{field.label}</FormLabel>
              )}

              {field.type === 'text' && (
                <Input
                  placeholder={field.label}
                  {...register(field.name, {
                    required: field.required && `${field.label} es obligatorio`
                  })}
                />
              )}

              {field.type === 'datetime-local' && (
                <Input
                  type='datetime-local'
                  placeholder={field.label}
                  {...register(field.name, {
                    required: field.required && `${field.label} es obligatorio`
                  })}
                />
              )}

              {field.type === 'number' && (
                <Input
                  type='number'
                  step={field.step || '1'}
                  placeholder={field.label}
                  {...register(field.name, {
                    required: field.required && `${field.label} es obligatorio`
                  })}
                />
              )}

              {field.type === 'textarea' && (
                <Textarea
                  placeholder={field.label}
                  {...register(field.name, {
                    required: field.required && `${field.label} es obligatorio`
                  })}
                />
              )}

              {field.type === 'file' && (
                <>
                  <Input
                    type='file'
                    multiple={field.multiple || false}
                    accept='image/*'
                    onChange={onImageAction}
                  />
                  {imageFiles.length > 0 &&
                    (field.multiple ? (
                      <Flex gap={2} mt={3}>
                        {imageFiles.map((file, idx) => (
                          <Image
                            key={idx}
                            src={URL.createObjectURL(file)}
                            alt={`preview ${idx}`}
                            borderRadius='md'
                            boxSize='100px'
                            objectFit='cover'
                          />
                        ))}
                      </Flex>
                    ) : (
                      <Image
                        src={URL.createObjectURL(imageFiles[0])}
                        alt='preview'
                        borderRadius='md'
                        boxSize='200px'
                        objectFit='cover'
                        mt={3}
                      />
                    ))}
                </>
              )}

              {field.type === 'checkbox' && (
                <Checkbox {...register(field.name)}>{field.label}</Checkbox>
              )}

              {field.type === 'selectMenu' && (
                <Menu>
                  <MenuButton
                    as={Box}
                    m={2}
                    p={2}
                    bg='white'
                    w='250px'
                    border='1px solid'
                    borderColor='gray.400'
                    _hover={{ bg: 'gray.200' }}
                    borderRadius='md'
                    cursor='pointer'
                  >
                    {typeProduct || field.label}
                  </MenuButton>
                  <MenuList placement='bottom-start'>
                    <MenuItem onClick={() => handleSelect('panaderia')}>
                      Panadería
                    </MenuItem>
                    <MenuItem onClick={() => handleSelect('bolleria')}>
                      Bollería
                    </MenuItem>
                    <MenuItem onClick={() => handleSelect('pasteleria')}>
                      Pastelería
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </FormControl>
          ))}

          <ModalFooter>
            <Button
              colorScheme={selectedItem ? 'red' : 'blue'}
              type='submit'
              isLoading={loading}
              loadingText={selectedItem ? 'Modificando...' : 'Creando...'}
              isDisabled={loading}
            >
              {selectedItem ? 'Modificar' : 'Crear'}
            </Button>
            <Button ml={3} onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </form>
      </Flex>
    </CustomModal>
  );
};

export default CreateModFormModal;
