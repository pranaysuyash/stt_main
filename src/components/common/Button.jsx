// src/components/common/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Transient Props: $variant, $customColor
const ButtonStyled = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.body || '16px'};
  cursor: pointer;
  
  /* Use transient props by prefixing with $ */
  background-color: ${({ $variant, $customColor, theme }) =>
    $customColor
      ? $customColor
      : $variant === 'primary'
      ? theme.colors.primary || '#3498db'
      : $variant === 'secondary'
      ? theme.colors.secondary || '#2ecc71'
      : theme.colors.neutral || '#95a5a6'};
  
  color: ${({ $variant, theme }) =>
    $variant === 'tertiary' ? theme.colors.text || '#2c3e50' : '#fff'};
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  /* Focus Styles */
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary || '#3498db'};
    outline-offset: 2px;
  }
`;

// Button Component
const Button = ({ 
  variant = 'primary', 
  children, 
  onClick = () => {}, 
  disabled = false, 
  icon = null, 
  type = 'button',
  customColor = null
}) => (
  <ButtonStyled 
    /* Use transient props by prefixing with $ */
    $variant={variant} 
    onClick={onClick} 
    disabled={disabled} 
    type={type} 
    $customColor={customColor} 
    aria-label={typeof children === "string" ? children : undefined}
  >
    {icon && <FontAwesomeIcon icon={icon} style={{ marginRight: children ? "8px" : "0" }} />}
    {children}
  </ButtonStyled>
);

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.object, // FontAwesomeIcon expects an icon object
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  customColor: PropTypes.string, // New prop type
};

export default Button;
