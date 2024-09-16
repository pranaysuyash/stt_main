// frontend/src/components/common/Messages.jsx
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Error Message Component
export const ErrorMessage = styled.div.attrs({
  role: 'alert',
  'aria-live': 'assertive',
})`
  color: ${({ theme }) => theme.colors.error};
  background-color: #ffe6e6;
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: 5px;
  margin-top: 10px;
`;

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};
