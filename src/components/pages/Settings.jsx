import React, { useState } from 'react';
import styled from 'styled-components';
import Notification from '../common/Notification';
import Button from '../common/Button';

const SettingsContainer = styled.div`
  padding: 20px;
`;

const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-family: ${({ theme }) => theme.fonts.primary};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 2px rgba(30, 144, 255, 0.2);
  }
`;

function Settings() {
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [settings, setSettings] = useState({
    username: '',
    email: '',
  });

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement settings update logic here
    setNotification({ message: 'Settings updated successfully!', type: 'success' });
  };

  return (
    <SettingsContainer>
      <h1>Settings</h1>
      {notification.message && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification({ message: '', type: 'success' })} 
        />
      )}
      <SettingsForm onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input 
            type="text" 
            id="username" 
            name="username" 
            value={settings.username} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            type="email" 
            id="email" 
            name="email" 
            value={settings.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <Button variant="primary" type="submit">
          Save Settings
        </Button>
      </SettingsForm>
    </SettingsContainer>
  );
}

export default Settings;
