
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock,faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ForgotPassword from './ForgotPassword';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

const LoginForm = styled.form`
  background-color: ${({ theme }) => theme.colors.neutral};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const InputIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  margin-top: 1rem;
`;

const ForgotPasswordLink = styled.button`
  display: block;
  text-align: right;
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  &:hover {
    text-decoration: underline;
  }
`;

const RegisterPrompt = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
`;

const RegisterLink = styled.button`
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const TogglePasswordVisibility = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/login', { email, password });
      const { access_token } = response.data;

      localStorage.setItem('token', access_token);

      const userResponse = await api.get('/auth/me');
      const user = userResponse.data.user;

      login(access_token, user);

      navigate('/app/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'An error occurred during login');
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  if (showForgotPassword) {
    return <ForgotPassword onBack={() => setShowForgotPassword(false)} />;
  }

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Login</Title>
        <InputGroup>
          <InputIcon icon={faEnvelope} />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </InputGroup>
        <InputGroup>
          <InputIcon icon={faLock} />
          <PasswordInputWrapper>
          <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <TogglePasswordVisibility
              type="button"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </TogglePasswordVisibility>
          </PasswordInputWrapper>
        </InputGroup>
        <ForgotPasswordLink onClick={() => setShowForgotPassword(true)}>
          Forgot password?
        </ForgotPasswordLink>
        <Button type="submit" fullWidth>
          Log In
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <RegisterPrompt>
          Don't have an account?{' '}
          <RegisterLink onClick={() => navigate('/register')}>Sign up</RegisterLink>
        </RegisterPrompt>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;