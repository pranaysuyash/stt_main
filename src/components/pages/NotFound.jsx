// src/components/pages/NotFound.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFoundContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

function NotFound() {
  return (
    <NotFoundContainer>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">
        <button>Go to Home</button>
      </Link>
    </NotFoundContainer>
  );
}

export default NotFound;
