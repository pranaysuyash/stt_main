// src/components/common/ProgressBar.jsx
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ProgressBarContainer = styled.div`
  margin-top: 20px;
`;

const ProgressWrapper = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  padding: 3px;
  border-radius: 6px;
  overflow: hidden;
`;

const ProgressBarStyled = styled.div`
  height: 22px;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, #00c6ff);
  border-radius: 3px;
  width: ${({ $progress }) => `${$progress}%`};
  transition: width 1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
`;

function ProgressBar({ progress }) {
  if (progress === 0) return null;
  return (
    <ProgressBarContainer>
      <ProgressWrapper>
        <ProgressBarStyled
          $progress={progress}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {progress}%
        </ProgressBarStyled>
      </ProgressWrapper>
    </ProgressBarContainer>
  );
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
