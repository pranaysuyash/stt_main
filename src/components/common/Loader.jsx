// src/components/common/Loader.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid ${({ theme }) => theme.colors?.primary || '#008080'};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 100px auto;
`;

const Loader = () => {
  return <Spinner aria-label="Loading" />;
};

export default Loader;
