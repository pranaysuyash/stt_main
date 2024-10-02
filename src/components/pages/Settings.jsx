// src/components/pages/Settings.jsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../utils/api';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SettingsContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.text};
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 10px 10px 35px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-family: ${({ theme }) => theme.fonts.primary};
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 2px rgba(30, 144, 255, 0.2);
  }
`;

const InputIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 10px;
  top: 38px;
  color: ${({ theme }) => theme.colors.text};
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

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-top: 5px;
`;

const SuccessMessage = styled.p`
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-top: 5px;
`;

const Settings = () => {
  const { auth, login } = useAuth();
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const [passwords, setPasswords] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (auth.user) {
      setUserData({
        first_name: auth.user.first_name || '',
        last_name: auth.user.last_name || '',
        email: auth.user.email || '',
      });
    }
  }, [auth.user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await api.put('/auth/settings', {
        ...userData,
        ...(passwords.new_password ? passwords : {}),
      });
      setMessage('Settings updated successfully');
      login(auth.token, response.data.user);
      
      // Clear password fields after successful update
      setPasswords({
        current_password: '',
        new_password: '',
        confirm_password: '',
      });
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <SettingsContainer>
      <h1>Settings</h1>
      <SettingsForm onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="first_name">First Name</Label>
          <InputIcon icon={faUser} />
          <Input
            id="first_name"
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={handleInputChange}
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="last_name">Last Name</Label>
          <InputIcon icon={faUser} />
          <Input
            id="last_name"
            type="text"
            name="last_name"
            value={userData.last_name}
            onChange={handleInputChange}
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <InputIcon icon={faEnvelope} />
          <Input
            id="email"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="current_password">Current Password</Label>
          <InputIcon icon={faLock} />
          <PasswordInputWrapper>
            <Input
              id="current_password"
              type={showCurrentPassword ? "text" : "password"}
              name="current_password"
              value={passwords.current_password}
              onChange={handlePasswordChange}
            />
            <TogglePasswordVisibility
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              aria-label={showCurrentPassword ? "Hide current password" : "Show current password"}
            >
              <FontAwesomeIcon icon={showCurrentPassword ? faEyeSlash : faEye} />
            </TogglePasswordVisibility>
          </PasswordInputWrapper>
        </InputGroup>
        <InputGroup>
          <Label htmlFor="new_password">New Password</Label>
          <InputIcon icon={faLock} />
          <PasswordInputWrapper>
            <Input
              id="new_password"
              type={showNewPassword ? "text" : "password"}
              name="new_password"
              value={passwords.new_password}
              onChange={handlePasswordChange}
            />
            <TogglePasswordVisibility
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              aria-label={showNewPassword ? "Hide new password" : "Show new password"}
            >
              <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
            </TogglePasswordVisibility>
          </PasswordInputWrapper>
        </InputGroup>
        <InputGroup>
          <Label htmlFor="confirm_password">Confirm New Password</Label>
          <InputIcon icon={faLock} />
          <PasswordInputWrapper>
            <Input
              id="confirm_password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              value={passwords.confirm_password}
              onChange={handlePasswordChange}
            />
            <TogglePasswordVisibility
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
            </TogglePasswordVisibility>
          </PasswordInputWrapper>
        </InputGroup>
        <Button type="submit">Save Changes</Button>
      </SettingsForm>
      {message && <SuccessMessage>{message}</SuccessMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SettingsContainer>
  );
};

export default Settings;