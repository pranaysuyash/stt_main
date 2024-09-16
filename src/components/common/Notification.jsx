// frontend/src/components/common/Notification.jsx
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NotificationContainer = styled.div`
  background-color: ${({ $type, theme }) => 
    $type === 'success' ? theme.colors.success :
    $type === 'error' ? theme.colors.error :
    theme.colors.warning};
  color: white;
  padding: 15px 20px;
  border-radius: 5px;
  position: relative;
  margin-top: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
`;

function Notification({ message, type = 'success', onClose }) {
  return (
    <NotificationContainer $type={type} role="alert" aria-live="assertive">
      <span>{message}</span>
      <CloseButton onClick={onClose} aria-label="Close Notification">
        <FontAwesomeIcon icon={faTimes} />
      </CloseButton>
    </NotificationContainer>
  );
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning']),
  onClose: PropTypes.func.isRequired,
};

export default Notification;
