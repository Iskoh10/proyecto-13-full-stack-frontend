import { Switch } from '@chakra-ui/react';

const Switcher = ({ onChange, isChecked }) => {
  return (
    <Switch colorScheme='teal' isChecked={isChecked} onChange={onChange} />
  );
};

export default Switcher;
