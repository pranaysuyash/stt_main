// src/components/common/Loader.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Spinner = styled.div`
  border: 4px solid ${({ theme }) => theme.colors.neutral};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

function Loader() {
  return (
    <LoaderWrapper>
      <Spinner />
    </LoaderWrapper>
  );
}

export default Loader;
