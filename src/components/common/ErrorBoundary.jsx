
// src/components/common/ErrorBoundary.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FallbackContainer = styled.div`
  padding: 40px;
  background-color: ${({ theme }) => theme.colors.error};
  color: white;
  border-radius: 8px;
  text-align: center;
  max-width: 600px;
  margin: 100px auto;
`;

const RetryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
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
    // Optionally, integrate with error logging services here
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    // Optionally, you can also reload the page or perform other actions
  };

  render() {
    if (this.state.hasError) {
      return (
        <FallbackContainer>
          <h1>Something went wrong.</h1>
          <p>We're sorry for the inconvenience. Please try again.</p>
          <RetryButton onClick={this.handleRetry}>Retry</RetryButton>
        </FallbackContainer>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
