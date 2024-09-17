// frontend/src/components/common/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonStyled = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  cursor: pointer;
  background-color: ${({ $variant,$customColor, theme }) =>
    $customColor ? $customColor :
    $variant === 'primary' ? theme.colors.primary :
    $variant === 'secondary' ? theme.colors.secondary :
    theme.colors.neutral};
  color: ${({ $variant, $customColor }) =>
    $variant === 'tertiary' ? theme.colors.text : '#fff'};
  
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
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const Button = ({ 
  variant = 'primary', 
  children, 
  onClick = () => {}, 
  disabled = false, 
  icon = null, 
  type = 'button',
  customColor = null // New prop for custom background color
}) => (
  <ButtonStyled variant={variant} onClick={onClick} disabled={disabled} type={type} customColor={customColor} aria-label={typeof children === "string" ? children : undefined}>
    {icon && <FontAwesomeIcon icon={icon} style={{ marginRight: '8px' }} />}
    {children}
  </ButtonStyled>
);

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.object, // FontAwesomeIcon expects an icon object
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  customColor: PropTypes.string, // New prop type
};

export default Button;
