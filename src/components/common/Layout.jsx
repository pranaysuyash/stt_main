// src/components/common/Layout.jsx
import React, { useState } from "react";
import styled from "styled-components";
import SideNav from "./SideNav";
import Breadcrumbs from "./Breadcrumbs";
import QuickAccessToolbar from "./QuickAccessToolbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom"; // Import Outlet for nested routes

const LayoutContainer = styled.div`
  display: flex;
`;

const Content = styled.main`
  margin-left: ${({ $sidebarCollapsed }) =>
    $sidebarCollapsed ? "60px" : "240px"};
  padding: 20px;
  width: 100%;
  transition: margin-left 0.3s ease-in-out;
  @media (max-width: 768px) {
    padding: 15px;
    width: 100%;
    border-radius: 0;
    height: 100vh;
    max-height: 100vh;
  }
`;

const MobileHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #2c3e50;
  color: #ecf0f1;
  display: none;
  align-items: center;
  padding: 0 20px;
  z-index: 1100;
  @media (max-width: 768px) {
    display: flex;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-size: 1.5em;
  cursor: pointer;
  outline: none;
  &:hover {
    color: #3498db;
  }
  &:focus {
    outline: 2px solid #3498db;
    outline-offset: 2px;
  }
`;

const ToolbarPlaceholder = styled.div`
  margin-top: 60px;
  @media (min-width: 769px) {
    margin-top: 0;
  }
`;

function Layout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth <= 768);

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
    setSidebarCollapsed(!isMobileOpen); // Toggle sidebar collapse based on mobile open state
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      <SideNav
        isMobile={true}
        isMobileOpen={isMobileOpen}
        toggleMobile={toggleMobile}
        collapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <MobileHeader>
        <MenuButton onClick={toggleMobile} aria-label="Toggle Sidebar">
          <FontAwesomeIcon icon={faBars} />
        </MenuButton>
        <h2 style={{ marginLeft: "20px" }}>WaveAnalyzer</h2>
      </MobileHeader>
      <LayoutContainer>
        <Content $sidebarCollapsed={sidebarCollapsed}>
          <Breadcrumbs />
          <QuickAccessToolbar />
          <ToolbarPlaceholder />
          <Outlet /> {/* Render nested routes here */}
        </Content>
      </LayoutContainer>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
