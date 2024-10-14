import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TabContainer = styled.div`
  width: 100%;
`;

const TabButtons = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TabButton = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? props.theme.colors.background : props.theme.colors.text};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.secondary};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: -2px;
  }
`;

const TabContent = styled.div`
  padding: 20px;
`;

function TabView({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabContainer role="tablist">
      <TabButtons>
        {tabs.map((tab, index) => (
          <TabButton
            key={index}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
            active={activeTab === index}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabButtons>
      <TabContent
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {tabs[activeTab].content}
      </TabContent>
    </TabContainer>
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