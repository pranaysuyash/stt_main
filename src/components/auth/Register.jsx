// src/components/auth/Register.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../utils/api';
import Button from '../common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

// Styled Components
const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

const RegisterForm = styled.form`
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

const SuccessMessage = styled.p`
  color: ${({ theme }) => theme.colors.success};
  text-align: center;
  margin-top: 1rem;
`;

const LoginPrompt = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
`;

const LoginLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const Register = () => {
  // State Variables for Form Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  
  // State Variables for Messages
  const [error, setError]         = useState('');
  const [success, setSuccess]     = useState('');
  
  const navigate = useNavigate();

  // Form Submission Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Basic Frontend Validation (Optional but Recommended)
    if (!firstName.trim() || !lastName.trim()) {
      setError('First Name and Last Name are required.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      // API Request to Signup Endpoint
      const response = await api.post('/auth/signup', { 
        first_name: firstName.trim(), 
        last_name: lastName.trim(), 
        email: email.trim(), 
        password 
      });
      
      console.log('Signup response:', response.data);
      
      // Set Success Message and Redirect After Delay
      setSuccess('Registration successful! Please log in.');
      setTimeout(() => navigate('/login'), 3000);
      
      // Optionally, you can also clear the form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      
      // Handle Specific Error Messages from Backend
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred during registration.');
      }
    }
  };

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleSubmit}>
        <Title>Create an Account</Title>
        
        {/* First Name Input */}
        <InputGroup>
          <InputIcon icon={faUser} />
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            autoComplete="given-name"
          />
        </InputGroup>
        
        {/* Last Name Input */}
        <InputGroup>
          <InputIcon icon={faUser} />
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            autoComplete="family-name"
          />
        </InputGroup>
        
        {/* Email Input */}
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
        
        {/* Password Input */}
        <InputGroup>
          <InputIcon icon={faLock} />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </InputGroup>
        
        {/* Submit Button */}
        <Button type="submit" fullWidth>
          Sign Up
        </Button>
        
        {/* Display Error or Success Messages */}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        {/* Link to Login Page */}
        <LoginPrompt>
          Already have an account? <LoginLink to="/login">Log in</LoginLink>
        </LoginPrompt>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;
