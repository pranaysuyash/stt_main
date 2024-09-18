// src/components/pages/Help.jsx
import React from 'react';
import styled from 'styled-components';

const HelpContainer = styled.div`
  padding: 20px;
`;

function Help() {
  return (
    <HelpContainer>
      <h1>Help</h1>
      <p>This section will provide help and support information.</p>
    </HelpContainer>
  );
}

export default Help;
