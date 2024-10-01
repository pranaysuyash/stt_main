// src/components/pages/NotFound.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.h1};
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 40px;
`;

const HomeButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.neutral};
  padding: 15px 25px;
  text-decoration: none;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Title>404 - Page Not Found</Title>
      <Description>
        Oops! The page you're looking for doesn't exist.
      </Description>
      <HomeButton to="/">Go to Home</HomeButton>
    </NotFoundContainer>
  );
};

export default NotFound;
