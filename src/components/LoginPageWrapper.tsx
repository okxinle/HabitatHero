import { useNavigate } from 'react-router-dom';
import { LoginPage } from './LoginPage';

export const LoginPageWrapper = () => {
  const navigate = useNavigate();

  const handleLoginComplete = () => {
    navigate('/quiz');
  };

  return <LoginPage onLoginComplete={handleLoginComplete} />;
};
