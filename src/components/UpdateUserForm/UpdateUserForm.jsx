import { Flex } from '@chakra-ui/react';
import EditableField from '../EditableField/EditableField';
import profileFields from '../../data/profileFields';
import EditFieldModal from '../EditFieldModal/EditFieldModal';

const UpdateUserForm = ({
  state,
  handleFieldClick,
  handleUpdate,
  fieldToEdit,
  isOpen,
  onClose
}) => {
  return (
    <Flex
      as='form'
      w='30%'
      direction='column'
      align='center'
      p={5}
      gap={5}
      bg='gray.200'
      border='1px solid'
      borderColor='gray.300'
      borderRadius='10px'
    >
      {profileFields.map(({ key, label }) => (
        <EditableField
          key={key}
          label={label}
          value={state[key]}
          onClick={() => handleFieldClick(key, label)}
        />
      ))}

      {fieldToEdit && (
        <EditFieldModal
          field={fieldToEdit.label}
          fieldValue={state[fieldToEdit.key]}
          isOpen={isOpen}
          onClose={onClose}
          onSubmitField={(value) => handleUpdate(fieldToEdit.key, value)}
        />
      )}
    </Flex>
  );
};

export default UpdateUserForm;
