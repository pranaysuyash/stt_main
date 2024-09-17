// src/components/common/Tooltip.jsx
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Transient Prop: $text
const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover::after {
    content: "${(props) => props.$text}";
    position: absolute;
    bottom: 125%; /* Position above the text */
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    white-space: nowrap;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 1001;
    opacity: 0.9;
    pointer-events: none; /* Prevent tooltip from interfering with hover */
  }

  &:hover::before {
    content: "";
    position: absolute;
    bottom: 115%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.background} transparent transparent transparent;
    opacity: 0.9;
    pointer-events: none;
  }
`;

function Tooltip({ $text, children }) {
  return <TooltipWrapper $text={$text}>{children}</TooltipWrapper>;
}

Tooltip.propTypes = {
  $text: PropTypes.string.isRequired, // Updated to $text
  children: PropTypes.node.isRequired,
};

export default Tooltip;
