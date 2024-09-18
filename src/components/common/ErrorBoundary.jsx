// src/components/common/ErrorBoundary.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FallbackContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.error};
  color: white;
  border-radius: 5px;
  text-align: center;
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary Caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <FallbackContainer>Something went wrong.</FallbackContainer>;
    }
    return this.props.children; 
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
