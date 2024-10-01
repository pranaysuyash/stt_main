// src/components/pages/ConfirmEmail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import Notification from '../common/Notification';
import Button from '../common/Button';

const ConfirmEmail = () => {
  const { token } = useParams();
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await api.get(`/auth/confirm/${token}`);
        setNotification({ message: response.data.message, type: 'success' });
        setTimeout(() => {
          navigate('/login');
        }, 3000); // Redirect after 3 seconds
      } catch (err) {
        const errorMsg = err.response?.data?.error || 'Email confirmation failed.';
        setNotification({ message: errorMsg, type: 'error' });
      }
    };
    confirmEmail();
  }, [token, navigate]);

  return (
    <div>
      <h2>Email Confirmation</h2>
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}
      {/* Optionally, add a button to resend confirmation email */}
      {notification.type === 'error' && (
        <Button onClick={() => navigate('/register')} variant="secondary">
          Retry Registration
        </Button>
      )}
    </div>
  );
};

export default ConfirmEmail;
