// src/components/common/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Styled Component for Button
const ButtonStyled = styled.button`
  padding: 10px 20px;
  min-width: 100px;
  border: none;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.body || '16px'};
  cursor: pointer;
  background-color: ${({ $variant, $customColor, theme }) =>
    $customColor
      ? $customColor
      : $variant === 'primary'
      ? theme.colors.primary
      : $variant === 'secondary'
      ? theme.colors.secondary
      : theme.colors.neutral};
  color: ${({ $variant, theme }) =>
    $variant === 'tertiary' ? theme.colors.text : '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease, background-color 0.2s ease;

  flex: 1 0 auto;

  /* Hover State */
  &:hover {
    opacity: 0.9;
  }

  /* Disabled State */
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  /* Focus Styles for Accessibility */
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    min-width: 80px;
  font-size: ${({ theme }) => theme.fontSizes.small || '12px'};
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
  customColor = null,
}) => (
  <ButtonStyled
    $variant={variant}
    onClick={onClick}
    disabled={disabled}
    type={type}
    $customColor={customColor}
    aria-label={typeof children === 'string' ? children : undefined}
  >
    {icon && (
      <FontAwesomeIcon
        icon={icon}
        style={{ marginRight: children ? '8px' : '0' }}
      />
    )}
    {children}
  </ButtonStyled>
);

// PropTypes Validation
Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.object, // FontAwesomeIcon expects an icon object
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  customColor: PropTypes.string, // Allows overriding the background color
};

export default Button;
