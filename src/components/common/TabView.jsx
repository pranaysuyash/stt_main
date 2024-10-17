// import React, { useState } from 'react';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';

// const TabContainer = styled.div`
//   width: 100%;
// `;

// const TabButtons = styled.div`
//   display: flex;
//   border-bottom: 1px solid ${({ theme }) => theme.colors.border};
// `;

// const TabButton = styled.button`
//   padding: 10px 20px;
//   background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
//   color: ${props => props.active ? props.theme.colors.background : props.theme.colors.text};
//   border: none;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.secondary};
//   }

//   &:focus {
//     outline: 2px solid ${({ theme }) => theme.colors.focus};
//     outline-offset: -2px;
//   }
// `;

// const TabContent = styled.div`
//   padding: 20px;
// `;

// function TabView({ tabs }) {
//   const [activeTab, setActiveTab] = useState(0);

//   return (
//     <TabContainer role="tablist">
//       <TabButtons>
//         {tabs.map((tab, index) => (
//           <TabButton
//             key={index}
//             role="tab"
//             aria-selected={activeTab === index}
//             aria-controls={`tabpanel-${index}`}
//             id={`tab-${index}`}
//             active={activeTab === index}
//             onClick={() => setActiveTab(index)}
//           >
//             {tab.label}
//           </TabButton>
//         ))}
//       </TabButtons>
//       <TabContent
//         role="tabpanel"
//         id={`tabpanel-${activeTab}`}
//         aria-labelledby={`tab-${activeTab}`}
//       >
//         {tabs[activeTab].content}
//       </TabContent>
//     </TabContainer>
//   );
// }

// TabView.propTypes = {
//   tabs: PropTypes.arrayOf(
//     PropTypes.shape({
//       label: PropTypes.string.isRequired,
//       content: PropTypes.node.isRequired,
//     })
//   ).isRequired,
// };

// export default TabView;

// src/components/common/TabView.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

/**
 * Accessible TabView Component using Chakra UI.
 */
function TabView({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const activeBg = useColorModeValue('blue.100', 'blue.900');
  const inactiveBg = useColorModeValue('gray.100', 'gray.600');

  /**
   * Handle tab change.
   */
  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <Box width="100%">
      <Box display="flex" borderBottom={`1px solid ${borderColor}`}>
        {tabs.map((tab, index) => (
          <Button
            key={index}
            onClick={() => handleTabChange(index)}
            bg={activeTab === index ? activeBg : inactiveBg}
            borderRadius="0"
            borderBottom={activeTab === index ? '2px solid blue' : 'none'}
            flex="1"
            _hover={{ bg: activeBg }}
            aria-selected={activeTab === index}
            role="tab"
            id={`tab-${index}`}
            aria-controls={`tabpanel-${index}`}
          >
            {tab.label}
          </Button>
        ))}
      </Box>
      <Box
        p={4}
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        bg={bgColor}
        borderWidth="1px"
        borderColor={borderColor}
        borderTop="none"
      >
        {tabs[activeTab].content}
      </Box>
    </Box>
  );
}

TabView.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default TabView;