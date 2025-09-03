import { Flex } from '@chakra-ui/react';
import InfoForm from '../../components/InfoForm/InfoForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import './Form.css';

const Form = () => {
  return (
    <main className='form'>
      <RegisterForm />
      <InfoForm />
      <LoginForm />
    </main>
  );
};

export default Form;
